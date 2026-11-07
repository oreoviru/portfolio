import { useState, useEffect, useRef, ReactNode } from 'react'
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface HistoryEntry {
  command: string
  output: ReactNode
}

export default function TerminalModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [cmdHistory, setCmdHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState<number>(-1)

  const inputRef = useRef<HTMLInputElement>(null)
  const terminalBottomRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  // Toggle with ` or ~ key globally
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in a form or input outside the terminal
      if (
        (e.key === '`' || e.key === '~') &&
        !(e.target instanceof HTMLInputElement && e.target !== inputRef.current) &&
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80)
    }
  }, [isOpen])

  // Auto-scroll to bottom of terminal output
  useEffect(() => {
    if (isOpen) {
      terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [history, isOpen])

  const handleCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim()
    if (!trimmed) return

    setCmdHistory((prev) => [...prev, trimmed])
    setHistoryIndex(-1)

    const parts = trimmed.split(' ')
    const cmd = parts[0].toLowerCase()
    const args = parts.slice(1)

    let output: ReactNode = null

    switch (cmd) {
      case 'help':
        output = (
          <div className="space-y-1.5 text-cream/90 text-xs sm:text-sm">
            <p className="text-cream/50 text-[11px] uppercase tracking-wider mb-2">Available Commands:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
              <p><span className="text-emerald-400 font-semibold">about</span> &mdash; Bio &amp; core background</p>
              <p><span className="text-emerald-400 font-semibold">skills</span> &mdash; Technical proficiencies</p>
              <p><span className="text-emerald-400 font-semibold">projects</span> &mdash; Featured repositories</p>
              <p><span className="text-emerald-400 font-semibold">neuro</span> &mdash; Flagship AI daemon status</p>
              <p><span className="text-emerald-400 font-semibold">contact</span> &mdash; Socials &amp; direct Gmail</p>
              <p><span className="text-emerald-400 font-semibold">goto &lt;page&gt;</span> &mdash; Navigate: home, about, projects, contact</p>
              <p><span className="text-emerald-400 font-semibold">resume</span> &mdash; Quick CV summary</p>
              <p><span className="text-emerald-400 font-semibold">whoami</span> &mdash; Current session identity</p>
              <p><span className="text-emerald-400 font-semibold">clear</span> &mdash; Clear terminal screen</p>
              <p><span className="text-emerald-400 font-semibold">exit</span> &mdash; Close terminal overlay</p>
            </div>
            <p className="text-cream/40 text-[11px] pt-2">Tip: Use Up/Down arrows to cycle through previous commands.</p>
          </div>
        )
        break

      case 'about':
        output = (
          <div className="space-y-2 text-xs sm:text-sm text-cream/85 leading-relaxed">
            <p><strong className="text-cream">Viraj Salunkhe</strong> &bull; AI &amp; ML Engineer &amp; Full-Stack Developer.</p>
            <p>Passionate about local LLMs, computer vision, distributed systems, and modern web architectures. Creator of NEURO, AirPool AI, and Campus-Recover.</p>
            <p className="text-cream/50 text-xs">Run <span className="text-emerald-400">goto about</span> to visit the full About Me page.</p>
          </div>
        )
        break

      case 'skills':
        output = (
          <div className="space-y-2 text-xs sm:text-sm text-cream/90">
            <p className="text-cream/50 text-[11px] uppercase tracking-wider">Technical Toolkit:</p>
            <div className="space-y-1">
              <p><span className="text-emerald-400 font-medium">Core Languages:</span> Python, JavaScript (ES6+), TypeScript, HTML5, CSS3</p>
              <p><span className="text-emerald-400 font-medium">AI &amp; Vision:</span> YOLOv8, PyTorch, Ollama, CLIP ViT, MediaPipe, OpenCV</p>
              <p><span className="text-emerald-400 font-medium">Web &amp; Frameworks:</span> React 19, Next.js, Node.js, FastAPI, Tailwind CSS, Three.js</p>
              <p><span className="text-emerald-400 font-medium">Tools &amp; DevOps:</span> Git, GitHub, AppleScript, Edge-TTS, Supabase, Vercel</p>
            </div>
          </div>
        )
        break

      case 'projects':
        output = (
          <div className="space-y-2 text-xs sm:text-sm text-cream/85">
            <p className="text-cream/50 text-[11px] uppercase tracking-wider">Top Repositories &amp; Architectures:</p>
            <div className="space-y-1.5">
              <p><span className="text-emerald-400 font-semibold">1. NEURO</span> &mdash; Autonomous AI &amp; macOS automation assistant (Flagship)</p>
              <p><span className="text-emerald-400 font-semibold">2. AirPool AI</span> &mdash; Flight-aware passenger matching &amp; rideshare cost-splitter</p>
              <p><span className="text-emerald-400 font-semibold">3. Campus-Recover</span> &mdash; Multi-modal AI lost &amp; found for Rishihood University</p>
              <p><span className="text-emerald-400 font-semibold">4. PuzzleCam</span> &mdash; Gesture-controlled browser photobooth &amp; 3x3 puzzle solver</p>
              <p><span className="text-emerald-400 font-semibold">5. RetroLens</span> &mdash; Hand-tracked computer vision shader portal (11 FX)</p>
            </div>
            <p className="text-cream/50 text-xs pt-1">Run <span className="text-emerald-400">goto projects</span> to view interactive showcases.</p>
          </div>
        )
        break

      case 'neuro':
        output = (
          <div className="space-y-1.5 font-mono text-xs text-cream/90 bg-white/[0.02] p-3 rounded-lg border border-cream/10">
            <p className="text-emerald-400 font-semibold">[NEURO DAEMON DIAGNOSTICS &bull; macOS Core]</p>
            <p className="text-cream/70">&gt; Status: <span className="text-emerald-400">ONLINE</span> &bull; Security Level: <span className="text-emerald-400">BIOMETRIC (YOLOv8)</span></p>
            <p className="text-cream/70">&gt; Inference Engine: <span className="text-cream">Ollama Local LLM (Active)</span></p>
            <p className="text-cream/70">&gt; Audio Pipeline: <span className="text-cream">Edge-TTS (en-US-AvaNeural 24kHz)</span></p>
            <p className="text-cream/70">&gt; Automation Bridge: <span className="text-cream">AppleScript (Spotify, Apps, System)</span></p>
            <p className="text-cream/70">&gt; Repository: <span className="text-amber-300">Proprietary / Private Core</span></p>
            <p className="text-emerald-400/80 pt-1">✔ All 4 sub-services running within nominal parameters.</p>
          </div>
        )
        break

      case 'contact':
        output = (
          <div className="space-y-1.5 text-xs sm:text-sm text-cream/90">
            <p className="text-cream/50 text-[11px] uppercase tracking-wider">Direct Channels:</p>
            <p>&bull; <strong className="text-cream">Email:</strong> <a href="mailto:oreoviru2008@gmail.com" className="text-emerald-400 hover:underline">oreoviru2008@gmail.com</a></p>
            <p>&bull; <strong className="text-cream">LinkedIn:</strong> <a href="https://www.linkedin.com/in/viraj-salunkhe/" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">linkedin.com/in/viraj-salunkhe</a></p>
            <p>&bull; <strong className="text-cream">Instagram:</strong> <a href="https://www.instagram.com/oreo._.viru/" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">@oreo._.viru</a></p>
            <p>&bull; <strong className="text-cream">GitHub:</strong> <a href="https://github.com/oreoviru" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">github.com/oreoviru</a></p>
          </div>
        )
        break

      case 'goto': {
        const target = args[0]?.toLowerCase()
        if (target === 'home' || target === '/') {
          navigate('/')
          setIsOpen(false)
          output = <p className="text-emerald-400">Navigating to Home...</p>
        } else if (target === 'about') {
          navigate('/about')
          setIsOpen(false)
          output = <p className="text-emerald-400">Navigating to About...</p>
        } else if (target === 'projects') {
          navigate('/projects')
          setIsOpen(false)
          output = <p className="text-emerald-400">Navigating to Projects...</p>
        } else if (target === 'contact') {
          navigate('/contact')
          setIsOpen(false)
          output = <p className="text-emerald-400">Navigating to Contact...</p>
        } else {
          output = <p className="text-rose-400">Unknown destination: &quot;{args[0]}&quot;. Options: home, about, projects, contact</p>
        }
        break
      }

      case 'resume':
      case 'cv':
        output = (
          <div className="space-y-2 text-xs sm:text-sm text-cream/85">
            <p className="text-emerald-400 font-semibold">[RESUME SUMMARY &bull; VIRAJ SALUNKHE]</p>
            <p><span className="text-cream/50">ROLE:</span> AI &amp; ML Engineer / Full-Stack Developer</p>
            <p><span className="text-cream/50">EDUCATION:</span> B.Tech in Computer Science &amp; AI</p>
            <p><span className="text-cream/50">KEY SKILLS:</span> Python, PyTorch, YOLOv8, FastAPI, React, TypeScript, Node.js, Ollama</p>
            <p><span className="text-cream/50">HIGHLIGHTS:</span> Architected NEURO autonomous macOS system, built GIS-integrated multi-modal lost &amp; found system, flight passenger matching algorithm.</p>
            <p><span className="text-cream/50">STATUS:</span> Open to innovative software engineering &amp; AI opportunities worldwide.</p>
          </div>
        )
        break

      case 'whoami':
        output = (
          <p className="text-xs sm:text-sm text-cream/80 font-mono">
            visitor@viraj-portfolio &bull; (Permissions: Read-Only Guest Access &bull; IP: Verified)
          </p>
        )
        break

      case 'clear':
        setHistory([])
        setInput('')
        return

      case 'exit':
      case 'quit':
        setIsOpen(false)
        setInput('')
        return

      case 'sudo':
        output = (
          <p className="text-rose-400 font-mono text-xs sm:text-sm">
            Permission denied: Nice try! Viraj&apos;s portfolio is secured by NEURO biometric clearance 🛡️.
          </p>
        )
        break

      case 'date':
      case 'time':
        output = <p className="font-mono text-xs sm:text-sm text-cream/80">{new Date().toLocaleString()}</p>
        break

      case 'echo':
        output = <p className="font-mono text-xs sm:text-sm text-cream/90">{args.join(' ')}</p>
        break

      default:
        output = (
          <p className="text-rose-400 font-mono text-xs">
            command not found: {cmd}. Type <span className="text-emerald-400 underline">help</span> to view available commands.
          </p>
        )
        break
    }

    setHistory((prev) => [...prev, { command: trimmed, output }])
    setInput('')
  }

  const handleKeyDownInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (cmdHistory.length === 0) return
      const nextIndex = historyIndex === -1 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1)
      setHistoryIndex(nextIndex)
      setInput(cmdHistory[nextIndex])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (cmdHistory.length === 0 || historyIndex === -1) return
      const nextIndex = historyIndex + 1
      if (nextIndex >= cmdHistory.length) {
        setHistoryIndex(-1)
        setInput('')
      } else {
        setHistoryIndex(nextIndex)
        setInput(cmdHistory[nextIndex])
      }
    }
  }

  return (
    <>
      {/* ─── Floating Trigger Button (Bottom Right) ─── */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 group flex items-center gap-2 rounded-full border border-cream/25 bg-black/80 px-3.5 py-2 text-xs font-mono text-cream/90 backdrop-blur-md shadow-[0_8px_24px_-6px_rgba(239,238,233,0.15)] transition-all duration-300 hover:scale-105 hover:border-cream/50 hover:bg-cream hover:text-black active:scale-95 select-none"
        aria-label="Open Interactive Terminal"
        title="Open Terminal (Press ~)"
      >
        <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        <TerminalIcon size={14} className="transition-transform group-hover:scale-110" />
        <span className="font-medium hidden sm:inline">CLI</span>
        <span className="text-[10px] opacity-50 font-sans border border-current rounded px-1 hidden md:inline">~</span>
      </button>

      {/* ─── Modal Overlay ─── */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          {/* Backdrop Click */}
          <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

          {/* Terminal Window */}
          <div
            className={`relative z-10 w-full rounded-2xl border border-cream/25 bg-[#0d0d0d]/95 backdrop-blur-2xl shadow-[0_30px_70px_-15px_rgba(0,0,0,0.8)] flex flex-col font-mono overflow-hidden transition-all duration-300 ${
              isMaximized ? 'h-[94vh] max-w-[96vw]' : 'h-[620px] max-h-[85vh] max-w-3xl'
            }`}
          >
            {/* Terminal Title Bar */}
            <div className="flex items-center justify-between border-b border-cream/15 px-4 py-3 bg-black/50 select-none">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="h-3 w-3 rounded-full bg-rose-500/90 hover:opacity-80 transition-opacity"
                  title="Close (Esc)"
                  aria-label="Close terminal"
                />
                <button
                  onClick={() => setIsMaximized((prev) => !prev)}
                  className="h-3 w-3 rounded-full bg-amber-500/90 hover:opacity-80 transition-opacity"
                  title="Minimize / Maximize"
                  aria-label="Resize terminal"
                />
                <button
                  onClick={() => setIsMaximized((prev) => !prev)}
                  className="h-3 w-3 rounded-full bg-emerald-500/90 hover:opacity-80 transition-opacity"
                  title="Zoom"
                  aria-label="Zoom terminal"
                />
                <span className="ml-3 text-xs text-cream/60 hidden sm:inline">
                  viraj@macbook: ~ (zsh)
                </span>
              </div>

              <div className="flex items-center gap-2 text-cream/60">
                <span className="text-[10px] text-cream/40 hidden md:inline">
                  Press <kbd className="px-1 border border-cream/20 rounded">~</kbd> or <kbd className="px-1 border border-cream/20 rounded">Esc</kbd>
                </span>
                <button
                  onClick={() => setIsMaximized((prev) => !prev)}
                  className="p-1 hover:text-cream transition-colors hidden sm:inline"
                  aria-label="Toggle Fullscreen"
                >
                  {isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:text-cream transition-colors"
                  aria-label="Close Terminal"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Terminal Scroll Body */}
            <div
              className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-xs sm:text-sm select-text cursor-text"
              onClick={() => inputRef.current?.focus()}
            >
              {/* Welcome Banner */}
              <div className="space-y-1 text-cream/70 border-b border-cream/10 pb-4">
                <p className="text-cream font-semibold">
                  VirajOS &bull; Interactive Portfolio Terminal v2.4 (arm64)
                </p>
                <p className="text-[11px] text-cream/50">
                  Type <span className="text-emerald-400 font-medium">help</span> to view all commands &bull; Try <span className="text-emerald-400 font-medium">neuro</span>, <span className="text-emerald-400 font-medium">skills</span>, <span className="text-emerald-400 font-medium">projects</span>, or <span className="text-emerald-400 font-medium">contact</span>.
                </p>
              </div>

              {/* History Stream */}
              {history.map((entry, index) => (
                <div key={index} className="space-y-1.5">
                  <div className="flex items-center gap-2 text-cream/90">
                    <span className="text-emerald-400 font-medium">viraj@macbook:~$</span>
                    <span>{entry.command}</span>
                  </div>
                  <div className="pl-3 sm:pl-4 border-l border-cream/10 py-1">
                    {entry.output}
                  </div>
                </div>
              ))}

              {/* Live Input Line */}
              <div className="flex items-center gap-2 text-cream">
                <span className="text-emerald-400 font-medium shrink-0">viraj@macbook:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDownInput}
                  className="flex-1 bg-transparent text-cream placeholder-cream/30 focus:outline-none caret-emerald-400 font-mono text-xs sm:text-sm"
                  placeholder='type "help" and press enter...'
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                />
                <button
                  onClick={() => handleCommand(input)}
                  className="text-cream/40 hover:text-cream transition-colors sm:hidden"
                  aria-label="Submit command"
                >
                  <CornerDownLeft size={14} />
                </button>
              </div>

              <div ref={terminalBottomRef} />
            </div>

            {/* Quick Actions Footer Bar */}
            <div className="border-t border-cream/10 px-4 py-2 bg-black/40 flex items-center justify-between text-[11px] text-cream/50 overflow-x-auto gap-2">
              <span className="shrink-0 hidden sm:inline">Quick shortcuts:</span>
              <div className="flex items-center gap-1.5">
                {['help', 'neuro', 'projects', 'skills', 'contact', 'clear'].map((cmd) => (
                  <button
                    key={cmd}
                    onClick={() => handleCommand(cmd)}
                    className="rounded border border-cream/10 bg-white/[0.03] px-2 py-0.5 text-cream/70 hover:bg-cream hover:text-black hover:border-cream transition-all duration-150"
                  >
                    {cmd}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
