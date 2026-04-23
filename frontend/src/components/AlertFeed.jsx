export default function AlertFeed({ alerts }) {
  return (
    <section className="panel">
      <div className="panel__header">
        <h3>Alert recenti</h3>
        <p>Avvisi generati quando emerge un rischio medio o alto.</p>
      </div>
      <div className="timeline">
        {alerts.map((alert) => (
          <article className="timeline__item" key={alert.id}>
            <span className="pill">{alert.recipientRole}</span>
            <strong>{alert.recipientContact}</strong>
            <p>{alert.message}</p>
          </article>
        ))}
        {alerts.length === 0 && <p>Nessun alert presente.</p>}
      </div>
    </section>
  )
}
