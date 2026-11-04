import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Terminal,
  ShieldCheck,
  Volume2,
  FolderSync,
  Sparkles,
  Plane,
  Search,
  Camera,
  Layers,
  CheckCircle2,
  Lock,
  Music,
} from 'lucide-react'

const BG_IMAGE =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260729_022513_486985a2-ac8c-4278-91a8-071dcd9fcaff.png&w=1280&q=85'

interface OtherProject {
  title: string
  subtitle: string
  description: string
  tags: string[]
  githubUrl: string
  liveUrl?: string
  icon: typeof Plane
}

const OTHER_PROJECTS: OtherProject[] = [
  {
    title: 'AirPool AI',
    subtitle: 'Flight-Aware Peer Rideshare Matcher',
    description:
      'Deterministic flight-synchronized passenger matching engine that groups airport travelers arriving on compatible flights. Features 4-factor scoring, transit corridor vector alignment, and proportional fare splitting.',
    tags: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'Supabase'],
    githubUrl: 'https://github.com/oreoviru/airpool-ai',
    icon: Plane,
  },
  {
    title: 'Campus Recover',
    subtitle: 'AI Multi-Modal Lost & Found Platform',
    description:
      'University lost & found management system built for Rishihood University. Combines CLIP visual embeddings, Sentence-Transformers semantic text matching, interactive OpenStreetMap GIS radar, and Argon2id blind verification.',
    tags: ['FastAPI', 'PyTorch', 'CLIP ViT-B/32', 'React 19', 'Leaflet', '85 Tests'],
    githubUrl: 'https://github.com/oreoviru/Campus-Recover',
    liveUrl: 'https://frontend-ecru-gamma-87.vercel.app',
    icon: Search,
  },
  {
    title: 'PuzzleCam',
    subtitle: 'Gesture-Controlled Photobooth & 3x3 Puzzle',
    description:
      'Zero-install browser photobooth. Captures photos using hands as a physical frame, converts snapshots into an interactive 3x3 puzzle solved via pinch gestures, and exports downloadable photo strips.',
    tags: ['JavaScript (ES6+)', 'MediaPipe Hands', 'HTML5 Canvas', 'WebCam API'],
    githubUrl: 'https://github.com/oreoviru/PuzzleCam',
    icon: Camera,
  },
  {
    title: 'RetroLens',
    subtitle: 'Gesture-Driven Computer Vision FX Engine',
    description:
      'Real-time hand-tracked visual portal featuring 11 live shaders (Thermal, Glitch, Neon Canny Edge, Rainbow Wave). Users scale the portal with spread hands, pinch to cycle filters, and toggle 2D/3D wireframe mesh modes.',
    tags: ['Python', 'OpenCV', 'MediaPipe', 'NumPy'],
    githubUrl: 'https://github.com/oreoviru/Retrolens',
    icon: Layers,
  },
]

type NeuroMode = 'coding' | 'auth' | 'voice' | 'organizer' | 'media'

interface ModeData {
  title: string
  command: string
  output: string[]
  badge: string
}

