"use client"

import React, { useEffect, useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Users, Zap, Trophy, Gamepad2 } from "lucide-react"
import { motion } from "framer-motion"

type Contribution = { date: string; level: number }
type GithubStats = { repos: number; contributions: Contribution[] }

export function InteractiveElements() {
  const [visitorCount, setVisitorCount] = useState<number | null>(null)
  const [githubStats, setGithubStats] = useState<GithubStats>({
    repos: 0,
    contributions: [],
  })
  const [isLoadingGithub, setIsLoadingGithub] = useState(true)
  const [isTypingGameActive, setIsTypingGameActive] = useState(false)
  const [typingText, setTypingText] = useState("")
  const [typingSpeed, setTypingSpeed] = useState(0)
  const [history, setHistory] = useState<number[]>([])
  const typingStartTime = useRef<number | null>(null)

  const konamiCode = [
    "ArrowUp","ArrowUp","ArrowDown","ArrowDown",
    "ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","KeyB","KeyA",
  ]
  const konamiProgress = useRef<string[]>([])
  const [showEasterEgg, setShowEasterEgg] = useState(false)

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const hasVisited = localStorage.getItem("hasVisited")
        const method = hasVisited ? "GET" : "POST"
        const response = await fetch("/api/visitors", { method })
        const data = await response.json()
        setVisitorCount(Number(data?.count ?? 0))
        if (!hasVisited) localStorage.setItem("hasVisited", "true")
      } catch {
        setVisitorCount(1)
      }
    }
    fetchVisitors()
  }, [])

  useEffect(() => {
    const fetchGitHubData = async () => {
      setIsLoadingGithub(true)
      try {
        const username = "zidanXcode"
        const res = await fetch(`https://api.github.com/users/${username}`, {
          headers: { Accept: "application/vnd.github.v3+json" },
        })
        const data = res.ok ? await res.json() : {}
        setGithubStats({
          repos: Number(data?.public_repos ?? 0),
          contributions: generateRealisticContributions(),
        })
      } catch {
        setGithubStats({
          repos: 0,
          contributions: generateRealisticContributions(),
        })
      } finally {
        setIsLoadingGithub(false)
      }
    }
    fetchGitHubData()
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      konamiProgress.current = [...konamiProgress.current, e.code].slice(-10)
      if (
        konamiProgress.current.length === konamiCode.length &&
        konamiCode.every((v, i) => konamiProgress.current[i] === v)
      ) {
        setShowEasterEgg(true)
        setTimeout(() => setShowEasterEgg(false), 5000)
        konamiProgress.current = []
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  const sampleText =
    "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the alphabet."

  const startTypingGame = () => {
    setIsTypingGameActive(true)
    setTypingText("")
    setTypingSpeed(0)
    typingStartTime.current = Date.now()
  }

  const handleTypingInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value
    setTypingText(input)

    if (input === sampleText && typingStartTime.current) {
      const timeTaken = (Date.now() - typingStartTime.current) / 1000 / 60
      const words = sampleText.split(" ").length
      const speed = Math.round(words / timeTaken)
      setTypingSpeed(speed)
      setHistory((prev) => [...prev, speed])
      setIsTypingGameActive(false)
    }
  }

  const generateRealisticContributions = (): Contribution[] => {
    const today = new Date()
    return Array.from({ length: 365 }).map((_, i) => {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dayOfWeek = date.getDay()
      const isWeekend = [0, 6].includes(dayOfWeek)
      const isHoliday = Math.random() < 0.1
      let level = 0
      if (!isHoliday) {
        level = isWeekend
          ? Math.random() < 0.3 ? Math.floor(Math.random() * 3) : 0
          : Math.random() < 0.8 ? Math.floor(Math.random() * 4) + 1 : 0
      }
      return { date: date.toISOString().split("T")[0], level }
    })
  }

  const getContributionColor = (level: number) => {
    const colors = [
      "bg-muted/30",
      "bg-primary/20",
      "bg-primary/40",
      "bg-primary/60",
      "bg-primary/80",
    ]
    return colors[Math.min(level, colors.length - 1)]
  }

  const LoaderSkeleton = () => (
    <div className="w-20 h-8 mx-auto bg-muted rounded animate-pulse" />
  )

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-3">Interactive Zone</h2>
          <p className="text-muted-foreground text-lg">
            Fun elements and hidden features
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: Eye, label: "Visitors", value: visitorCount, badge: "Live Counter" },
            { icon: Users, label: "GitHub", value: isLoadingGithub ? null : githubStats.repos, badge: "Live Repos" },
            { icon: Trophy, label: "XP Level", value: 99, badge: "Developer Level" },
          ].map(({ icon: Icon, label, value, badge }, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="bg-card border-primary/20">
                <CardContent className="p-6 text-center">
                  <Icon aria-label={label} className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">{label}</h3>
                  <div className="text-4xl font-mono text-primary mb-2">
                    {value === null ? <LoaderSkeleton /> : value}
                  </div>
                  <Badge variant="secondary">{badge}</Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Contribution Activity */}
        <Card className="bg-card border-primary/20">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
              <Zap aria-label="GitHub Contribution" className="w-6 h-6 text-primary" />
              GitHub Contribution Activity
            </h3>
            {isLoadingGithub ? (
              <div className="grid grid-cols-53 gap-1 max-w-full overflow-x-auto">
                {Array.from({ length: 53 * 7 }).map((_, i) => (
                  <div key={i} className="w-3 h-3 bg-muted rounded-sm animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-53 gap-1 max-w-full overflow-x-auto">
                {githubStats.contributions.map((day, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-sm ${getContributionColor(day.level)} hover:scale-125 transition-transform`}
                    title={`${day.date}: ${day.level} contributions`}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Typing Speed Test */}
        <Card className="bg-card border-primary/20">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
              <Gamepad2 aria-label="Typing Speed Test" className="w-6 h-6 text-primary" />
              Typing Speed Test
            </h3>
            {!isTypingGameActive ? (
              <div className="text-center">
                <Button onClick={startTypingGame} className="bg-primary hover:bg-primary/90">
                  Start Test
                </Button>
                {typingSpeed > 0 && (
                  <div className="mt-4 space-y-2">
                    <Badge variant="secondary" className="text-lg px-4 py-2">
                      Last Speed: {typingSpeed} WPM
                    </Badge>
                    {history.length > 1 && (
                      <p className="text-sm text-muted-foreground">
                        Best: {Math.max(...history)} WPM | Attempts: {history.length}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Type this text:</p>
                <p className="p-3 bg-muted rounded border-l-4 border-primary mb-4">{sampleText}</p>
                <textarea
                  value={typingText}
                  onChange={handleTypingInput}
                  className="w-full h-24 p-3 bg-background border border-border rounded resize-none focus:ring-2 focus:ring-primary"
                  placeholder="Start typing here..."
                  autoFocus
                />
                <p className="mt-2 text-sm text-muted-foreground">
                  Progress: {Math.round((typingText.length / sampleText.length) * 100)}%
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Easter Egg */}
        {showEasterEgg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          >
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
              <Card className="bg-card border-primary">
                <CardContent className="p-8 text-center">
                  <Trophy className="w-16 h-16 text-primary mx-auto mb-4 animate-bounce" />
                  <h3 className="text-2xl font-bold mb-2">🎉 Easter Egg Found!</h3>
                  <p className="text-muted-foreground mb-4">You discovered the Konami Code!</p>
                  <Badge variant="secondary" className="text-lg px-4 py-2">↑↑↓↓←→←→BA</Badge>
                  <p className="text-sm text-muted-foreground mt-4">Achievement Unlocked: Code Master</p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}

        <div className="text-center text-sm text-muted-foreground">
          ☁️✨ Try the Konami Code: ↑↑↓↓←→←→BA
        </div>
      </div>
    </section>
  )
}
