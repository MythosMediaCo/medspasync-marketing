import os
import json
import logging
import hashlib
import datetime
from typing import Dict, List, Optional, Tuple
from dataclasses import dataclass
import openai
from flask import Flask, request, jsonify
from flask_cors import CORS
import redis
import psycopg2
from psycopg2.extras import RealDictCursor
import jwt
from cryptography.fernet import Fernet

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@dataclass
class SupportTicket:
    id: str
    user_id: str
    practice_id: str
    subject: str
    description: str
    priority: str
    status: str
    category: str
    created_at: datetime.datetime
    updated_at: datetime.datetime
    ai_responses: List[Dict]
    human_intervention_required: bool

@dataclass
class KnowledgeArticle:
    id: str
    title: str
    content: str
    category: str
    tags: List[str]
    relevance_score: float
    last_updated: datetime.datetime

class HIPAAComplianceManager:
    """Manages HIPAA compliance for customer support interactions"""
    
    def __init__(self, encryption_key: str):
        self.cipher = Fernet(encryption_key.encode())
        self.audit_log = []
    
    def encrypt_phi(self, data: str) -> str:
        """Encrypt potentially sensitive data"""
        return self.cipher.encrypt(data.encode()).decode()
    
    def decrypt_phi(self, encrypted_data: str) -> str:
        """Decrypt sensitive data"""
        return self.cipher.decrypt(encrypted_data.encode()).decode()
    
    def sanitize_message(self, message: str) -> str:
        """Remove or mask potential PHI from messages"""
        # Basic PHI patterns (in production, use more sophisticated NLP)
        phi_patterns = [
            r'\b\d{3}-\d{2}-\d{4}\b',  # SSN
            r'\b\d{3}-\d{3}-\d{4}\b',  # Phone
            r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b',  # Email
        ]
        
        import re
        sanitized = message
        for pattern in phi_patterns:
            sanitized = re.sub(pattern, '[REDACTED]', sanitized)
        
        return sanitized
    
    def log_audit_event(self, event_type: str, user_id: str, details: Dict):
        """Log audit events for compliance"""
        audit_entry = {
            'timestamp': datetime.datetime.utcnow().isoformat(),
            'event_type': event_type,
            'user_id': user_id,
            'details': details,
            'session_id': hashlib.md5(f"{user_id}_{datetime.datetime.utcnow()}".encode()).hexdigest()
        }
        self.audit_log.append(audit_entry)
        logger.info(f"AUDIT: {event_type} for user {user_id}")

class KnowledgeBaseManager:
    """Manages the knowledge base for AI support responses"""
    
    def __init__(self, db_connection):
        self.db = db_connection
        self.articles_cache = {}
        self.last_cache_update = None
    
    def search_articles(self, query: str, category: Optional[str] = None) -> List[KnowledgeArticle]:
        """Search knowledge base articles"""
        try:
            cursor = self.db.cursor(cursor_factory=RealDictCursor)
            
            # Full-text search with relevance scoring
            search_query = """
                SELECT 
                    id, title, content, category, tags, 
                    last_updated,
                    ts_rank(to_tsvector('english', title || ' ' || content), plainto_tsquery('english', %s)) as relevance_score
                FROM knowledge_articles 
                WHERE to_tsvector('english', title || ' ' || content) @@ plainto_tsquery('english', %s)
                {}
                ORDER BY relevance_score DESC
                LIMIT 10
            """.format("AND category = %s" if category else "")
            
            params = [query, query]
            if category:
                params.append(category)
            
            cursor.execute(search_query, params)
            results = cursor.fetchall()
            
            articles = []
            for row in results:
                article = KnowledgeArticle(
                    id=row['id'],
                    title=row['title'],
                    content=row['content'],
                    category=row['category'],
                    tags=row['tags'] if row['tags'] else [],
                    relevance_score=float(row['relevance_score']),
                    last_updated=row['last_updated']
                )
                articles.append(article)
            
            cursor.close()
            return articles
            
        except Exception as e:
            logger.error(f"Error searching knowledge base: {e}")
            return []
    
    def get_article_by_id(self, article_id: str) -> Optional[KnowledgeArticle]:
        """Get specific knowledge article"""
        try:
            cursor = self.db.cursor(cursor_factory=RealDictCursor)
            cursor.execute(
                "SELECT * FROM knowledge_articles WHERE id = %s",
                (article_id,)
            )
            row = cursor.fetchone()
            cursor.close()
            
            if row:
                return KnowledgeArticle(
                    id=row['id'],
                    title=row['title'],
                    content=row['content'],
                    category=row['category'],
                    tags=row['tags'] if row['tags'] else [],
                    relevance_score=1.0,
                    last_updated=row['last_updated']
                )
            return None
            
        except Exception as e:
            logger.error(f"Error getting article: {e}")
            return None
    
    def update_article(self, article_id: str, updates: Dict) -> bool:
        """Update knowledge article"""
        try:
            cursor = self.db.cursor()
            set_clauses = []
            params = []
            
            for key, value in updates.items():
                if key in ['title', 'content', 'category', 'tags']:
                    set_clauses.append(f"{key} = %s")
                    params.append(value)
            
            if set_clauses:
                set_clauses.append("last_updated = NOW()")
                params.append(article_id)
                
                query = f"UPDATE knowledge_articles SET {', '.join(set_clauses)} WHERE id = %s"
                cursor.execute(query, params)
                self.db.commit()
                cursor.close()
                return True
            
            return False
            
        except Exception as e:
            logger.error(f"Error updating article: {e}")
            return False

