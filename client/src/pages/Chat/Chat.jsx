import { Bot, ChevronDown, ChevronUp, FileText, Send, User } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const suggestions = [
  'Can I hire another employee?',
  'What are my biggest expenses?',
  'How is my cash flow performing?',
  'Give me a financial summary.',
  'How can I reduce costs?',
  'Which expenses should I review?',
]

const formatSourceText = (text) => {
  const lines = text.split('\n').filter(Boolean)
  const rows = []
  let lineIndex = 0

  while (lineIndex < lines.length) {
    const referenceIndex = lines.findIndex((line, index) => index > lineIndex && /^(TXN|AD|CR|VD|SW|BL|UP)\w+/.test(line))

    if (referenceIndex === -1 || lines.length - referenceIndex < 5) {
      break
    }

    rows.push({
      description: lines.slice(lineIndex, referenceIndex).join(' '),
      reference: lines[referenceIndex],
      debit: lines[referenceIndex + 1],
      credit: lines[referenceIndex + 2],
      balance: lines[referenceIndex + 3],
      date: lines[referenceIndex + 4],
    })
    lineIndex = referenceIndex + 5
  }

  return rows
}

function Chat() {
  const [messages, setMessages] = useState([])
  const [question, setQuestion] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const sendQuestion = async (message) => {
    const trimmedMessage = message.trim()

    if (!trimmedMessage || isLoading) {
      return
    }

    const typingId = Date.now()
    setMessages((currentMessages) => [
      ...currentMessages,
      { id: typingId - 1, role: 'user', content: trimmedMessage },
      { id: typingId, role: 'assistant', isTyping: true },
    ])
    setQuestion('')
    setIsLoading(true)

    try {
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: trimmedMessage }),
      })
      const data = await response.json()

      if (!response.ok || !data.answer) {
        throw new Error(data.detail?.[0]?.msg || 'I could not answer that question right now.')
      }

      setMessages((currentMessages) => currentMessages.map((currentMessage) => (
        currentMessage.id === typingId
          ? { id: typingId, role: 'assistant', content: data.answer, sources: data.sources || [], showSources: false }
          : currentMessage
      )))
    } catch (error) {
      setMessages((currentMessages) => currentMessages.map((currentMessage) => (
        currentMessage.id === typingId
          ? { id: typingId, role: 'assistant', content: error.message || 'Something went wrong. Please try again.', isError: true }
          : currentMessage
      )))
    } finally {
      setIsLoading(false)
    }
  }

  const toggleSources = (messageId) => {
    setMessages((currentMessages) => currentMessages.map((message) => (
      message.id === messageId ? { ...message, showSources: !message.showSources } : message
    )))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    sendQuestion(question)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      sendQuestion(question)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900 px-4 pb-32 pt-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <header className="text-center">
          <p className="text-sm font-medium text-blue-400">LEDGERMIND AI CFO</p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Ask Your AI CFO</h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">Ask questions about your uploaded financial documents and receive AI-powered financial guidance backed by your own data.</p>
        </header>

        {messages.length === 0 && (
          <section className="mt-10 rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-black/20 sm:p-8">
            <div className="mx-auto inline-flex rounded-xl bg-blue-500/15 p-3 text-blue-400"><Bot size={26} /></div>
            <h2 className="mt-4 text-2xl font-semibold">What would you like to know?</h2>
            <p className="mt-2 text-sm text-slate-400">Start with a question about your business finances.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {suggestions.map((suggestion) => (
                <button key={suggestion} type="button" onClick={() => sendQuestion(suggestion)} className="rounded-xl border border-white/10 bg-slate-950/60 p-4 text-left text-sm text-slate-300 transition hover:border-blue-400/40 hover:bg-blue-500/10 hover:text-white">{suggestion}</button>
              ))}
            </div>
          </section>
        )}

        {messages.length > 0 && (
          <section className="mt-8 space-y-5">
            {messages.map((message) => (
              <article key={message.id} className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.role === 'assistant' && <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-blue-400"><Bot size={19} /></div>}
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-lg shadow-black/10 sm:max-w-[75%] ${message.role === 'user' ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white' : message.isError ? 'border border-red-400/30 bg-red-500/10 text-red-200' : 'border border-white/10 bg-slate-900/80 text-slate-200'}`}>
                  {message.isTyping ? (
                    <div className="flex items-center gap-3 py-1">
                      <span className="text-sm font-medium text-blue-300">AI CFO</span>
                      <span className="flex items-end gap-1" aria-label="AI CFO is typing">
                        {[0, 150, 300].map((delay) => <span key={delay} className="h-2 w-2 animate-bounce rounded-full bg-blue-400" style={{ animationDelay: `${delay}ms` }} />)}
                      </span>
                    </div>
                  ) : (
                    <>
                      <p className="whitespace-pre-wrap text-sm leading-7">{message.content}</p>
                      {message.sources?.length > 0 && (
                        <div className="mt-4 border-t border-white/10 pt-3">
                          <button type="button" onClick={() => toggleSources(message.id)} className="flex items-center gap-2 text-sm font-medium text-blue-300 hover:text-blue-200"><FileText size={16} /> Sources Used {message.showSources ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</button>
                          {message.showSources && (
                            <div className="mt-3 space-y-3">
                              {message.sources.map((source, index) => (
                                <div key={`${source.text}-${index}`} className="rounded-lg border border-white/10 bg-slate-950/70 p-3">
                                  <p className="text-xs font-medium text-blue-300">Relevance Score: {typeof source.score === 'number' ? source.score.toFixed(2) : source.score}</p>
                                  <div className="mt-3 max-h-56 overflow-auto">
                                    <div className="min-w-[680px] text-xs text-slate-300">
                                      <div className="grid grid-cols-[minmax(160px,2fr)_minmax(100px,1fr)_repeat(4,minmax(90px,1fr))] gap-3 border-b border-white/10 pb-2 text-slate-500">
                                        <span>Description</span><span>Reference</span><span>Debit</span><span>Credit</span><span>Balance</span><span>Date</span>
                                      </div>
                                      {formatSourceText(source.text).map((row, rowIndex) => (
                                        <div key={`${row.reference}-${rowIndex}`} className="grid grid-cols-[minmax(160px,2fr)_minmax(100px,1fr)_repeat(4,minmax(90px,1fr))] gap-3 border-b border-white/5 py-2 last:border-0">
                                          <span>{row.description}</span><span>{row.reference}</span><span>{row.debit}</span><span>{row.credit}</span><span>{row.balance}</span><span>{row.date}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
                {message.role === 'user' && <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-800 text-slate-300"><User size={18} /></div>}
              </article>
            ))}
            <div ref={messagesEndRef} />
          </section>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 border-t border-white/10 bg-slate-950/95 px-4 py-4 backdrop-blur sm:px-6">
        <form onSubmit={handleSubmit} className="mx-auto flex max-w-4xl items-end gap-3">
          <textarea value={question} onChange={(event) => setQuestion(event.target.value)} onKeyDown={handleKeyDown} placeholder="Ask about your business finances..." rows="1" className="min-h-12 max-h-32 flex-1 resize-y rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500" />
          <button type="submit" disabled={isLoading || !question.trim()} className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 text-white transition hover:from-blue-400 hover:to-blue-600 disabled:cursor-not-allowed disabled:opacity-50" aria-label="Send message"><Send size={19} /></button>
        </form>
      </div>
    </main>
  )
}

export default Chat
