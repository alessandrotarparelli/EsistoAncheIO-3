import { NavLink } from 'react-router-dom'

const sidebarItems = [
  { label: 'Dashboard', icon: 'grid', to: '/' },
  { label: 'Scuola', icon: 'school', to: '/scuola' },
  { label: 'Studenti', icon: 'users', to: '/studenti' },
  { label: 'Questionario', icon: 'clipboard', to: '/questionario' },
  { label: 'Segnalazioni', icon: 'alert', to: '/segnalazioni' },
]

export function Icon({ name }) {
  const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '1.9', strokeLinecap: 'round', strokeLinejoin: 'round' }

  if (name === 'grid') return <svg {...common}><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>
  if (name === 'school') return <svg {...common}><path d="M3 10.5 12 5l9 5.5" /><path d="M6 12.5V19h12v-6.5" /><path d="M10 19v-4h4v4" /></svg>
  if (name === 'users') return <svg {...common}><path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" /><circle cx="9.5" cy="7" r="3.5" /><path d="M21 21v-2a4 4 0 0 0-3-3.87" /><path d="M15 3.2a3.5 3.5 0 0 1 0 6.6" /></svg>
  if (name === 'clipboard') return <svg {...common}><rect x="6" y="4" width="12" height="17" rx="2" /><path d="M9 4.5h6" /><path d="M9 9h6" /><path d="M9 13h6" /></svg>
  if (name === 'alert') return <svg {...common}><path d="M12 9v4" /><path d="M12 17h.01" /><path d="m10.29 3.86-7.5 13A2 2 0 0 0 4.5 20h15a2 2 0 0 0 1.71-3.14l-7.5-13a2 2 0 0 0-3.42 0Z" /></svg>
  if (name === 'bell') return <svg {...common}><path d="M15 17H5.8A1.8 1.8 0 0 1 4 15.2c0-.4.13-.79.37-1.12L6 12V9a6 6 0 1 1 12 0v3l1.63 2.08A1.8 1.8 0 0 1 18.2 17H17" /><path d="M10 20a2 2 0 0 0 4 0" /></svg>
  if (name === 'moon') return <svg {...common}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" /></svg>
  if (name === 'chevron') return <svg {...common}><path d="m9 6 6 6-6 6" /></svg>
  return null
}

export function PageHeader({ title, subtitle, actions }) {
  return (
    <section className="eaio-header-block">
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      {actions ? <div className="eaio-page-actions">{actions}</div> : null}
    </section>
  )
}

export function StatMini({ label, value, helper }) {
  return (
    <article className="eaio-kpi-card eaio-kpi-card--mini">
      <span className="eaio-kpi-card__label">{label}</span>
      <strong>{value}</strong>
      <small>{helper}</small>
    </article>
  )
}

export default function Layout({ children, title = 'Dashboard' }) {
  return (
    <div className="eaio-layout">
      <aside className="eaio-sidebar">
        <div className="eaio-sidebar__brand">
          <div className="eaio-logo">E</div>
          <span>EsistoAncheIO</span>
        </div>

        <nav className="eaio-nav">
          {sidebarItems.map((item) => (
            <NavLink key={item.label} to={item.to} className={({ isActive }) => `eaio-nav__item ${isActive ? 'eaio-nav__item--active' : ''}`}>
              <span className="eaio-nav__icon"><Icon name={item.icon} /></span>
              <span>{item.label}</span>
              <span className="eaio-nav__chevron"><Icon name="chevron" /></span>
            </NavLink>
          ))}
        </nav>

        <div className="eaio-sidebar__bottom">Comprimi</div>
      </aside>

      <section className="eaio-main">
        <header className="eaio-topbar">
          <div className="eaio-breadcrumbs">Home <span>&gt;</span> <strong>{title}</strong></div>
          <div className="eaio-topbar__actions">
            <button className="eaio-icon-btn"><Icon name="bell" /></button>
            <button className="eaio-icon-btn"><Icon name="moon" /></button>
            <div className="eaio-user">
              <span className="eaio-user__avatar">AS</span>
              <span>Amministrato...</span>
              <span className="eaio-user__caret"><Icon name="chevron" /></span>
            </div>
          </div>
        </header>

        <main className="eaio-content">{children}</main>

        <footer className="eaio-footer">
          <span>© 2026 EsistoAncheIO. Tutti i diritti riservati.</span>
          <div className="eaio-footer__links">
            <span>Privacy Policy</span>
            <span>Cookie Policy</span>
            <span>Termini e Condizioni</span>
          </div>
          <span>Creato con amore dal Team di EsistoAncheIO</span>
        </footer>
      </section>
    </div>
  )
}