const NEURO_MODES: Record<NeuroMode, ModeData> = {
  coding: {
    title: 'Coding Mode Routine',
    command: 'neuro execute routine --preset="coding_mode"',
    badge: 'Routine Automation',
    output: [
      '[NEURO CORE] Routine triggered: "Coding Mode"',
      '▸ Launching VS Code workspace...',
      '▸ Spawning macOS zsh Terminal in project root...',
      '▸ Initiating Spotify: Resuming Lo-Fi Deep Focus playlist...',
      '▸ Opening GitHub notifications & pull requests in Chrome...',
      '✔ Status: 4 applications loaded in 840ms. Focus mode engaged.',
    ],
  },
  auth: {
    title: 'YOLOv8 Biometric Face ID',
    command: 'neuro auth --method=biometric --engine=yolov8',
    badge: 'Biometric Security',
    output: [
      '[VISION HUD] Activating webcam stream (Port 8000)...',
      '▸ YOLOv8 Face Detection: Target locked at [X: 342, Y: 188]',
      '▸ Computing 3D facial coordinate landmarks...',
      '▸ Facial hash match confidence: 99.4% [Viraj Salunkhe]',
      '✔ Security Clearance: Granted. NEURO unlocked.',
    ],
  },
  voice: {
    title: 'Neural Audio Engine (Edge-TTS)',
    command: 'neuro voice --model="en-US-AvaNeural" --sanitize=true',
    badge: '24kHz Neural Audio',
    output: [
      '[SPEECH PIPELINE] Input text received with markdown & code blocks.',
      '▸ Sanitizer: Stripped backticks, URLs, and emojis...',
      '▸ Synthesizing high-fidelity 24kHz 48kbps neural audio stream...',
      '▸ Output voice: en-US-AvaNeural (Humanoid Inflection)',
      '✔ Voice playback rendered smoothly without stutter.',
    ],
  },
  organizer: {
    title: 'Smart Downloads Organizer',
    command: 'neuro fs organize ~/Downloads --categorize=auto',
    badge: 'File Automation',
    output: [
      '[FILE AGENT] Scanning ~/Downloads directory (84 items found)...',
      '▸ 23 PDFs moved to ~/Downloads/PDFs/',
      '▸ 31 Images moved to ~/Downloads/Images/',
      '▸ 12 Installers moved to ~/Downloads/Installers/',
      '▸ 18 Documents moved to ~/Downloads/Documents/',
      '✔ Downloads cleaned and categorized in 120ms.',
    ],
  },
  media: {
    title: 'Spotify & Apple Music Controller',
    command: 'neuro media query-track && neuro media volume 80',
    badge: 'AppleScript Bridge',
    output: [
      '[APPLESCRIPT BRIDGE] Inspecting Spotify player process...',
      '▸ Current Track: "Starboy" by The Weeknd',
      '▸ Playback state: Playing [01:42 / 03:50]',
      '▸ Adjusting system output volume to 80%...',
      '✔ Live metadata streamed to HUD widget.',
    ],
  },
}

