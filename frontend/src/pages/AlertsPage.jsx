import Layout, { PageHeader, StatMini } from '../components/Layout'
import { alerts } from '../data/mockData'

export default function AlertsPage() {
  return (
    <Layout title="Segnalazioni">
      <PageHeader
        title="Centro segnalazioni"
        subtitle="Tracciamento avvisi generati dal motore IA e stato degli interventi di follow-up."
        actions={<button className="eaio-btn eaio-btn--primary">Nuova segnalazione</button>}
      />

      <section className="eaio-kpis eaio-kpis--mini">
        <StatMini label="Alert aperti" value={alerts.filter((row) => row.status === 'open').length} helper="in attesa di presa in carico" />
        <StatMini label="Alert chiusi" value={alerts.filter((row) => row.status !== 'open').length} helper="interventi completati" />
        <StatMini label="Pediatri avvisati" value={alerts.filter((row) => row.recipientRole === 'pediatrician').length} helper="con report automatico" />
      </section>

      <section className="eaio-card">
        <div className="eaio-card__header">
          <h2>Timeline alert</h2>
          <button className="eaio-link-btn">Aggiorna</button>
        </div>
        <div className="eaio-activity-list">
          {alerts.map((row) => (
            <div key={row.id} className="eaio-alert-entry">
              <div>
                <strong>{row.recipientRole === 'teacher' ? 'Insegnante' : 'Pediatra'} · {row.recipientContact}</strong>
                <span>{row.message}</span>
              </div>
              <span className={row.status === 'open' ? 'status-pill status-pill--warning' : 'status-pill status-pill--safe'}>
                {row.status === 'open' ? 'Aperto' : 'Chiuso'}
              </span>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  )
}