class IntentRecognitionEngine:
    """Recognizes user intent from support messages"""
    
    def __init__(self):
        self.intent_patterns = {
            'technical_support': [
                'error', 'bug', 'not working', 'broken', 'issue', 'problem',
                'upload', 'import', 'export', 'sync', 'connection'
            ],
            'billing': [
                'billing', 'payment', 'invoice', 'charge', 'subscription',
                'upgrade', 'downgrade', 'cancel', 'refund'
            ],
            'onboarding': [
                'setup', 'configure', 'get started', 'first time', 'tutorial',
                'guide', 'help me start', 'how to begin'
            ],
            'feature_request': [
                'can you add', 'wish you had', 'missing feature', 'would be great',
                'suggestion', 'improvement', 'new feature'
            ],
            'general_inquiry': [
                'what is', 'how does', 'explain', 'tell me about', 'question'
            ]
        }
    
    def classify_intent(self, message: str) -> Tuple[str, float]:
        """Classify the intent of a user message"""
        message_lower = message.lower()
        intent_scores = {}
        
        for intent, patterns in self.intent_patterns.items():
            score = 0
            for pattern in patterns:
                if pattern in message_lower:
                    score += 1
            intent_scores[intent] = score
        
        # Find the highest scoring intent
        if intent_scores:
            best_intent = max(intent_scores, key=intent_scores.get)
            confidence = intent_scores[best_intent] / max(len(message.split()), 1)
            return best_intent, min(confidence, 1.0)
        
        return 'general_inquiry', 0.1
    
    def extract_entities(self, message: str) -> Dict:
        """Extract relevant entities from the message"""
        entities = {
            'urgency': 'normal',
            'feature_mentioned': None,
            'error_codes': [],
            'platform': None
        }
        
        message_lower = message.lower()
        
        # Detect urgency
        urgent_words = ['urgent', 'emergency', 'critical', 'asap', 'broken']
        if any(word in message_lower for word in urgent_words):
            entities['urgency'] = 'high'
        
        # Detect features
        features = ['reconciliation', 'analytics', 'dashboard', 'reports', 'billing']
        for feature in features:
            if feature in message_lower:
                entities['feature_mentioned'] = feature
                break
        
        # Detect error codes
        import re
        error_codes = re.findall(r'error\s*[#:]?\s*(\d+)', message_lower)
        entities['error_codes'] = error_codes
        
        # Detect platform
        platforms = ['chrome', 'firefox', 'safari', 'edge', 'mobile', 'ios', 'android']
        for platform in platforms:
            if platform in message_lower:
                entities['platform'] = platform
                break
        
        return entities

