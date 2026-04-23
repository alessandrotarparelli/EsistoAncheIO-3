import Layout, { PageHeader, StatMini } from '../components/Layout'
import { students } from '../data/mockData'

export default function StudentsPage() {
  return (
    <Layout title="Studenti">
      <PageHeader
        title="Anagrafica studenti"
        subtitle="Vista operativa degli alunni monitorati con dettagli scolastici e contatti di presa in carico."
        actions={<button className="eaio-btn eaio-btn--primary">Nuovo studente</button>}
      />

      <section className="eaio-kpis eaio-kpis--mini">
        <StatMini label="Monitorati" value={students.length} helper="schede attive" />
        <StatMini label="Primaria" value={students.filter((row) => row.schoolLevel === 'primaria').length} helper="classi 1-5" />
        <StatMini label="Infanzia" value={students.filter((row) => row.schoolLevel === 'infanzia').length} helper="sezioni abilitate" />
      </section>

      <section className="eaio-card eaio-card--table">
        <div className="eaio-card__header">
          <h2>Elenco studenti</h2>
          <button className="eaio-link-btn">Filtri avanzati</button>
        </div>
        <div className="eaio-table-wrap">
          <table className="eaio-table">
            <thead>
              <tr>
                <th>Studente</th>
                <th>Ordine</th>
                <th>Classe</th>
                <th>Insegnante</th>
                <th>Famiglia</th>
              </tr>
            </thead>
            <tbody>
              {students.map((row) => (
                <tr key={row.id}>
                  <td>{row.firstName} {row.lastName}</td>
                  <td>{row.schoolLevel}</td>
                  <td>{row.classroom}</td>
                  <td>{row.teacherEmail}</td>
                  <td>{row.familyContact || 'Non indicato'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </Layout>
  )
}
