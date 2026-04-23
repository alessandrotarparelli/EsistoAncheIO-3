export const dashboardStats = {
  monitored: 847,
  cases: 23,
  schools: 8,
  interventions: 15,
}

export const students = [
  {
    id: 1,
    firstName: 'Luca',
    lastName: 'Martini',
    schoolLevel: 'primaria',
    classroom: '2A',
    teacherEmail: 'maestra.rossi@scuola.it',
    familyContact: 'Fam. Martini',
    subtitle: 'Classe 2A - I.C. "Pascoli"',
  },
  {
    id: 2,
    firstName: 'Sofia',
    lastName: 'Ferrari',
    schoolLevel: 'primaria',
    classroom: '1B',
    teacherEmail: 'maestra.verdi@scuola.it',
    familyContact: 'Fam. Ferrari',
    subtitle: 'Classe 1B - I.C. "Collodi"',
  },
  {
    id: 3,
    firstName: 'Giorgio',
    lastName: 'Conti',
    schoolLevel: 'infanzia',
    classroom: 'Sezione Gialla',
    teacherEmail: 'ins.blu@scuola.it',
    familyContact: 'Fam. Conti',
    subtitle: 'Sezione Gialla - I.C. "Rodari"',
  },
]

export const alerts = [
  {
    id: 1,
    recipientRole: 'teacher',
    recipientContact: 'maestra.rossi@scuola.it',
    status: 'open',
    message: 'Alto rischio rilevato per Luca Martini. Richiesto confronto con famiglia.',
  },
  {
    id: 2,
    recipientRole: 'pediatrician',
    recipientContact: 'dr.bianchi@asl.it',
    status: 'open',
    message: 'Inviare riscontro clinico e pianificare incontro multidisciplinare.',
  },
  {
    id: 3,
    recipientRole: 'teacher',
    recipientContact: 'maestra.verdi@scuola.it',
    status: 'closed',
    message: 'Caso Sofia Ferrari preso in carico con intervento condiviso.',
  },
]
