#!/usr/bin/env python3
"""
Simplified MedSpaSync AI API Server for Python 3.13
Uses only standard library modules to avoid dependency issues
"""

import json
import time
import random
import http.server
import socketserver
import urllib.parse
from datetime import datetime
from typing import Dict, List, Any
import threading

# Mock AI reconciliation engine
class MockAIReconciliationEngine:
    def __init__(self):
        self.confidence_threshold = 0.8
        
    def calculate_similarity(self, client_record: Dict, payment_record: Dict) -> float:
        """Calculate similarity between client and payment records"""
        # Simple string matching for demo
        client_name = client_record.get('name', '').lower()
        payment_name = payment_record.get('name', '').lower()
        
        if client_name == payment_name:
            return 0.95
        elif client_name in payment_name or payment_name in client_name:
            return 0.85
        elif len(set(client_name.split()) & set(payment_name.split())) > 0:
            return 0.75
        else:
            return random.uniform(0.1, 0.6)
    
    def reconcile_records(self, client_data: List[Dict], payment_data: List[Dict]) -> Dict:
        """Reconcile client and payment records using AI"""
        start_time = time.time()
        matches = []
        unmatched = []
        confidence_scores = []
        
        for client_record in client_data:
            best_match = None
            best_confidence = 0
            
            for payment_record in payment_data:
                confidence = self.calculate_similarity(client_record, payment_record)
                
                if confidence > best_confidence:
                    best_confidence = confidence
                    best_match = payment_record
            
            if best_confidence >= self.confidence_threshold and best_match:
                matches.append({
                    'client_record': client_record,
                    'payment_record': best_match,
                    'confidence': best_confidence,
                    'status': 'matched'
                })
                confidence_scores.append(best_confidence)
            else:
                unmatched.append({
                    'client_record': client_record,
                    'confidence': best_confidence,
                    'status': 'unmatched'
                })
        
        processing_time = time.time() - start_time
        
        return {
            'matches': matches,
            'unmatched': unmatched,
            'confidence_scores': confidence_scores,
            'processing_time': processing_time,
            'total_processed': len(client_data)
        }

# Initialize AI engine
ai_engine = MockAIReconciliationEngine()

