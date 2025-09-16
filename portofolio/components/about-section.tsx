"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Terminal, Shield, Code2, Database, Lock, Bug } from "lucide-react"

export function AboutSection() {
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

    const element = document.getElementById("about-section")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const skills = [
    { icon: Code2, title: "Programming", desc: "Full-stack development with modern technologies" },
    { icon: Shield, title: "Cybersecurity", desc: "Network security and vulnerability assessment" },
    { icon: Database, title: "Database", desc: "Database design and optimization" },
    { icon: Terminal, title: "DevOps", desc: "CI/CD and infrastructure management" },
    { icon: Lock, title: "Encryption", desc: "Data protection and cryptography" },
    { icon: Bug, title: "Penetration Testing", desc: "Security testing and ethical hacking" },
  ]

  return (
    <section id="about-section" className="py-20 px-4">
      <div className="container mx-auto">
        <div
          className={`transition-all duration-1000 ${isVisible ? "animate-slideInLeft" : "opacity-0 translate-x-[-50px]"}`}
        >
          <h2 className="text-5xl font-bold text-center mb-16 text-primary animate-glow">ABOUT ME</h2>

          <div className="max-w-4xl mx-auto mb-16">
            <Card className="bg-card border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <CardContent className="p-8">
                <p className="text-lg leading-relaxed text-foreground text-center">
                  Saya adalah seorang programmer tingkat menengah dengan spesialisasi dalam cybersecurity. Dengan
                  pengalaman dalam pengembangan aplikasi full-stack dan keamanan sistem, saya berdedikasi untuk
                  menciptakan solusi teknologi yang aman dan efisien. Passion saya terletak pada intersection antara
                  development dan security, memastikan setiap kode yang saya tulis tidak hanya berfungsi dengan baik,
                  tetapi juga terlindungi dari berbagai ancaman cyber.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <Card
                key={skill.title}
                className={`bg-card border-primary/20 hover:border-primary/50 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-primary/10 ${
                  isVisible ? "animate-fadeInUp" : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <skill.icon className="w-12 h-12 text-primary mx-auto mb-4 animate-float" />
                  <h3 className="text-xl font-bold mb-2 text-foreground">{skill.title}</h3>
                  <p className="text-muted-foreground">{skill.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
