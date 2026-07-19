import { ArrowRight, Bot, Check, Sparkles, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'

function StatCard({ title, amount, change, color }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 shadow-lg shadow-slate-950/20 transition hover:-translate-y-1 hover:border-blue-400/40">
      <p className="text-xs text-slate-400">{title}</p>
      <p className="mt-2 text-xl font-semibold text-white">{amount}</p>
      <p className={`mt-1 text-xs ${color}`}>{change}</p>
    </div>
  )
}

function Hero() {
  return (
    <main className="overflow-hidden bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900 text-white">
      <section className="mx-auto grid min-h-[calc(100vh-64px)] max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-200">
            <Sparkles size={16} />
            AI Powered for Indian MSMEs
          </div>

          <h1 className="mt-6 max-w-xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Your AI Financial Copilot for Smarter Business Decisions
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
            Upload invoices, bank statements, and financial reports to instantly receive AI-powered insights, recommendations, and answers powered by Retrieval-Augmented Generation.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/login" className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 px-5 py-3 font-medium text-white shadow-lg shadow-blue-500/25 transition hover:-translate-y-0.5 hover:from-blue-400 hover:to-blue-600">
              Launch App <ArrowRight size={18} />
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-300">
            <span className="flex items-center gap-2"><Check size={16} className="text-blue-400" /> Secure</span>
            <span className="flex items-center gap-2"><Check size={16} className="text-blue-400" /> AI Powered</span>
            <span className="flex items-center gap-2"><Check size={16} className="text-blue-400" /> Built for MSMEs</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -inset-4 rounded-3xl bg-blue-500/15 blur-3xl" />
          <div className="relative rounded-2xl border border-white/10 bg-slate-900/80 p-4 shadow-2xl shadow-black/40 backdrop-blur sm:p-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-sm text-slate-400">LedgerMind Dashboard</p>
                <h2 className="mt-1 text-lg font-semibold">Financial Overview</h2>
              </div>
              <div className="rounded-lg bg-blue-500/15 p-2 text-blue-400"><Bot size={22} /></div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <StatCard title="Revenue" amount="₹8.4L" change="+18.4% this month" color="text-emerald-400" />
              <StatCard title="Expenses" amount="₹3.2L" change="+12% this month" color="text-amber-400" />
              <StatCard title="Cash Flow" amount="₹5.2L" change="Healthy balance" color="text-blue-400" />
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                <p className="text-sm text-slate-400">Financial Health Score</p>
                <div className="mt-4 flex items-end gap-2">
                  <span className="text-4xl font-bold text-white">84</span>
                  <span className="mb-1 text-sm text-slate-400">/100</span>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-700">
                  <div className="h-full w-[84%] rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
                </div>
                <p className="mt-3 flex items-center gap-1 text-xs text-emerald-400"><TrendingUp size={14} /> Strong financial position</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Hero
