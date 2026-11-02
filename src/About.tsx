import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  Terminal,
  FileCode,
  Atom,
  Code2,
  Palette,
  Workflow,
  Brain,
  Cpu,
  GitBranch,
  Github,
  Boxes,
  Zap,
  ArrowUpRight,
} from 'lucide-react'

const BG_IMAGE =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260729_022513_486985a2-ac8c-4278-91a8-071dcd9fcaff.png&w=1280&q=85'

interface SkillItem {
  name: string
  category: string
  description: string
  icon: typeof Terminal
}

const SKILLS: SkillItem[] = [
  {
    name: 'Python',
    category: 'Core / AI',
    description: 'Scripting, backend logic, and machine learning pipelines',
    icon: Terminal,
  },
  {
    name: 'JavaScript',
    category: 'Language',
    description: 'Modern ES6+, asynchronous programming, and web runtimes',
    icon: FileCode,
  },
  {
    name: 'React',
    category: 'Frontend',
    description: 'Component architecture, reactive state, and dynamic user interfaces',
    icon: Atom,
  },
  {
    name: 'HTML',
    category: 'Markup',
    description: 'Semantic document structure, accessibility, and web standards',
    icon: Code2,
  },
  {
    name: 'CSS',
    category: 'Styling',
    description: 'Tailwind CSS, responsive design, and fluid micro-animations',
    icon: Palette,
  },
  {
    name: 'API Integration',
    category: 'Backend & Web',
    description: 'RESTful architectures, external endpoints, and webhooks',
    icon: Workflow,
  },
  {
    name: 'AI & ML',
    category: 'Intelligence',
    description: 'Large Language Models, computer vision, and intelligent agents',
    icon: Brain,
  },
  {
    name: 'Ollama',
    category: 'Local AI',
    description: 'Local LLM inference, quantized models, and self-hosted workflows',
    icon: Cpu,
  },
  {
    name: 'Git',
    category: 'Version Control',
    description: 'Distributed history tracking, branching workflows, and merging',
    icon: GitBranch,
  },
  {
    name: 'GitHub',
    category: 'Collaboration',
    description: 'Repository hosting, project tracking, and code review workflows',
    icon: Github,
  },
  {
    name: 'Three.js',
    category: '3D Graphics',
    description: 'WebGL interactive scenes, 3D coordinate spaces, and visual shaders',
    icon: Boxes,
  },
  {
    name: 'Automation',
    category: 'Productivity',
    description: 'Scripted pipelines, repetitive task elimination, and bot workflows',
    icon: Zap,
  },
]

function SkillCard({ skill, index }: { skill: SkillItem; index: number }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const Icon = skill.icon

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative overflow-hidden rounded-2xl border border-cream/15 bg-white/[0.03] p-5 sm:p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-cream/40 hover:bg-white/[0.07] hover:shadow-[0_16px_35px_-10px_rgba(239,238,233,0.12)] cursor-default anim-fade-up flex flex-col justify-between"
      style={{ animationDelay: `${300 + index * 40}ms` }}
    >
      {/* Interactive cursor spotlight effect */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 group-hover:opacity-100 opacity-0"
        style={{
          background: isHovered
            ? `radial-gradient(220px circle at ${mousePos.x}px ${mousePos.y}px, rgba(239, 238, 233, 0.15), transparent 75%)`
            : '',
        }}
      />

      {/* Top row: Icon + category pill + hover indicator */}
      <div className="relative z-10 flex items-start justify-between mb-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cream/20 bg-cream/5 text-cream/80 transition-all duration-300 group-hover:scale-110 group-hover:border-cream/50 group-hover:bg-cream/15 group-hover:text-cream">
          <Icon size={22} strokeWidth={1.75} />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="rounded-full border border-cream/10 bg-cream/5 px-2.5 py-0.5 text-[11px] font-hn tracking-wider uppercase text-cream/60 group-hover:text-cream/90 group-hover:border-cream/30 transition-colors">
            {skill.category}
          </span>
          <ArrowUpRight
            size={14}
            className="text-cream/30 group-hover:text-cream group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
          />
        </div>
      </div>

      {/* Bottom details */}
      <div className="relative z-10">
        <h3 className="font-hn text-lg sm:text-xl font-medium text-cream tracking-tight mb-1 group-hover:text-cream transition-colors">
          {skill.name}
        </h3>
        <p className="font-hn text-xs sm:text-sm text-cream/70 leading-relaxed font-light group-hover:text-cream/85 transition-colors">
          {skill.description}
        </p>
      </div>

      {/* Subtle bottom edge glow on hover */}
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-cream/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  )
}

