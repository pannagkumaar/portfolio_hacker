"use client"

import { useEffect, useRef, useState } from "react"

export default function Achievements() {
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

  const achievements = [
    "EC-Council Certified Cybersecurity Technician",
    "TCM Practical Junior Penetration Tester",
    "Google Cybersecurity Specialization",
    "(ISC)² Systems Security Certified Practitioner",
    "TryHackMe Top 1%",
    "Winner – ISFCR CTF (2023)",
    "Winner – Digital Forensics CTF (2024)",
    "Top 5 – Kalpana Hackathon",
  ]

  return (
    <section id="achievements" ref={ref} className="py-20 px-4 max-w-6xl mx-auto">
      <div className={`transition-all duration-1000 ${isVisible ? "fade-in-up" : "opacity-0"}`}>
        <h2 className="text-3xl md:text-4xl font-bold font-mono mb-12 neon-glow">
          {"> Achievements & Certifications"}
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {achievements.map((achievement, index) => (
            <div key={index} className="terminal-border p-4 bg-card/50 font-mono text-sm flex items-start">
              <span className="text-secondary mr-3 flex-shrink-0">[+]</span>
              <span className="text-muted-foreground">{achievement}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