class AICustomerSupportBot:
    """Main AI customer support bot"""
    
    def __init__(self, openai_api_key: str, db_connection, redis_client):
        self.openai_client = openai.OpenAI(api_key=openai_api_key)
        self.db = db_connection
        self.redis = redis_client
        self.hipaa_manager = HIPAAComplianceManager(os.getenv('ENCRYPTION_KEY', 'default-key'))
        self.kb_manager = KnowledgeBaseManager(db_connection)
        self.intent_engine = IntentRecognitionEngine()
        
        # Load conversation templates
        self.templates = self._load_templates()
    
    def _load_templates(self) -> Dict:
        """Load response templates"""
        return {
            'greeting': "Hello! I'm your MedSpaSync Pro AI assistant. How can I help you today?",
            'technical_support': "I understand you're experiencing a technical issue. Let me help you resolve this.",
            'billing': "I can help you with billing and subscription questions. Let me get the right information for you.",
            'onboarding': "Welcome to MedSpaSync Pro! I'm here to help you get started and make the most of our platform.",
            'feature_request': "Thank you for your feedback! I'll make sure your suggestion reaches our product team.",
            'escalation': "I understand this requires more detailed assistance. Let me connect you with our support team.",
            'goodbye': "Is there anything else I can help you with today?"
        }
    
    def process_message(self, user_id: str, practice_id: str, message: str, 
                       conversation_history: List[Dict] = None) -> Dict:
        """Process a user support message and generate response"""
        try:
            # Sanitize message for HIPAA compliance
            sanitized_message = self.hipaa_manager.sanitize_message(message)
            
            # Log audit event
            self.hipaa_manager.log_audit_event(
                'support_message_received',
                user_id,
                {'message_length': len(message), 'practice_id': practice_id}
            )
            
            # Classify intent
            intent, confidence = self.intent_engine.classify_intent(sanitized_message)
            entities = self.intent_engine.extract_entities(sanitized_message)
            
            # Search knowledge base
            relevant_articles = self.kb_manager.search_articles(sanitized_message, intent)
            
            # Generate AI response
            ai_response = self._generate_ai_response(
                sanitized_message, intent, entities, relevant_articles, conversation_history
            )
            
            # Determine if human intervention is needed
            human_intervention = self._should_escalate(intent, confidence, entities, ai_response)
            
            # Create or update support ticket
            ticket = self._create_or_update_ticket(
                user_id, practice_id, sanitized_message, intent, 
                entities, ai_response, human_intervention
            )
            
            # Cache conversation context
            self._cache_conversation_context(user_id, conversation_history, ai_response)
            
            return {
                'response': ai_response,
                'intent': intent,
                'confidence': confidence,
                'entities': entities,
                'relevant_articles': [{'id': a.id, 'title': a.title} for a in relevant_articles[:3]],
                'ticket_id': ticket.id if ticket else None,
                'human_intervention_required': human_intervention,
                'suggested_actions': self._get_suggested_actions(intent, entities)
            }
            
        except Exception as e:
            logger.error(f"Error processing support message: {e}")
            return {
                'response': "I apologize, but I'm experiencing technical difficulties. Please try again in a moment or contact our support team directly.",
                'error': str(e)
            }
    
    def _generate_ai_response(self, message: str, intent: str, entities: Dict, 
                            articles: List[KnowledgeArticle], 
                            conversation_history: List[Dict] = None) -> str:
        """Generate AI response using OpenAI"""
        try:
            # Build context from knowledge articles
            context = ""
            if articles:
                context = "Relevant information:\n"
                for article in articles[:2]:  # Use top 2 articles
                    context += f"- {article.title}: {article.content[:200]}...\n"
            
            # Build conversation history
            history = ""
            if conversation_history:
                history = "Recent conversation:\n"
                for entry in conversation_history[-5:]:  # Last 5 messages
                    history += f"User: {entry.get('user_message', '')}\n"
                    history += f"Assistant: {entry.get('ai_response', '')}\n"
            
            # Create prompt
            prompt = f"""
You are a helpful AI assistant for MedSpaSync Pro, a medical spa management platform. 
You help users with technical support, billing, onboarding, and general questions.

Context: {context}
Conversation History: {history}

User Message: {message}
Intent: {intent}
Entities: {entities}

Please provide a helpful, professional response that:
1. Addresses the user's specific question or issue
2. Uses the provided context when relevant
3. Maintains a friendly, professional tone
4. Suggests next steps when appropriate
5. Keeps responses concise but informative

Response:"""

            response = self.openai_client.chat.completions.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are a helpful AI assistant for MedSpaSync Pro."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=500,
                temperature=0.7
            )
            
            return response.choices[0].message.content.strip()
            
        except Exception as e:
            logger.error(f"Error generating AI response: {e}")
            return self.templates.get(intent, self.templates['general_inquiry'])
    
    def _should_escalate(self, intent: str, confidence: float, entities: Dict, 
                        ai_response: str) -> bool:
        """Determine if human intervention is needed"""
        # High urgency issues
        if entities.get('urgency') == 'high':
            return True
        
        # Low confidence responses
        if confidence < 0.3:
            return True
        
        # Complex technical issues
        if intent == 'technical_support' and entities.get('error_codes'):
            return True
        
        # Billing issues that might need account access
        if intent == 'billing' and any(word in ai_response.lower() for word in ['account', 'payment', 'subscription']):
            return True
        
        return False
    
    def _create_or_update_ticket(self, user_id: str, practice_id: str, message: str,
                                intent: str, entities: Dict, ai_response: str,
                                human_intervention: bool) -> Optional[SupportTicket]:
        """Create or update support ticket"""
        try:
            cursor = self.db.cursor(cursor_factory=RealDictCursor)
            
            # Check for existing open ticket
            cursor.execute(
                """
                SELECT * FROM support_tickets 
                WHERE user_id = %s AND status IN ('open', 'in_progress')
                ORDER BY created_at DESC LIMIT 1
                """,
                (user_id,)
            )
            existing_ticket = cursor.fetchone()
            
            if existing_ticket:
                # Update existing ticket
                ticket_id = existing_ticket['id']
                cursor.execute(
                    """
                    UPDATE support_tickets 
                    SET updated_at = NOW(), 
                        ai_responses = array_append(ai_responses, %s),
                        human_intervention_required = %s
                    WHERE id = %s
                    """,
                    (json.dumps({'message': message, 'response': ai_response, 'timestamp': datetime.datetime.utcnow().isoformat()}), 
                     human_intervention, ticket_id)
                )
            else:
                # Create new ticket
                cursor.execute(
                    """
                    INSERT INTO support_tickets 
                    (user_id, practice_id, subject, description, priority, status, category, ai_responses, human_intervention_required)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING id
                    """,
                    (user_id, practice_id, f"{intent.title()} Support Request", message,
                     entities.get('urgency', 'normal'), 'open', intent,
                     json.dumps([{'message': message, 'response': ai_response, 'timestamp': datetime.datetime.utcnow().isoformat()}]),
                     human_intervention)
                )
                ticket_id = cursor.fetchone()['id']
            
            self.db.commit()
            cursor.close()
            
            return SupportTicket(
                id=ticket_id,
                user_id=user_id,
                practice_id=practice_id,
                subject=f"{intent.title()} Support Request",
                description=message,
                priority=entities.get('urgency', 'normal'),
                status='open',
                category=intent,
                created_at=datetime.datetime.utcnow(),
                updated_at=datetime.datetime.utcnow(),
                ai_responses=[{'message': message, 'response': ai_response}],
                human_intervention_required=human_intervention
            )
            
        except Exception as e:
            logger.error(f"Error creating/updating ticket: {e}")
            return None
    
    def _cache_conversation_context(self, user_id: str, conversation_history: List[Dict], 
                                   ai_response: str):
        """Cache conversation context for future interactions"""
        try:
            context = {
                'last_interaction': datetime.datetime.utcnow().isoformat(),
                'conversation_history': conversation_history[-10:] if conversation_history else [],
                'last_ai_response': ai_response
            }
            
            self.redis.setex(
                f"support_context:{user_id}",
                3600,  # 1 hour TTL
                json.dumps(context)
            )
        except Exception as e:
            logger.error(f"Error caching conversation context: {e}")
    
    def _get_suggested_actions(self, intent: str, entities: Dict) -> List[str]:
        """Get suggested actions based on intent and entities"""
        actions = []
        
        if intent == 'technical_support':
            actions.extend([
                "Check our troubleshooting guide",
                "Review recent system updates",
                "Contact technical support"
            ])
        
        elif intent == 'billing':
            actions.extend([
                "View billing history",
                "Update payment method",
                "Change subscription plan"
            ])
        
        elif intent == 'onboarding':
            actions.extend([
                "Complete setup wizard",
                "Watch tutorial videos",
                "Schedule onboarding call"
            ])
        
        return actions[:3]  # Limit to 3 suggestions

