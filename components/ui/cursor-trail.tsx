"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export function CursorTrail() {
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newPoint = { x: e.clientX, y: e.clientY, id: Date.now() }
      setTrail((prev) => [...prev.slice(-10), newPoint])
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <>
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          className="fixed w-2 h-2 bg-blue-400/30 rounded-full pointer-events-none z-50"
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
          style={{
            left: point.x - 4,
            top: point.y - 4,
          }}
        />
      ))}
    </>
  )
}
