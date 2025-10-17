"use client"

import { useEffect, useRef } from "react"

export function MarqueeSection() {
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const marquee = marqueeRef.current
    if (!marquee) return

    let animationId: number
    let position = 0
    const speed = 0.5

    const animate = () => {
      position -= speed
      if (marquee.scrollWidth && position < -marquee.scrollWidth / 2) {
        position = 0
      }
      marquee.style.transform = `translateX(${position}px)`
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [])

  const items = [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
    "JavaScript",
    "Web Security",
    "Full Stack",
    "API Development",
    "Database Design",
  ]

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-3 sm:px-4 bg-gradient-to-b from-background via-background to-background/80 border-y border-primary/10 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2 sm:mb-3 tracking-tight">
            Tech Stack & Expertise
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-2xl mx-auto px-2">
            Proficient in modern technologies and best practices for building scalable applications
          </p>
        </div>

        <div className="relative overflow-hidden rounded-lg sm:rounded-xl lg:rounded-2xl border border-primary/20 bg-card/50 backdrop-blur-sm p-4 sm:p-6 md:p-8">
          {/* Gradient masks for smooth fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

          {/* Marquee content */}
          <div
            ref={marqueeRef}
            className="flex gap-2 sm:gap-3 md:gap-4 lg:gap-6 whitespace-nowrap"
            style={{ willChange: "transform" }}
          >
            {[...items, ...items, ...items].map((item, index) => (
              <div
                key={index}
                className="group inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 md:px-7 py-2 sm:py-3 md:py-4 rounded-lg sm:rounded-xl border border-primary/30 bg-gradient-to-br from-card to-card/80 hover:border-primary/60 hover:from-primary/10 hover:to-primary/5 transition-all duration-300 flex-shrink-0 shadow-lg hover:shadow-xl hover:shadow-primary/20"
              >
                <span className="text-xs sm:text-sm md:text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                  {item}
                </span>
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary/60 group-hover:bg-primary transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 mt-6 sm:mt-8 md:mt-12">
          <div className="p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl border border-primary/20 bg-card/50 backdrop-blur-sm text-center hover:border-primary/50 transition-all duration-300">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-1">10+</div>
            <p className="text-xs sm:text-sm text-muted-foreground">Technologies</p>
          </div>
          <div className="p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl border border-primary/20 bg-card/50 backdrop-blur-sm text-center hover:border-primary/50 transition-all duration-300">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-1">100%</div>
            <p className="text-xs sm:text-sm text-muted-foreground">Responsive</p>
          </div>
          <div className="p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl border border-primary/20 bg-card/50 backdrop-blur-sm text-center hover:border-primary/50 transition-all duration-300">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-1">Pro</div>
            <p className="text-xs sm:text-sm text-muted-foreground">Quality</p>
          </div>
        </div>
      </div>
    </section>
  )
}
