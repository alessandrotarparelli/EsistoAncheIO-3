import { useMemo } from 'react'
import Layout, { Icon, PageHeader } from '../components/Layout'
import { alerts, dashboardStats, students } from '../data/mockData'

const schoolRows = [
  { institute: 'I.C. "Pascoli"', type: 'Primaria + Infanzia', students: 234, cases: 5, status: 'Critico' },
  { institute: 'I.C. "Collodi"', type: 'Primaria', students: 198, cases: 4, status: 'Attenzione' },
  { institute: 'I.C. "Rodari"', type: 'Infanzia + Primaria', students: 215, cases: 3, status: 'Attenzione' },
  { institute: 'I.C. "Don Milani"', type: 'Primaria', students: 180, cases: 2, status: 'Monitorato' },
]

const trendMonths = ['Nov', 'Dic', 'Gen', 'Feb', 'Mar', 'Apr']
const trendValues = [14, 16, 18, 17, 20, 23]
const criteriaRows = [
  { label: 'Disattenzione', value: 78, className: 'chart-bar--red' },
  { label: 'Iperattivita', value: 65, className: 'chart-bar--orange' },
  { label: 'Impulsivita', value: 52, className: 'chart-bar--violet' },
  { label: 'Ritardi', value: 41, className: 'chart-bar--blue' },
  { label: 'Assenze', value: 33, className: 'chart-bar--cyan' },
  { label: 'Fam. rischio', value: 28, className: 'chart-bar--green' },
]

function MiniLineChart() {
  const max = Math.max(...trendValues)
  const min = Math.min(...trendValues)
  const points = trendValues.map((value, index) => {
    const x = 24 + (index * (520 / (trendValues.length - 1)))
    const y = 150 - ((value - min) / Math.max(max - min, 1)) * 82
    return `${x},${y}`
  }).join(' ')

  return (
    <div className="line-chart">
      <svg viewBox="0 0 580 180" className="line-chart__svg" preserveAspectRatio="none">
        {[0, 1, 2, 3].map((row) => (
          <line key={row} x1="24" y1={26 + row * 31} x2="556" y2={26 + row * 31} className="line-chart__grid" />
        ))}
        <polyline points={points} className="line-chart__path" />
        {trendValues.map((value, index) => {
          const x = 24 + (index * (520 / (trendValues.length - 1)))
          const y = 150 - ((value - min) / Math.max(max - min, 1)) * 82
          return <circle key={index} cx={x} cy={y} r="4.5" className="line-chart__dot" />
        })}
      </svg>
      <div className="line-chart__labels">
        {trendMonths.map((month) => <span key={month}>{month}</span>)}
      </div>
    </div>
  )
}

function statusClass(status) {
  if (status === 'Critico') return 'status-pill status-pill--critical'
  if (status === 'Attenzione') return 'status-pill status-pill--warning'
  return 'status-pill status-pill--safe'
}

function initials(firstName, lastName) {
  return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase()
}

