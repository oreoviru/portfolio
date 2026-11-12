import { useState, useEffect, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { X } from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'About Me', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

const SOCIAL_LINKS = [
  { label: 'Instagram', url: 'https://www.instagram.com/oreo._.viru/' },
  { label: 'GitHub', url: 'https://github.com/oreoviru' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/viraj-salunkhe/' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const closeDrawer = useCallback(() => setDrawerOpen(false), [])

  // Close mobile drawer and reset scroll position on route change
  useEffect(() => {
    setDrawerOpen(false)
    window.scrollTo(0, 0)
  }, [pathname])

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [drawerOpen])

  // Close mobile drawer on Escape key
  useEffect(() => {
    if (!drawerOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [drawerOpen])

  const currentLabel =
    NAV_ITEMS.find((item) => item.to === pathname)?.label ?? 'Menu'

  return (
    <>
      {/* ─── Desktop Floating Glass Pill ─── */}
      <nav
        aria-label="Primary navigation"
        className="hidden sm:flex fixed top-5 left-1/2 -translate-x-1/2 z-40 items-center gap-1 rounded-full border border-cream/20 bg-black/60 p-1.5 backdrop-blur-xl shadow-[0_12px_36px_-8px_rgba(0,0,0,0.85)] ring-1 ring-white/[0.06] anim-fade-in"
      >
        <Link
          to="/"
          className="px-4 py-1.5 font-hn text-sm tracking-wide text-cream hover:opacity-75 transition-opacity duration-300 whitespace-nowrap"
        >
          Viraj
        </Link>

        <span className="h-4 w-px bg-cream/15 mx-0.5" aria-hidden="true" />

        <div className="flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.to
            return (
              <Link
                key={item.to}
                to={item.to}
                aria-current={isActive ? 'page' : undefined}
                className={`rounded-full px-4 py-1.5 font-hn text-xs uppercase tracking-[0.12em] whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? 'bg-cream text-black font-medium shadow-[0_2px_12px_rgba(239,238,233,0.28)]'
                    : 'text-cream/75 hover:text-cream hover:bg-white/[0.08]'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* ─── Mobile Floating Glass Pill Bar ─── */}
      <nav
        aria-label="Mobile navigation"
        className="sm:hidden fixed top-4 inset-x-4 z-40 mx-auto flex max-w-sm items-center justify-between rounded-full border border-cream/20 bg-black/65 pl-5 pr-3 py-1.5 backdrop-blur-xl shadow-[0_12px_36px_-8px_rgba(0,0,0,0.85)] ring-1 ring-white/[0.06]"
      >
        <Link
          to="/"
          className="font-hn text-base tracking-wide text-cream hover:opacity-75 transition-opacity"
        >
          Viraj
        </Link>

        <div className="flex items-center gap-3">
          <span className="rounded-full border border-cream/15 bg-white/[0.05] px-3 py-0.5 font-hn text-[10px] uppercase tracking-[0.16em] text-cream/75">
            {currentLabel}
          </span>

          <button
            className="relative h-9 w-9 flex flex-col items-center justify-center rounded-full hover:bg-white/[0.08] transition-colors"
            onClick={() => setDrawerOpen((v) => !v)}
            aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={drawerOpen}
          >
            <span
              className="block h-[1px] w-5 bg-cream transition-transform duration-500"
              style={{
                transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)',
                transform: drawerOpen
                  ? 'translateY(0) rotate(45deg)'
                  : 'translateY(-3.5px) rotate(0deg)',
              }}
            />
            <span
              className="block h-[1px] w-5 bg-cream transition-opacity duration-300"
              style={{ opacity: drawerOpen ? 0 : 1 }}
            />
            <span
              className="block h-[1px] w-5 bg-cream transition-transform duration-500"
              style={{
                transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)',
                transform: drawerOpen
                  ? 'translateY(0) rotate(-45deg)'
                  : 'translateY(3.5px) rotate(0deg)',
              }}
            />
          </button>
        </div>
      </nav>

      {/* ─── Mobile Slide-Out Drawer ─── */}
      <div className="sm:hidden">
        <div
          className={`fixed inset-0 z-40 bg-black/45 backdrop-blur-sm transition-opacity duration-500 ${
            drawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={closeDrawer}
        />

        <div
          className={`fixed inset-y-0 right-0 z-50 w-[80%] max-w-sm bg-[#141414]/95 backdrop-blur-xl border-l border-cream/10 px-8 py-10 transition-transform duration-[600ms] flex flex-col ${
            drawerOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)' }}
        >
          <button
            onClick={closeDrawer}
            className="absolute right-6 top-6 z-50 text-cream transition-all duration-300"
            style={{
              opacity: drawerOpen ? 1 : 0,
              transform: drawerOpen ? 'rotate(0deg)' : 'rotate(90deg)',
              transitionDelay: drawerOpen ? '300ms' : '0ms',
            }}
            aria-label="Close menu"
          >
            <X size={26} strokeWidth={1.5} />
          </button>

          <div className="mt-12">
            <p
              className="uppercase tracking-[0.2em] text-cream/50 text-xs mb-4 transition-all duration-500"
              style={{
                opacity: drawerOpen ? 1 : 0,
                transform: drawerOpen ? 'translateY(0)' : 'translateY(12px)',
                transitionDelay: drawerOpen ? '250ms' : '0ms',
              }}
            >
              Site Index
            </p>
            <nav className="flex flex-col gap-3">
              {NAV_ITEMS.map((item, idx) => {
                const isActive = pathname === item.to
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={closeDrawer}
                    className={`text-3xl font-hn transition-all duration-500 flex items-center gap-3 ${
                      isActive ? 'text-cream' : 'text-cream/65 hover:text-cream'
                    }`}
                    style={{
                      opacity: drawerOpen ? 1 : 0,
                      transform: drawerOpen ? 'translateY(0)' : 'translateY(24px)',
                      transitionDelay: drawerOpen ? `${260 + idx * 55}ms` : '0ms',
                    }}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full transition-opacity ${
                        isActive ? 'bg-cream opacity-100' : 'opacity-0'
                      }`}
                    />
                    <span className="uppercase">{item.label}</span>
                  </Link>
                )
              })}
            </nav>
          </div>

          <div className="mt-12">
            <p
              className="uppercase tracking-[0.2em] text-cream/50 text-xs mb-4 transition-all duration-500"
              style={{
                opacity: drawerOpen ? 1 : 0,
                transform: drawerOpen ? 'translateY(0)' : 'translateY(12px)',
                transitionDelay: drawerOpen ? '500ms' : '0ms',
              }}
            >
              Find Me
            </p>
            <div className="flex flex-wrap gap-4">
              {SOCIAL_LINKS.map((link, i) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-cream/80 hover:text-cream font-hn transition-all duration-500"
                  style={{
                    opacity: drawerOpen ? 1 : 0,
                    transform: drawerOpen ? 'translateY(0)' : 'translateY(16px)',
                    transitionDelay: drawerOpen ? `${550 + i * 60}ms` : '0ms',
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
