import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { SkillsSection } from "@/components/skills-section"
import { CertificatesSection } from "@/components/certificates-section"
import { Footer } from "@/components/footer"
import { InteractiveElements } from "@/components/interactive-elements"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <InteractiveElements />
      <CertificatesSection />
      <Footer />
    </main>
  )
}
