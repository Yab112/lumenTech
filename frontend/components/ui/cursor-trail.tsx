"use client"

import { useState, useEffect } from "react"

export function CursorTrail() {
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newPoint = { x: e.clientX, y: e.clientY, id: Date.now() }
      setTrail((prev) => [...prev.slice(-10), newPoint])
      
      // Auto-remove after animation
      setTimeout(() => {
        setTrail((prev) => prev.filter((p) => p.id !== newPoint.id))
      }, 500)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <>
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="fixed w-2 h-2 bg-blue-400/30 rounded-full pointer-events-none z-50 animate-fade-out"
          style={{
            left: point.x - 4,
            top: point.y - 4,
            animationDelay: `${index * 50}ms`,
            animationDuration: '500ms',
          }}
        />
      ))}
    </>
  )
}
