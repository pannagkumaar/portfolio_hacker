"use client"

import { useEffect, useState } from "react"

export default function Hero() {
  const [displayText, setDisplayText] = useState("")
  const [roleIndex, setRoleIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)

  const roles = ["Ethical Hacker", "Cybersecurity Engineer", "Tool Builder", "Privacy Advocate", "Learner"]

  useEffect(() => {
    const currentRole = roles[roleIndex]
    let charIndex = 0
    let timeout: NodeJS.Timeout

    if (isTyping) {
      timeout = setTimeout(() => {
        if (charIndex < currentRole.length) {
          setDisplayText(currentRole.slice(0, charIndex + 1))
          charIndex++
        } else {
          setIsTyping(false)
        }
      }, 100)
    } else {
      timeout = setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % roles.length)
        setDisplayText("")
        setIsTyping(true)
      }, 2000)
    }

    return () => clearTimeout(timeout)
  }, [displayText, roleIndex, isTyping])

  return (
    <section className="min-h-screen flex items-center justify-center relative pt-16">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary rounded-full mix-blend-multiply filter blur-3xl" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="font-mono text-primary mb-4 text-sm md:text-base">{"> Initializing Identity..."}</div>
        <div className="font-mono text-primary mb-8 text-sm md:text-base">{"> Access Granted."}</div>

        <h1 className="text-4xl md:text-6xl font-bold mb-4 font-mono">
          Hello, I'm <span className="neon-glow">Pannag Kumaar</span>
        </h1>

        <div className="text-2xl md:text-4xl font-mono mb-8 h-16 flex items-center justify-center">
          <span className="text-primary">
            the {displayText}
            <span className="animate-pulse">_</span>
          </span>
        </div>

        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          Cybersecurity isn't about walls — it's about awareness. I explore, I learn, I build — not to exploit, but to
          understand.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#about"
            className="px-8 py-3 bg-primary text-primary-foreground font-mono font-bold hover:shadow-lg hover:shadow-primary/50 transition-all terminal-border"
          >
            {"> Enter The System"}
          </a>
          <a
            href="https://github.com/pannagkumaar"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 border-2 border-secondary text-secondary font-mono font-bold hover:shadow-lg hover:shadow-secondary/50 transition-all"
          >
            {"> View GitHub"}
          </a>
        </div>

        <div className="mt-16 text-muted-foreground font-mono text-sm">
          <div>{"[+] TryHackMe: Top 1%"}</div>
          <div>{"[+] Société Générale: Cybersecurity Analyst"}</div>
          <div>{"[+] PES University: CSE Specialization"}</div>
        </div>
      </div>
    </section>
  )
}
