import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AlertsPage from './pages/AlertsPage'
import DashboardPage from './pages/DashboardPage'
import QuestionnairePage from './pages/QuestionnairePage'
import SchoolPage from './pages/SchoolPage'
import StudentsPage from './pages/StudentsPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/scuola" element={<SchoolPage />} />
        <Route path="/studenti" element={<StudentsPage />} />
        <Route path="/questionario" element={<QuestionnairePage />} />
        <Route path="/segnalazioni" element={<AlertsPage />} />
      </Routes>
    </BrowserRouter>
  )
}
