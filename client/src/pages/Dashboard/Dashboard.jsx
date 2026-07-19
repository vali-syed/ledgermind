import { BrainCircuit, CircleDollarSign, FileText, Lightbulb, MessageCircle, ReceiptText, ShieldCheck, UploadCloud, WalletCards } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import useUploadStore from '../../store/uploadStore'

function Dashboard() {
  const uploadData = useUploadStore((state) => state.uploadData)
  const navigate = useNavigate()

  if (!uploadData?.dashboard_data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900 px-4 text-white">
        <section className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/80 p-8 text-center shadow-2xl shadow-black/30 backdrop-blur">
          <div className="mx-auto inline-flex rounded-xl bg-blue-500/15 p-3 text-blue-400"><FileText size={28} /></div>
          <h1 className="mt-4 text-2xl font-bold">No financial insights are available yet.</h1>
          <p className="mt-3 text-sm leading-6 text-slate-400">Upload a financial document to generate your personalized AI CFO analysis.</p>
          <button type="button" onClick={() => navigate('/upload')} className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 px-4 py-3 font-medium text-white transition hover:from-blue-400 hover:to-blue-600"><UploadCloud size={18} /> Upload Financial Documents</button>
        </section>
      </main>
    )
  }

  const data = uploadData.dashboard_data
  const healthScore = Number(data.financial_health_score)
  const healthStatus = healthScore >= 90 ? 'Excellent' : healthScore >= 75 ? 'Healthy' : healthScore >= 50 ? 'Moderate' : 'Needs Attention'
  const formatCurrency = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(amount || 0))

  const kpis = [
    { title: 'Financial Health', value: `${Number.isFinite(healthScore) ? healthScore : 0} / 100`, detail: healthStatus, icon: ShieldCheck },
    { title: 'Revenue', value: formatCurrency(data.revenue), icon: CircleDollarSign },
    { title: 'Cash Flow', value: data.cash_flow || 'Not available', icon: WalletCards },
    { title: 'Expenses', value: formatCurrency(data.expenses), icon: ReceiptText },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900 px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header>
          <p className="text-sm font-medium text-blue-400">LEDGERMIND FINANCIAL DASHBOARD</p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Welcome Back</h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-400">Your AI CFO has analyzed your financial docs and generated personalized business insights.</p>
        </header>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map(({ title, value, detail, icon: Icon }) => (
            <article key={title} className="rounded-xl border border-white/10 bg-slate-900/80 p-5 shadow-lg shadow-black/10">
              <div className="flex items-start justify-between">
                <p className="text-sm text-slate-400">{title}</p>
                <div className="rounded-lg bg-blue-500/15 p-2 text-blue-400"><Icon size={20} /></div>
              </div>
              <p className="mt-5 text-2xl font-bold">{value}</p>
              {detail && <span className="mt-3 inline-block rounded-full bg-blue-500/15 px-3 py-1 text-xs font-medium text-blue-300">{detail}</span>}
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-black/20 sm:p-8">
          <div className="flex items-center gap-3"><div className="rounded-lg bg-blue-500/15 p-2 text-blue-400"><BrainCircuit size={22} /></div><h2 className="text-xl font-semibold">AI CFO Summary</h2></div>
          <p className="mt-5 leading-7 text-slate-300">{data.summary || 'Your financial summary is being prepared.'}</p>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-black/20">
            <div className="flex items-center gap-3"><div className="rounded-lg bg-blue-500/15 p-2 text-blue-400"><Lightbulb size={22} /></div><h2 className="text-xl font-semibold">Key Insights</h2></div>
            <ul className="mt-5 space-y-4">
              {(data.insights || []).map((insight, index) => <li key={`${insight}-${index}`} className="flex gap-3 text-sm leading-6 text-slate-300"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-400" />{insight}</li>)}
            </ul>
          </article>

          <article className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-black/20">
            <div className="flex items-center gap-3"><div className="rounded-lg bg-blue-500/15 p-2 text-blue-400"><ShieldCheck size={22} /></div><h2 className="text-xl font-semibold">Recommendations</h2></div>
            <ul className="mt-5 space-y-4">
              {(data.recommendations || []).map((recommendation, index) => <li key={`${recommendation}-${index}`} className="flex gap-3 text-sm leading-6 text-slate-300"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-400" />{recommendation}</li>)}
            </ul>
          </article>
        </section>

        <section className="mt-8 rounded-2xl border border-blue-400/20 bg-gradient-to-r from-blue-600/20 to-slate-900 p-7 sm:p-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div><h2 className="text-2xl font-bold">Ask Your AI CFO</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">Have questions about your business finances? Chat with your AI CFO to receive personalized guidance based on your uploaded financial documents.</p></div>
            <button type="button" onClick={() => navigate('/chat')} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 px-5 py-3 font-medium text-white transition hover:from-blue-400 hover:to-blue-600"><MessageCircle size={18} /> Ask a Question</button>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Dashboard