class MedSpaSyncAIHandler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        """Handle GET requests"""
        parsed_path = urllib.parse.urlparse(self.path)
        path = parsed_path.path
        
        # Set CORS headers
        self.send_cors_headers()
        
        if path == '/health':
            self.handle_health()
        elif path == '/api/status':
            self.handle_api_status()
        elif path == '/api/analytics':
            self.handle_analytics()
        elif path == '/api/mock-data':
            self.handle_mock_data()
        elif path == '/':
            self.handle_root()
        else:
            self.handle_404()
    
    def do_POST(self):
        """Handle POST requests"""
        parsed_path = urllib.parse.urlparse(self.path)
        path = parsed_path.path
        
        # Set CORS headers
        self.send_cors_headers()
        
        if path == '/api/reconcile':
            self.handle_reconcile()
        elif path == '/api/confidence-score':
            self.handle_confidence_score()
        else:
            self.handle_404()
    
    def do_OPTIONS(self):
        """Handle CORS preflight requests"""
        self.send_cors_headers()
        self.send_response(200)
        self.end_headers()
    
    def send_cors_headers(self):
        """Send CORS headers"""
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Content-Type', 'application/json')
    
    def send_json_response(self, data, status_code=200):
        """Send JSON response"""
        self.send_response(status_code)
        self.send_cors_headers()
        self.end_headers()
        self.wfile.write(json.dumps(data, indent=2).encode('utf-8'))
    
    def handle_health(self):
        """Health check endpoint"""
        data = {
            "status": "healthy",
            "timestamp": datetime.now().isoformat(),
            "service": "MedSpaSync AI API",
            "version": "1.0.0"
        }
        self.send_json_response(data)
    
    def handle_api_status(self):
        """API status endpoint"""
        data = {
            "message": "MedSpaSync AI API is running",
            "endpoints": [
                "/health",
                "/api/status",
                "/api/reconcile",
                "/api/analytics",
                "/api/confidence-score",
                "/api/mock-data"
            ],
            "ai_capabilities": [
                "Client-Payment Reconciliation",
                "Confidence Scoring",
                "Pattern Recognition",
                "Anomaly Detection"
            ]
        }
        self.send_json_response(data)
    
    def handle_reconcile(self):
        """Reconciliation endpoint"""
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            request_data = json.loads(post_data.decode('utf-8'))
            
            client_data = request_data.get('client_data', [])
            payment_data = request_data.get('payment_data', [])
            confidence_threshold = request_data.get('confidence_threshold', 0.8)
            
            # Update confidence threshold
            ai_engine.confidence_threshold = confidence_threshold
            
            # Process reconciliation
            result = ai_engine.reconcile_records(client_data, payment_data)
            
            self.send_json_response(result)
            
        except Exception as e:
            error_data = {
                "error": "Reconciliation failed",
                "message": str(e),
                "timestamp": datetime.now().isoformat()
            }
            self.send_json_response(error_data, 500)
    
    def handle_confidence_score(self):
        """Confidence scoring endpoint"""
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            request_data = json.loads(post_data.decode('utf-8'))
            
            client_record = request_data.get('client_record', {})
            payment_record = request_data.get('payment_record', {})
            
            confidence = ai_engine.calculate_similarity(client_record, payment_record)
            
            result = {
                "confidence": confidence,
                "threshold": ai_engine.confidence_threshold,
                "recommendation": "match" if confidence >= ai_engine.confidence_threshold else "review"
            }
            
            self.send_json_response(result)
            
        except Exception as e:
            error_data = {
                "error": "Confidence calculation failed",
                "message": str(e),
                "timestamp": datetime.now().isoformat()
            }
            self.send_json_response(error_data, 500)
    
    def handle_analytics(self):
        """Analytics endpoint"""
        data = {
            "ai_performance": {
                "average_confidence": 0.87,
                "match_rate": 0.92,
                "processing_speed": "0.15s per record",
                "accuracy": 0.94
            },
            "insights": [
                "High confidence matches: 85%",
                "Low confidence matches requiring review: 15%",
                "Common reconciliation patterns detected",
                "Anomaly detection active"
            ],
            "recommendations": [
                "Consider lowering confidence threshold for faster processing",
                "Review unmatched records for potential matches",
                "Update client records for better matching"
            ]
        }
        self.send_json_response(data)
    
    def handle_mock_data(self):
        """Mock data endpoint for testing"""
        client_data = [
            {
                "id": 1,
                "name": "John Doe",
                "email": "john@example.com",
                "service": "Facial Treatment",
                "amount": 150.00,
                "date": "2024-01-15"
            },
            {
                "id": 2,
                "name": "Jane Smith",
                "email": "jane@example.com",
                "service": "Massage Therapy",
                "amount": 200.00,
                "date": "2024-01-10"
            },
            {
                "id": 3,
                "name": "Bob Johnson",
                "email": "bob@example.com",
                "service": "Botox Treatment",
                "amount": 500.00,
                "date": "2024-01-12"
            }
        ]
        
        payment_data = [
            {
                "id": "p1",
                "name": "John Doe",
                "payment": 150.00,
                "date": "2024-01-15",
                "method": "credit_card"
            },
            {
                "id": "p2",
                "name": "Jane Smith",
                "payment": 200.00,
                "date": "2024-01-10",
                "method": "cash"
            },
            {
                "id": "p3",
                "name": "Robert Johnson",
                "payment": 500.00,
                "date": "2024-01-12",
                "method": "credit_card"
            }
        ]
        
        data = {
            "client_data": client_data,
            "payment_data": payment_data
        }
        self.send_json_response(data)
    
    def handle_root(self):
        """Root endpoint"""
        data = {
            "message": "Welcome to MedSpaSync AI API",
            "version": "1.0.0",
            "documentation": "Available endpoints: /health, /api/status, /api/reconcile, /api/analytics",
            "health_check": "/health",
            "status": "/api/status"
        }
        self.send_json_response(data)
    
    def handle_404(self):
        """404 handler"""
        data = {
            "error": "Endpoint not found",
            "message": f"Path '{self.path}' not found",
            "available_endpoints": [
                "GET /health",
                "GET /api/status",
                "POST /api/reconcile",
                "GET /api/analytics",
                "POST /api/confidence-score",
                "GET /api/mock-data"
            ],
            "timestamp": datetime.now().isoformat()
        }
        self.send_json_response(data, 404)
    
    def log_message(self, format, *args):
        """Custom logging to avoid default server logs"""
        print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] {format % args}")

def start_server(host='0.0.0.0', port=8000):
    """Start the AI API server"""
    with socketserver.TCPServer((host, port), MedSpaSyncAIHandler) as httpd:
        print(f"🚀 MedSpaSync AI API Server running on {host}:{port}")
        print(f"📍 Server URL: http://localhost:{port}")
        print(f"🔍 Health check: http://localhost:{port}/health")
        print(f"📊 API status: http://localhost:{port}/api/status")
        print(f"🤖 AI reconciliation: http://localhost:{port}/api/reconcile")
        print(f"📈 Analytics: http://localhost:{port}/api/analytics")
        print(f"🧪 Mock data: http://localhost:{port}/api/mock-data")
        print(f"📖 Root: http://localhost:{port}/")
        print("\nPress Ctrl+C to stop the server")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Server stopped by user")
            httpd.shutdown()

if __name__ == "__main__":
    start_server() 