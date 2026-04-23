from flask import Blueprint, jsonify, request

from ..extensions import db
from ..models import Alert, Screening, Student
from ..scoring import build_alert_message, calculate_risk

api_bp = Blueprint("api", __name__)


@api_bp.get("/health")
def health_check():
    return jsonify({"status": "ok", "service": "EsistoAncheIO API"})


@api_bp.get("/dashboard")
def dashboard():
    students = Student.query.count()
    screenings = Screening.query.count()
    alerts = Alert.query.count()
    high_risk = Screening.query.filter_by(risk_level="high").count()

    recent_alerts = [alert.to_dict() for alert in Alert.query.order_by(Alert.created_at.desc()).limit(5).all()]

    return jsonify(
        {
            "stats": {
                "students": students,
                "screenings": screenings,
                "alerts": alerts,
                "highRisk": high_risk,
            },
            "recentAlerts": recent_alerts,
        }
    )


@api_bp.get("/students")
def list_students():
    students = Student.query.order_by(Student.created_at.desc()).all()
    return jsonify([student.to_dict() for student in students])


@api_bp.post("/students")
def create_student():
    data = request.get_json() or {}
    required = ["firstName", "lastName", "schoolLevel", "classroom", "teacherEmail"]
    missing = [field for field in required if not data.get(field)]
    if missing:
        return jsonify({"error": f"Campi mancanti: {', '.join(missing)}"}), 400

    student = Student(
        first_name=data["firstName"],
        last_name=data["lastName"],
        school_level=data["schoolLevel"],
        classroom=data["classroom"],
        birth_date=data.get("birthDate"),
        teacher_email=data["teacherEmail"],
        pediatrician_email=data.get("pediatricianEmail"),
        family_contact=data.get("familyContact"),
        notes=data.get("notes"),
    )
    db.session.add(student)
    db.session.commit()
    return jsonify(student.to_dict()), 201


@api_bp.get("/students/<int:student_id>")
def get_student(student_id):
    student = Student.query.get_or_404(student_id)
    screenings = [screening.to_dict() for screening in Screening.query.filter_by(student_id=student_id).order_by(Screening.created_at.desc()).all()]
    alerts = [alert.to_dict() for alert in Alert.query.filter_by(student_id=student_id).order_by(Alert.created_at.desc()).all()]
    return jsonify({"student": student.to_dict(), "screenings": screenings, "alerts": alerts})


@api_bp.post("/students/<int:student_id>/screenings")
def create_screening(student_id):
    student = Student.query.get_or_404(student_id)
    data = request.get_json() or {}

    score, risk_level = calculate_risk(data)

    screening = Screening(
        student_id=student.id,
        observations=data.get("observations", 0),
        grades_drop=data.get("gradesDrop", 0),
        delays=data.get("delays", 0),
        absences=data.get("absences", 0),
        hyperactive=bool(data.get("hyperactive", False)),
        inattentive=bool(data.get("inattentive", False)),
        impulsive=bool(data.get("impulsive", False)),
        sleep_issues=bool(data.get("sleepIssues", False)),
        family_stress=bool(data.get("familyStress", False)),
        social_withdrawal=bool(data.get("socialWithdrawal", False)),
        clinician_notes=data.get("clinicianNotes"),
        risk_score=score,
        risk_level=risk_level,
    )
    db.session.add(screening)

    generated_alerts = []
    if risk_level in {"medium", "high"}:
        student_name = f"{student.first_name} {student.last_name}"
        message = build_alert_message(student_name, score, risk_level)

        teacher_alert = Alert(
            student_id=student.id,
            recipient_role="teacher",
            recipient_contact=student.teacher_email,
            message=message,
        )
        db.session.add(teacher_alert)
        generated_alerts.append(teacher_alert)

        if student.pediatrician_email:
            pediatric_alert = Alert(
                student_id=student.id,
                recipient_role="pediatrician",
                recipient_contact=student.pediatrician_email,
                message=message,
            )
            db.session.add(pediatric_alert)
            generated_alerts.append(pediatric_alert)

    db.session.commit()

    return jsonify(
        {
            "screening": screening.to_dict(),
            "alerts": [alert.to_dict() for alert in generated_alerts],
            "disclaimer": "Risultato di supporto decisionale: non costituisce diagnosi clinica.",
        }
    ), 201


@api_bp.get("/alerts")
def list_alerts():
    alerts = Alert.query.order_by(Alert.created_at.desc()).all()
    return jsonify([alert.to_dict() for alert in alerts])
