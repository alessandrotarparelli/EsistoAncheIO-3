const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:5000/api'

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Errore API' }))
    throw new Error(error.error || 'Errore API')
  }

  return response.json()
}

export const api = {
  getDashboard: () => request('/dashboard'),
  getStudents: () => request('/students'),
  getStudent: (id) => request(`/students/${id}`),
  createStudent: (payload) => request('/students', { method: 'POST', body: JSON.stringify(payload) }),
  createScreening: (id, payload) => request(`/students/${id}/screenings`, { method: 'POST', body: JSON.stringify(payload) }),
  getAlerts: () => request('/alerts'),
}
