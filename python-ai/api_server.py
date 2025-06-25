import asyncio
import logging
import time
import json
from datetime import datetime
from typing import Optional, List, Dict, Any
from fastapi import FastAPI, HTTPException, BackgroundTasks, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field
import pandas as pd
import io

from reconciliation_engine import ReconciliationEngine, MatchStatus

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="MedSpa AI Reconciliation API",
    description="Advanced ML-powered transaction reconciliation for medical spas",
    version="2.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize the reconciliation engine
engine = ReconciliationEngine(max_workers=4, batch_size=100)

# Pydantic models
class TransactionData(BaseModel):
    customer_name: Optional[str] = None
    customer_phone: Optional[str] = None
    customer_email: Optional[str] = None
    service: Optional[str] = None
    amount: float = Field(..., ge=0)
    date: Optional[str] = None
    provider: Optional[str] = None
    location: Optional[str] = None
    transaction_id: Optional[str] = None

class PredictionRequest(BaseModel):
    reward_transaction: TransactionData
    pos_transaction: TransactionData
    threshold: float = Field(0.95, ge=0.0, le=1.0)
    include_features: bool = False

class BatchPredictionRequest(BaseModel):
    reward_transactions: List[TransactionData]
    pos_transactions: List[TransactionData]
    threshold: float = Field(0.95, ge=0.0, le=1.0)
    job_id: Optional[str] = None

class ReconciliationJobRequest(BaseModel):
    reward_transactions: List[TransactionData]
    pos_transactions: List[TransactionData]
    threshold: float = Field(0.95, ge=0.0, le=1.0)
    job_id: Optional[str] = None

class TrainingData(BaseModel):
    reward_transaction: TransactionData
    pos_transaction: TransactionData
    is_match: bool

class ModelTrainingRequest(BaseModel):
    training_data: List[TrainingData]
    validation_split: float = Field(0.2, ge=0.0, le=0.5)

class ExportRequest(BaseModel):
    job_id: str
    format: str = Field("json", pattern="^(json|csv)$")

# Health and status endpoints
@app.get("/health")
async def health_check():
    """Get system health status."""
    return engine.get_system_health()

@app.get("/status")
async def get_status():
    """Get comprehensive system status."""
    return {
        "status": "operational",
        "timestamp": datetime.now().isoformat(),
        "version": "2.0.0",
        "model_loaded": engine.is_model_loaded(),
        "active_jobs": len(engine.active_jobs),
        "system_health": engine.get_system_health()
    }

@app.get("/model/info")
async def get_model_info():
    """Get detailed model information."""
    return engine.confidence_scorer.get_model_info()

@app.get("/model/metrics")
async def get_model_metrics():
    """Get comprehensive model metrics and performance stats."""
    return engine.get_model_metrics()

# Single prediction endpoints
@app.post("/predict")
async def predict_match(request: PredictionRequest):
    """Predict match between a single pair of transactions."""
    try:
        result = engine.predict_match(
            request.reward_transaction.dict(),
            request.pos_transaction.dict(),
            request.threshold
        )
        
        response = {
            "match_probability": result["confidence"],
            "confidence_level": result["confidence_level"],
            "recommendation": result["recommendation"],
            "processing_time_ms": result["processing_time_ms"],
            "result": result["result"]
        }
        
        if request.include_features:
            response["feature_analysis"] = result["component_scores"]
        
        return response
        
    except Exception as e:
        logger.error(f"Prediction failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict/batch")
