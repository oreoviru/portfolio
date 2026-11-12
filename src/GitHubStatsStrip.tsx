import { useState, useEffect } from 'react'
import { Github, GitCommitHorizontal, Code2, FolderGit2, ArrowUpRight, Clock } from 'lucide-react'

interface RepoItem {
  name: string
  html_url: string
  language: string | null
  pushed_at: string
  description: string | null
}

interface GitHubSummary {
  publicRepos: number
  languages: { name: string; count: number }[]
  recentRepos: RepoItem[]
  lastUpdated: string
  isFallback?: boolean
}

const GITHUB_USERNAME = 'oreoviru'
const CACHE_KEY = 'github_summary_cache'
const CACHE_TTL_MS = 10 * 60 * 1000

const FALLBACK_SUMMARY: GitHubSummary = {
  publicRepos: 5,
  languages: [
    { name: 'TypeScript', count: 3 },
    { name: 'Python', count: 1 },
    { name: 'JavaScript', count: 1 },
  ],
  recentRepos: [
    {
      name: 'portfolio',
      html_url: 'https://github.com/oreoviru/portfolio',
      language: 'TypeScript',
      pushed_at: new Date().toISOString(),
      description: 'Personal editorial portfolio built with React and TypeScript.',
    },
    {
      name: 'airpool-ai',
      html_url: 'https://github.com/oreoviru/airpool-ai',
      language: 'TypeScript',
      pushed_at: '2026-10-25T11:57:59Z',
      description: 'Flight-aware peer rideshare matching engine.',
    },
    {
      name: 'Campus-Recover',
      html_url: 'https://github.com/oreoviru/Campus-Recover',
      language: 'TypeScript',
      pushed_at: '2026-10-09T13:56:22Z',
      description: 'Multi-modal AI lost and found platform.',
    },
  ],
  lastUpdated: new Date().toISOString(),
  isFallback: true,
}

