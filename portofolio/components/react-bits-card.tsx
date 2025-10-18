"use client"

import type React from "react"
import { useState, useRef, useCallback } from "react"

interface ReactBitsCardProps {
  children: React.ReactNode
  className?: string
}

export function ReactBitsCard({ children, className = "" }: ReactBitsCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }, [])

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`relative overflow-hidden rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 ${
        isHovering ? "border-white/20 shadow-lg" : ""
      } ${className}`}
      style={{
        background: isHovering
          ? `radial-gradient(400px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.08), transparent 80%)`
          : "rgba(255, 255, 255, 0.03)",
      }}
    >
      <div className="relative z-10">{children}</div>
    </div>
  )
}
