"use client"

import { Github, Instagram, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function Footer() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    const footerElement = document.getElementById("footer-section")
    if (footerElement) {
      observer.observe(footerElement)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <footer id="footer-section" className="py-16 px-4 border-t border-primary/20">
      <div className="container mx-auto">
        <div className="text-center">
          <div className={`transition-all duration-1000 ${isVisible ? "animate-slideUp" : "opacity-0 translate-y-10"}`}>
            <h3 className="text-4xl md:text-5xl font-bold mb-4 text-primary relative">
              {"LET'S CONNECT".split("").map((letter, index) => (
                <span
                  key={index}
                  className="inline-block hover:scale-110 transition-transform duration-300"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}
            </h3>
            <div
              className="w-24 h-1 bg-primary mx-auto mb-8 animate-scaleIn"
              style={{ animationDelay: "0.5s", animationFillMode: "both" }}
            ></div>
          </div>

          <div
            className={`transition-all duration-1000 delay-300 ${isVisible ? "animate-slideUp" : "opacity-0 translate-y-10"}`}
          >
            <div className="flex justify-center items-center gap-3 mb-12 text-muted-foreground group">
              <MapPin className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
              <span className="text-lg font-medium">Indonesia</span>
            </div>
          </div>

          <div
            className={`transition-all duration-1000 delay-500 ${isVisible ? "animate-slideUp" : "opacity-0 translate-y-10"}`}
          >
            <div className="flex gap-8 justify-center mb-16">
              <Button
                variant="ghost"
                size="lg"
                className="group relative text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-500 hover:scale-125 p-6 rounded-full border-2 border-primary/30 hover:border-primary"
                asChild
              >
                <a href="https://github.com/zidanXcode" target="_blank" rel="noopener noreferrer">
                  <Github className="w-10 h-10 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    GitHub
                  </span>
                </a>
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="group relative text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-500 hover:scale-125 p-6 rounded-full border-2 border-primary/30 hover:border-primary"
                asChild
              >
                <a href="https://instagram.com/zydanxq" target="_blank" rel="noopener noreferrer">
                  <Instagram className="w-10 h-10 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Instagram
                  </span>
                </a>
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="group relative text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-500 hover:scale-125 p-6 rounded-full border-2 border-primary/30 hover:border-primary"
                asChild
              >
                <a href="mailto:zidanagum888@gmail.com">
                  <Mail className="w-10 h-10 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Email
                  </span>
                </a>
              </Button>
            </div>
          </div>

          <div
            className={`transition-all duration-1000 delay-700 ${isVisible ? "animate-slideUp" : "opacity-0 translate-y-10"}`}
          >
            <div className="border-t border-primary/20 pt-8">
              <p className="text-muted-foreground text-lg">
                © 2025 Muhammad Zidan Agum Gumilang. Built with passion and secured with expertise.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
