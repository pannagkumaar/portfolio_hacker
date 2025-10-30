"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [submitted, setSubmitted] = useState(false)
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" })
      setSubmitted(false)
    }, 3000)
  }

  const contacts = [
    { label: "Email", value: "pannag2003@gmail.com", href: "mailto:pannag2003@gmail.com" },
    { label: "LinkedIn", value: "linkedin.com/in/pannag-kumaar", href: "https://linkedin.com/in/pannag-kumaar" },
    { label: "GitHub", value: "github.com/pannagkumaar", href: "https://github.com/pannagkumaar" },
    { label: "Medium", value: "medium.com/@pannagkumaar", href: "https://medium.com/@pannagkumaar" },
    { label: "TryHackMe", value: "tryhackme.com/p/0N1", href: "https://tryhackme.com/p/0N1" },
  ]

  return (
    <section id="contact" ref={ref} className="py-20 px-4 max-w-6xl mx-auto">
      <div className={`transition-all duration-1000 ${isVisible ? "fade-in-up" : "opacity-0"}`}>
        <h2 className="text-3xl md:text-4xl font-bold font-mono mb-8 neon-glow text-glitch">{"> Connect with Pannag"}</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="terminal-border p-8 bg-card/50">
            <p className="font-mono text-sm text-muted-foreground mb-6">
              {"> Type your message below and press [Enter] to transmit."}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="font-mono text-sm text-secondary block mb-2">{"[name]"}</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-background border border-primary/30 text-foreground font-mono text-sm p-3 focus:outline-none focus:border-primary"
                  required
                />
              </div>

              <div>
                <label className="font-mono text-sm text-secondary block mb-2">{"[email]"}</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-background border border-primary/30 text-foreground font-mono text-sm p-3 focus:outline-none focus:border-primary"
                  required
                />
              </div>

              <div>
                <label className="font-mono text-sm text-secondary block mb-2">{"[message]"}</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-background border border-primary/30 text-foreground font-mono text-sm p-3 focus:outline-none focus:border-primary h-24 resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground font-mono font-bold py-3 hover:shadow-lg hover:shadow-primary/50 transition-all"
              >
                {submitted ? "> Packet Sent ✓" : "> Send Packet"}
              </button>
            </form>
          </div>

          {/* Contact Links */}
          <div className="space-y-4">
            {contacts.map((contact) => (
              <a
                key={contact.label}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className="terminal-border p-4 bg-card/50 hover:shadow-lg hover:shadow-primary/30 transition-all block"
              >
                <div className="font-mono text-sm text-secondary">[{contact.label}]</div>
                <div className="text-muted-foreground font-mono text-sm mt-1 hover:text-primary transition-colors">
                  {contact.value}
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center border-t border-primary/30 pt-8">
          <p className="font-mono text-muted-foreground text-sm">
            {"> © 2025 Pannag Kumaar. All systems operational."}
          </p>
          <p className="font-mono text-primary text-xs mt-2">{"> Explore. Learn. Build. Secure."}</p>
        </div>
      </div>
    </section>
  )
}
