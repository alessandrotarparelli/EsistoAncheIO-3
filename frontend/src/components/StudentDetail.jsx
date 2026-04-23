export default function StudentDetail({ data }) {
  if (!data) {
    return (
      <section className="panel">
        <div className="panel__header">
          <h3>Dettaglio studente</h3>
          <p>Seleziona uno studente per vedere la situazione completa.</p>
        </div>
      </section>
    )
  }

  const { student, screenings, alerts } = data

  return (
    <section className="panel detail-grid">
      <div>
        <div className="panel__header">
          <h3>{student.firstName} {student.lastName}</h3>
          <p>{student.schoolLevel} · {student.classroom}</p>
        </div>
        <p><strong>Insegnante:</strong> {student.teacherEmail}</p>
        <p><strong>Pediatra:</strong> {student.pediatricianEmail || 'Non indicato'}</p>
        <p><strong>Famiglia:</strong> {student.familyContact || 'Non indicato'}</p>
        <p><strong>Note:</strong> {student.notes || 'Nessuna nota'}</p>
      </div>

      <div>
        <h4>Screening</h4>
        <div className="timeline">
          {screenings.map((screening) => (
            <article className="timeline__item" key={screening.id}>
              <strong>Rischio {screening.riskLevel}</strong>
              <span>Punteggio: {screening.riskScore}/100</span>
              <p>Osservazioni: {screening.observations} · Assenze: {screening.absences} · Ritardi: {screening.delays}</p>
            </article>
          ))}
          {screenings.length === 0 && <p>Nessuno screening registrato.</p>}
        </div>
      </div>

      <div>
        <h4>Alert collegati</h4>
        <div className="timeline">
          {alerts.map((alert) => (
            <article className="timeline__item" key={alert.id}>
              <strong>{alert.recipientRole}</strong>
              <span>{alert.recipientContact}</span>
              <p>{alert.message}</p>
            </article>
          ))}
          {alerts.length === 0 && <p>Nessun alert associato.</p>}
        </div>
      </div>
    </section>
  )
}
