"use client"

import { useState, useEffect } from "react"
import { ChevronUp } from "lucide-react"

export function ScrollToTop() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const updateScrollTop = () => {
      setShowScrollTop(window.scrollY > 500)
    }

    window.addEventListener("scroll", updateScrollTop)
    return () => window.removeEventListener("scroll", updateScrollTop)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (!showScrollTop) return null

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-16 left-4 z-40 w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-200 flex items-center justify-center hover:scale-110 active:scale-95 animate-in fade-in zoom-in-95"
    >
      <ChevronUp className="w-6 h-6" />
    </button>
  )
}
