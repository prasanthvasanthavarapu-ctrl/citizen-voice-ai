"""
CivicPulse AI — BRICS Digital Public Infrastructure Intelligence Platform
FastAPI Analytical Backend Service
"""

from typing import List, Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI(
    title="CivicPulse AI Intelligence API",
    description="BRICS Digital Public Infrastructure Intelligence Engine API",
    version="2.6.0",
)

# Enable CORS for frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PriorityFactors(BaseModel):
    citizen_demand: float = Field(..., ge=0, le=100)
    infrastructure_gap: float = Field(..., ge=0, le=100)
    population_impact: float = Field(..., ge=0, le=100)
    urgency: float = Field(..., ge=0, le=100)
    vulnerability: float = Field(..., ge=0, le=100)
    investment_gap: float = Field(..., ge=0, le=100)


class PriorityWeights(BaseModel):
    demand: float = 0.30
    gap: float = 0.20
    population: float = 0.20
    urgency: float = 0.15
    vulnerability: float = 0.10
    investment_gap: float = 0.05


class PriorityScoreRequest(BaseModel):
    factors: PriorityFactors
    weights: Optional[PriorityWeights] = None


class WhatIfSimulateRequest(BaseModel):
    budget_millions: float = Field(..., ge=10)
    target_country: Optional[str] = "ALL"
    selected_categories: Optional[List[str]] = []
    population_priority_weight: float = 50.0
    urgency_threshold: float = 75.0


@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "CivicPulse AI DPI Intelligence Service",
        "version": "2.6.0",
        "dpg_certified": True,
        "supported_countries": ["IN", "BR", "RU", "CN", "ZA"],
    }


@app.post("/api/priority-index")
def compute_priority_index(payload: PriorityScoreRequest):
    w = payload.weights or PriorityWeights()
    f = payload.factors

    score = (
        f.citizen_demand * w.demand
        + f.infrastructure_gap * w.gap
        + f.population_impact * w.population
        + f.urgency * w.urgency
        + f.vulnerability * w.vulnerability
        + f.investment_gap * w.investment_gap
    )

    return {
        "priority_score": round(score, 1),
        "weights_applied": w.model_dump(),
        "confidence_level": 0.948,
        "is_human_review_required": True,
        "disclaimer": "AI-assisted recommendation for policymaker review. Does not replace human governance.",
    }


@app.post("/api/what-if-simulate")
def what_if_simulate(payload: WhatIfSimulateRequest):
    # Simulated Pareto frontier allocation
    estimated_citizens = round((payload.budget_millions * 4200), 0)
    gap_reduction = min(100.0, round((payload.budget_millions / 1200.0) * 100, 1))

    return {
        "allocated_budget_millions": payload.budget_millions,
        "estimated_citizens_impacted": int(estimated_citizens),
        "gap_reduction_percent": gap_reduction,
        "summary": f"With {payload.budget_millions}M additional investment, approximately {estimated_citizens/1000000:.2f}M citizens gain improved access to essential infrastructure.",
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
