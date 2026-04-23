from datetime import datetime
from .extensions import db


class Student(db.Model):
    __tablename__ = "students"

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(120), nullable=False)
    last_name = db.Column(db.String(120), nullable=False)
    school_level = db.Column(db.String(40), nullable=False)
    classroom = db.Column(db.String(20), nullable=False)
    birth_date = db.Column(db.String(20), nullable=True)
    teacher_email = db.Column(db.String(255), nullable=False)
    pediatrician_email = db.Column(db.String(255), nullable=True)
    family_contact = db.Column(db.String(255), nullable=True)
    notes = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    screenings = db.relationship("Screening", backref="student", cascade="all, delete-orphan", lazy=True)
    alerts = db.relationship("Alert", backref="student", cascade="all, delete-orphan", lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "firstName": self.first_name,
            "lastName": self.last_name,
            "schoolLevel": self.school_level,
            "classroom": self.classroom,
            "birthDate": self.birth_date,
            "teacherEmail": self.teacher_email,
            "pediatricianEmail": self.pediatrician_email,
            "familyContact": self.family_contact,
            "notes": self.notes,
            "createdAt": self.created_at.isoformat(),
        }


class Screening(db.Model):
    __tablename__ = "screenings"

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey("students.id"), nullable=False)
    observations = db.Column(db.Integer, default=0)
    grades_drop = db.Column(db.Integer, default=0)
    delays = db.Column(db.Integer, default=0)
    absences = db.Column(db.Integer, default=0)
    hyperactive = db.Column(db.Boolean, default=False)
    inattentive = db.Column(db.Boolean, default=False)
    impulsive = db.Column(db.Boolean, default=False)
    sleep_issues = db.Column(db.Boolean, default=False)
    family_stress = db.Column(db.Boolean, default=False)
    social_withdrawal = db.Column(db.Boolean, default=False)
    clinician_notes = db.Column(db.Text, nullable=True)
    risk_score = db.Column(db.Float, nullable=False)
    risk_level = db.Column(db.String(20), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "studentId": self.student_id,
            "observations": self.observations,
            "gradesDrop": self.grades_drop,
            "delays": self.delays,
            "absences": self.absences,
            "hyperactive": self.hyperactive,
            "inattentive": self.inattentive,
            "impulsive": self.impulsive,
            "sleepIssues": self.sleep_issues,
            "familyStress": self.family_stress,
            "socialWithdrawal": self.social_withdrawal,
            "clinicianNotes": self.clinician_notes,
            "riskScore": self.risk_score,
            "riskLevel": self.risk_level,
            "createdAt": self.created_at.isoformat(),
        }


class Alert(db.Model):
    __tablename__ = "alerts"

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey("students.id"), nullable=False)
    recipient_role = db.Column(db.String(40), nullable=False)
    recipient_contact = db.Column(db.String(255), nullable=False)
    message = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(20), default="open", nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "studentId": self.student_id,
            "recipientRole": self.recipient_role,
            "recipientContact": self.recipient_contact,
            "message": self.message,
            "status": self.status,
            "createdAt": self.created_at.isoformat(),
        }
