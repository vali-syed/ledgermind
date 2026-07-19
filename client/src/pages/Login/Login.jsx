import { Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react'
import { useState } from 'react'
import Cookies from 'js-cookie'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()

      if (!response.ok || !data.access_token) {
        setError(data.message || data.detail?.[0]?.msg || 'Login failed')
        return
      }

      Cookies.set('jwt_token', data.access_token)
      navigate('/upload')
    } catch {
      setError('Unable to connect to the server')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900 px-4 py-10 text-white">
      <section className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-black/30 backdrop-blur sm:p-8">
        <Link to="/" className="block text-center text-2xl font-bold text-white">LedgerMind</Link>
        <p className="mt-1 text-center text-sm text-blue-400">AI Financial Copilot</p>

        <div className="mt-8 text-center">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="mt-3 text-sm leading-6 text-slate-400">Sign in to continue managing your business with AI.</p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div className="flex items-center rounded-lg border border-white/10 bg-slate-950 px-3 focus-within:border-blue-500">
                <Mail size={18} className="text-slate-500" />
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter your Email" className="w-full bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-slate-500" />
            </div>

            
            <div className="flex items-center rounded-lg border border-white/10 bg-slate-950 px-3 focus-within:border-blue-500">
                <LockKeyhole size={18} className="text-slate-500" />
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" className="w-full bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-slate-500" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-slate-400 transition hover:text-blue-400" aria-label={showPassword ? 'Hide password' : 'Show password'}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>
            

            {error && <p className="text-sm text-red-400">{error}</p>}

            <button type="submit" disabled={isLoading} className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 px-4 py-3 font-medium text-white transition hover:from-blue-400 hover:to-blue-600">
                {isLoading ? 'Logging in...' : 'Login'}
            </button>
        </form>

        <div className="my-7 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-sm text-slate-500">or</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <p className="text-center text-sm text-slate-400">
          Don&apos;t have an account? <Link to="/signup" className="font-medium text-blue-400 transition hover:text-blue-300">Sign Up</Link>
        </p>
      </section>
    </main>
  )
}

export default Login
