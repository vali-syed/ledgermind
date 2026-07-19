import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'lucide-react'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="w-full border-b border-white/10 bg-slate-950 text-white">
      <div className="relative mx-auto flex min-h-16 max-w-6xl items-center gap-6 px-4 md:px-6">
        <Link to="/" className="text-xl font-bold text-white">
          Ledgermind
        </Link>

        <ul className={`${menuOpen ? 'flex' : 'hidden'} absolute top-full left-0 w-full flex-col gap-1 border-b border-white/10 bg-slate-950 px-4 py-3 md:static md:flex md:w-auto md:flex-row md:gap-6 md:border-0 md:p-0`}>
          <li><a href="#home" className="block py-2 text-sm text-slate-300 hover:text-blue-400">Home</a></li>
          <li><a href="#features" className="block py-2 text-sm text-slate-300 hover:text-blue-400">Features</a></li>
          <li><a href="#how-it-works" className="block py-2 text-sm text-slate-300 hover:text-blue-400">How it Works</a></li>
        </ul>

        <div className="ml-auto flex items-center gap-3">
          <Link to="/login" className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">
            Launch App
          </Link>
          <button
            type="button"
            className="rounded p-2 text-2xl text-slate-200 hover:bg-white/10 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close main menu' : 'Open main menu'}
            aria-expanded={menuOpen}
          >
            <Menu size={24} aria-hidden="true" />
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
