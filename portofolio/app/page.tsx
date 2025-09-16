import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { CertificatesSection } from "@/components/certificates-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <AboutSection />
      <CertificatesSection />
      <Footer />
    </main>
  )
}
