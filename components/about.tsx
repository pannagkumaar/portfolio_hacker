"use client"

import { useEffect, useRef, useState } from "react"

export default function About() {
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

  return (
    <section id="about" ref={ref} className="py-20 px-4 max-w-6xl mx-auto">
      <div className={`transition-all duration-1000 ${isVisible ? "fade-in-up" : "opacity-0"}`}>
        <h2 className="text-3xl md:text-4xl font-bold font-mono mb-8 neon-glow text-glitch">{"> About Me"}</h2>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              I've always been fascinated by how systems work — and more importantly, how they break. What started as
              curiosity became a craft — understanding vulnerabilities, building defenses, and learning endlessly.
            </p>
            <p>
              My focus today is on ethical hacking, privacy engineering, and creating tools that empower security. I
              believe in the philosophy that cybersecurity is a form of art — a balance between logic, curiosity, and
              chaos.
            </p>
            <p className="text-primary font-mono">"Always learning, always experimenting, always evolving."</p>
          </div>

          <div className="terminal-border p-6 bg-card/50">
            <div className="space-y-3 font-mono text-sm">
              <div className="flex justify-between">
                <span className="text-secondary">[Age]</span>
                <span>22</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">[Location]</span>
                <span>Bengaluru, India</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">[Current Role]</span>
                <span>Cybersecurity Engineer</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">[Company]</span>
                <span>Société Générale</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">[TryHackMe]</span>
                <span className="text-primary">Top 1%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">[Education]</span>
                <span>PES University (2025)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {["Writing", "Painting", "3D Printing", "Gaming", "Fitness", "Cooking"].map((hobby) => (
            <div key={hobby} className="p-4 bg-card border border-primary/30 text-center font-mono text-sm">
              {hobby}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}