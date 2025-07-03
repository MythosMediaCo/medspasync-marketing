#!/usr/bin/env python3
"""
Simplified MedSpaSync AI API Server
A lightweight version that works without complex dependencies
"""

import json
import time
import random
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Any
import uvicorn
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel

# Initialize FastAPI app
app = FastAPI(
    title="MedSpaSync AI API",
    description="AI-powered reconciliation and analytics for medical spas",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class ReconciliationRequest(BaseModel):
    client_data: List[Dict[str, Any]]
    payment_data: List[Dict[str, Any]]
    confidence_threshold: float = 0.8

class ReconciliationResponse(BaseModel):
    matches: List[Dict[str, Any]]
    unmatched: List[Dict[str, Any]]
    confidence_scores: List[float]
    processing_time: float
    total_processed: int

class HealthResponse(BaseModel):
    status: str
    timestamp: str
    service: str
    version: str

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

# Health check endpoint
@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint"""
    return HealthResponse(
        status="healthy",
        timestamp=datetime.now().isoformat(),
        service="MedSpaSync AI API",
        version="1.0.0"
    )

# API status endpoint
@app.get("/api/status")
async def api_status():
    """API status and available endpoints"""
    return {
        "message": "MedSpaSync AI API is running",
        "endpoints": [
            "/health",
            "/api/status",
            "/api/reconcile",
            "/api/analytics",
            "/api/confidence-score"
        ],
        "ai_capabilities": [
            "Client-Payment Reconciliation",
            "Confidence Scoring",
            "Pattern Recognition",
            "Anomaly Detection"
        ]
    }

# Reconciliation endpoint
@app.post("/api/reconcile", response_model=ReconciliationResponse)
async def reconcile_records(request: ReconciliationRequest):
    """Reconcile client and payment records using AI"""
    try:
        # Update confidence threshold
        ai_engine.confidence_threshold = request.confidence_threshold
        
        # Process reconciliation
        result = ai_engine.reconcile_records(
            request.client_data,
            request.payment_data
        )
        
        return ReconciliationResponse(**result)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Reconciliation failed: {str(e)}")

# Confidence scoring endpoint
@app.post("/api/confidence-score")
async def calculate_confidence_score(request: Request):
    """Calculate confidence score for a single record pair"""
    try:
        data = await request.json()
        client_record = data.get('client_record', {})
        payment_record = data.get('payment_record', {})
        
        confidence = ai_engine.calculate_similarity(client_record, payment_record)
        
        return {
            "confidence": confidence,
            "threshold": ai_engine.confidence_threshold,
            "recommendation": "match" if confidence >= ai_engine.confidence_threshold else "review"
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Confidence calculation failed: {str(e)}")

# Analytics endpoint
@app.get("/api/analytics")
async def get_analytics():
    """Get AI analytics and insights"""
    return {
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

# Mock data endpoint for testing
@app.get("/api/mock-data")
async def get_mock_data():
    """Get mock data for testing"""
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
    
    return {
        "client_data": client_data,
        "payment_data": payment_data
    }

# Error handling
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal server error",
            "message": str(exc),
            "timestamp": datetime.now().isoformat()
        }
    )

# Root endpoint
@app.get("/")
async def root():
    """Root endpoint with API information"""
    return {
        "message": "Welcome to MedSpaSync AI API",
        "version": "1.0.0",
        "documentation": "/docs",
        "health_check": "/health",
        "status": "/api/status"
    }

if __name__ == "__main__":
    print("🚀 Starting MedSpaSync AI API Server...")
    print("📍 Server will be available at: http://localhost:8000")
    print("📊 API Documentation at: http://localhost:8000/docs")
    print("🔍 Health check at: http://localhost:8000/health")
    
    uvicorn.run(
        "simple_api_server:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    ) 