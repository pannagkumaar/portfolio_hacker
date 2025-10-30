"use client"

import { useEffect, useRef, useState } from "react"

export default function SideMissions() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const missions = [
    "Writing blogs on Medium",
    "3D Printing and prototyping designs",
    "Painting & Digital Art",
    "Fitness and Sports – Football, Badminton, Tennis, Chess",
    "Cooking and experimenting with new recipes",
    "Contributing to open-source security projects",
  ]

  return (
    <section ref={ref} className="py-20 px-4 max-w-6xl mx-auto">
      <div className={`transition-all duration-1000 ${isVisible ? "fade-in-up" : "opacity-0"}`}>
        <h2 className="text-3xl md:text-4xl font-bold font-mono mb-8 neon-glow text-glitch">{"> Side Missions"}</h2>

        <div className="space-y-3">
          {missions.map((mission, index) => (
            <div key={index} className="terminal-border-green p-4 bg-card/50 font-mono text-sm flex items-start">
              <span className="text-secondary mr-3 flex-shrink-0">[+]</span>
              <span className="text-muted-foreground">{mission}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
