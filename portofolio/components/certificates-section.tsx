"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Image from "next/image"

export function CertificatesSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [loaded, setLoaded] = useState<Record<number, boolean>>({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          const el = document.getElementById("certificates-section")
          if (el) observer.unobserve(el)
        }
      },
      { threshold: 0.05 },
    )

    const element = document.getElementById("certificates-section")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const certificates = [
    {
      id: 1,
      imageUrl: "https://files.catbox.moe/lo11ry.jpeg",
      alt: "Professional Certificate 1",
    },
    {
      id: 2,
      imageUrl: "https://files.catbox.moe/5ezhfr.jpeg",
      alt: "Professional Certificate 2",
    },
    {
      id: 3,
      imageUrl: "https://files.catbox.moe/fbvyvw.jpeg",
      alt: "Professional Certificate 3",
    },
    {
      id: 4,
      imageUrl: "/certificates/cert-4.png",
      alt: "Professional Certificate 4",
    },
  ]

  return (
    <section id="certificates-section" className="py-12 sm:py-16 md:py-20 lg:py-24 px-3 sm:px-4 bg-background">
      <div className="container mx-auto max-w-6xl w-full">
        <div
          className={`transition-all duration-500 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[30px]"}`}
        >
          <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-1.5 sm:mb-2 md:mb-3 text-balance">
              CERTIFICATES
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground px-2">
              Professional achievements and certifications
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-5">
            {certificates.map((cert, index) => (
              <div
                key={cert.id}
                className={`group cursor-pointer transition-all duration-300 will-change-transform transform-gpu hover:scale-[1.05] ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{
                  transitionDelay: isVisible ? `${index * 50}ms` : "0ms",
                }}
                role="img"
                aria-label={cert.alt}
              >
                <div
                  style={{ contentVisibility: "auto", containIntrinsicSize: "600px 400px" } as React.CSSProperties}
                  className="relative overflow-hidden rounded-lg sm:rounded-xl border border-primary/20 hover:border-primary/60 transition-all duration-300 bg-card shadow-lg hover:shadow-2xl hover:shadow-primary/20"
                >
                  <div
                    className={`absolute inset-0 transition-opacity duration-300 ${
                      loaded[cert.id] ? "opacity-0 pointer-events-none" : "opacity-100"
                    }`}
                    aria-hidden="true"
                  >
                    <div className="h-full w-full bg-gradient-to-br from-muted/40 via-muted/20 to-muted/10" />
                    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                  </div>

                  <div
                    className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                    style={{
                      background: "radial-gradient(60% 60% at 20% 0%, rgba(255,255,255,0.2), transparent 70%)",
                    }}
                    aria-hidden="true"
                  />

                  <Image
                    src={cert.imageUrl || "/placeholder.svg"}
                    alt={cert.alt}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                    priority={index < 2}
                    loading={index < 2 ? "eager" : "lazy"}
                    decoding="async"
                    sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    onLoadingComplete={() => setLoaded((prev) => ({ ...prev, [cert.id]: true }))}
                    onError={() => setLoaded((prev) => ({ ...prev, [cert.id]: true }))}
                    quality={85}
                  />

                  <div
                    className="pointer-events-none absolute left-[-120%] top-0 h-full w-[55%] rotate-[18deg] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[280%]"
                    aria-hidden="true"
                  />

                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"
                    aria-hidden="true"
                  />

                  <div className="absolute top-3 right-3 bg-primary/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                    Cert {index + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
