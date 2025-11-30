"use client"

import { useState, useEffect } from "react"

export function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrolled = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrolled / maxScroll) * 100
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", updateScrollProgress)
    return () => window.removeEventListener("scroll", updateScrollProgress)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 bg-blue-600 z-50 origin-left transition-transform duration-150"
      style={{ transform: `scaleX(${scrollProgress / 100})` }}
    />
  )
}
