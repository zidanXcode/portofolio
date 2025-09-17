"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export function CertificatesSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
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
  ]

  return (
    <section id="certificates-section" className="py-20 px-4">
      <div className="container mx-auto">
        <div
          className={`transition-all duration-1000 ${isVisible ? "animate-slideInRight" : "opacity-0 translate-x-[50px]"}`}
        >
          <h2 className="text-5xl font-bold text-center mb-16 text-white">CERTIFICATES</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {certificates.map((cert, index) => (
              <div
                key={cert.id}
                className={`group cursor-pointer transition-all duration-500 hover:scale-105 ${
                  isVisible ? "animate-fadeInUp" : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative overflow-hidden rounded-lg border border-white/20 hover:border-white/40 transition-all duration-300">
                  <Image
                    src={cert.imageUrl || "/placeholder.svg"}
                    alt={cert.alt}
                    width={400}
                    height={300}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                    priority={index === 0}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/formal-certificate.png"
                    }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