# Flask app setup
app = Flask(__name__)
CORS(app)

# Initialize bot
bot = None

def initialize_bot():
    """Initialize the AI support bot"""
    global bot
    try:
        # Database connection
        db_conn = psycopg2.connect(
            host=os.getenv('DB_HOST', 'localhost'),
            database=os.getenv('DB_NAME', 'medspasync'),
            user=os.getenv('DB_USER', 'postgres'),
            password=os.getenv('DB_PASSWORD', 'password')
        )
        
        # Redis connection
        redis_client = redis.Redis(
            host=os.getenv('REDIS_HOST', 'localhost'),
            port=int(os.getenv('REDIS_PORT', 6379)),
            db=int(os.getenv('REDIS_DB', 0))
        )
        
        bot = AICustomerSupportBot(
            openai_api_key=os.getenv('OPENAI_API_KEY'),
            db_connection=db_conn,
            redis_client=redis_client
        )
        
        logger.info("AI Customer Support Bot initialized successfully")
        
    except Exception as e:
        logger.error(f"Failed to initialize bot: {e}")
        raise

@app.route('/api/support/chat', methods=['POST'])
def chat():
    """Handle support chat messages"""
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        practice_id = data.get('practice_id')
        message = data.get('message')
        conversation_history = data.get('conversation_history', [])
        
        if not all([user_id, practice_id, message]):
            return jsonify({'error': 'Missing required fields'}), 400
        
        if not bot:
            return jsonify({'error': 'Support bot not initialized'}), 500
        
        response = bot.process_message(user_id, practice_id, message, conversation_history)
        return jsonify(response)
        
    except Exception as e:
        logger.error(f"Error in chat endpoint: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/support/knowledge/search', methods=['GET'])
def search_knowledge():
    """Search knowledge base"""
    try:
        query = request.args.get('q')
        category = request.args.get('category')
        
        if not query:
            return jsonify({'error': 'Query parameter required'}), 400
        
        if not bot:
            return jsonify({'error': 'Support bot not initialized'}), 500
        
        articles = bot.kb_manager.search_articles(query, category)
        
        return jsonify({
            'articles': [
                {
                    'id': article.id,
                    'title': article.title,
                    'content': article.content[:200] + '...' if len(article.content) > 200 else article.content,
                    'category': article.category,
                    'relevance_score': article.relevance_score
                }
                for article in articles
            ]
        })
        
    except Exception as e:
        logger.error(f"Error in knowledge search: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/support/tickets/<ticket_id>', methods=['GET'])
def get_ticket(ticket_id):
    """Get support ticket details"""
    try:
        if not bot:
            return jsonify({'error': 'Support bot not initialized'}), 500
        
        cursor = bot.db.cursor(cursor_factory=RealDictCursor)
        cursor.execute(
            "SELECT * FROM support_tickets WHERE id = %s",
            (ticket_id,)
        )
        ticket = cursor.fetchone()
        cursor.close()
        
        if not ticket:
            return jsonify({'error': 'Ticket not found'}), 404
        
        return jsonify(dict(ticket))
        
    except Exception as e:
        logger.error(f"Error getting ticket: {e}")
        return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    initialize_bot()
    app.run(debug=True, host='0.0.0.0', port=5002) 