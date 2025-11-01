"use client"

import { useEffect, useRef, useState } from "react"
import SectionLoader from "./SectionLoader" // 1. Import the loader

export default function Experience() {
  const [isVisible, setIsVisible] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false) // 2. Add loaded state
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true) // 3. Trigger visibility first
          observer.unobserve(entry.target); // 4. Observe only once
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
        if (ref.current) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            observer.unobserve(ref.current)
        }
    }
  }, [])

  return (
    <section id="experience" ref={ref} className="py-20 px-4 max-w-6xl mx-auto">
      {/* 5. The h2 animates on its own */}
      <h2 className="text-3xl md:text-4xl font-bold font-mono mb-8 neon-glow text-glitch">{"> Accessing Work Log..."}</h2>

      {/* 6. Show loader when visible but not yet loaded */}
      {isVisible && !isLoaded && (
        <SectionLoader onComplete={() => setIsLoaded(true)} />
      )}

      {/* 7. Show content only after loading is complete */}
      {isLoaded && (
        <div className="space-y-8 animate-fadeInUp">
          <div className="terminal-border p-8 bg-card/50">
            <div className="font-mono mb-4">
              <div className="text-primary font-bold">[2025 – Present]</div>
              <div className="text-secondary text-lg font-bold">Société Générale</div>
              <div className="text-muted-foreground">Cybersecurity Analyst → Security Engineer</div>
            </div>
            <ul className="space-y-2 text-muted-foreground font-mono text-sm">
              <li className="flex items-start">
                <span className="text-primary mr-3">▸</span>
                <span>Automated internal security operations (reduced 1.5 FTE manual work)</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">▸</span>
                <span>Supported governance and compliance frameworks</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">▸</span>
                <span>Enhanced monitoring workflows and incident response scripting</span>
              </li>
            </ul>
          </div>

          <div className="terminal-border p-8 bg-card/50">
            <div className="font-mono mb-4">
              <div className="text-primary font-bold">[Jan – July 2025]</div>
              <div className="text-secondary text-lg font-bold">Société Générale</div>
              <div className="text-muted-foreground">Cybersecurity Analyst (Intern)</div>
            </div>
            <ul className="space-y-2 text-muted-foreground font-mono text-sm">
              <li className="flex items-start">
                <span className="text-primary mr-3">▸</span>
                <span>Conducted security assessments and vulnerability analysis</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">▸</span>
                <span>Developed automation scripts for security operations</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">▸</span>
                <span>Participated in incident response and threat analysis</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </section>
  )
}