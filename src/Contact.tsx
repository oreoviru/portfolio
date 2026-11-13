import { useState, useId } from 'react'
import { Link } from 'react-router-dom'
import {
  Linkedin,
  Instagram,
  Mail,
  Github,
  Copy,
  Check,
  ExternalLink,
  MessageSquare,
  Send,
  Sparkles,
  RotateCcw,
} from 'lucide-react'

const BG_IMAGE =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260729_022513_486985a2-ac8c-4278-91a8-071dcd9fcaff.png&w=1280&q=85'

const TARGET_EMAIL = 'oreoviru2008@gmail.com'

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
    handle: TARGET_EMAIL,
    subtitle: 'Direct Inquiries & Fast Response',
    description:
      'The quickest way to get in touch regarding project partnerships, AI consulting, or freelance development.',
    url: `https://mail.google.com/mail/?view=cm&fs=1&to=${TARGET_EMAIL}&su=Hello%20Viraj%20-%20Project%20Inquiry`,
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

const QUICK_TOPICS = [
  'Project Collaboration',
  'AI & Vision Systems',
  'Full-Stack Development',
  'General Inquiry',
]

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const [formName, setFormName] = useState('')
  const [formEmail, setFormEmail] = useState('')
  const [formTopic, setFormTopic] = useState(QUICK_TOPICS[0])
  const [formMessage, setFormMessage] = useState('')
  const [formStatus, setFormStatus] = useState<'idle' | 'submitted'>('idle')
  const [formCopied, setFormCopied] = useState(false)

  const nameId = useId()
  const emailId = useId()
  const messageId = useId()

  const copyEmail = () => {
    navigator.clipboard.writeText(TARGET_EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  const generateEmailBody = () => {
    return `Hello Viraj,\n\nName: ${formName || 'Not provided'}\nEmail: ${
      formEmail || 'Not provided'
    }\nTopic: ${formTopic}\n\nMessage:\n${formMessage}\n\n---\nSent from viraj-salunkhe-portfolio`
  }

  const handleSendViaGmail = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formMessage.trim()) return

    const subject = encodeURIComponent(`[${formTopic}] From ${formName || 'Portfolio Visitor'}`)
    const body = encodeURIComponent(generateEmailBody())
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${TARGET_EMAIL}&su=${subject}&body=${body}`

    window.open(gmailUrl, '_blank', 'noopener,noreferrer')
    setFormStatus('submitted')
  }

  const handleSendViaMailto = () => {
    if (!formMessage.trim()) return

    const subject = encodeURIComponent(`[${formTopic}] From ${formName || 'Portfolio Visitor'}`)
    const body = encodeURIComponent(generateEmailBody())
    window.location.href = `mailto:${TARGET_EMAIL}?subject=${subject}&body=${body}`
    setFormStatus('submitted')
  }

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(generateEmailBody())
    setFormCopied(true)
    setTimeout(() => setFormCopied(false), 2200)
  }

  const handleResetForm = () => {
    setFormName('')
    setFormEmail('')
    setFormTopic(QUICK_TOPICS[0])
    setFormMessage('')
    setFormStatus('idle')
  }

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

      {/* ─── Content Container ─── */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 pt-24 pb-16 sm:px-10 sm:pt-28 sm:pb-20">
        {/* Header */}
        <div className="mb-10">
          <p className="font-hn text-xs uppercase tracking-[0.25em] text-cream/50 mb-2">
            Let&apos;s Connect &bull; Direct Channels
          </p>
          <h1 className="font-hn text-5xl sm:text-7xl text-cream tracking-tight anim-fade-up leading-tight">
            Get In Touch
          </h1>
          <p className="font-hn text-base sm:text-lg text-cream/70 mt-3 max-w-2xl font-light">
            Whether you want to discuss AI systems, build a new product together, or simply say hello &mdash; send a message below or choose your preferred channel.
          </p>
          <div className="h-0.5 w-16 bg-cream mt-6 anim-line" />
        </div>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* CLICKABLE CHANNELS NAVBAR                                         */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <div className="mb-12 rounded-2xl border border-cream/20 bg-white/[0.04] p-3 sm:p-4 backdrop-blur-xl shadow-[0_10px_30px_-10px_rgba(239,238,233,0.08)] anim-fade-up">
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {CHANNELS.map((channel) => {
              const Icon = channel.icon
              return (
                <a
                  key={channel.id}
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-xl border border-cream/20 bg-black/60 px-4 py-2.5 text-xs sm:text-sm font-hn text-cream/90 hover:border-cream/50 hover:bg-cream hover:text-black transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm"
                >
                  <Icon size={15} className="transition-transform group-hover:scale-110" />
                  <span className="font-medium">{channel.name}</span>
                  <ExternalLink size={11} className="opacity-60 group-hover:opacity-100" />
                </a>
              )
            })}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* ✉️ INLINE EDITORIAL MESSAGE FORM                                   */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <section
          aria-label="Send direct message"
          className="mb-16 rounded-3xl border border-cream/25 bg-gradient-to-b from-white/[0.07] via-white/[0.03] to-transparent p-6 sm:p-10 backdrop-blur-xl shadow-[0_20px_50px_-12px_rgba(239,238,233,0.1)] anim-fade-up relative overflow-hidden"
        >
          {/* Subtle Ambient Glow */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cream/10 blur-3xl" />

          {formStatus === 'submitted' ? (
            /* ─── Success Confirmation State ─── */
            <div className="space-y-6 text-center py-8 anim-fade-in max-w-xl mx-auto">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/40 bg-emerald-400/10 text-emerald-400">
                <Check size={28} strokeWidth={2} />
              </div>
              <div>
                <h3 className="font-hn text-2xl sm:text-3xl text-cream font-medium tracking-tight">
                  Message Prepared
                </h3>
                <p className="font-hn text-sm text-cream/70 mt-2 font-light">
                  Your message was drafted and dispatched for <strong className="text-cream font-medium">{TARGET_EMAIL}</strong>. You can also copy the draft below.
                </p>
              </div>

              {/* Preview Box */}
              <div className="rounded-xl border border-cream/15 bg-black/60 p-4 text-left font-mono text-xs text-cream/80 space-y-1">
                <p className="text-cream/50 text-[10px] uppercase tracking-wider">Draft Summary</p>
                <p><span className="text-emerald-400">From:</span> {formName || 'Anonymous'} &lt;{formEmail || 'no-reply'}&gt;</p>
                <p><span className="text-emerald-400">Topic:</span> {formTopic}</p>
                <p className="text-cream/70 pt-2 border-t border-cream/10 line-clamp-3 italic">
                  &ldquo;{formMessage}&rdquo;
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="inline-flex items-center gap-2 rounded-xl border border-cream/25 bg-white/[0.05] px-4 py-2.5 text-xs font-hn text-cream hover:bg-cream hover:text-black transition-all duration-200"
                >
                  {formCopied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  <span>{formCopied ? 'Copied to Clipboard!' : 'Copy Draft'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="inline-flex items-center gap-2 rounded-xl border border-cream/20 bg-cream/5 px-4 py-2.5 text-xs font-hn text-cream/80 hover:text-cream hover:border-cream/40 transition-colors"
                >
                  <RotateCcw size={13} />
                  <span>Send Another Message</span>
                </button>
              </div>
            </div>
          ) : (
            /* ─── Active Form State ─── */
            <form onSubmit={handleSendViaGmail} className="space-y-6 relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cream/15 pb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <h2 className="font-hn text-2xl sm:text-3xl text-cream font-medium tracking-tight">
                      Send an Direct Message
                    </h2>
                  </div>
                  <p className="font-hn text-xs sm:text-sm text-cream/65 font-light mt-1">
                    Fill out the fields below to initiate a direct conversation. Responses usually arrive within 24 hours.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 rounded-full border border-cream/20 bg-cream/5 px-3 py-1 text-[11px] font-hn text-cream/70">
                  <Sparkles size={12} className="text-cream" />
                  <span>Direct to {TARGET_EMAIL}</span>
                </div>
              </div>

              {/* Row 1: Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor={nameId} className="block font-hn text-xs uppercase tracking-wider text-cream/60">
                    Your Name
                  </label>
                  <input
                    id={nameId}
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Alex Chen"
                    className="w-full rounded-xl border border-cream/20 bg-black/60 px-4 py-3 font-hn text-sm text-cream placeholder-cream/30 focus:border-cream/60 focus:bg-black/80 focus:outline-none transition-all duration-200"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor={emailId} className="block font-hn text-xs uppercase tracking-wider text-cream/60">
                    Your Email
                  </label>
                  <input
                    id={emailId}
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="e.g. alex@example.com"
                    className="w-full rounded-xl border border-cream/20 bg-black/60 px-4 py-3 font-hn text-sm text-cream placeholder-cream/30 focus:border-cream/60 focus:bg-black/80 focus:outline-none transition-all duration-200"
                  />
                </div>
              </div>

              {/* Row 2: Topic Chips */}
              <div className="space-y-2">
                <span className="block font-hn text-xs uppercase tracking-wider text-cream/60">
                  Inquiry Topic
                </span>
                <div className="flex flex-wrap gap-2">
                  {QUICK_TOPICS.map((topic) => {
                    const isSelected = formTopic === topic
                    return (
                      <button
                        type="button"
                        key={topic}
                        onClick={() => setFormTopic(topic)}
                        className={`rounded-full px-3.5 py-1.5 text-xs font-hn tracking-wide transition-all duration-200 ${
                          isSelected
                            ? 'bg-cream text-black font-medium shadow-[0_2px_10px_rgba(239,238,233,0.25)]'
                            : 'border border-cream/20 bg-black/50 text-cream/70 hover:border-cream/40 hover:text-cream'
                        }`}
                      >
                        {topic}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Row 3: Message Textarea */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor={messageId} className="block font-hn text-xs uppercase tracking-wider text-cream/60">
                    Your Message
                  </label>
                  <span className="text-[11px] font-mono text-cream/40">
                    {formMessage.length} characters
                  </span>
                </div>
                <textarea
                  id={messageId}
                  required
                  rows={4}
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  placeholder="Describe your project, ideas, timeline, or whatever you'd like to collaborate on..."
                  className="w-full rounded-xl border border-cream/20 bg-black/60 p-4 font-hn text-sm text-cream placeholder-cream/30 focus:border-cream/60 focus:bg-black/80 focus:outline-none transition-all duration-200 resize-y"
                />
              </div>

              {/* Row 4: Submit Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-cream/10">
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-xl bg-cream text-black px-6 py-3 font-hn text-sm font-medium hover:bg-cream/90 transition-all hover:scale-105 active:scale-95 duration-200 shadow-md"
                  >
                    <span>Launch in Gmail</span>
                    <Send size={14} />
                  </button>

                  <button
                    type="button"
                    onClick={handleSendViaMailto}
                    className="inline-flex items-center gap-2 rounded-xl border border-cream/20 bg-white/[0.04] px-4 py-3 font-hn text-xs sm:text-sm text-cream/80 hover:bg-white/[0.08] hover:text-cream hover:border-cream/40 transition-colors"
                  >
                    <Mail size={14} />
                    <span>Open in Default Mail</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleCopyMessage}
                  disabled={!formMessage.trim()}
                  className="inline-flex items-center gap-1.5 text-xs font-hn text-cream/60 hover:text-cream disabled:opacity-30 disabled:pointer-events-none transition-colors"
                >
                  {formCopied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  <span>{formCopied ? 'Draft Copied!' : 'Copy Draft Text'}</span>
                </button>
              </div>
            </form>
          )}
        </section>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* CHANNEL CARDS GRID                                                */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <div className="mb-8">
          <p className="font-hn text-xs uppercase tracking-[0.25em] text-cream/50 mb-1">
            All Platforms
          </p>
          <h2 className="font-hn text-2xl sm:text-3xl text-cream tracking-tight">
            Other Ways To Reach Out
          </h2>
        </div>

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
                  <h3 className="font-hn text-2xl text-cream font-medium tracking-tight mb-1">
                    {channel.name}
                  </h3>
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
