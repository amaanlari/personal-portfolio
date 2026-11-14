import { NavLink } from 'react-router-dom'
import { NAV_LINKS } from '../lib/nav'
import './Sidebar.css'

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav" aria-label="Primary">
        {NAV_LINKS.map((item) => {
          const Icon = item.icon
          return (
            <NavLink key={item.to} to={item.to} end={item.to === '/'} className="side-link">
              <Icon size={18} strokeWidth={2} aria-hidden="true" />
              <span>{item.label}</span>
            </NavLink>
          )
        })}
      </nav>
      <p className="sidebar-copy">© {new Date().getFullYear()} Mohammad Amaan Lari</p>
    </aside>
  )
}