export default function About() {
  return (
    <main className="relative min-h-[100dvh] w-full bg-black selection:bg-cream selection:text-black">
      {/* ─── BG image (exact same as hero) ─── */}
      <img
        src={BG_IMAGE}
        alt=""
        className="fixed inset-0 h-full w-full object-cover anim-fade-in pointer-events-none"
      />

      {/* ─── Subtle dark veil for comfortable readability ─── */}
      <div className="fixed inset-0 bg-black/75 backdrop-blur-[2px] pointer-events-none" />

      {/* ─── Sticky / Top Navigation ─── */}
      <header className="relative z-20 flex items-center justify-between px-6 pt-6 sm:px-10 sm:pt-8 text-cream">
        <Link
          to="/"
          className="font-hn text-lg tracking-wide hover:opacity-60 transition-opacity duration-300"
        >
          Viraj
        </Link>
        <div className="flex items-center gap-6 sm:gap-8">
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=oreoviru2008@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-hn text-sm hover:opacity-60 transition-opacity duration-300"
          >
            Contact
          </a>
          <Link
            to="/"
            className="font-hn text-sm flex items-center gap-2 hover:opacity-60 transition-opacity duration-300 group"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      {/* ─── Main Content Container ─── */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 py-12 sm:px-10 sm:py-20">
        {/* Title */}
        <h1 className="font-hn text-5xl sm:text-7xl text-cream mb-6 tracking-tight anim-fade-up leading-tight">
          About Me
        </h1>

        <div className="h-0.5 w-16 bg-cream mb-12 anim-line" />

        {/* Bio paragraphs */}
        <div
          className="font-hn text-cream/90 text-base sm:text-lg leading-relaxed space-y-7 anim-fade-up font-light max-w-3xl"
          style={{ animationDelay: '200ms' }}
        >
          <p>
            Hello! I'm <strong className="font-semibold text-cream">Viraj</strong>, a student, aspiring Full Stack Developer, and technology enthusiast with a strong passion for Artificial Intelligence, software development, and innovation. I love exploring how technology works, experimenting with new ideas, and transforming concepts into practical digital solutions. For me, development is not just about writing code; it's about identifying problems, thinking creatively, and building products that can make a meaningful difference.
          </p>

          <p>
            My journey into technology is driven by curiosity and a desire to create something of my own. I enjoy learning by experimenting, building projects, solving programming challenges, and exploring emerging technologies. I'm particularly interested in the intersection of Full Stack Development and Artificial Intelligence, where I can combine modern web technologies with intelligent systems to create useful and innovative applications.
          </p>

          <p>
            I have been developing my skills in Python, JavaScript, React, HTML, CSS, API integration, and other modern development technologies. Alongside software development, I enjoy exploring AI models, Large Language Models (LLMs), computer vision, and automation. I'm also interested in technologies like Ollama, YOLO, Three.js, and MediaPipe, which allow me to experiment with intelligent applications and interactive digital experiences.
          </p>

          <p>
            I believe the best way to understand technology is to build something with it. That's why I enjoy working on personal projects that challenge my creativity and technical abilities. One of my key projects is <strong className="font-semibold text-cream">NEURO</strong>, an AI-powered desktop assistant designed to bring intelligent conversations, computer vision, system monitoring, and automation together in one platform. Another project is <strong className="font-semibold text-cream">AERI</strong>, a macOS application concept inspired by the idea of making everyday interactions simpler, smarter, and more intuitive. Working on these projects allows me to explore new technologies, understand real-world development challenges, and improve my problem-solving abilities.
          </p>

          <p>
            Apart from personal projects, I enjoy participating in hackathons, collaborating with other creative minds, exploring startup ideas, and working on solutions to real-world problems. These experiences help me develop not only technical knowledge but also creativity, communication, teamwork, and critical-thinking skills.
          </p>

          <p>
            I consider myself a curious learner who believes in consistency, experimentation, and continuous improvement. I understand that technology evolves every day, and I see that as an opportunity to keep learning, adapting, and growing. I'm always excited to explore unfamiliar concepts, take on challenging projects, and push myself beyond my comfort zone.
          </p>

          <p>
            My long-term goal is to become a skilled software engineer and AI developer, contribute to meaningful technological innovations, and build products that people genuinely find useful.
          </p>
        </div>

        {/* ─── Interactive Skills Section ─── */}
        <section className="mt-20 pt-16 border-t border-cream/15">
          <div className="mb-10">
            <p className="font-hn text-xs uppercase tracking-[0.25em] text-cream/50 mb-2">
              Expertise & Toolkit
            </p>
            <h2 className="font-hn text-3xl sm:text-4xl text-cream tracking-tight">
              Skills &amp; Technologies
            </h2>
            <p className="font-hn text-sm sm:text-base text-cream/70 mt-2 font-light">
              Interactive cards showcasing languages, frameworks, and intelligent platforms I build with.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {SKILLS.map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} />
            ))}
          </div>
        </section>

        {/* ─── Closing Statement ─── */}
        <div className="mt-20 pt-10 border-t border-cream/20">
          <p className="font-hn text-cream font-medium text-lg sm:text-2xl leading-relaxed text-center sm:text-left">
            &ldquo;I don&apos;t just want to learn technology; I want to use it to create something that matters.&rdquo;
          </p>
        </div>
      </div>
    </main>
  )
}
