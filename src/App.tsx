import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { X } from 'lucide-react'

const BG_IMAGE =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260729_022513_486985a2-ac8c-4278-91a8-071dcd9fcaff.png&w=1280&q=85'

const FRONT_IMAGE = '/portrait.png'

const SOCIAL_LINKS = [
  { label: 'Instagram', url: 'https://www.instagram.com/oreo._.viru/' },
  { label: 'GitHub', url: 'https://github.com/oreoviru' },
  { label: 'Contact', url: 'https://mail.google.com/mail/?view=cm&fs=1&to=oreoviru2008@gmail.com' },
]

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  const closeDrawer = useCallback(() => setDrawerOpen(false), [])

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden bg-black">
      {/* ─── BG image ─── */}
      <img
        src={BG_IMAGE}
        alt=""
        className="absolute inset-0 h-full w-full object-cover anim-fade-in"
      />

      {/* ─── Marquee ─── */}
      <div
        className="absolute inset-x-0 top-[16vh] sm:top-[14vh] z-10 overflow-hidden anim-fade-up"
        style={{ animationDelay: '500ms' }}
      >
        <div className="marquee flex w-max whitespace-nowrap font-hn text-[16vh] sm:text-[26vh] leading-none text-cream">
          <span className="pr-[6vw]">Viraj&nbsp;&mdash;&nbsp;Salunkhe&nbsp;</span>
          <span className="pr-[6vw]">Viraj&nbsp;&mdash;&nbsp;Salunkhe&nbsp;</span>
        </div>
      </div>

      {/* ─── Cream rule ─── */}
      <div
        className="absolute inset-x-6 sm:inset-x-10 bottom-[5.5rem] sm:bottom-28 z-10 h-0.5 bg-cream anim-line"
        style={{ animationDelay: '1200ms' }}
      />

      {/* ─── Desktop footer ─── */}
      <footer className="absolute inset-x-0 bottom-0 z-10 sm:z-10 flex items-end justify-between px-6 pb-5 sm:px-10 sm:pb-8 text-xs sm:text-sm leading-relaxed font-hn text-cream">
        <div
          className="anim-fade-up"
          style={{ animationDelay: '1400ms' }}
        >
          <p>AI &amp; ML Engineer</p>
          <p>Full-Stack Developer</p>
        </div>
        <div
          className="text-right anim-fade-up"
          style={{ animationDelay: '1550ms' }}
        >
          <p>A homage to</p>
          <p>OREO&gt;_&lt;VIRU</p>
        </div>
      </footer>

      {/* ─── Front portrait ─── */}
      <div className="absolute inset-x-0 bottom-0 z-20 flex justify-center items-end pointer-events-none h-full translate-y-[30%]">
        <img
          src={FRONT_IMAGE}
          alt="Portrait"
          className="h-[92vh] sm:h-[108vh] lg:h-[115vh] w-auto max-w-none object-contain object-bottom anim-rise-in select-none"
          style={{ animationDelay: '300ms' }}
        />
      </div>

      {/* ─── Header ─── */}
      <header className="absolute inset-x-0 top-0 z-30 flex items-start justify-between px-6 pt-6 sm:px-10 sm:pt-8 text-cream">
        {/* Brand */}
        <a
          href="#"
          className="font-hn text-lg tracking-wide anim-fade-up"
          style={{ animationDelay: '800ms' }}
        >
          Viraj
        </a>

        {/* Desktop right cluster */}
        <div className="hidden sm:flex items-start gap-16 lg:gap-24">
          {/* About Me */}
          <Link
            to="/about"
            className="text-sm hover:opacity-60 transition-opacity duration-300 anim-fade-up"
            style={{ animationDelay: '1000ms' }}
          >
            ABOUT ME
          </Link>

          {/* Social */}
          <div className="flex flex-col gap-0.5 text-sm">
            {SOCIAL_LINKS.map((link, i) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-60 transition-opacity duration-300 anim-fade-up"
                style={{ animationDelay: `${1150 + i * 80}ms` }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden z-50 relative h-10 w-10 flex flex-col items-center justify-center anim-fade-up"
          style={{ animationDelay: '900ms' }}
          onClick={() => setDrawerOpen((v) => !v)}
          aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
        >
          <span
            className="block h-[1px] w-6 bg-cream transition-transform duration-500"
            style={{
              transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)',
              transform: drawerOpen
                ? 'translateY(0) rotate(45deg)'
                : 'translateY(-4px) rotate(0deg)',
            }}
          />
          <span
            className="block h-[1px] w-6 bg-cream transition-opacity duration-300"
            style={{ opacity: drawerOpen ? 0 : 1 }}
          />
          <span
            className="block h-[1px] w-6 bg-cream transition-transform duration-500"
            style={{
              transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)',
              transform: drawerOpen
                ? 'translateY(0) rotate(-45deg)'
                : 'translateY(4px) rotate(0deg)',
            }}
          />
        </button>
      </header>

      {/* ─── Mobile drawer ─── */}
      <MobileDrawer open={drawerOpen} onClose={closeDrawer} />
    </section>
  )
}

/* ─────────────────────────────────────────────────────── */
/* Mobile drawer                                           */
/* ─────────────────────────────────────────────────────── */

function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div className="sm:hidden">
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`fixed inset-y-0 right-0 z-40 w-[80%] max-w-sm bg-[#141414] px-8 py-10 transition-transform duration-[600ms] flex flex-col ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)' }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 z-50 text-cream transition-all duration-300"
          style={{
            opacity: open ? 1 : 0,
            transform: open ? 'rotate(0deg)' : 'rotate(90deg)',
            transitionDelay: open ? '300ms' : '0ms',
          }}
          aria-label="Close menu"
        >
          <X size={26} strokeWidth={1.5} />
        </button>

        {/* Site Index */}
        <div className="mt-12">
          <p
            className="uppercase tracking-[0.2em] text-cream/50 text-xs mb-4 transition-all duration-500"
            style={{
              opacity: open ? 1 : 0,
              transform: open ? 'translateY(0)' : 'translateY(12px)',
              transitionDelay: open ? '250ms' : '0ms',
            }}
          >
            Site Index
          </p>
          <nav className="flex flex-col gap-2">
            <Link
              to="/about"
              onClick={onClose}
              className="text-4xl text-cream font-hn hover:opacity-60 transition-all duration-500"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? 'translateY(0)' : 'translateY(24px)',
                transitionDelay: open ? '300ms' : '0ms',
              }}
            >
              ABOUT ME
            </Link>
          </nav>
        </div>

        {/* Find Me */}
        <div className="mt-12">
          <p
            className="uppercase tracking-[0.2em] text-cream/50 text-xs mb-4 transition-all duration-500"
            style={{
              opacity: open ? 1 : 0,
              transform: open ? 'translateY(0)' : 'translateY(12px)',
              transitionDelay: open ? '500ms' : '0ms',
            }}
          >
            Find Me
          </p>
          <div className="flex flex-wrap gap-3">
            {SOCIAL_LINKS.map((link, i) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-cream font-hn transition-all duration-500"
                style={{
                  opacity: open ? 1 : 0,
                  transform: open ? 'translateY(0)' : 'translateY(16px)',
                  transitionDelay: open ? `${550 + i * 60}ms` : '0ms',
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

