"use client"

import { useEffect, useRef, useState } from "react"

export default function Skills() {
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

  const skills = [
    { category: "Languages", items: ["Python", "C", "C++", "JavaScript", "Bash"] },
    { category: "Penetration Testing", items: ["Metasploit", "Nmap", "Burp Suite", "Hydra", "SQLmap"] },
    { category: "Threat Analysis", items: ["Wireshark", "Nessus", "John the Ripper", "Hashcat"] },
    { category: "Web Security", items: ["OWASP Top 10", "XSS", "SQL Injection", "CSRF", "API Security"] },
    { category: "OSINT & Forensics", items: ["Digital Forensics", "OSINT Tools", "Memory Analysis"] },
    { category: "Other", items: ["Linux Mastery", "MERN Stack", "Git", "Docker", "Team Collaboration"] },
  ]

  return (
    <section id="skills" ref={ref} className="py-20 px-4 max-w-6xl mx-auto">
      <div className={`transition-all duration-1000 ${isVisible ? "fade-in-up" : "opacity-0"}`}>
        <h2 className="text-3xl md:text-4xl font-bold font-mono mb-4 neon-glow text-glitch">{"> Installed Modules"}</h2>
        <p className="text-muted-foreground font-mono mb-12">Capabilities Unlocked:</p>

        <div className="grid md:grid-cols-2 gap-6">
          {skills.map((skill) => (
            <div key={skill.category} className="terminal-border p-6 bg-card/50">
              <h3 className="text-primary font-mono font-bold mb-4">{"[+] " + skill.category}</h3>
              <div className="space-y-2">
                {skill.items.map((item) => (
                  <div key={item} className="text-muted-foreground font-mono text-sm flex items-center">
                    <span className="text-secondary mr-2">▸</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}