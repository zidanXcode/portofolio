"use client"

import type React from "react"
import { useState, useRef } from "react"

interface ReactBitsCardProps {
  children: React.ReactNode
  className?: string
  glowColor?: string
  interactive?: boolean
}

export function ReactBitsCard({
  children,
  className = "",
  glowColor = "rgba(255, 255, 255, 0.1)",
  interactive = true,
}: ReactBitsCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setMousePosition({ x, y })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 ${
        isHovering ? "border-white/20 shadow-2xl" : ""
      } ${className}`}
      style={{
        background: isHovering
          ? `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, ${glowColor}, transparent 80%)`
          : "rgba(255, 255, 255, 0.05)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.1), transparent 80%)`,
        }}
      />

      <div className="relative z-10">{children}</div>
    </div>
  )
}
