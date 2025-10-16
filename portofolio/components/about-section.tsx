"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Terminal, Shield, Code2, Database, Lock, Bug, Award, Rocket } from "lucide-react"

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
    <section id="about-section" className="py-16 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div
          className={`transition-all duration-1000 ${isVisible ? "animate-slideInLeft" : "opacity-0 translate-x-[-50px]"}`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-16 text-primary animate-glow text-balance">
            ABOUT ME
          </h2>

          <div className="max-w-4xl mx-auto mb-12 md:mb-16">
            <Card className="bg-card border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <CardContent className="p-6 md:p-8">
                <p className="text-base md:text-lg leading-relaxed md:leading-relaxed text-foreground text-center text-pretty">
                  Saya adalah seorang programmer tingkat menengah dengan spesialisasi dalam cybersecurity. Dengan
                  pengalaman dalam pengembangan aplikasi full-stack dan keamanan sistem, saya berdedikasi untuk
                  menciptakan solusi teknologi yang aman dan efisien. Passion saya terletak pada intersection antara
                  development dan security, memastikan setiap kode yang saya tulis tidak hanya berfungsi dengan baik,
                  tetapi juga terlindungi dari berbagai ancaman cyber.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
            <Card className="bg-card border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <CardContent className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-foreground flex items-center gap-2">
                  <Rocket className="w-5 md:w-6 h-5 md:h-6 text-primary flex-shrink-0" aria-hidden="true" />
                  <span>What I Do</span>
                </h3>
                <ul className="space-y-3 md:space-y-4 text-sm md:text-base text-muted-foreground">
                  <li className="flex gap-3">
                    <Code2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span>
                      Membangun aplikasi full‑stack (React/Next.js, Node.js) dengan fokus pada performa dan
                      maintainability.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span>
                      Menerapkan best‑practice security: input validation, auth, RLS, dan hardening konfigurasi.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Terminal className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span>Automasi CI/CD, monitoring, dan deployment yang andal.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <CardContent className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-foreground flex items-center gap-2">
                  <Award className="w-5 md:w-6 h-5 md:h-6 text-primary flex-shrink-0" aria-hidden="true" />
                  <span>Highlights</span>
                </h3>
                <ul className="space-y-3 md:space-y-4 text-sm md:text-base text-muted-foreground">
                  <li className="flex gap-3">
                    <Database className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span>
                      Design database yang efisien (indexing, query optimization) untuk skala kecil hingga menengah.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Lock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span>Threat‑modeling sederhana dan penerapan mitigasi terhadap serangan umum (XSS/SQLi).</span>
                  </li>
                  <li className="flex gap-3">
                    <Bug className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span>Debugging dan penanganan incident yang terstruktur dengan logs dan metrics.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="max-w-5xl mx-auto mb-12 md:mb-16">
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
              {["JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "Node.js", "REST API"].map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center rounded-full border border-primary/30 bg-card/50 px-2.5 md:px-3 py-1 text-xs md:text-sm text-foreground hover:border-primary/60 transition-colors duration-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {skills.map((skill, index) => (
              <Card
                key={skill.title}
                className={`bg-card border-primary/20 hover:border-primary/50 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-primary/10 ${
                  isVisible ? "animate-fadeInUp" : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-4 md:p-6 text-center">
                  <skill.icon className="w-10 md:w-12 h-10 md:h-12 text-primary mx-auto mb-3 md:mb-4 animate-float" />
                  <h3 className="text-lg md:text-xl font-bold mb-2 text-foreground">{skill.title}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">{skill.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
