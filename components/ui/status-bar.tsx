"use client"

import { useState, useEffect } from "react"
import { Eye, Clock } from "lucide-react"

export function StatusBar() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [viewCount, setViewCount] = useState(1247)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setViewCount((prev) => prev + Math.floor(Math.random() * 3))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="hidden sm:block fixed top-2 right-6 z-40 bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg  rounded-3xl p-3    border border-slate-200 dark:border-slate-700">
      <div className="flex items-center space-x-4 text-xs">
        <div className="flex items-center space-x-1">
          <Eye className="w-3 h-3 text-slate-500" />
          <span className="text-slate-600 dark:text-slate-300">{viewCount.toLocaleString()}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Clock className="w-3 h-3 text-slate-500" />
          <span className="text-slate-600 dark:text-slate-300">
            {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
      </div>
    </div>
  )
}