function formatRelativeDate(isoDate: string): string {
  const date = new Date(isoDate)
  if (Number.isNaN(date.getTime())) return 'Recently'

  const diffMs = Date.now() - date.getTime()
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffHours < 1) return 'Just now'
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 30) return `${diffDays}d ago`

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export default function GitHubStatsStrip() {
  const [summary, setSummary] = useState<GitHubSummary | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    async function loadGitHubData() {
      try {
        const cachedRaw = sessionStorage.getItem(CACHE_KEY)
        if (cachedRaw) {
          const cached = JSON.parse(cachedRaw) as { timestamp: number; data: GitHubSummary }
          if (Date.now() - cached.timestamp < CACHE_TTL_MS) {
            setSummary(cached.data)
            setLoading(false)
            return
          }
        }
      } catch {
        // Ignore cache read failures
      }

      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
            signal: controller.signal,
          }),
          fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=12`,
            { signal: controller.signal }
          ),
        ])

        if (!userRes.ok || !reposRes.ok) {
          throw new Error('GitHub API request failed')
        }

        const userData = (await userRes.json()) as { public_repos?: number }
        const reposData = (await reposRes.json()) as RepoItem[]

        const langCounts = new Map<string, number>()
        for (const repo of reposData) {
          if (repo.language) {
            langCounts.set(repo.language, (langCounts.get(repo.language) ?? 0) + 1)
          }
        }

        const languages = Array.from(langCounts.entries())
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)

        const recentRepos = reposData.slice(0, 3)

        const freshSummary: GitHubSummary = {
          publicRepos: userData.public_repos ?? reposData.length,
          languages,
          recentRepos,
          lastUpdated: recentRepos[0]?.pushed_at ?? new Date().toISOString(),
        }

        setSummary(freshSummary)
        try {
          sessionStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ timestamp: Date.now(), data: freshSummary })
          )
        } catch {
          // Ignore storage quota errors
        }
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setSummary(FALLBACK_SUMMARY)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadGitHubData()
    return () => controller.abort()
  }, [])

  const data = summary ?? FALLBACK_SUMMARY
  const totalLangRepos = data.languages.reduce((sum, item) => sum + item.count, 0) || 1

  return (
    <section
      aria-label="Live GitHub Activity"
      className="mt-16 rounded-2xl border border-cream/15 bg-white/[0.03] p-6 sm:p-8 backdrop-blur-md anim-fade-up"
    >
      {/* Top Row: Heading & Profile Link */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-cream/10 pb-5 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cream/20 bg-cream/5 text-cream">
            <Github size={20} strokeWidth={1.75} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-hn text-lg sm:text-xl text-cream font-medium tracking-tight">
                Live GitHub Pulse
              </h3>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {loading ? 'Syncing' : data.isFallback ? 'Snapshot' : 'Live'}
              </span>
            </div>
            <p className="font-hn text-xs text-cream/55 font-light">
              Public repositories, primary languages, and latest code pushes for @oreoviru
            </p>
          </div>
        </div>

        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-cream/20 bg-cream/5 px-3.5 py-1.5 text-xs font-hn text-cream/85 hover:bg-cream hover:text-black hover:border-cream transition-all duration-200"
        >
          <span>View Profile</span>
          <ArrowUpRight size={13} />
        </a>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-pulse">
          <div className="h-24 rounded-xl bg-white/[0.04] border border-cream/10" />
          <div className="h-24 rounded-xl bg-white/[0.04] border border-cream/10" />
          <div className="h-24 rounded-xl bg-white/[0.04] border border-cream/10" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left 4 Cols: Stats & Language Breakdown */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4 rounded-xl border border-cream/10 bg-black/45 p-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="flex items-center gap-1.5 font-hn text-[11px] uppercase tracking-wider text-cream/50">
                  <FolderGit2 size={12} />
                  <span>Public Repos</span>
                </p>
                <p className="font-hn text-3xl text-cream font-medium mt-1">
                  {data.publicRepos}
                </p>
              </div>
              <div>
                <p className="flex items-center gap-1.5 font-hn text-[11px] uppercase tracking-wider text-cream/50">
                  <Clock size={12} />
                  <span>Last Push</span>
                </p>
                <p className="font-hn text-xl sm:text-2xl text-cream font-medium mt-2">
                  {formatRelativeDate(data.lastUpdated)}
                </p>
              </div>
            </div>

            {/* Language Distribution Bar */}
            <div className="pt-3 border-t border-cream/10">
              <div className="flex items-center justify-between text-[11px] font-hn text-cream/55 mb-2">
                <span className="flex items-center gap-1.5 uppercase tracking-wider">
                  <Code2 size={12} />
                  <span>Top Languages</span>
                </span>
                <span>{data.languages.length} active</span>
              </div>

              <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-white/10 mb-2.5">
                {data.languages.map((lang, idx) => {
                  const pct = Math.round((lang.count / totalLangRepos) * 100)
                  const opacities = ['bg-cream', 'bg-cream/65', 'bg-cream/35', 'bg-cream/20']
                  return (
                    <div
                      key={lang.name}
                      style={{ width: `${pct}%` }}
                      className={`${opacities[idx % opacities.length]} transition-all duration-500`}
                      title={`${lang.name}: ${lang.count} repos`}
                    />
                  )
                })}
              </div>

              <div className="flex flex-wrap gap-3 text-xs font-hn text-cream/80">
                {data.languages.map((lang) => (
                  <span key={lang.name} className="inline-flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-cream/70" />
                    <span>{lang.name}</span>
                    <span className="text-cream/45 text-[11px]">({lang.count})</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right 7 Cols: Recent Public Pushes */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-xl border border-cream/10 bg-black/45 p-5">
            <p className="flex items-center gap-1.5 font-hn text-[11px] uppercase tracking-wider text-cream/50 mb-3">
              <GitCommitHorizontal size={13} />
              <span>Recently Updated Repositories</span>
            </p>

            <div className="space-y-2.5">
              {data.recentRepos.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/repo flex items-center justify-between gap-4 rounded-xl border border-cream/10 bg-white/[0.02] px-4 py-3 hover:border-cream/35 hover:bg-white/[0.06] transition-all duration-200"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2.5">
                      <span className="font-hn text-sm font-medium text-cream group-hover/repo:underline underline-offset-4 truncate">
                        {repo.name}
                      </span>
                      {repo.language && (
                        <span className="rounded-md border border-cream/15 bg-cream/5 px-2 py-0.5 text-[10px] font-hn text-cream/70 shrink-0">
                          {repo.language}
                        </span>
                      )}
                    </div>
                    {repo.description && (
                      <p className="font-hn text-xs text-cream/55 font-light truncate mt-0.5">
                        {repo.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0 text-xs font-hn text-cream/50 group-hover/repo:text-cream transition-colors">
                    <span>{formatRelativeDate(repo.pushed_at)}</span>
                    <ArrowUpRight size={13} />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
