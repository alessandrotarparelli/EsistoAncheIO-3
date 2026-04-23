import { useState } from 'react'

const initialState = {
  firstName: '',
  lastName: '',
  schoolLevel: 'primaria',
  classroom: '',
  birthDate: '',
  teacherEmail: '',
  pediatricianEmail: '',
  familyContact: '',
  notes: '',
}

export default function StudentForm({ onSubmit, loading }) {
  const [form, setForm] = useState(initialState)

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    await onSubmit(form)
    setForm(initialState)
  }

  return (
    <form className="panel form-grid" onSubmit={handleSubmit}>
      <div className="panel__header">
        <h3>Nuovo alunno/a</h3>
        <p>Inserisci i dati essenziali per attivare il monitoraggio condiviso.</p>
      </div>

      <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="Nome" required />
      <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Cognome" required />
      <select name="schoolLevel" value={form.schoolLevel} onChange={handleChange}>
        <option value="infanzia">Infanzia</option>
        <option value="primaria">Primaria</option>
      </select>
      <input name="classroom" value={form.classroom} onChange={handleChange} placeholder="Classe / Sezione" required />
      <input name="birthDate" type="date" value={form.birthDate} onChange={handleChange} />
      <input name="teacherEmail" type="email" value={form.teacherEmail} onChange={handleChange} placeholder="Email insegnante" required />
      <input name="pediatricianEmail" type="email" value={form.pediatricianEmail} onChange={handleChange} placeholder="Email pediatra" />
      <input name="familyContact" value={form.familyContact} onChange={handleChange} placeholder="Contatto famiglia" />
      <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Note iniziali" rows="4" />
      <button type="submit" className="button button--primary" disabled={loading}>
        {loading ? 'Salvataggio...' : 'Crea profilo'}
      </button>
    </form>
  )
}
