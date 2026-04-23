import Layout, { PageHeader, StatMini } from '../components/Layout'

const schools = [
  { name: 'I.C. "Pascoli"', city: 'Milano', manager: 'Dir. Elena Rossi', students: 234, alerts: 5, level: 'Critico' },
  { name: 'I.C. "Collodi"', city: 'Brescia', manager: 'Dir. Paolo Bianchi', students: 198, alerts: 4, level: 'Attenzione' },
  { name: 'I.C. "Rodari"', city: 'Monza', manager: 'Dir. Giulia Serra', students: 215, alerts: 3, level: 'Attenzione' },
]

function statusClass(status) {
  if (status === 'Critico') return 'status-pill status-pill--critical'
  if (status === 'Attenzione') return 'status-pill status-pill--warning'
  return 'status-pill status-pill--safe'
}

export default function SchoolPage() {
  return (
    <Layout title="Scuola">
      <PageHeader
        title="Rete scuole"
        subtitle="Monitoraggio centralizzato degli istituti aderenti e stato dei casi per plesso."
        actions={<button className="eaio-btn eaio-btn--primary">Aggiungi scuola</button>}
      />

      <section className="eaio-kpis eaio-kpis--mini">
        <StatMini label="Istituti attivi" value="14" helper="8 con casi aperti" />
        <StatMini label="Plessi collegati" value="27" helper="+3 nel trimestre" />
        <StatMini label="Referenti formati" value="42" helper="copertura 96%" />
      </section>

      <section className="eaio-grid eaio-grid--middle">
        <article className="eaio-card">
          <div className="eaio-card__header">
            <h2>Scuole prioritarie</h2>
            <button className="eaio-link-btn">Esporta elenco</button>
          </div>
          <div className="eaio-school-stack">
            {schools.map((school) => (
              <div key={school.name} className="eaio-school-item">
                <div>
                  <strong>{school.name}</strong>
                  <span>{school.city} · {school.manager}</span>
                </div>
                <div className="eaio-school-item__meta">
                  <span>{school.students} studenti</span>
                  <span>{school.alerts} casi ADHD</span>
                  <span className={statusClass(school.level)}>{school.level}</span>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="eaio-card">
          <div className="eaio-card__header">
            <h2>Piano coordinamento</h2>
          </div>
          <div className="eaio-checklist">
            <div className="eaio-checklist__item"><strong>Audit dati mensile</strong><span>Verifica assenze, ritardi e questionari inviati dagli istituti.</span></div>
            <div className="eaio-checklist__item"><strong>Contatto famiglie</strong><span>Attivo nei casi con alert alto o multi-segnalazione.</span></div>
            <div className="eaio-checklist__item"><strong>Allineamento pediatri</strong><span>Invio dei report sintetici e pianificazione confronto specialisti.</span></div>
          </div>
        </article>
      </section>
    </Layout>
  )
}
