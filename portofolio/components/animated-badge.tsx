"use client"

import type React from "react"

interface AnimatedBadgeProps {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "accent"
}

export function AnimatedBadge({ children, variant = "primary" }: AnimatedBadgeProps) {
  const variantClasses = {
    primary: "bg-primary/15 text-primary border-primary/30 hover:border-primary/50",
    secondary: "bg-secondary/15 text-secondary border-secondary/30 hover:border-secondary/50",
    accent: "bg-accent/15 text-accent border-accent/30 hover:border-accent/50",
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 hover:scale-105 ${variantClasses[variant]}`}
    >
      {children}
    </span>
  )
}
