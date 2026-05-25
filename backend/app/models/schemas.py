from pydantic import BaseModel
from typing import List, Optional

class MedicalReport(BaseModel):
    patient_id: str
    diagnosis: str
    procedure_requested: str
    hospital: str
    documents_present: List[str]

class Policy(BaseModel):
    plan_name: str
    months_active: int
    covered_procedures: List[str]
    required_documents: List[str]
    network_hospitals: List[str]

class PreAuthResponse(BaseModel):
    decision: str
    confidence_score: float
    reasoning: List[str]
    missing_documents: List[str]