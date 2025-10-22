import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { SkillsSection } from "@/components/skills-section"
import { MarqueeSection } from "@/components/marquee-section"
import { InteractiveElements } from "@/components/interactive-elements"
import { CertificatesSection } from "@/components/certificates-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <MarqueeSection />
      <InteractiveElements />
      <CertificatesSection />
      <Footer />
    </main>
  )
}
