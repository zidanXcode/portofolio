"use client"

import type React from "react"
import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Gamepad2 } from "lucide-react"

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

  const [isTypingGameActive, setIsTypingGameActive] = useState(false)
  const [typingText, setTypingText] = useState("")
  const [timeLeft, setTimeLeft] = useState(60)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const startTimeRef = useRef<number | null>(null)
  const timerRef = useRef<number | null>(null)
  const typingAreaRef = useRef<HTMLTextAreaElement | null>(null)
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

        try {
          const cached = localStorage.getItem("githubStats")
          if (cached) {
            const parsed = JSON.parse(cached)
            setGithubStats(parsed)
            setLoadingGithub(false)
          }
        } catch {
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
      if (timerRef.current) window.clearInterval(timerRef.current)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }
  }, [])

  const sampleText = "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the alphabet."

  const startTypingGame = () => {
    setIsTypingGameActive(true)
    setTypingText("")
    setTimeLeft(60)
    setWpm(0)
    setAccuracy(100)
    startTimeRef.current = performance.now()
    if (timerRef.current) window.clearInterval(timerRef.current)
    timerRef.current = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          if (timerRef.current) window.clearInterval(timerRef.current)
          setIsTypingGameActive(false)
          return 0
        }
        return t - 1
      })
    }, 1000)
    queueMicrotask(() => typingAreaRef.current?.focus())
  }

  const stopTypingGame = () => {
    setIsTypingGameActive(false)
    if (timerRef.current) window.clearInterval(timerRef.current)
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }

  const handleTypingInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value
    setTypingText(input)

    const correctChars = input.split("").filter((ch, idx) => ch === sampleText[idx]).length
    const accuracyPct = input.length > 0 ? Math.round((correctChars / input.length) * 100) : 100
    setAccuracy(accuracyPct)

    const now = performance.now()
    const elapsedMin = startTimeRef.current != null ? (now - startTimeRef.current) / 1000 / 60 : 0.000001
    const words = correctChars / 5
    setWpm(Math.max(0, Math.round(words / Math.max(elapsedMin, 0.000001))))
  }

  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Interactive Zone</h2>
          <p className="text-muted-foreground text-lg">Fun elements, live data, and mini-games</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
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
          >
            <div
              className="pointer-events-none absolute inset-0 rounded-lg"
              style={{
                background:
                  "conic-gradient(from 0deg at 50% 50%, var(--color-primary) 0deg, transparent 120deg, var(--color-primary)/40 240deg, transparent 360deg)",
                mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                padding: "1px",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                opacity: 0.35,
                filter: "blur(0.5px)",
              }}
            />
            <div
              className="pointer-events-none absolute -inset-px opacity-40 blur-2xl transition-opacity duration-500 group-hover:opacity-60"
              style={{
                background:
                  "radial-gradient(60% 60% at 20% 0%, var(--color-primary)/0.25 0%, transparent 70%), radial-gradient(40% 60% at 100% 20%, var(--color-primary)/0.18 0%, transparent 70%)",
              }}
            />
            <div className="pointer-events-none absolute left-[-150%] top-0 h-full w-[60%] rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[260%]" />
            <CardContent
              className="p-6 relative"
              style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transformStyle: "preserve-3d",
              }}
              aria-live="polite"
            >
              {loadingGithub ? (
                <div className="animate-pulse">
                  <div className="flex items-center gap-4">
                    <div className="size-16 rounded-full bg-muted" />
                    <div className="flex-1">
                      <div className="h-5 w-40 bg-muted rounded mb-2" />
                      <div className="h-3 w-24 bg-muted rounded" />
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-3 gap-3">
                    <div className="h-10 bg-muted rounded" />
                    <div className="h-10 bg-muted rounded" />
                    <div className="h-10 bg-muted rounded" />
                  </div>
                  <div className="mt-6 h-10 bg-muted rounded" />
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

                  <div className="flex items-center gap-4">
                    <div
                      className="relative size-16 rounded-full overflow-hidden ring-2 ring-primary/30 shadow-[0_0_30px_-10px_var(--color-primary)] transition-transform duration-300 group-hover:scale-105"
                      aria-hidden={githubStats.avatarUrl ? "false" : "true"}
                      style={{ transform: "translateZ(20px)" }}
                    >
                      {githubStats.avatarUrl ? (
                        <img
                          src={
                            githubStats.avatarUrl ||
                            "/placeholder.svg?height=64&width=64&query=github%20avatar%20holder" ||
                            "/placeholder.svg" ||
                            "/placeholder.svg"
                          }
                          alt={`${githubStats.login} avatar`}
                          className="size-full object-cover"
                        />
                      ) : (
                        <div className="size-full bg-muted" />
                      )}
                      <span className="absolute bottom-0 right-0 size-3 rounded-full bg-emerald-500 ring-2 ring-card" />
                    </div>
                    <div style={{ transform: "translateZ(10px)" }}>
                      <h3 className="text-2xl font-bold text-card-foreground drop-shadow-[0_1px_6px_rgba(0,0,0,0.2)]">
                        {githubStats.name || githubStats.login}
                      </h3>
                      <p className="text-sm text-muted-foreground">@{githubStats.login}</p>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-3" style={{ transform: "translateZ(6px)" }}>
                    <div className="text-center bg-muted/30 rounded-md py-2 border border-border/50 backdrop-blur-sm">
                      <div className="text-3xl font-mono text-primary transition-transform duration-300 group-hover:scale-105">
                        {githubStats.repos}
                      </div>
                      <Badge variant="secondary">Repos</Badge>
                    </div>
                    <div className="text-center bg-muted/30 rounded-md py-2 border border-border/50 backdrop-blur-sm">
                      <div className="text-3xl font-mono text-primary transition-transform duration-300 group-hover:scale-105">
                        {githubStats.followers}
                      </div>
                      <Badge variant="secondary">Followers</Badge>
                    </div>
                    <div className="text-center bg-muted/30 rounded-md py-2 border border-border/50 backdrop-blur-sm">
                      <div className="text-3xl font-mono text-primary transition-transform duration-300 group-hover:scale-105">
                        {githubStats.stars}
                      </div>
                      <Badge variant="secondary">Stars</Badge>
                    </div>
                  </div>

                  <div className="mt-6" style={{ transform: "translateZ(12px)" }}>
                    <Button asChild className="bg-primary hover:bg-primary/90 w-full">
                      <Link href={githubStats.profileUrl} target="_blank" rel="noopener noreferrer">
                        View GitHub Profile
                      </Link>
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="bg-card border-primary/20 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02]">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-card-foreground mb-4 flex items-center gap-2">
                <Trophy className="w-6 h-6 text-primary" />
                XP Level
              </h3>
              <div className="flex items-center gap-6">
                <div
                  className="relative size-24 rounded-full"
                  style={{
                    background: `conic-gradient(var(--color-primary) ${xpProgress}%, var(--color-muted) ${xpProgress}%)`,
                  }}
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={xpProgress}
                >
                  <div className="absolute inset-2 rounded-full bg-card grid place-items-center">
                    <span className="text-2xl font-bold text-card-foreground">{xpLevel}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                    <span>Progress to next</span>
                    <span>{xpProgress}%</span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-3 bg-primary transition-[width] duration-500"
                      style={{ width: `${xpProgress}%` }}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">
                    Based on your GitHub activity (repos, followers, stars).
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-card border-primary/20 mb-8">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-card-foreground mb-4 flex items-center gap-2">
              <Gamepad2 className="w-6 h-6 text-primary" />
              Typing Speed Test
            </h3>

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Badge variant="secondary" className="text-base px-3 py-1">
                    Time: {timeLeft}s
                  </Badge>
                  <Badge variant="secondary" className="text-base px-3 py-1">
                    WPM: {wpm}
                  </Badge>
                  <Badge variant="secondary" className="text-base px-3 py-1">
                    Accuracy: {accuracy}%
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  {!isTypingGameActive ? (
                    <Button onClick={startTypingGame} className="bg-primary hover:bg-primary/90">
                      Start
                    </Button>
                  ) : (
                    <Button onClick={stopTypingGame} variant="secondary">
                      Stop
                    </Button>
                  )}
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Type this text:</p>
                <p className="text-card-foreground mb-4 p-3 bg-muted rounded border-l-4 border-primary text-pretty">
                  {sampleText}
                </p>
                <textarea
                  ref={typingAreaRef}
                  value={typingText}
                  onChange={handleTypingInput}
                  disabled={!isTypingGameActive}
                  className="w-full h-32 p-3 bg-background border border-border rounded resize-none focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-60"
                  placeholder={isTypingGameActive ? "Start typing here..." : "Click Start to begin"}
                  aria-label="Typing test input"
                />
                <div className="mt-2">
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-[width] duration-300"
                      style={{ width: `${Math.min(100, Math.round((typingText.length / sampleText.length) * 100))}%` }}
                    />
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Progress: {Math.min(100, Math.round((typingText.length / sampleText.length) * 100))}%
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {showEasterEgg && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <Card className="bg-card border-primary">
              <CardContent className="p-8 text-center">
                <Trophy className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-card-foreground mb-2">Easter Egg Found!</h3>
                <p className="text-muted-foreground mb-4">You discovered the Konami Code!</p>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  ↑↑↓↓←→←→BA
                </Badge>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="text-center text-sm text-muted-foreground">
          <p>Tip: Try the Konami Code: ↑↑↓↓←→←→BA</p>
        </div>
      </div>
    </section>
  )
}
