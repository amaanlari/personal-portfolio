import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import ContactDialog from './ContactDialog'
import ThemeToggle from './ThemeToggle'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  return (
    <div>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">
          <NavLink to="/" className="nav-logo">
            <span className="logo-initials">MAL</span>
            <span className="logo-dot" />
          </NavLink>

          <div className={`nav-links${menuOpen ? ' open' : ''}`}>
            <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
            <NavLink to="/resume" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Resume</NavLink>
            <NavLink to="/blog" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Blog</NavLink>
            <button onClick={() => setContactOpen(true)} className="nav-cta">Get in touch</button>
          </div>

          <div className="nav-right">
            <ThemeToggle />
            <button className="nav-burger" onClick={() => setMenuOpen(o => !o)} aria-label="menu">
              <span className={menuOpen ? 'line open' : 'line'} />
              <span className={menuOpen ? 'line open' : 'line'} />
            </button>
          </div>
        </div>
      </nav>
      <ContactDialog isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  )
}