export default function Projects() {
  const [activeMode, setActiveMode] = useState<NeuroMode>('coding')
  const currentMode = NEURO_MODES[activeMode]

  return (
    <main className="relative min-h-[100dvh] w-full bg-black selection:bg-cream selection:text-black">
      {/* ─── Fixed Background ─── */}
      <img
        src={BG_IMAGE}
        alt=""
        className="fixed inset-0 h-full w-full object-cover anim-fade-in pointer-events-none"
      />

      {/* ─── Editorial Dark Veil ─── */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-[2px] pointer-events-none" />

      {/* ─── Top Navigation ─── */}
      <header className="relative z-20 flex items-center justify-between px-6 pt-6 sm:px-10 sm:pt-8 text-cream">
        <Link
          to="/"
          className="font-hn text-lg tracking-wide hover:opacity-60 transition-opacity duration-300"
        >
          Viraj
        </Link>
        <div className="flex items-center gap-6 sm:gap-8 text-sm">
          <Link
            to="/about"
            className="font-hn hover:opacity-60 transition-opacity duration-300"
          >
            ABOUT ME
          </Link>
          <Link
            to="/contact"
            className="font-hn hover:opacity-60 transition-opacity duration-300"
          >
            CONTACT
          </Link>
          <Link
            to="/"
            className="font-hn flex items-center gap-2 hover:opacity-60 transition-opacity duration-300 group"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            <span className="hidden sm:inline">Back to Home</span>
          </Link>
        </div>
      </header>

      {/* ─── Main Content Container ─── */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-12 sm:px-10 sm:py-20">
        {/* Title Header */}
        <div className="mb-14">
          <p className="font-hn text-xs uppercase tracking-[0.25em] text-cream/50 mb-2">
            Engineered Systems &amp; Experiments
          </p>
          <h1 className="font-hn text-5xl sm:text-7xl text-cream tracking-tight anim-fade-up leading-tight">
            Featured Projects
          </h1>
          <p className="font-hn text-base sm:text-lg text-cream/70 mt-3 max-w-2xl font-light">
            Autonomous AI assistants, computer vision pipelines, multi-modal search engines, and flight-aware distributed systems.
          </p>
          <div className="h-0.5 w-16 bg-cream mt-6 anim-line" />
        </div>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* 🌟 FLAGSHIP SPOTLIGHT: NEURO                                       */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <section className="mb-24 rounded-3xl border border-cream/25 bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-transparent p-6 sm:p-10 backdrop-blur-xl relative overflow-hidden shadow-[0_25px_60px_-15px_rgba(239,238,233,0.12)] anim-fade-up">
          {/* Ambient Glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-cream/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-cream/5 blur-3xl" />

          {/* Top Flagship Banner */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-cream/15 pb-6 mb-8">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cream/40 bg-cream/10 px-3.5 py-1 text-xs font-hn tracking-wider uppercase text-cream font-medium">
                <Sparkles size={13} className="text-cream" />
                Flagship Project
              </span>
              <span className="text-xs font-hn tracking-widest text-cream/50 uppercase hidden sm:inline">
                macOS AI Automation Core
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>SYSTEM ONLINE</span>
            </div>
          </div>

          {/* Main Info + Simulator Layout */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left 6 Cols: Info & Overview */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <h2 className="font-hn text-4xl sm:text-5xl text-cream tracking-tight font-medium">
                  NEURO
                </h2>
                <p className="font-hn text-lg sm:text-xl text-cream/80 mt-1 font-light">
                  Autonomous AI &amp; macOS Automation System
                </p>
              </div>

              <p className="font-hn text-sm sm:text-base text-cream/75 leading-relaxed font-light">
                An advanced, local-first intelligent assistant calibrated specifically for macOS. NEURO fuses real-time computer vision (YOLOv8), local LLM reasoning via Ollama, hands-free 24kHz neural speech (Edge-TTS), biometric face recognition, deep AppleScript app orchestration, and automated workspace routines into a unified HUD.
              </p>

              {/* Core Feature Bullets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-hn text-cream/90 pt-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-cream/80 shrink-0" />
                  <span>YOLOv8 Biometric Face ID</span>
                </div>
                <div className="flex items-center gap-2">
                  <Volume2 size={16} className="text-cream/80 shrink-0" />
                  <span>24kHz AvaNeural Voice</span>
                </div>
                <div className="flex items-center gap-2">
                  <FolderSync size={16} className="text-cream/80 shrink-0" />
                  <span>Smart ~/Downloads Organizer</span>
                </div>
                <div className="flex items-center gap-2">
                  <Music size={16} className="text-cream/80 shrink-0" />
                  <span>Spotify AppleScript Engine</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock size={16} className="text-cream/80 shrink-0" />
                  <span>Passcode Gatekeeper Mode</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-cream/80 shrink-0" />
                  <span>Multi-App Routine Launcher</span>
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div className="pt-2">
                <p className="text-[11px] font-hn uppercase tracking-wider text-cream/50 mb-2.5">
                  Built With
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Python',
                    'YOLOv8',
                    'FastAPI',
                    'Ollama LLM',
                    'Node.js',
                    'AppleScript',
                    'Edge-TTS',
                    'React HUD',
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg border border-cream/20 bg-cream/5 px-2.5 py-1 text-xs font-hn text-cream/85"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-xl border border-cream/30 bg-cream/10 text-cream px-4 py-2 font-hn text-xs tracking-wide">
                  <Lock size={14} className="text-cream/80" />
                  <span>Private Repository &bull; Proprietary Core</span>
                </span>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=oreoviru2008@gmail.com&su=Inquiry%20regarding%20NEURO%20AI%20Assistant"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-cream text-black px-4 py-2 font-hn text-xs font-medium hover:bg-cream/90 transition-all hover:scale-105 active:scale-95 duration-200"
                >
                  <span>Request System Demo</span>
                </a>
              </div>
            </div>

            {/* Right 6 Cols: Interactive Live Terminal / Command HUD */}
            <div className="lg:col-span-6 rounded-2xl border border-cream/20 bg-black/70 p-5 sm:p-6 backdrop-blur-md flex flex-col justify-between">
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between border-b border-cream/15 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
                  <span className="h-3 w-3 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="h-3 w-3 rounded-full bg-green-500/80 inline-block" />
                  <span className="ml-2 font-mono text-xs text-cream/60">neuro-daemon@viraj-macbook</span>
                </div>
                <Terminal size={15} className="text-cream/50" />
              </div>

              {/* Mode Selectors */}
              <div className="mb-4">
                <p className="text-[11px] font-hn uppercase tracking-wider text-cream/50 mb-2">
                  Simulate NEURO Capabilities:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {(Object.keys(NEURO_MODES) as NeuroMode[]).map((modeKey) => (
                    <button
                      key={modeKey}
                      onClick={() => setActiveMode(modeKey)}
                      className={`rounded-lg px-2.5 py-1 text-xs font-mono transition-all duration-200 ${
                        activeMode === modeKey
                          ? 'bg-cream text-black font-semibold'
                          : 'bg-white/5 text-cream/70 hover:bg-white/10 hover:text-cream border border-cream/10'
                      }`}
                    >
                      {NEURO_MODES[modeKey].title.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Command Prompt */}
              <div className="rounded-lg bg-black/90 border border-cream/10 p-3 font-mono text-xs text-cream mb-4">
                <span className="text-emerald-400">$ </span>
                <span className="text-cream/90">{currentMode.command}</span>
              </div>

              {/* Output Stream */}
              <div className="space-y-2 rounded-lg bg-black/50 p-3.5 font-mono text-xs text-cream/80 min-h-[170px] border border-white/5">
                <div className="flex items-center justify-between text-[10px] text-cream/40 uppercase tracking-widest border-b border-white/5 pb-1 mb-2">
                  <span>Stream Log</span>
                  <span>{currentMode.badge}</span>
                </div>
                {currentMode.output.map((line, idx) => (
                  <p
                    key={idx}
                    className={
                      line.startsWith('✔')
                        ? 'text-emerald-400 font-semibold'
                        : line.startsWith('▸')
                        ? 'text-cream/70 pl-2'
                        : 'text-cream/90'
                    }
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* OTHER STANDOUT REPOSITORIES                                         */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <div>
          <div className="mb-8">
            <p className="font-hn text-xs uppercase tracking-[0.25em] text-cream/50 mb-1">
              More Work &amp; Research
            </p>
            <h2 className="font-hn text-3xl sm:text-4xl text-cream tracking-tight">
              Other Standout Repositories
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {OTHER_PROJECTS.map((project) => {
              const Icon = project.icon
              return (
                <div
                  key={project.title}
                  className="group rounded-2xl border border-cream/15 bg-white/[0.03] p-6 sm:p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-cream/40 hover:bg-white/[0.07] hover:shadow-[0_16px_35px_-10px_rgba(239,238,233,0.12)] flex flex-col justify-between"
                >
                  <div>
                    {/* Top row */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cream/20 bg-cream/5 text-cream/80 group-hover:scale-110 group-hover:border-cream/50 group-hover:bg-cream/15 group-hover:text-cream transition-all duration-300">
                        <Icon size={22} strokeWidth={1.75} />
                      </div>
                      <div className="flex items-center gap-2">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 rounded-full border border-cream/30 bg-cream/10 px-2.5 py-1 text-xs font-hn text-cream hover:bg-cream hover:text-black transition-colors"
                            aria-label={`Live Demo of ${project.title}`}
                          >
                            <span>Live</span>
                            <ExternalLink size={11} />
                          </a>
                        )}
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 rounded-full border border-cream/20 bg-cream/5 px-2.5 py-1 text-xs font-hn text-cream/80 hover:text-cream hover:border-cream/50 transition-colors"
                          aria-label={`GitHub repo of ${project.title}`}
                        >
                          <Github size={12} />
                          <span>Code</span>
                        </a>
                      </div>
                    </div>

                    {/* Title + Subtitle */}
                    <h3 className="font-hn text-2xl text-cream font-medium tracking-tight mb-1">
                      {project.title}
                    </h3>
                    <p className="font-hn text-xs uppercase tracking-wider text-cream/50 mb-3 font-mono">
                      {project.subtitle}
                    </p>

                    {/* Description */}
                    <p className="font-hn text-sm text-cream/70 leading-relaxed font-light mb-6">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-cream/10">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-cream/10 bg-cream/5 px-2 py-0.5 text-[11px] font-hn text-cream/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ─── Bottom Footer ─── */}
        <div className="mt-24 pt-10 border-t border-cream/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-hn text-cream/60">
          <p>© {new Date().getFullYear()} Viraj Salunkhe. Open Source &amp; Research.</p>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/oreoviru"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cream transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.instagram.com/oreo._.viru/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cream transition-colors"
            >
              Instagram
            </a>
            <Link to="/contact" className="hover:text-cream transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