async def batch_predict(request: BatchPredictionRequest):
    """Predict matches for multiple transaction pairs."""
    try:
    results = []
        total_time = 0
        
        for reward_txn in request.reward_transactions:
            for pos_txn in request.pos_transactions:
                start_time = time.time()
                result = engine.predict_match(
                    reward_txn.dict(),
                    pos_txn.dict(),
                    request.threshold
                )
                total_time += time.time() - start_time
                results.append(result)
        
        return {
            "results": results,
            "total_processed": len(results),
            "total_processing_time_ms": total_time * 1000,
            "avg_processing_time_ms": (total_time * 1000) / len(results) if results else 0
        }
        
    except Exception as e:
        logger.error(f"Batch prediction failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# Job management endpoints
@app.post("/reconcile/start")
async def start_reconciliation(request: ReconciliationJobRequest):
    """Start an asynchronous reconciliation job."""
    try:
        if len(request.reward_transactions) == 0 or len(request.pos_transactions) == 0:
            raise HTTPException(status_code=400, detail="Both reward and POS transactions are required")
        
        # Convert to dictionaries
        reward_txns = [txn.dict() for txn in request.reward_transactions]
        pos_txns = [txn.dict() for txn in request.pos_transactions]
        
        job_info = await engine.start_reconciliation(
            reward_txns,
            pos_txns,
            request.threshold,
            request.job_id
        )
        
        return job_info
        
    except Exception as e:
        logger.error(f"Failed to start reconciliation: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/reconcile/jobs")
async def get_active_jobs():
    """Get list of active reconciliation jobs."""
    return {
        "active_jobs": engine.get_active_jobs(),
        "total_active": len(engine.active_jobs)
    }

@app.get("/reconcile/jobs/{job_id}")
async def get_job_status(job_id: str):
    """Get status of a specific reconciliation job."""
    job_status = engine.get_job_status(job_id)
    if not job_status:
        raise HTTPException(status_code=404, detail="Job not found")
    return job_status

@app.get("/reconcile/jobs/{job_id}/results")
async def get_job_results(job_id: str):
    """Get results of a completed reconciliation job."""
    results = engine.get_job_results(job_id)
    if not results:
        raise HTTPException(status_code=404, detail="Job not found or not completed")
    return results

@app.delete("/reconcile/jobs/{job_id}")
async def cancel_job(job_id: str):
    """Cancel an active reconciliation job."""
    success = engine.cancel_job(job_id)
    if not success:
        raise HTTPException(status_code=404, detail="Job not found or cannot be cancelled")
    return {"message": "Job cancelled successfully", "job_id": job_id}

@app.get("/reconcile/history")
async def get_job_history(limit: int = 50):
    """Get recent job history."""
    return {
        "jobs": engine.get_job_history(limit),
        "total_returned": min(limit, len(engine.job_history))
    }

# File upload endpoints
@app.post("/upload/reward-transactions")
async def upload_reward_transactions(file: UploadFile = File(...)):
    """Upload reward transactions from CSV file."""
    try:
        if not file.filename.endswith('.csv'):
            raise HTTPException(status_code=400, detail="Only CSV files are supported")
        
        # Read CSV file
        content = await file.read()
        df = pd.read_csv(io.StringIO(content.decode('utf-8')))
        
        # Convert to transaction format
        transactions = []
        for _, row in df.iterrows():
            transaction = {
                'customer_name': row.get('customer_name', ''),
                'customer_phone': row.get('customer_phone', ''),
                'customer_email': row.get('customer_email', ''),
                'service': row.get('service', ''),
                'amount': float(row.get('amount', 0)),
                'date': row.get('date', ''),
                'provider': row.get('provider', ''),
                'location': row.get('location', ''),
                'transaction_id': row.get('transaction_id', '')
            }
            transactions.append(transaction)
        
        return {
            "message": "File uploaded successfully",
            "filename": file.filename,
            "transactions_count": len(transactions),
            "transactions": transactions
        }
        
    except Exception as e:
        logger.error(f"File upload failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/upload/pos-transactions")
async def upload_pos_transactions(file: UploadFile = File(...)):
    """Upload POS transactions from CSV file."""
    try:
        if not file.filename.endswith('.csv'):
            raise HTTPException(status_code=400, detail="Only CSV files are supported")
        
        # Read CSV file
        content = await file.read()
        df = pd.read_csv(io.StringIO(content.decode('utf-8')))
        
        # Convert to transaction format
        transactions = []
        for _, row in df.iterrows():
            transaction = {
                'customer_name': row.get('customer_name', ''),
                'customer_phone': row.get('customer_phone', ''),
                'customer_email': row.get('customer_email', ''),
                'service': row.get('service', ''),
                'amount': float(row.get('amount', 0)),
                'date': row.get('date', ''),
                'provider': row.get('provider', ''),
                'location': row.get('location', ''),
                'transaction_id': row.get('transaction_id', '')
            }
            transactions.append(transaction)
        
        return {
            "message": "File uploaded successfully",
            "filename": file.filename,
            "transactions_count": len(transactions),
            "transactions": transactions
        }
        
    except Exception as e:
        logger.error(f"File upload failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# Model training endpoints
@app.post("/model/train")
async def train_model(request: ModelTrainingRequest):
    """Train the ML model with new data."""
    try:
        if len(request.training_data) < 10:
            raise HTTPException(status_code=400, detail="At least 10 training samples are required")
        
        # Convert training data
        training_data = []
        for item in request.training_data:
            training_data.append({
                'reward_txn': item.reward_transaction.dict(),
                'pos_txn': item.pos_transaction.dict(),
                'is_match': item.is_match
            })
        
        result = engine.retrain_model(training_data)
        
        if result.get('success'):
            return {
                "message": "Model trained successfully",
                "accuracy": result['accuracy'],
                "training_samples": result['training_samples'],
                "model_version": result['model_version']
            }
        else:
            raise HTTPException(status_code=500, detail=result.get('error', 'Training failed'))
            
    except Exception as e:
        logger.error(f"Model training failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# Export endpoints
@app.post("/export")
async def export_results(request: ExportRequest):
    """Export reconciliation results in specified format."""
    try:
        export_data = engine.export_results(request.job_id, request.format)
        
        if not export_data:
            raise HTTPException(status_code=404, detail="Job not found or not completed")
        
        if request.format.lower() == 'json':
            return StreamingResponse(
                io.StringIO(export_data),
                media_type="application/json",
                headers={"Content-Disposition": f"attachment; filename=reconciliation_results_{request.job_id}.json"}
            )
        elif request.format.lower() == 'csv':
            return StreamingResponse(
                io.StringIO(export_data),
                media_type="text/csv",
                headers={"Content-Disposition": f"attachment; filename=reconciliation_results_{request.job_id}.csv"}
            )
        
    except Exception as e:
        logger.error(f"Export failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# Analytics endpoints
@app.get("/analytics/performance")
async def get_performance_analytics():
    """Get performance analytics and statistics."""
    try:
        health = engine.get_system_health()
        metrics = engine.get_model_metrics()
        
        return {
            "system_performance": health,
            "model_metrics": metrics,
            "job_statistics": {
                "total_jobs": engine.performance_stats['total_jobs'],
                "successful_jobs": engine.performance_stats['successful_jobs'],
                "failed_jobs": engine.performance_stats['failed_jobs'],
                "success_rate": engine.performance_stats['successful_jobs'] / max(engine.performance_stats['total_jobs'], 1),
                "avg_processing_time": engine.performance_stats['avg_processing_time'],
                "total_transactions_processed": engine.performance_stats['total_transactions_processed'],
                "total_matches_found": engine.performance_stats['total_matches_found']
            }
        }
        
    except Exception as e:
        logger.error(f"Analytics failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/analytics/jobs/{job_id}")
async def get_job_analytics(job_id: str):
    """Get detailed analytics for a specific job."""
    try:
        job_status = engine.get_job_status(job_id)
        if not job_status:
            raise HTTPException(status_code=404, detail="Job not found")
        
        results = engine.get_job_results(job_id)
        
        analytics = {
            "job_info": job_status,
            "performance_metrics": job_status.get('performance_metrics', {}),
            "progress": job_status.get('progress_percent', 0)
        }
        
        if results:
            analytics["results_summary"] = results.get('summary', {})
            analytics["match_rate"] = results['summary']['matches_found'] / max(results['summary']['total_transactions'], 1)
        
        return analytics
        
    except Exception as e:
        logger.error(f"Job analytics failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# Startup event
@app.on_event("startup")
async def startup_event():
    """Initialize the system on startup."""
    logger.info("Starting MedSpa AI Reconciliation API v2.0.0")
    logger.info(f"Model loaded: {engine.is_model_loaded()}")
    logger.info(f"System health: {engine.get_system_health()['status']}")

# Shutdown event
@app.on_event("shutdown")
async def shutdown_event():
    """Cleanup on shutdown."""
    logger.info("Shutting down MedSpa AI Reconciliation API")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "api_server:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
