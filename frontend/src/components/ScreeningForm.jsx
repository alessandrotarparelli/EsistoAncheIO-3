import { useState } from 'react'

const initialState = {
  observations: 0,
  gradesDrop: 0,
  delays: 0,
  absences: 0,
  hyperactive: false,
  inattentive: false,
  impulsive: false,
  sleepIssues: false,
  familyStress: false,
  socialWithdrawal: false,
  clinicianNotes: '',
}

export default function ScreeningForm({ students, onSubmit, loading }) {
  const [studentId, setStudentId] = useState('')
  const [form, setForm] = useState(initialState)

  function handleChange(event) {
    const { name, value, type, checked } = event.target
    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (!studentId) return
    await onSubmit(studentId, form)
    setForm(initialState)
  }

  return (
    <form className="panel form-grid" onSubmit={handleSubmit}>
      <div className="panel__header">
        <h3>Nuovo screening</h3>
        <p>Il risultato supporta l'osservazione, non sostituisce la diagnosi clinica.</p>
      </div>

      <select value={studentId} onChange={(event) => setStudentId(event.target.value)} required>
        <option value="">Seleziona studente</option>
        {students.map((student) => (
          <option key={student.id} value={student.id}>
            {student.firstName} {student.lastName} - {student.classroom}
          </option>
        ))}
      </select>

      <input type="number" min="0" max="10" name="observations" value={form.observations} onChange={handleChange} placeholder="Osservazioni critiche" />
      <input type="number" min="0" max="10" name="gradesDrop" value={form.gradesDrop} onChange={handleChange} placeholder="Peggioramento rendimento" />
      <input type="number" min="0" max="20" name="delays" value={form.delays} onChange={handleChange} placeholder="Ritardi" />
      <input type="number" min="0" max="20" name="absences" value={form.absences} onChange={handleChange} placeholder="Assenze" />

      <label className="checkbox"><input type="checkbox" name="hyperactive" checked={form.hyperactive} onChange={handleChange} /> Iperattivo</label>
      <label className="checkbox"><input type="checkbox" name="inattentive" checked={form.inattentive} onChange={handleChange} /> Disattento</label>
      <label className="checkbox"><input type="checkbox" name="impulsive" checked={form.impulsive} onChange={handleChange} /> Impulsivo</label>
      <label className="checkbox"><input type="checkbox" name="sleepIssues" checked={form.sleepIssues} onChange={handleChange} /> Disturbi del sonno</label>
      <label className="checkbox"><input type="checkbox" name="familyStress" checked={form.familyStress} onChange={handleChange} /> Stress socio-familiare</label>
      <label className="checkbox"><input type="checkbox" name="socialWithdrawal" checked={form.socialWithdrawal} onChange={handleChange} /> Ritiro sociale</label>

      <textarea name="clinicianNotes" rows="4" value={form.clinicianNotes} onChange={handleChange} placeholder="Osservazioni professionali o contestuali" />

      <button type="submit" className="button button--secondary" disabled={loading || !studentId}>
        {loading ? 'Analisi...' : 'Calcola rischio'}
      </button>
    </form>
  )
}
