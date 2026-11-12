const BG_IMAGE =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260729_022513_486985a2-ac8c-4278-91a8-071dcd9fcaff.png&w=1280&q=85'

const FRONT_IMAGE = '/portrait.png'

export default function App() {
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
    </section>
  )
}