export default function DashboardPage() {
  const featuredStudents = useMemo(() => students.slice(0, 2), [])

  const activityFeed = useMemo(() => ([
    {
      color: 'red',
      title: `IA ha rilevato alto rischio per ${featuredStudents[0].firstName} ${featuredStudents[0].lastName}`,
      time: 'oggi, 14:18',
    },
    {
      color: 'orange',
      title: `Ins. Rossi: osservazione per ${featuredStudents[1].firstName} ${featuredStudents[1].lastName}`,
      time: 'oggi, 11:42',
    },
    {
      color: 'blue',
      title: `Avviso inviato al Dr. ${alerts[1].recipientContact}`,
      time: 'ieri, 16:05',
    },
    {
      color: 'green',
      title: 'Intervento completato - Giorgio Conti',
      time: 'ieri, 09:30',
    },
    {
      color: 'gray',
      title: 'Nuova scuola: I.C. "Don Milani" (180 studenti)',
      time: '2 gg fa',
    },
  ]), [featuredStudents])

  return (
    <Layout title="Dashboard">
      <PageHeader title="Panoramica sistema" subtitle="Anno scolastico 2024/25 - Aggiornato oggi, 14:32" />

      <section className="eaio-alert-strip">
        <div className="eaio-alert-strip__left">
          <span className="eaio-alert-strip__icon"><Icon name="alert" /></span>
          <strong>{alerts.filter((item) => item.status === 'open').length} nuovi casi ad alto rischio ADHD rilevati questa settimana dall'IA.</strong>
        </div>
        <div className="eaio-alert-strip__actions">
          <button className="eaio-btn eaio-btn--primary">Vedi avvisi</button>
          <button className="eaio-btn eaio-btn--ghost">Analisi IA</button>
        </div>
      </section>

      <section className="eaio-kpis">
        <article className="eaio-kpi-card">
          <div className="eaio-kpi-card__icon eaio-kpi-card__icon--blue"><Icon name="users" /></div>
          <span className="eaio-kpi-card__label">Studenti monitorati</span>
          <strong>{dashboardStats.monitored}</strong>
          <small>+34 questo mese</small>
        </article>
        <article className="eaio-kpi-card">
          <div className="eaio-kpi-card__icon eaio-kpi-card__icon--red"><Icon name="alert" /></div>
          <span className="eaio-kpi-card__label">Casi ADHD rilevati</span>
          <strong>{dashboardStats.cases}</strong>
          <small>+2 questa settimana</small>
        </article>
        <article className="eaio-kpi-card">
          <div className="eaio-kpi-card__icon eaio-kpi-card__icon--violet"><Icon name="school" /></div>
          <span className="eaio-kpi-card__label">Scuole con casi</span>
          <strong>{dashboardStats.schools}</strong>
          <small>su 14 istituti totali</small>
        </article>
        <article className="eaio-kpi-card">
          <div className="eaio-kpi-card__icon eaio-kpi-card__icon--green"><Icon name="clipboard" /></div>
          <span className="eaio-kpi-card__label">Interventi completati</span>
          <strong>{dashboardStats.interventions}</strong>
          <small>65% di successo</small>
        </article>
      </section>

      <section className="eaio-grid eaio-grid--top">
        <article className="eaio-card">
          <div className="eaio-card__header">
            <h2>Studenti ad alto rischio</h2>
            <button className="eaio-link-btn">Vedi tutti</button>
          </div>
          <div className="eaio-risk-list">
            {featuredStudents.map((student) => (
              <div key={student.id} className="eaio-risk-item">
                <div className="eaio-risk-item__identity">
                  <div className="eaio-avatar">{initials(student.firstName, student.lastName)}</div>
                  <div>
                    <strong>{student.firstName} {student.lastName}</strong>
                    <span>{student.subtitle}</span>
                  </div>
                </div>
                <span className="eaio-pill eaio-pill--danger">Alto rischio</span>
              </div>
            ))}
          </div>
        </article>

        <article className="eaio-card">
          <div className="eaio-card__header">
            <h2>Trend casi ADHD</h2>
            <span className="eaio-muted">ultimi 6 mesi</span>
          </div>
          <MiniLineChart />
        </article>
      </section>

      <section className="eaio-grid eaio-grid--middle">
        <article className="eaio-card">
          <div className="eaio-card__header">
            <h2>Criteri piu rilevati</h2>
            <span className="eaio-muted">ultimi 30 giorni</span>
          </div>
          <div className="eaio-bar-chart">
            {criteriaRows.map((item) => (
              <div key={item.label} className="eaio-bar-chart__row">
                <span className="eaio-bar-chart__label">{item.label}</span>
                <div className="eaio-bar-chart__track">
                  <div className={`eaio-bar-chart__fill ${item.className}`} style={{ width: `${item.value}%` }} />
                </div>
                <span className="eaio-bar-chart__value">{item.value}%</span>
              </div>
            ))}
          </div>
        </article>

        <article className="eaio-card">
          <div className="eaio-card__header">
            <h2>Attivita recente</h2>
          </div>
          <div className="eaio-activity-list">
            {activityFeed.map((item, index) => (
              <div key={`${item.title}-${index}`} className="eaio-activity-item">
                <span className={`eaio-activity-item__dot eaio-activity-item__dot--${item.color}`} />
                <div>
                  <strong>{item.title}</strong>
                  <span>{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="eaio-card eaio-card--table">
        <div className="eaio-card__header">
          <h2>Scuole con casi rilevati</h2>
          <button className="eaio-link-btn">Vedi tutte</button>
        </div>
        <div className="eaio-table-wrap">
          <table className="eaio-table">
            <thead>
              <tr>
                <th>Istituto</th>
                <th>Tipo</th>
                <th>Studenti</th>
                <th>Casi ADHD</th>
                <th>Stato</th>
              </tr>
            </thead>
            <tbody>
              {schoolRows.map((row) => (
                <tr key={row.institute}>
                  <td>{row.institute}</td>
                  <td>{row.type}</td>
                  <td>{row.students}</td>
                  <td className="eaio-table__cases">{row.cases}</td>
                  <td><span className={statusClass(row.status)}>{row.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </Layout>
  )
}
