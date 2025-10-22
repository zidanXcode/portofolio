import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Muhammad Zidan Agum Gumilang - Portfolio",
  description:
    "Mid-level Programmer & Cybersecurity Specialist - Professional portfolio showcasing programming skills and cybersecurity expertise",
  keywords: ["programmer", "cybersecurity", "portfolio", "web development", "security specialist"],
  authors: [{ name: "Muhammad Zidan Agum Gumilang" }],
  creator: "Muhammad Zidan Agum Gumilang",
  publisher: "Muhammad Zidan Agum Gumilang",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Muhammad Zidan Agum Gumilang - Portfolio",
    description: "Mid-level Programmer & Cybersecurity Specialist",
    siteName: "Muhammad Zidan Agum Gumilang Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Zidan Agum Gumilang - Portfolio",
    description: "Mid-level Programmer & Cybersecurity Specialist",
  },
  generator: "Next.js",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} dark`}>
      <head>
        <link rel="preconnect" href="https://files.catbox.moe" crossOrigin="" />
        <link rel="dns-prefetch" href="https://files.catbox.moe" />
        <link rel="preconnect" href="https://api.github.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://api.github.com" />
        <link rel="preconnect" href="https://blob.v0.app" crossOrigin="" />
        <link rel="dns-prefetch" href="https://blob.v0.app" />
      </head>
      <body className="font-sans antialiased">
        <Suspense fallback={null}>{children}</Suspense>
        {/* Analytics component causing import errors */}
      </body>
    </html>
  )
}
