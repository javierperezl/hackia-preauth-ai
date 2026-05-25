from fastapi import APIRouter
from app.core.decision_engine import evaluate_preauth
from app.models.schemas import MedicalReport, Policy

router = APIRouter()

@router.post("/preauth")
def preauth(report: MedicalReport, policy: Policy):

    result = evaluate_preauth(report, policy)

    return result