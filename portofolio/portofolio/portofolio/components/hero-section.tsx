"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Github, Instagram, Shield, Code } from "lucide-react"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [showName, setShowName] = useState(false)
  const [showSubtitle, setShowSubtitle] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    setTimeout(() => setShowName(true), 500)
    setTimeout(() => setShowSubtitle(true), 2000)
  }, [])

  const fullName = "MUHAMMAD ZIDAN AGUM GUMILANG"

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? "animate-fadeInUp" : "opacity-0"}`}>
          <div className="mb-6">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 text-primary">
              {showName && (
                <div className="inline-block">
                  {fullName.split("").map((letter, index) => (
                    <span
                      key={index}
                      className="inline-block animate-fadeInScale hover:animate-waveText cursor-default"
                      style={{
                        animationDelay: `${index * 0.05}s`,
                        animationFillMode: "both",
                      }}
                      onMouseEnter={(e) => {
                        const target = e.target as HTMLElement
                        target.classList.add("animate-glitchText")
                        setTimeout(() => {
                          target.classList.remove("animate-glitchText")
                        }, 300)
                      }}
                    >
                      {letter === " " ? "\u00A0" : letter}
                    </span>
                  ))}
                </div>
              )}
            </h1>
          </div>

          {showSubtitle && (
            <div className="text-xl md:text-2xl mb-12 text-muted-foreground animate-slideUp">
              <div className="flex items-center justify-center gap-4 mb-4">
                <Code
                  className="w-8 h-8 text-primary animate-scaleIn"
                  style={{ animationDelay: "0.2s", animationFillMode: "both" }}
                />
                <span>Mid-Level Programmer</span>
              </div>
              <div className="flex items-center justify-center gap-4">
                <Shield
                  className="w-8 h-8 text-primary animate-scaleIn"
                  style={{ animationDelay: "0.4s", animationFillMode: "both" }}
                />
                <span>Cybersecurity Specialist</span>
              </div>
            </div>
          )}

          {showSubtitle && (
            <div
              className="flex gap-6 justify-center mb-12 animate-slideUp"
              style={{ animationDelay: "0.6s", animationFillMode: "both" }}
            >
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 bg-transparent"
                asChild
              >
                <a href="https://github.com/zidanXcode" target="_blank" rel="noopener noreferrer">
                  <Github className="w-6 h-6 mr-2" />
                  GitHub
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 bg-transparent"
                asChild
              >
                <a href="https://instagram.com/zydanxq" target="_blank" rel="noopener noreferrer">
                  <Instagram className="w-6 h-6 mr-2" />
                  Instagram
                </a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
