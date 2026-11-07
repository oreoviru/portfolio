import { useState, useEffect, useRef, useCallback } from 'react'
import { Volume2, VolumeX, FastForward, Terminal, Sparkles, Cpu } from 'lucide-react'

interface IntroSequenceProps {
  onComplete: () => void
}

export default function IntroSequence({ onComplete }: IntroSequenceProps) {
  const [seconds, setSeconds] = useState(0)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [isFadingOut, setIsFadingOut] = useState(false)

  // Audio Context & Nodes refs
  const audioCtxRef = useRef<AudioContext | null>(null)
  const masterGainRef = useRef<GainNode | null>(null)
  const droneOscsRef = useRef<OscillatorNode[]>([])
  const soundEnabledRef = useRef(false)
  const onCompleteRef = useRef(onComplete)
  const hasTriggeredImpact = useRef(false)
  const hasTriggeredPhase2 = useRef(false)
  const hasTriggeredWhoosh = useRef(false)

  useEffect(() => {
    soundEnabledRef.current = soundEnabled
  }, [soundEnabled])

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  // Initialize Web Audio API synthesizer
  const initAudio = useCallback(() => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!AudioCtx) return

      let ctx = audioCtxRef.current
      if (!ctx || ctx.state === 'closed') {
        ctx = new AudioCtx()
        audioCtxRef.current = ctx
      }

      if (ctx.state === 'suspended') {
        ctx.resume()
      }

      // Master Gain
      const masterGain = ctx.createGain()
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime)
      masterGain.gain.exponentialRampToValueAtTime(0.28, ctx.currentTime + 0.6)
      masterGain.connect(ctx.destination)
      masterGainRef.current = masterGain

      // Cinematic Ambient Drone (55Hz sub + 110Hz warm overtone)
      const subOsc = ctx.createOscillator()
      subOsc.type = 'sine'
      subOsc.frequency.setValueAtTime(55, ctx.currentTime) // A1

      const overtoneOsc = ctx.createOscillator()
      overtoneOsc.type = 'triangle'
      overtoneOsc.frequency.setValueAtTime(110, ctx.currentTime) // A2

      // Lowpass filter for warm cinematic body
      const filter = ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(160, ctx.currentTime)
      filter.Q.setValueAtTime(2, ctx.currentTime)

      const droneGain = ctx.createGain()
      droneGain.gain.setValueAtTime(0.18, ctx.currentTime)

      subOsc.connect(filter)
      overtoneOsc.connect(filter)
      filter.connect(droneGain)
      droneGain.connect(masterGain)

      subOsc.start()
      overtoneOsc.start()
      droneOscsRef.current = [subOsc, overtoneOsc]
    } catch {
      // Audio not permitted or supported
    }
  }, [])

  // Play synthesized SFX
  const playSfx = useCallback((type: 'chirp' | 'impact' | 'whoosh' | 'chime') => {
    if (!soundEnabledRef.current || !audioCtxRef.current || !masterGainRef.current) return
    const ctx = audioCtxRef.current
    if (ctx.state === 'suspended') {
      ctx.resume()
    }
    const now = ctx.currentTime

    try {
      if (type === 'chirp') {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sine'
        const freq = 650 + Math.random() * 450
        osc.frequency.setValueAtTime(freq, now)
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.07)
        gain.gain.setValueAtTime(0.06, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07)
        osc.connect(gain)
        gain.connect(masterGainRef.current)
        osc.start(now)
        osc.stop(now + 0.07)
      } else if (type === 'chime') {
        // High harmonic activation chime
        const freqs = [554.37, 659.25, 830.61] // C#5, E5, G#5 (ambient cinematic chord)
        freqs.forEach((f, idx) => {
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()
          osc.type = 'sine'
          osc.frequency.setValueAtTime(f, now + idx * 0.05)
          gain.gain.setValueAtTime(0.001, now + idx * 0.05)
          gain.gain.exponentialRampToValueAtTime(0.08, now + idx * 0.05 + 0.05)
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.9)
          osc.connect(gain)
          gain.connect(masterGainRef.current!)
          osc.start(now + idx * 0.05)
          osc.stop(now + idx * 0.05 + 0.95)
        })
      } else if (type === 'impact') {
        // Cinematic sub-bass drop / impact
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(115, now)
        osc.frequency.exponentialRampToValueAtTime(28, now + 1.4)
        gain.gain.setValueAtTime(0.4, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.4)
        osc.connect(gain)
        gain.connect(masterGainRef.current)
        osc.start(now)
        osc.stop(now + 1.4)
      } else if (type === 'whoosh') {
        // Filter sweep transition
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(120, now)
        osc.frequency.linearRampToValueAtTime(450, now + 0.35)
        osc.frequency.exponentialRampToValueAtTime(60, now + 0.8)
        gain.gain.setValueAtTime(0.12, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8)
        osc.connect(gain)
        gain.connect(masterGainRef.current)
        osc.start(now)
        osc.stop(now + 0.8)
      }
    } catch {
      // Audio node error safe ignore
    }
  }, [])

  const toggleSound = () => {
    if (!soundEnabled) {
      initAudio()
      setSoundEnabled(true)
      soundEnabledRef.current = true
      setTimeout(() => playSfx('chime'), 80)
    } else {
      if (masterGainRef.current && audioCtxRef.current) {
        masterGainRef.current.gain.linearRampToValueAtTime(
          0.001,
          audioCtxRef.current.currentTime + 0.15
        )
      }
      setSoundEnabled(false)
      soundEnabledRef.current = false
    }
  }

  const cleanupAudio = useCallback(() => {
    try {
      if (masterGainRef.current && audioCtxRef.current) {
        masterGainRef.current.gain.linearRampToValueAtTime(
          0.001,
          audioCtxRef.current.currentTime + 0.4
        )
      }
      setTimeout(() => {
        droneOscsRef.current.forEach((osc) => {
          try {
            osc.stop()
            osc.disconnect()
          } catch {
            // ignore
          }
        })
        droneOscsRef.current = []
        if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
          audioCtxRef.current.close().catch(() => {})
        }
      }, 450)
    } catch {
      // ignore
    }
  }, [])

  const handleSkip = useCallback(() => {
    setIsFadingOut(true)
    cleanupAudio()
    setTimeout(() => {
      onCompleteRef.current()
    }, 400)
  }, [cleanupAudio])

  // 10-second master clock (independent of audio state re-renders)
  useEffect(() => {
    const startTime = Date.now()
    const totalDuration = 10000 // 10.0 seconds

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const currentSeconds = Math.min(10, elapsed / 1000)
      setSeconds(currentSeconds)

      // Phase 2 sound cue
      if (currentSeconds >= 3.0 && !hasTriggeredPhase2.current) {
        hasTriggeredPhase2.current = true
        playSfx('chirp')
      }

      // Climax Impact sound cue at 6.2s
      if (currentSeconds >= 6.2 && !hasTriggeredImpact.current) {
        hasTriggeredImpact.current = true
        playSfx('impact')
      }

      // Whoosh sound cue at 8.8s
      if (currentSeconds >= 8.8 && !hasTriggeredWhoosh.current) {
        hasTriggeredWhoosh.current = true
        playSfx('whoosh')
      }

      // Start graceful fade out at 9.2s
      if (elapsed >= 9200) {
        setIsFadingOut(true)
      }

      // Conclude sequence at 10.0s
      if (elapsed >= totalDuration) {
        clearInterval(interval)
        cleanupAudio()
        onCompleteRef.current()
      }
    }, 40)

    return () => {
      clearInterval(interval)
      cleanupAudio()
    }
  }, [cleanupAudio, playSfx])

  // Keyboard shortcut: Escape or Space to skip immediately
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.code === 'Space') {
        e.preventDefault()
        handleSkip()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleSkip])

  const progressPercent = Math.min(100, (seconds / 10) * 100)

  return (
    <div
      className={`fixed inset-0 z-[60] flex flex-col justify-between bg-black text-cream select-none transition-opacity duration-700 font-hn ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* ─── Cybernetic Ambient Grid & Radial Vignette ─── */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(25,25,25,0.8)_0%,_rgba(0,0,0,1)_90%)] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(239, 238, 233, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(239, 238, 233, 0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Subtle pulsing concentric ring in center */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full border border-cream/[0.04] pointer-events-none animate-pulse" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] rounded-full border border-cream/[0.02] pointer-events-none" />

      {/* ─── Top Telemetry & Audio Control Bar ─── */}
      <div className="relative z-20 flex items-center justify-between px-6 py-6 sm:px-10 sm:py-8">
        <div className="flex items-center gap-3">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-mono text-xs tracking-widest text-cream/70 uppercase">
            SEQUENCE // 00:{seconds < 10 ? `0${seconds.toFixed(1)}` : '10.0'}
          </span>
        </div>

        {/* Audio Toggle & Skip Button */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            onClick={toggleSound}
            className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-mono transition-all duration-300 ${
              soundEnabled
                ? 'border-emerald-400/80 bg-emerald-400/15 text-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.25)]'
                : 'border-cream/25 bg-white/[0.05] text-cream/70 hover:border-cream/50 hover:text-cream'
            }`}
            aria-label="Toggle Audio"
          >
            {soundEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
            <span>Sound: {soundEnabled ? 'ON' : 'OFF'}</span>
          </button>

          <button
            onClick={handleSkip}
            className="flex items-center gap-1.5 rounded-full border border-cream/25 bg-white/[0.05] px-3.5 py-1.5 text-xs font-mono text-cream/80 hover:border-cream/70 hover:bg-cream hover:text-black transition-all duration-300"
            aria-label="Skip Intro"
          >
            <span>Skip</span>
            <FastForward size={12} />
          </button>
        </div>
      </div>

      {/* ─── Center Cinematic Content (3 Distinct Visual Phases) ─── */}
      <div className="relative z-10 mx-auto w-full max-w-4xl px-6 flex-1 flex flex-col items-center justify-center text-center">
        {/* PHASE 1 (0.0s – 3.0s): System Boot & Core Identity */}
        {seconds < 3.0 && (
          <div className="space-y-4 animate-in fade-in duration-500">
            <div className="inline-flex items-center gap-2 rounded-full border border-cream/20 bg-cream/5 px-3.5 py-1 text-xs font-mono uppercase tracking-widest text-cream/60">
              <Terminal size={12} />
              <span>Phase 01 &bull; System Boot</span>
            </div>
            <h2 className="font-hn text-3xl sm:text-6xl font-light tracking-tight text-cream">
              VIRAJ SALUNKHE
            </h2>
            <p className="font-mono text-xs sm:text-sm text-cream/60 tracking-wider">
              AI &amp; ML Engineer &bull; Full-Stack Architect
            </p>
            {!soundEnabled && seconds < 2.5 && (
              <p className="text-[11px] font-mono text-emerald-400/80 pt-2 animate-pulse">
                Click &ldquo;Sound: OFF&rdquo; top right for cinematic audio
              </p>
            )}
          </div>
        )}

        {/* PHASE 2 (3.0s – 6.2s): Neural Architecture & Capabilities */}
        {seconds >= 3.0 && seconds < 6.2 && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3.5 py-1 text-xs font-mono uppercase tracking-widest text-emerald-300">
              <Cpu size={12} />
              <span>Phase 02 &bull; Neural Engines</span>
            </div>
            <div className="space-y-2">
              <p className="font-hn text-2xl sm:text-4xl text-cream tracking-tight font-light">
                Autonomous AI &bull; Computer Vision &bull; Distributed Web
              </p>
              <p className="font-mono text-xs sm:text-sm text-emerald-400/90 tracking-widest">
                [PYTORCH &bull; YOLOV8 &bull; OLLAMA &bull; REACT 19 &bull; THREE.JS]
              </p>
            </div>
            <p className="font-mono text-xs text-cream/50">
              Calibrating 3D depth, marquees, and system telemetry...
            </p>
          </div>
        )}

        {/* PHASE 3 (6.2s – 10.0s): Climax Signature Reveal */}
        {seconds >= 6.2 && (
          <div className="space-y-5 animate-in fade-in zoom-in-95 duration-700">
            <div className="inline-flex items-center gap-2 rounded-full border border-cream/30 bg-cream/10 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.25em] text-cream/70">
              <Sparkles size={11} className="text-emerald-400" />
              <span>PORTFOLIO COMPOSITION &bull; 2026</span>
            </div>
            <h1 className="font-hn text-5xl sm:text-7xl lg:text-8xl font-normal text-cream tracking-tight leading-none">
              Viraj &mdash; Salunkhe
            </h1>
            <p className="font-hn text-sm sm:text-lg text-cream/80 font-light max-w-xl mx-auto italic">
              &ldquo;I don&apos;t just want to learn technology; I want to use it to create something that matters.&rdquo;
            </p>
          </div>
        )}
      </div>

      {/* ─── Bottom Timeline & Progress Bar ─── */}
      <div className="relative z-20 px-6 pb-6 sm:px-10 sm:pb-8">
        <div className="flex items-center justify-between text-[11px] font-mono text-cream/50 mb-2">
          <span className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-cream/50" />
            INITIALIZING EXPERIENCE
          </span>
          <span>{Math.round(progressPercent)}%</span>
        </div>

        {/* 10-second Progress Bar */}
        <div className="relative h-1 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full bg-cream transition-all duration-75 ease-linear"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <p className="text-center font-mono text-[10px] text-cream/40 mt-3 hidden sm:block">
          Press <kbd className="px-1 border border-cream/20 rounded">Esc</kbd> or{' '}
          <kbd className="px-1 border border-cream/20 rounded">Space</kbd> anytime to enter immediately
        </p>
      </div>
    </div>
  )
}
