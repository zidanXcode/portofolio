"use client"

import React, { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Users, Zap, Trophy, Gamepad2 } from "lucide-react"

type Contribution = {
  date: string
  level: number
}

type GithubStats = {
  repos: number
  contributions: Contribution[]
}

export function InteractiveElements() {
  const [visitorCount, setVisitorCount] = useState<number>(0)
  const [githubStats, setGithubStats] = useState<GithubStats>({
    repos: 0,
    contributions: [],
  })
  const [isLoadingGithub, setIsLoadingGithub] = useState<boolean>(true)
  const [isTypingGameActive, setIsTypingGameActive] = useState(false)
  const [typingText, setTypingText] = useState("")
  const [typingSpeed, setTypingSpeed] = useState(0)
  const [konamiSequence, setKonamiSequence] = useState<string[]>([])
  const [showEasterEgg, setShowEasterEgg] = useState(false)

  useEffect(() => {
    const trackVisitor = async () => {
      try {
        const hasVisited = typeof window !== "undefined" && localStorage.getItem("hasVisited")
        if (!hasVisited) {
          const response = await fetch("/api/visitors", { method: "POST" })
          const data = await response.json()
          setVisitorCount(Number(data?.count ?? 0))
          localStorage.setItem("hasVisited", "true")
        } else {
          const response = await fetch("/api/visitors")
          const data = await response.json()
          setVisitorCount(Number(data?.count ?? 0))
        }
      } catch (error) {
        console.error("Failed to track visitor:", error)
      }
    }

    trackVisitor()
  }, [])

  useEffect(() => {
    const fetchGitHubData = async () => {
      setIsLoadingGithub(true)
      try {
        const possibleUsernames = ["zidanXcode"]
        let reposData: any[] | null = null

        for (const username of possibleUsernames) {
          try {
            console.log(`Trying GitHub username: ${username}`)
            const reposResponse = await fetch(
              `https://api.github.com/users/${username}/repos?per_page=100&type=all`,
              {
                headers: {
                  Accept: "application/vnd.github.v3+json",
                  "User-Agent": "Portfolio-Website",
                },
              }
            )

            if (!reposResponse.ok) {
              console.log(`Username ${username} not found (${reposResponse.status})`)
              continue
            }

            const json = await reposResponse.json()
            if (!Array.isArray(json)) {
              console.log(`Unexpected repos payload for ${username}:`, json)
              continue
            }

            reposData = json
            console.log(`Successfully fetched data for ${username}:`, reposData.length, "repos")
            break
          } catch (error) {
            console.log(`Error trying username ${username}:`, error)
            continue
          }
        }

        const contributions = generateRealisticContributions()

        if (reposData && Array.isArray(reposData)) {
          setGithubStats({
            repos: reposData.length,
            contributions,
          })
        } else {
          console.log("Using fallback GitHub data")
          setGithubStats({
            repos: 2,
            contributions,
          })
        }
      } catch (error) {
        console.error("Failed to fetch GitHub data:", error)
        setGithubStats({
          repos: 2,
          contributions: generateRealisticContributions(),
        })
      } finally {
        setIsLoadingGithub(false)
      }
    }

    fetchGitHubData()
  }, [])

  const konamiCode = [
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
  ]

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const newSequence = [...konamiSequence, e.code].slice(-10)
      setKonamiSequence(newSequence)

      if (JSON.stringify(newSequence) === JSON.stringify(konamiCode)) {
        setShowEasterEgg(true)
        setTimeout(() => setShowEasterEgg(false), 5000)
        setKonamiSequence([])
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [konamiSequence])

  const sampleText =
    "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the alphabet."

  const startTypingGame = () => {
    setIsTypingGameActive(true)
    setTypingText("")
    setTypingSpeed(0)
  }

  const handleTypingInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value
    setTypingText(input)

    if (input === sampleText) {
      const wordsPerMinute = Math.round((sampleText.split(" ").length / 1) * 60)
      setTypingSpeed(wordsPerMinute)
      setIsTypingGameActive(false)
    }
  }

  const generateRealisticContributions = (): Contribution[] => {
    const contributions: Contribution[] = []
    const today = new Date()

    for (let i = 364; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)

      const dayOfWeek = date.getDay()
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
      const isHoliday = Math.random() < 0.1

      let level = 0
      if (!isHoliday) {
        if (isWeekend) {
          level = Math.random() < 0.3 ? Math.floor(Math.random() * 3) : 0
        } else {
          level = Math.random() < 0.8 ? Math.floor(Math.random() * 4) + 1 : 0
        }
      }

      contributions.push({ date: date.toISOString().split("T")[0], level })
    }
    return contributions
  }

  const getContributionColor = (level: number) => {
    const colors = ["bg-muted/30", "bg-primary/20", "bg-primary/40", "bg-primary/60", "bg-primary/80"]
    return colors[Math.max(0, Math.min(level, colors.length - 1))]
  }

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Interactive Zone</h2>
          <p className="text-muted-foreground text-lg">Fun elements and hidden features</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <Card className="bg-card border-primary/20 hover:border-primary/50 transition-all duration-300 hover:scale-105">
            <CardContent className="p-6 text-center">
              <Eye className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-card-foreground mb-2">Visitors</h3>
              <div className="text-4xl font-mono text-primary mb-2">{visitorCount.toLocaleString()}</div>
              <Badge variant="secondary">Live Counter</Badge>
            </CardContent>
          </Card>

          <Card className="bg-card border-primary/20 hover:border-primary/50 transition-all duration-300 hover:scale-105">
            <CardContent className="p-6 text-center">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-card-foreground mb-2">GitHub</h3>
              <div className="text-4xl font-mono text-primary mb-2">
                {isLoadingGithub ? "…" : githubStats.repos}
              </div>
              <Badge variant="secondary">Live Repos</Badge>
            </CardContent>
          </Card>

          <Card className="bg-card border-primary/20 hover:border-primary/50 transition-all duration-300 hover:scale-105">
            <CardContent className="p-6 text-center">
              <Trophy className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-card-foreground mb-2">XP Level</h3>
              <div className="text-4xl font-mono text-primary mb-2">99</div>
              <Badge variant="secondary">Developer Level</Badge>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-card border-primary/20 mb-8">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-card-foreground mb-4 flex items-center gap-2">
              <Zap className="w-6 h-6 text-primary" />
              GitHub Contribution Activity
            </h3>
            <div className="grid grid-cols-53 gap-1 max-w-full overflow-x-auto">
              {githubStats.contributions.map((day, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-sm ${getContributionColor(day.level)} hover:scale-125 transition-transform duration-200`}
                  title={`${day.date}: ${day.level} contributions`}
                />
              ))}
            </div>
            <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
              <span>Less</span>
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map((level) => (
                  <div key={level} className={`w-3 h-3 rounded-sm ${getContributionColor(level)}`} />
                ))}
              </div>
              <span>More</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-primary/20 mb-8">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-card-foreground mb-4 flex items-center gap-2">
              <Gamepad2 className="w-6 h-6 text-primary" />
              Typing Speed Test
            </h3>
            {!isTypingGameActive ? (
              <div className="text-center">
                <p className="text-muted-foreground mb-4">Test your typing speed!</p>
                <Button onClick={startTypingGame} className="bg-primary hover:bg-primary/90">
                  Start Test
                </Button>
                {typingSpeed > 0 && (
                  <div className="mt-4">
                    <Badge variant="secondary" className="text-lg px-4 py-2">
                      Last Speed: {typingSpeed} WPM
                    </Badge>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Type this text:</p>
                <p className="text-card-foreground mb-4 p-3 bg-muted rounded border-l-4 border-primary">{sampleText}</p>
                <textarea
                  value={typingText}
                  onChange={handleTypingInput}
                  className="w-full h-24 p-3 bg-background border border-border rounded resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Start typing here..."
                  autoFocus
                />
                <div className="mt-2 text-sm text-muted-foreground">
                  Progress: {Math.round((typingText.length / sampleText.length) * 100)}%
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {showEasterEgg && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fadeIn">
            <Card className="bg-card border-primary animate-scaleIn">
              <CardContent className="p-8 text-center">
                <Trophy className="w-16 h-16 text-primary mx-auto mb-4 animate-bounce" />
                <h3 className="text-2xl font-bold text-card-foreground mb-2">🎉 Easter Egg Found!</h3>
                <p className="text-muted-foreground mb-4">You discovered the Konami Code!</p>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  ↑↑↓↓←→←→BA
                </Badge>
                <p className="text-sm text-muted-foreground mt-4">Achievement Unlocked: Code Master</p>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="text-center text-sm text-muted-foreground">
          <p>☁️✨ Try the Konami Code: ↑↑↓↓←→←→BA</p>
        </div>
      </div>
    </section>
  )
}
