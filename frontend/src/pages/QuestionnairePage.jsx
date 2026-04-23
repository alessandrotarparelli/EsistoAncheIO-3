import Layout, { PageHeader, StatMini } from '../components/Layout'

const questions = [
  'Il bambino fatica a mantenere l’attenzione durante l’attivita?',
  'Sono frequenti interruzioni impulsive o agitazione motoria?',
  'Si osservano ritardi, assenze o calo del rendimento nelle ultime settimane?',
  'Il contesto familiare richiede un accompagnamento dedicato?',
]

export default function QuestionnairePage() {
  return (
    <Layout title="Questionario">
      <PageHeader
        title="Questionario multidimensionale"
        subtitle="Compilazione guidata per insegnanti e pediatri con criteri educativi, comportamentali e socio-familiari."
        actions={<button className="eaio-btn eaio-btn--primary">Nuova compilazione</button>}
      />

      <section className="eaio-kpis eaio-kpis--mini">
        <StatMini label="Template attivi" value="6" helper="per infanzia e primaria" />
        <StatMini label="Compilazioni oggi" value="18" helper="+5 rispetto a ieri" />
        <StatMini label="Conferme mediche" value="7" helper="in revisione pediatra" />
      </section>

      <section className="eaio-grid eaio-grid--middle">
        <article className="eaio-card">
          <div className="eaio-card__header">
            <h2>Domande chiave</h2>
          </div>
          <div className="eaio-checklist">
            {questions.map((question, index) => (
              <div key={question} className="eaio-checklist__item">
                <strong>Q{index + 1}</strong>
                <span>{question}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="eaio-card">
          <div className="eaio-card__header">
            <h2>Workflow</h2>
          </div>
          <div className="eaio-workflow">
            <div className="eaio-workflow__step"><strong>1. Raccolta dati</strong><span>Osservazioni docente e indicatori frequenza.</span></div>
            <div className="eaio-workflow__step"><strong>2. Validazione clinica</strong><span>Revisione pediatra con note contestuali.</span></div>
            <div className="eaio-workflow__step"><strong>3. Avviso coordinato</strong><span>Coinvolgimento famiglia e specialisti.</span></div>
          </div>
        </article>
      </section>
    </Layout>
  )
}
