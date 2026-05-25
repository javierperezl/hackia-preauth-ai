def evaluate_preauth(report, policy):

    reasoning = []
    missing_documents = []

    # 1. Cobertura
    if report.procedure_requested in policy.covered_procedures:
        reasoning.append("Procedimiento cubierto por la póliza")
        coverage = True
    else:
        reasoning.append("Procedimiento NO cubierto")
        coverage = False

    # 2. Documentos
    for doc in policy.required_documents:
        if doc not in report.documents_present:
            missing_documents.append(doc)

    if missing_documents:
        reasoning.append("Faltan documentos requeridos")

    # 3. Hospital red
    if report.hospital in policy.network_hospitals:
        reasoning.append("Hospital en red")
        network_ok = True
    else:
        reasoning.append("Hospital fuera de red")
        network_ok = False

    # 4. Decisión final
    if not coverage:
        decision = "rejected"
    elif missing_documents:
        decision = "pending_documents"
    elif not network_ok:
        decision = "pending_documents"
    else:
        decision = "approved"

    return {
        "decision": decision,
        "reasoning": reasoning,
        "missing_documents": missing_documents,
        "confidence_score": 0.92
    }