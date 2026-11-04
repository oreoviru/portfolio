import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  Linkedin,
  Instagram,
  Mail,
  Github,
  Copy,
  Check,
  ExternalLink,
  MessageSquare,
  Sparkles,
} from 'lucide-react'

const BG_IMAGE =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260729_022513_486985a2-ac8c-4278-91a8-071dcd9fcaff.png&w=1280&q=85'

interface ContactChannel {
  id: string
  name: string
  handle: string
  subtitle: string
  description: string
  url: string
  icon: typeof Linkedin
  ctaText: string
  isMail?: boolean
}

const CHANNELS: ContactChannel[] = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    handle: 'in/viraj-salunkhe',
    subtitle: 'Professional Network & Career',
    description:
      'Connect for software engineering roles, technical collaboration, hackathons, and professional networking.',
    url: 'https://www.linkedin.com/in/viraj-salunkhe/',
    icon: Linkedin,
    ctaText: 'Open LinkedIn Profile',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    handle: '@oreo._.viru',
    subtitle: 'Visuals & Creative Updates',
    description:
      'Follow for behind-the-scenes development, experimental projects, creative designs, and everyday stories.',
    url: 'https://www.instagram.com/oreo._.viru/',
    icon: Instagram,
    ctaText: 'Visit Instagram',
  },
  {
    id: 'email',
    name: 'Email (Gmail)',
    handle: 'oreoviru2008@gmail.com',
    subtitle: 'Direct Inquiries & Fast Response',
    description:
      'The quickest way to get in touch regarding project partnerships, AI consulting, or freelance development.',
    url: 'https://mail.google.com/mail/?view=cm&fs=1&to=oreoviru2008@gmail.com&su=Hello%20Viraj%20-%20Project%20Inquiry',
    icon: Mail,
    ctaText: 'Compose in Gmail',
    isMail: true,
  },
  {
    id: 'github',
    name: 'GitHub',
    handle: '@oreoviru',
    subtitle: 'Code, Repositories & PRs',
    description:
      'Explore all public codebases, star repositories, review commit logs, and collaborate on open-source software.',
    url: 'https://github.com/oreoviru',
    icon: Github,
    ctaText: 'Explore GitHub Repos',
  },
]

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<string>('all')

  const copyEmail = () => {
    navigator.clipboard.writeText('oreoviru2008@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  const filteredChannels =
    activeTab === 'all'
      ? CHANNELS
      : CHANNELS.filter((c) => c.id === activeTab)

  return (
    <main className="relative min-h-[100dvh] w-full bg-black selection:bg-cream selection:text-black">
      {/* ─── Fixed Background ─── */}
      <img
        src={BG_IMAGE}
        alt=""
        className="fixed inset-0 h-full w-full object-cover anim-fade-in pointer-events-none"
      />

      {/* ─── Dark Ambient Veil ─── */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-[2px] pointer-events-none" />

      {/* ─── Top Main Navigation ─── */}
      <header className="relative z-20 flex items-center justify-between px-6 pt-6 sm:px-10 sm:pt-8 text-cream">
        <Link
          to="/"
          className="font-hn text-lg tracking-wide hover:opacity-60 transition-opacity duration-300"
        >
          Viraj
        </Link>
        <div className="flex items-center gap-6 sm:gap-8 text-sm">
          <Link
            to="/projects"
            className="font-hn hover:opacity-60 transition-opacity duration-300"
          >
            PROJECTS
          </Link>
          <Link
            to="/about"
            className="font-hn hover:opacity-60 transition-opacity duration-300"
          >
            ABOUT ME
          </Link>
          <span className="font-hn text-cream border-b border-cream/50 pb-0.5">
            CONTACT
          </span>
          <Link
            to="/"
            className="font-hn flex items-center gap-2 hover:opacity-60 transition-opacity duration-300 group"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            <span className="hidden sm:inline">Back to Home</span>
          </Link>
        </div>
      </header>

      {/* ─── Content Container ─── */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 py-12 sm:px-10 sm:py-20">
        {/* Header */}
        <div className="mb-10">
          <p className="font-hn text-xs uppercase tracking-[0.25em] text-cream/50 mb-2">
            Let&apos;s Connect &bull; Direct Channels
          </p>
          <h1 className="font-hn text-5xl sm:text-7xl text-cream tracking-tight anim-fade-up leading-tight">
            Get In Touch
          </h1>
          <p className="font-hn text-base sm:text-lg text-cream/70 mt-3 max-w-2xl font-light">
            Whether you want to discuss AI systems, build a new product together, or simply say hello &mdash; choose your preferred channel below.
          </p>
          <div className="h-0.5 w-16 bg-cream mt-6 anim-line" />
        </div>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* CLICKABLE CHANNELS NAVBAR                                         */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <div className="mb-12 rounded-2xl border border-cream/20 bg-white/[0.04] p-3 sm:p-4 backdrop-blur-xl shadow-[0_10px_30px_-10px_rgba(239,238,233,0.08)] anim-fade-up">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs font-hn uppercase tracking-[0.2em] text-cream/60 flex items-center gap-2">
              <Sparkles size={14} className="text-cream" />
              <span>Channels Navbar:</span>
            </span>

            {/* Multiple Clickable Navigation Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {CHANNELS.map((channel) => {
                const Icon = channel.icon
                return (
                  <a
                    key={channel.id}
                    href={channel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-xl border border-cream/20 bg-black/60 px-3.5 py-2 text-xs font-hn text-cream/90 hover:border-cream/50 hover:bg-cream hover:text-black transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm"
                  >
                    <Icon size={14} className="transition-transform group-hover:scale-110" />
                    <span className="font-medium">{channel.name}</span>
                    <ExternalLink size={10} className="opacity-60 group-hover:opacity-100" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* CHANNEL CARDS GRID                                                */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {CHANNELS.map((channel, idx) => {
            const Icon = channel.icon
            return (
              <div
                key={channel.id}
                className="group relative rounded-2xl border border-cream/15 bg-white/[0.03] p-6 sm:p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-cream/40 hover:bg-white/[0.07] hover:shadow-[0_20px_40px_-12px_rgba(239,238,233,0.12)] flex flex-col justify-between anim-fade-up"
                style={{ animationDelay: `${200 + idx * 80}ms` }}
              >
                <div>
                  {/* Top Header Row */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cream/20 bg-cream/5 text-cream/90 group-hover:scale-110 group-hover:border-cream/50 group-hover:bg-cream/15 group-hover:text-cream transition-all duration-300">
                      <Icon size={24} strokeWidth={1.75} />
                    </div>

                    <span className="text-[11px] font-mono font-light text-cream/50 rounded-full border border-cream/10 px-2.5 py-1 bg-black/40">
                      {channel.handle}
                    </span>
                  </div>

                  {/* Channel Title */}
                  <h2 className="font-hn text-2xl text-cream font-medium tracking-tight mb-1">
                    {channel.name}
                  </h2>
                  <p className="font-hn text-xs uppercase tracking-wider text-cream/50 mb-3 font-mono">
                    {channel.subtitle}
                  </p>

                  {/* Description */}
                  <p className="font-hn text-sm text-cream/75 leading-relaxed font-light mb-6">
                    {channel.description}
                  </p>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-cream/10 flex flex-wrap items-center gap-3">
                  <a
                    href={channel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-cream text-black px-4 py-2 text-xs font-hn font-medium hover:bg-cream/90 transition-all hover:scale-105 active:scale-95 duration-200"
                  >
                    <span>{channel.ctaText}</span>
                    <ExternalLink size={12} />
                  </a>

                  {channel.isMail && (
                    <button
                      onClick={copyEmail}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-cream/20 bg-cream/5 px-3.5 py-2 text-xs font-hn text-cream hover:bg-cream/15 hover:border-cream/40 transition-colors"
                      aria-label="Copy email address"
                    >
                      {copied ? (
                        <>
                          <Check size={13} className="text-emerald-400" />
                          <span className="text-emerald-400">Copied to Clipboard!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={13} />
                          <span>Copy Address</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* DIRECT GMAIL QUICK COMPOSE BANNER                                 */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <div className="rounded-2xl border border-cream/25 bg-gradient-to-r from-cream/10 via-cream/5 to-transparent p-6 sm:p-8 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cream text-black">
              <MessageSquare size={22} />
            </div>
            <div>
              <h3 className="font-hn text-lg sm:text-xl font-medium text-cream">
                Prefer a quick email?
              </h3>
              <p className="font-hn text-xs sm:text-sm text-cream/70 font-light mt-0.5">
                Send a message straight to <strong className="text-cream font-medium">oreoviru2008@gmail.com</strong>.
              </p>
            </div>
          </div>

          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=oreoviru2008@gmail.com&su=Portfolio%20Inquiry"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-cream text-black px-5 py-2.5 font-hn text-sm font-medium hover:bg-cream/90 transition-all hover:scale-105 active:scale-95 duration-200"
          >
            <span>Launch Gmail</span>
            <ExternalLink size={14} />
          </a>
        </div>

        {/* ─── Footer ─── */}
        <div className="mt-20 pt-8 border-t border-cream/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-hn text-cream/60">
          <p>© {new Date().getFullYear()} Viraj Salunkhe. Open to collaborations worldwide.</p>
          <div className="flex items-center gap-6">
            <Link to="/" className="hover:text-cream transition-colors">
              Home
            </Link>
            <Link to="/about" className="hover:text-cream transition-colors">
              About
            </Link>
            <Link to="/projects" className="hover:text-cream transition-colors">
              Projects
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
