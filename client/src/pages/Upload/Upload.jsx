import { CheckCircle2, FileText, LockKeyhole, ShieldCheck, UploadCloud } from 'lucide-react'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const progressMessages = [
  'Uploading document...',
  'Extracting financial data...',
  'Analyzing business activity...',
  'Generating AI insights...',
  'Preparing your dashboard...',
]

function Upload() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [progressStep, setProgressStep] = useState(0)
  const [error, setError] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const fileInputRef = useRef(null)
  const navigate = useNavigate()

  const selectFile = (file) => {
    setError('')
    setIsSuccess(false)

    if (!file) {
      return
    }

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setSelectedFile(null)
      setError('Please select a PDF document.')
      return
    }

    setSelectedFile(file)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setIsDragging(false)
    selectFile(event.dataTransfer.files[0])
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please choose a PDF document before uploading.')
      return
    }

    setError('')
    setIsUploading(true)
    setProgressStep(0)

    const formData = new FormData()
    formData.append('file', selectedFile)
    const progressTimer = setInterval(() => {
      setProgressStep((currentStep) => Math.min(currentStep + 1, progressMessages.length - 1))
    }, 1200)

    try {
      const response = await fetch('http://localhost:8000/upload/upload_files', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()

      if (!response.ok || data.message !== 'File uploaded and processed successfully') {
        setError(data.message || data.detail?.[0]?.msg || 'Unable to process the document.')
        return
      }

      setProgressStep(progressMessages.length - 1)
      setIsSuccess(true)
      setTimeout(() => navigate('/dashboard'), 1800)
    } catch {
      setError('Unable to connect to the server. Please try again.')
    } finally {
      clearInterval(progressTimer)
      setIsUploading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900 px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium text-blue-400">LEDGERMIND DOCUMENT ANALYSIS</p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Upload Your Financial Documents</h1>
          <p className="mt-4 text-base leading-7 text-slate-400">Upload your business financial documents to unlock AI-powered insights, financial health analysis, and personalized recommendations from your AI CFO.</p>
        </header>

        <section className="mx-auto mt-8 max-w-3xl rounded-xl border border-blue-400/20 bg-blue-500/10 p-5">
          <div className="flex items-start gap-3">
            <FileText className="mt-0.5 shrink-0 text-blue-400" size={22} />
            <div>
              <h2 className="font-semibold">Supported Documents</h2>
              <p className="mt-1 text-sm text-slate-300">LedgerMind currently supports <span className="font-medium text-white">PDF</span> documents.</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {['Bank Statements', 'Account Statements', 'Transaction Reports'].map((document) => (
                  <span key={document} className="rounded-full border border-white/10 bg-slate-950/60 px-3 py-1 text-xs text-slate-300">{document}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-8 max-w-2xl rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-black/20 backdrop-blur">
          <div className="text-center">
            <div className="mx-auto inline-flex rounded-xl bg-blue-500/15 p-3 text-blue-400"><UploadCloud size={28} /></div>
            <h2 className="mt-3 text-xl font-semibold">Upload a PDF Document</h2>
            <p className="mt-2 text-sm text-slate-400">Choose a financial document for secure AI analysis.</p>
          </div>

          <div
            onDragOver={(event) => { event.preventDefault(); setIsDragging(true) }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`mt-6 rounded-xl border-2 border-dashed p-8 text-center transition ${isDragging ? 'border-blue-400 bg-blue-500/10' : 'border-white/10 bg-slate-950/60'}`}
          >
            <FileText className="mx-auto text-blue-400" size={34} />
            <p className="mt-3 text-sm font-medium">Drag and drop your PDF here</p>
            <p className="mt-1 text-xs text-slate-500">Accepted file type: PDF</p>
            <input ref={fileInputRef} type="file" accept="application/pdf,.pdf" onChange={(event) => selectFile(event.target.files[0])} className="hidden" />
            <button type="button" onClick={() => fileInputRef.current?.click()} className="mt-4 rounded-lg border border-blue-400/40 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300 transition hover:bg-blue-500/20">Browse File</button>
          </div>

          {selectedFile && <p className="mt-4 flex items-center gap-2 text-sm text-slate-300"><CheckCircle2 size={17} className="text-blue-400" /> {selectedFile.name}</p>}
          {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

          {isUploading && <div className="mt-5 rounded-lg border border-blue-400/20 bg-blue-500/10 px-4 py-3 text-sm text-blue-200">{progressMessages[progressStep]}</div>}

          {isSuccess ? (
            <div className="mt-5 rounded-lg border border-blue-400/30 bg-blue-500/10 p-4 text-center">
              <CheckCircle2 className="mx-auto text-blue-400" size={28} />
              <p className="mt-2 font-medium">Your financial document has been analyzed successfully.</p>
              <p className="mt-1 text-sm text-slate-300">Redirecting to your dashboard...</p>
            </div>
          ) : (
            <button type="button" onClick={handleUpload} disabled={isUploading} className="mt-5 w-full rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 px-4 py-3 font-medium text-white transition hover:from-blue-400 hover:to-blue-600 disabled:cursor-not-allowed disabled:opacity-70">
              {isUploading ? progressMessages[progressStep] : 'Upload Document'}
            </button>
          )}

          <p className="mt-6 text-center text-xs text-slate-500">More document formats will be supported in future updates.</p>
        </section>

        <section className="mt-10">
          <h2 className="text-center text-2xl font-bold">What Happens Next?</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              'Upload your financial document.',
              'LedgerMind securely extracts financial data.',
              'AI analyzes spending, cash flow, and business patterns.',
              'Your personalized financial dashboard is generated.',
            ].map((step, index) => (
              <div key={step} className="rounded-xl border border-white/10 bg-slate-900/70 p-5 text-center">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm font-semibold">{index + 1}</span>
                <p className="mt-3 text-sm leading-6 text-slate-300">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-10 max-w-3xl rounded-xl border border-white/10 bg-slate-900/60 p-6">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 shrink-0 text-blue-400" size={22} />
            <div>
              <h2 className="font-semibold">Privacy &amp; Security</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">Your documents are processed securely and used only to generate financial insights.</p>
              <p className="mt-3 text-sm leading-6 text-slate-400">For additional privacy, you may mask highly sensitive information such as <span className="text-slate-200">Account Number, IFSC Code, Aadhaar/PAN (if present),</span> and <span className="text-slate-200">Personal Address.</span></p>
              <p className="mt-3 flex items-start gap-2 text-sm leading-6 text-slate-300"><LockKeyhole size={16} className="mt-1 shrink-0 text-blue-400" /> Keep transaction details visible to ensure accurate financial analysis.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Upload
