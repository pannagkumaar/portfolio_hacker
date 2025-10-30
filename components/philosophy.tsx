"use client"

import { useEffect, useRef, useState } from "react"

export default function Philosophy() {
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
    <section id="philosophy" ref={ref} className="py-20 px-4 max-w-6xl mx-auto">
      <div className={`transition-all duration-1000 ${isVisible ? "fade-in-up" : "opacity-0"}`}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-mono mb-12 neon-glow">{"> Philosophy"}</h2>

          <div className="terminal-border p-8 md:p-12 bg-card/50 space-y-6">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed italic">
              "Cybersecurity, to me, is a form of art — a balance between logic, curiosity, and chaos. My goal isn't to
              just find vulnerabilities — it's to understand how things fail, so we can build systems that never do."
            </p>

            <div className="border-t border-primary/30 pt-6">
              <p className="text-primary font-mono font-bold">"You don't find exploits — you uncover truth."</p>
            </div>

            <div className="text-muted-foreground font-mono text-sm space-y-2 pt-6">
              <div>{"// Security is not a destination, it's a journey"}</div>
              <div>{"// Every vulnerability is a lesson"}</div>
              <div>{"// Every tool is a responsibility"}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
