def normalize_count(value, limit):
    return min(max(value, 0), limit) / float(limit)


def calculate_risk(payload):
    score = 0.0

    score += normalize_count(payload.get("observations", 0), 10) * 18
    score += normalize_count(payload.get("gradesDrop", 0), 10) * 14
    score += normalize_count(payload.get("delays", 0), 20) * 10
    score += normalize_count(payload.get("absences", 0), 20) * 10
    score += 14 if payload.get("hyperactive") else 0
    score += 14 if payload.get("inattentive") else 0
    score += 8 if payload.get("impulsive") else 0
    score += 4 if payload.get("sleepIssues") else 0
    score += 4 if payload.get("familyStress") else 0
    score += 4 if payload.get("socialWithdrawal") else 0

    score = round(min(score, 100), 2)

    if score >= 70:
        risk_level = "high"
    elif score >= 45:
        risk_level = "medium"
    else:
        risk_level = "low"

    return score, risk_level


def build_alert_message(student_name, risk_score, risk_level):
    return (
        f"Attenzione: {student_name} presenta un indice di rischio {risk_level} "
        f"({risk_score}/100). Si consiglia un confronto coordinato tra scuola, "
        "famiglia, pediatra e specialisti. Il sistema non sostituisce una diagnosi clinica."
    )
