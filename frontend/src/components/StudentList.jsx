export default function StudentList({ students, selectedStudentId, onSelect }) {
  return (
    <section className="panel">
      <div className="panel__header">
        <h3>Studenti monitorati</h3>
        <p>Seleziona uno studente per vedere cronologia screening e alert.</p>
      </div>
      <div className="list">
        {students.map((student) => (
          <button
            key={student.id}
            className={`list-item ${selectedStudentId === student.id ? 'list-item--active' : ''}`}
            onClick={() => onSelect(student.id)}
          >
            <strong>{student.firstName} {student.lastName}</strong>
            <span>{student.schoolLevel} · {student.classroom}</span>
          </button>
        ))}
        {students.length === 0 && <p>Nessuno studente registrato.</p>}
      </div>
    </section>
  )
}
