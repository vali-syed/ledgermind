import Cookies from 'js-cookie'
import { LogOut, Menu } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

function AppNavbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/')
  }

  const navigationLinks = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Upload', path: '/upload' },
    { label: 'Chat', path: '/chat' },
  ]

  return (
    <nav className="w-full border-b border-white/10 bg-slate-950 text-white">
      <div className="relative mx-auto flex min-h-16 max-w-6xl items-center gap-6 px-4 md:px-6">
        <Link to="/" className="text-xl font-bold text-white">LedgerMind</Link>

        <ul className={`${menuOpen ? 'flex' : 'hidden'} absolute left-0 top-full w-full flex-col gap-1 border-b border-white/10 bg-slate-950 px-4 py-3 md:static md:flex md:w-auto md:flex-row md:gap-6 md:border-0 md:p-0`}>
          {navigationLinks.map((link) => (
            <li key={link.path}>
              <NavLink to={link.path} onClick={() => setMenuOpen(false)} className={({ isActive }) => `block py-2 text-sm transition ${isActive ? 'font-medium text-blue-400' : 'text-slate-300 hover:text-blue-400'}`}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-2">
          <button type="button" onClick={handleLogout} className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700"><LogOut size={16} /> Logout</button>
          <button type="button" className="rounded p-2 text-2xl text-slate-200 hover:bg-white/10 md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close app menu' : 'Open app menu'} aria-expanded={menuOpen}>
            <Menu size={24} aria-hidden="true" />
          </button>
        </div>
      </div>
    </nav>
  )
}

export default AppNavbar
