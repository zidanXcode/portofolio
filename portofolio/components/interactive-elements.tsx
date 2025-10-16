"use client"
import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy } from "lucide-react"

export function InteractiveElements() {
  const [githubStats, setGithubStats] = useState<{
    repos: number
    followers: number
    stars: number
    avatarUrl: string
    name: string
    login: string
    profileUrl: string
  }>({
    repos: 0,
    followers: 0,
    stars: 0,
    avatarUrl: "",
    name: "",
    login: "",
    profileUrl: "",
  })

  const [xpLevel, setXpLevel] = useState(1)
  const [xpProgress, setXpProgress] = useState(0)
  const [loadingGithub, setLoadingGithub] = useState(true)

  const [konamiSequence, setKonamiSequence] = useState<string[]>([])
  const [showEasterEgg, setShowEasterEgg] = useState(false)

  const konamiCode = useMemo(
    () => [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "KeyB",
      "KeyA",
    ],
    [],
  )

  const rafRef = useRef<number | null>(null)
  const nextTiltRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  async function fetchWithTimeout(input: RequestInfo | URL, init: RequestInit = {}, timeoutMs = 4000) {
    const controller = new AbortController()
    const t = setTimeout(() => controller.abort(), timeoutMs)
    try {
      const res = await fetch(input, {
        ...init,
        signal: controller.signal,
        cache: "no-store",
        referrerPolicy: "no-referrer",
      })
      return res
    } finally {
      clearTimeout(t)
    }
  }

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const username = "zidanXcode"

        // Try cache first
        try {
          const cached = localStorage.getItem("githubStats")
          if (cached) {
            const parsed = JSON.parse(cached)
            setGithubStats(parsed)
            setLoadingGithub(false)
          }
        } catch {
          // ignore cache errors
        }

        const userRes = await fetchWithTimeout(`https://api.github.com/users/${username}`, {
          headers: {
            Accept: "application/vnd.github.v3+json",
            "User-Agent": "Portfolio-Website",
          },
        })
        if (!userRes.ok) throw new Error(`user ${userRes.status}`)
        const userData = await userRes.json()

        const reposRes = await fetchWithTimeout(
          `https://api.github.com/users/${username}/repos?per_page=100&type=owner&sort=updated`,
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
              "User-Agent": "Portfolio-Website",
            },
          },
        )

        let stars = 0
        let reposCount = 0
        if (reposRes.ok) {
          const repos = (await reposRes.json()) as Array<{ stargazers_count: number }>
          reposCount = repos.length
          stars = repos.reduce((sum, r) => sum + (r?.stargazers_count || 0), 0)
        }

        const stats = {
          repos: reposCount || userData.public_repos || 0,
          followers: userData.followers || 0,
          stars,
          avatarUrl: userData.avatar_url || "",
          name: userData.name || "",
          login: userData.login || username,
          profileUrl: userData.html_url || `https://github.com/${username}`,
        }

        setGithubStats(stats)
        try {
          localStorage.setItem("githubStats", JSON.stringify(stats))
        } catch {
          // ignore localStorage errors
        }

        const lvl = Math.min(100, Math.round(stats.repos * 8 + stats.followers * 1.5 + stats.stars * 0.5))
        setXpLevel(Math.max(1, lvl))
        setXpProgress(lvl % 100)
      } catch (err) {
        const fallback = {
          repos: 2,
          followers: 0,
          stars: 0,
          avatarUrl: "",
          name: "",
          login: "zidanXcode",
          profileUrl: "https://github.com/zidanXcode",
        }
        setGithubStats(fallback)
        const lvl = Math.min(100, Math.round(fallback.repos * 8))
        setXpLevel(Math.max(1, lvl))
        setXpProgress(lvl % 100)
      } finally {
        setLoadingGithub(false)
      }
    }
    fetchGitHubData()
  }, [])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      setKonamiSequence((prev) => {
        const next = [...prev, e.code].slice(-10)
        const match = next.length === konamiCode.length && next.every((k, i) => k === konamiCode[i])
        if (match) {
          setShowEasterEgg(true)
          setTimeout(() => setShowEasterEgg(false), 4000)
          return []
        }
        return next
      })
    }
    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [konamiCode])

  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }
  }, [])

  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

  return (
    <section className="py-16 md:py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4 text-balance">
            Interactive Zone
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">Live data and achievements</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <Card
            className="group relative overflow-hidden bg-card border-primary/20 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02]"
            onMouseMove={(e) => {
              const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect()
              const px = (e.clientX - rect.left) / rect.width
              const py = (e.clientY - rect.top) / rect.height
              nextTiltRef.current = { x: (0.5 - py) * 10, y: (px - 0.5) * 10 }
              if (rafRef.current == null) {
                rafRef.current = window.requestAnimationFrame(() => {
                  setTilt(nextTiltRef.current)
                  rafRef.current = null
                })
              }
            }}
            onMouseLeave={() => {
              if (rafRef.current) {
                cancelAnimationFrame(rafRef.current)
                rafRef.current = null
              }
              setTilt({ x: 0, y: 0 })
            }}
            aria-busy={loadingGithub ? "true" : "false"}
            role="region"
            aria-label="GitHub Profile Card"
          >
            <div
              className="pointer-events-none absolute inset-0 rounded-lg"
              style={{
                background:
                  "conic-gradient(from 0deg at 50% 50%, #ffffff 0deg, transparent 120deg, rgba(255,255,255,0.4) 240deg, transparent 360deg)",
                mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                padding: "1px",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                opacity: 0.35,
                filter: "blur(0.5px)",
              }}
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -inset-px opacity-40 blur-2xl transition-opacity duration-500 group-hover:opacity-60"
              style={{
                background:
                  "radial-gradient(60% 60% at 20% 0%, rgba(255,255,255,0.25) 0%, transparent 70%), radial-gradient(40% 60% at 100% 20%, rgba(255,255,255,0.18) 0%, transparent 70%)",
              }}
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute left-[-150%] top-0 h-full w-[60%] rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[260%]"
              aria-hidden="true"
            />
            <CardContent
              className="p-4 md:p-6 relative"
              style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transformStyle: "preserve-3d",
              }}
              aria-live="polite"
              aria-atomic="true"
            >
              {loadingGithub ? (
                <div className="animate-pulse space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="size-14 md:size-16 rounded-full bg-muted" />
                    <div className="flex-1">
                      <div className="h-4 md:h-5 w-32 md:w-40 bg-muted rounded mb-2" />
                      <div className="h-3 w-20 md:w-24 bg-muted rounded" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 md:gap-3">
                    <div className="h-10 bg-muted rounded" />
                    <div className="h-10 bg-muted rounded" />
                    <div className="h-10 bg-muted rounded" />
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-3 flex items-center gap-2">
                    <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-40" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
                      </span>
                      Live GitHub Profile
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4">
                    <div
                      className="relative size-14 md:size-16 rounded-full overflow-hidden ring-2 ring-primary/30 shadow-[0_0_30px_-10px_rgba(255,255,255,0.3)] transition-transform duration-300 group-hover:scale-105 flex-shrink-0"
                      aria-hidden={githubStats.avatarUrl ? "false" : "true"}
                      style={{ transform: "translateZ(20px)" }}
                    >
                      {githubStats.avatarUrl ? (
                        <img
                          src={githubStats.avatarUrl || "/placeholder.svg"}
                          alt={`${githubStats.login} avatar`}
                          className="size-full object-cover"
                          loading="lazy"
                          decoding="async"
                          crossOrigin="anonymous"
                        />
                      ) : (
                        <div className="size-full bg-muted" />
                      )}
                      <span
                        className="absolute bottom-0 right-0 size-3 rounded-full bg-emerald-500 ring-2 ring-card"
                        aria-label="Online status"
                      />
                    </div>
                    <div style={{ transform: "translateZ(10px)" }} className="flex-1 min-w-0">
                      <h3 className="text-lg md:text-2xl font-bold text-card-foreground drop-shadow-[0_1px_6px_rgba(0,0,0,0.2)] truncate">
                        {githubStats.name || githubStats.login}
                      </h3>
                      <p className="text-xs md:text-sm text-muted-foreground truncate">@{githubStats.login}</p>
                    </div>
                  </div>

                  <div
                    className="mt-4 md:mt-6 grid grid-cols-3 gap-2 md:gap-3"
                    style={{ transform: "translateZ(6px)" }}
                    role="group"
                    aria-label="GitHub Statistics"
                  >
                    <div className="text-center bg-muted/30 rounded-md py-2 border border-border/50 backdrop-blur-sm hover:bg-muted/50 transition-colors duration-200">
                      <div className="text-2xl md:text-3xl font-mono text-primary transition-transform duration-300 group-hover:scale-105">
                        {githubStats.repos}
                      </div>
                      <Badge variant="secondary" className="text-xs mt-1">
                        Repos
                      </Badge>
                    </div>
                    <div className="text-center bg-muted/30 rounded-md py-2 border border-border/50 backdrop-blur-sm hover:bg-muted/50 transition-colors duration-200">
                      <div className="text-2xl md:text-3xl font-mono text-primary transition-transform duration-300 group-hover:scale-105">
                        {githubStats.followers}
                      </div>
                      <Badge variant="secondary" className="text-xs mt-1">
                        Followers
                      </Badge>
                    </div>
                    <div className="text-center bg-muted/30 rounded-md py-2 border border-border/50 backdrop-blur-sm hover:bg-muted/50 transition-colors duration-200">
                      <div className="text-2xl md:text-3xl font-mono text-primary transition-transform duration-300 group-hover:scale-105">
                        {githubStats.stars}
                      </div>
                      <Badge variant="secondary" className="text-xs mt-1">
                        Stars
                      </Badge>
                    </div>
                  </div>

                  <div className="mt-4 md:mt-6" style={{ transform: "translateZ(12px)" }}>
                    <Button
                      asChild
                      className="bg-primary hover:bg-primary/90 w-full text-sm md:text-base transition-all duration-200 active:scale-95"
                    >
                      <Link href={githubStats.profileUrl} target="_blank" rel="noopener noreferrer">
                        View GitHub Profile
                      </Link>
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card
            className="bg-card border-primary/20 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02]"
            role="region"
            aria-label="XP Level"
          >
            <CardContent className="p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold text-card-foreground mb-4 md:mb-6 flex items-center gap-2">
                <Trophy className="w-5 md:w-6 h-5 md:h-6 text-primary flex-shrink-0" aria-hidden="true" />
                <span>XP Level</span>
              </h3>
              <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
                <div
                  className="relative size-20 md:size-24 rounded-full flex-shrink-0 shadow-lg"
                  style={{
                    background: `conic-gradient(#ffffff ${xpProgress}%, rgba(255,255,255,0.2) ${xpProgress}%)`,
                  }}
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={xpProgress}
                  aria-label={`XP Progress: ${xpProgress}%`}
                >
                  <div className="absolute inset-2 rounded-full bg-card grid place-items-center border border-primary/20">
                    <span className="text-xl md:text-2xl font-bold text-card-foreground">{xpLevel}</span>
                  </div>
                </div>
                <div className="flex-1 w-full">
                  <div className="flex items-center justify-between text-xs md:text-sm text-muted-foreground mb-2">
                    <span>Progress to next</span>
                    <span className="font-mono">{xpProgress}%</span>
                  </div>
                  <div className="h-2 md:h-3 w-full rounded-full bg-muted overflow-hidden border border-border/50">
                    <div
                      className="h-full bg-primary transition-[width] duration-500 ease-out"
                      style={{ width: `${xpProgress}%` }}
                      aria-hidden="true"
                    />
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground mt-2 md:mt-3">
                    Based on your GitHub activity (repos, followers, stars).
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {showEasterEgg && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="easter-egg-title"
          >
            <Card className="bg-card border-primary w-full max-w-sm animate-scaleIn">
              <CardContent className="p-6 md:p-8 text-center">
                <Trophy className="w-12 md:w-16 h-12 md:h-16 text-primary mx-auto mb-4" aria-hidden="true" />
                <h3 id="easter-egg-title" className="text-xl md:text-2xl font-bold text-card-foreground mb-2">
                  Easter Egg Found!
                </h3>
                <p className="text-sm md:text-base text-muted-foreground mb-4">You discovered the Konami Code!</p>
                <Badge variant="secondary" className="text-sm md:text-lg px-3 md:px-4 py-1 md:py-2">
                  ↑↑↓↓←→←→BA
                </Badge>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="text-center text-xs md:text-sm text-muted-foreground mt-8 md:mt-12 p-3 md:p-4 rounded-lg bg-muted/20 border border-border/50 backdrop-blur-sm">
          <p className="font-medium">
            💡 Tip: Try the Konami Code: <span className="font-mono text-primary">↑↑↓↓←→←→BA</span>
          </p>
        </div>
      </div>
    </section>
  )
}
