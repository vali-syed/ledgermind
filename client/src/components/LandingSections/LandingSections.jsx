import {
  Bot,
  Brain,
  ChartNoAxesCombined,
  FileUp,
  Lightbulb,
  LockKeyhole,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const features = [
  { icon: FileUp, title: 'Upload Financial Documents', description: 'Upload invoices, bank statements, and reports in one place.' },
  { icon: Bot, title: 'AI Financial Copilot', description: 'Ask simple questions about your business finances anytime.' },
  { icon: ChartNoAxesCombined, title: 'Financial Dashboard', description: 'See important numbers and business performance clearly.' },
  { icon: Sparkles, title: 'AI Insights', description: 'Find useful patterns in your financial documents quickly.' },
  { icon: Lightbulb, title: 'Smart Recommendations', description: 'Get practical suggestions to improve your business decisions.' },
  { icon: LockKeyhole, title: 'Secure Data', description: 'Your business documents are handled with care and security.' },
]

const steps = [
  { icon: FileUp, title: 'Upload Documents', description: 'Add your invoices and statements.' },
  { icon: Brain, title: 'AI Analysis', description: 'LedgerMind reads your data.' },
  { icon: SearchCheck, title: 'Insights', description: 'Get clear financial answers.' },
  { icon: TrendingUp, title: 'Better Decisions', description: 'Use insights to plan ahead.' },
]

const benefits = [
  { icon: TrendingUp, title: 'Save Time', description: 'Understand financial information without checking every document manually.' },
  { icon: ShieldCheck, title: 'Reduce Costs', description: 'Spot unnecessary spending and improve how money is managed.' },
  { icon: Lightbulb, title: 'Better Decisions', description: 'Use clear insights to make confident business choices.' },
]

function SectionTitle({ label, title, description }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-medium text-blue-400">{label}</p>
      <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-slate-300">{description}</p>}
    </div>
  )
}

function LandingSections() {
  return (
    <div className="bg-slate-950 text-white">
      {/* Features section */}
      <section id="features" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionTitle
          label="FEATURES"
          title="Everything You Need to Understand Your Finances"
          description="LedgerMind makes financial information easier for small and growing businesses."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon

            return (
              <div key={feature.title} className="rounded-xl border border-white/10 bg-slate-900 p-6 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10">
                <div className="inline-flex rounded-lg bg-blue-500/15 p-3 text-blue-400"><Icon size={22} /></div>
                <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* How it works section */}
      <section id="how-it-works" className="border-y border-white/10 bg-slate-900/40 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            label="HOW IT WORKS"
            title="Simple Steps, Useful Results"
            description="From document upload to better business decisions in four easy steps."
          />

          <div className="mt-12 grid gap-5 md:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon

              return (
                <div key={step.title} className="relative rounded-xl border border-white/10 bg-slate-950 p-6 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white"><Icon size={22} /></div>
                  <p className="mt-4 text-xs font-medium text-blue-400">STEP {index + 1}</p>
                  <h3 className="mt-2 font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">{step.description}</p>
                  {index < steps.length - 1 && <span className="absolute -right-4 top-1/2 hidden text-2xl text-blue-400 md:block">→</span>}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why choose us section */}
      <section id="why-ledgermind" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionTitle
          label="WHY LEDGERMIND"
          title="Built for Better Business Decisions"
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon

            return (
              <div key={benefit.title} className="rounded-xl border border-white/10 bg-slate-900 p-6 text-center transition hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10">
                <div className="mx-auto inline-flex rounded-lg bg-blue-500/15 p-3 text-blue-400"><Icon size={22} /></div>
                <h3 className="mt-4 text-xl font-semibold">{benefit.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{benefit.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Call to action section */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-2xl border border-blue-400/20 bg-gradient-to-r from-blue-600/20 to-slate-900 p-8 text-center sm:p-12">
          <h2 className="text-3xl font-bold sm:text-4xl">Ready to Understand Your Business Better?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">Upload your financial documents and let AI help you make smarter business decisions.</p>
          <Link to="/login" className="mt-7 inline-block rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-500">
            Launch App
          </Link>
        </div>
      </section>

      {/* Footer section */}
      <footer className="border-t border-white/10 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-slate-400 md:flex-row">
          <Link to="/" className="text-lg font-bold text-white">LedgerMind</Link>
          <div className="flex gap-5">
            <a href="#features" className="hover:text-blue-400">Features</a>
            <a href="#how-it-works" className="hover:text-blue-400">How It Works</a>
            <a href="#why-ledgermind" className="hover:text-blue-400">Why LedgerMind</a>
          </div>
          <p>© 2026 LedgerMind. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default LandingSections
