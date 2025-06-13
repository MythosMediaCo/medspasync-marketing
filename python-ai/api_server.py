from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict
from datetime import datetime

from reconciliation_engine import ReconciliationEngine

app = FastAPI(title="MedSpa AI Reconciliation API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

engine = ReconciliationEngine()

class TransactionData(BaseModel):
    customer_name: Optional[str] = None
    customer_phone: Optional[str] = None
    customer_email: Optional[str] = None
    service: Optional[str] = None
    amount: float = 0.0
    date: Optional[str] = None
    provider: Optional[str] = None
    location: Optional[str] = None

class PredictionRequest(BaseModel):
    reward_transaction: TransactionData
    pos_transaction: TransactionData
    threshold: float = 0.95
    include_features: bool = False

class BatchPredictionRequest(BaseModel):
    transaction_pairs: List[Dict]
    threshold: float = 0.95

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "model_loaded": engine.is_model_loaded(),
        "version": "1.0.0"
    }

@app.post("/predict")
async def predict_match(request: PredictionRequest):
    try:
        result = engine.predict_match(request.reward_transaction.dict(), request.pos_transaction.dict(), request.threshold)
        return {
            "match_probability": result["overall_confidence"],
            "confidence_level": result["confidence_level"],
            "recommendation": result["recommendation"],
            "feature_analysis": result.get("component_scores", {}),
            "processing_time_ms": 0
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/batch-predict")
async def batch_predict(request: BatchPredictionRequest):
    results = []
    for pair in request.transaction_pairs:
        res = engine.predict_match(pair['reward_transaction'], pair['pos_transaction'], request.threshold)
        results.append(res)
    return {"results": results, "total_processed": len(results)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("api_server:app", host="0.0.0.0", port=8000, reload=True)
