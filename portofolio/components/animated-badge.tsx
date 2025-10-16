"use client"

import type React from "react"

interface AnimatedBadgeProps {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "accent"
  animated?: boolean
}

export function AnimatedBadge({ children, variant = "primary", animated = true }: AnimatedBadgeProps) {
  const variantClasses = {
    primary: "bg-primary/20 text-primary border-primary/30 hover:border-primary/60",
    secondary: "bg-secondary/20 text-secondary border-secondary/30 hover:border-secondary/60",
    accent: "bg-accent/20 text-accent border-accent/30 hover:border-accent/60",
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border transition-all duration-300 ${
        animated ? "hover:scale-110 hover:shadow-lg" : ""
      } ${variantClasses[variant]}`}
    >
      {children}
    </span>
  )
}
