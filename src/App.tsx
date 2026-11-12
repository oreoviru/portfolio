import { useEffect, useRef } from 'react'

const BG_IMAGE =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260729_022513_486985a2-ac8c-4278-91a8-071dcd9fcaff.png&w=1280&q=85'

const FRONT_IMAGE = '/portrait.png'

export default function App() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const finePointer = window.matchMedia('(pointer: fine)').matches
    if (reducedMotion || !finePointer) return

    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0
    let rafId = 0
    let running = false

    const tick = () => {
      const dx = targetX - currentX
      const dy = targetY - currentY
      currentX += dx * 0.08
      currentY += dy * 0.08

      el.style.setProperty('--px', currentX.toFixed(4))
      el.style.setProperty('--py', currentY.toFixed(4))

      if (Math.abs(dx) > 0.0005 || Math.abs(dy) > 0.0005) {
        rafId = requestAnimationFrame(tick)
      } else {
        running = false
      }
    }

    const startLoop = () => {
      if (!running) {
        running = true
        rafId = requestAnimationFrame(tick)
      }
    }

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      const w = window.innerWidth || 1
      const h = window.innerHeight || 1
      targetX = (e.clientX / w - 0.5) * 2
      targetY = (e.clientY / h - 0.5) * 2
      startLoop()
    }

    const resetTarget = () => {
      targetX = 0
      targetY = 0
      startLoop()
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    document.addEventListener('mouseleave', resetTarget)
    window.addEventListener('blur', resetTarget)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('mouseleave', resetTarget)
      window.removeEventListener('blur', resetTarget)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-[100dvh] w-full overflow-hidden bg-black"
    >
      {/* ─── BG image (far depth plane) ─── */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transform:
            'translate3d(calc(var(--px, 0) * -14px), calc(var(--py, 0) * -10px), 0) scale(1.06)',
        }}
      >
        <img
          src={BG_IMAGE}
          alt=""
          className="h-full w-full object-cover anim-fade-in"
        />
      </div>

      {/* ─── Marquee (mid depth plane) ─── */}
      <div
        className="absolute inset-x-0 top-[16vh] sm:top-[14vh] z-10 overflow-hidden will-change-transform"
        style={{
          transform:
            'translate3d(calc(var(--px, 0) * 8px), calc(var(--py, 0) * 5px), 0)',
        }}
      >
        <div
          className="anim-fade-up"
          style={{ animationDelay: '500ms' }}
        >
          <div className="marquee flex w-max whitespace-nowrap font-hn text-[16vh] sm:text-[26vh] leading-none text-cream">
            <span className="pr-[6vw]">Viraj&nbsp;&mdash;&nbsp;Salunkhe&nbsp;</span>
            <span className="pr-[6vw]">Viraj&nbsp;&mdash;&nbsp;Salunkhe&nbsp;</span>
          </div>
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

      {/* ─── Front portrait (near depth plane) ─── */}
      <div className="absolute inset-x-0 bottom-0 z-20 flex justify-center items-end pointer-events-none h-full translate-y-[30%]">
        <div
          className="flex justify-center items-end h-full will-change-transform"
          style={{
            transform:
              'translate3d(calc(var(--px, 0) * 22px), calc(var(--py, 0) * 8px), 0)',
          }}
        >
          <img
            src={FRONT_IMAGE}
            alt="Portrait"
            className="h-[92vh] sm:h-[108vh] lg:h-[115vh] w-auto max-w-none object-contain object-bottom anim-rise-in select-none"
            style={{ animationDelay: '300ms' }}
          />
        </div>
      </div>
    </section>
  )
}
