import { useEffect, useState, useRef } from 'react'

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  // Position refs for high-performance rAF interpolation
  const posRef = useRef({
    targetX: -100,
    targetY: -100,
    currentX: -100,
    currentY: -100,
  })

  useEffect(() => {
    // Only enable on desktop mouse/trackpad devices without reduced-motion preference
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!finePointer || reducedMotion) {
      setEnabled(false)
      return
    }

    setEnabled(true)

    let rafId = 0

    // Animation frame loop for buttery-smooth ring lag
    const loop = () => {
      const pos = posRef.current
      pos.currentX += (pos.targetX - pos.currentX) * 0.2
      pos.currentY += (pos.targetY - pos.currentY) * 0.2

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.targetX}px, ${pos.targetY}px, 0)`
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${pos.currentX}px, ${pos.currentY}px, 0)`
      }

      rafId = requestAnimationFrame(loop)
    }

    rafId = requestAnimationFrame(loop)

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return

      posRef.current.targetX = e.clientX
      posRef.current.targetY = e.clientY

      setIsVisible(true)

      // Interactive element detection
      const target = e.target as HTMLElement | null
      if (target) {
        const isInteractive = Boolean(
          target.closest(
            'a, button, input, textarea, select, [role="button"], label, [data-cursor="pointer"]'
          )
        )
        setIsHovered(isInteractive)
      }
    }

    const handlePointerDown = () => setIsClicking(true)
    const handlePointerUp = () => setIsClicking(false)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)
    const handleBlur = () => setIsVisible(false)

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('pointerup', handlePointerUp)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    window.addEventListener('blur', handleBlur)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('pointerup', handlePointerUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('blur', handleBlur)
    }
  }, [])

  if (!enabled) return null

  const ringSize = isHovered ? 'w-12 h-12 -ml-6 -mt-6' : 'w-8 h-8 -ml-4 -mt-4'

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-[100] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Outer Interpolated Halo Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full border will-change-transform transition-[width,height,margin,border-color,background-color,transform] duration-200 ${ringSize} ${
          isClicking
            ? 'border-cream bg-cream/25 scale-90'
            : isHovered
            ? 'border-cream/80 bg-cream/15 scale-110 shadow-[0_0_20px_rgba(239,238,233,0.25)]'
            : 'border-cream/40 bg-cream/[0.04]'
        }`}
      />

      {/* Center Precise Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 h-1.5 w-1.5 -ml-[3px] -mt-[3px] rounded-full bg-cream will-change-transform transition-transform duration-150 ${
          isHovered ? 'scale-75 opacity-70' : 'scale-100 opacity-100'
        }`}
      />
    </div>
  )
}
