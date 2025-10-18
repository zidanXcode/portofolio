"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Github, Instagram, Code, Shield } from "lucide-react"
import { ReactBitsCard } from "@/components/react-bits-card"
import { AnimatedBadge } from "@/components/animated-badge"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [showName, setShowName] = useState(false)
  const [showSubtitle, setShowSubtitle] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const nameTimer = setTimeout(() => setShowName(true), 300)
    const subtitleTimer = setTimeout(() => setShowSubtitle(true), 1200)
    return () => {
      clearTimeout(nameTimer)
      clearTimeout(subtitleTimer)
    }
  }, [])

  const firstLine = "MUHAMMAD ZIDAN"
  const secondLine = "AGUM GUMILANG"

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 md:px-8 py-16 sm:py-20 md:py-24 lg:py-32">
      <div className="container mx-auto text-center relative z-10 max-w-4xl w-full">
        <div className={`transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12">
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-2 sm:mb-3 md:mb-4 lg:mb-6 text-primary text-pretty leading-tight tracking-tight">
              {showName && (
                <div className="inline-block">
                  <div className="block mb-1 sm:mb-2 md:mb-3 lg:mb-4">
                    {firstLine.split("").map((letter, index) => (
                      <span
                        key={`top-${index}`}
                        className="inline-block animate-fadeInScale cursor-default transition-transform duration-150 hover:scale-110 hover:text-primary/80"
                        style={{ animationDelay: `${index * 0.04}s`, animationFillMode: "both" }}
                      >
                        {letter === " " ? "\u00A0" : letter}
                      </span>
                    ))}
                  </div>
                  <div className="block">
                    {secondLine.split("").map((letter, index) => (
                      <span
                        key={`bottom-${index}`}
                        className="inline-block animate-fadeInScale cursor-default transition-transform duration-150 hover:scale-110 hover:text-primary/80"
                        style={{
                          animationDelay: `${(firstLine.length + index) * 0.04}s`,
                          animationFillMode: "both",
                        }}
                      >
                        {letter === " " ? "\u00A0" : letter}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </h1>
          </div>

          {showSubtitle && (
            <ReactBitsCard className="mb-6 sm:mb-8 md:mb-10 mx-auto max-w-full">
              <div className="p-3 sm:p-4 md:p-6 lg:p-8">
                <div className="flex flex-col gap-2 sm:gap-3 md:gap-4">
                  <div className="flex items-center justify-center gap-2 sm:gap-3">
                    <Code className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary flex-shrink-0" />
                    <span className="text-xs sm:text-sm md:text-base lg:text-lg font-medium">Mid-Level Programmer</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 sm:gap-3">
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary flex-shrink-0" />
                    <span className="text-xs sm:text-sm md:text-base lg:text-lg font-medium">
                      Cybersecurity Specialist
                    </span>
                  </div>
                </div>
              </div>
            </ReactBitsCard>
          )}

          {showSubtitle && (
            <div className="flex gap-2 sm:gap-3 justify-center mb-6 sm:mb-8 md:mb-10 flex-wrap animate-slideUp px-2">
              <AnimatedBadge variant="primary">Full Stack Developer</AnimatedBadge>
              <AnimatedBadge variant="accent">Security Focused</AnimatedBadge>
              <AnimatedBadge variant="secondary">Open Source</AnimatedBadge>
            </div>
          )}

          {showSubtitle && (
            <div className="flex gap-2 sm:gap-3 md:gap-4 justify-center mb-6 sm:mb-8 md:mb-10 flex-wrap animate-slideUp px-2">
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105 bg-transparent text-xs sm:text-sm md:text-base h-8 sm:h-9 md:h-10 px-3 sm:px-4"
                asChild
              >
                <a href="https://github.com/zidanXcode" target="_blank" rel="noopener noreferrer">
                  <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1.5 sm:mr-2" />
                  GitHub
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105 bg-transparent text-xs sm:text-sm md:text-base h-8 sm:h-9 md:h-10 px-3 sm:px-4"
                asChild
              >
                <a href="https://instagram.com/zydanxq" target="_blank" rel="noopener noreferrer">
                  <Instagram className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1.5 sm:mr-2" />
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
