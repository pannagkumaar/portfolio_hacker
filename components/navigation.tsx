// components/navigation.tsx
"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { useSound } from "@/hooks/useSound"
import TerminalNav from "./TerminalNav"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [terminalTarget, setTerminalTarget] = useState<string | null>(null)
  
  // FIX: Destructure playSound
  const { playSound: playClickSound } = useSound('/sounds/click.wav', 0.4)

  const links = [
    { href: "#about", label: "About", sectionId: "about" },
    { href: "#skills", label: "Skills", sectionId: "skills" },
    { href: "#experience", label: "Experience", sectionId: "experience" },
    { href: "#projects", label: "Projects", sectionId: "projects" },
    { href: "#achievements", label: "Achievements", sectionId: "achievements" },
    { href: "#contact", label: "Contact", sectionId: "contact" },
  ]
  
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault() 
    playClickSound()
    setTerminalTarget(sectionId) 
    if (isOpen) {
        setIsOpen(false)
    }
  }

  const handleTerminalComplete = useCallback(() => {
    setTerminalTarget(null)
  }, []) 

  return (
    <>
      {terminalTarget && (
        <TerminalNav 
            targetSection={terminalTarget} 
            onComplete={handleTerminalComplete} 
        />
      )}

      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-primary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="#" className="font-mono text-lg font-bold neon-glow" onClick={(e) => handleNavClick(e, "#")}>
              {"> pannag_kumaar"}
            </Link>

            <div className="hidden md:flex gap-8">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors"
                  onClick={(e) => handleNavClick(e, link.sectionId)}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <button onClick={() => {
              playClickSound()
              setIsOpen(!isOpen)
            }} className="md:hidden text-primary">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {isOpen && (
            <div className="md:hidden pb-4 space-y-2">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block font-mono text-sm text-muted-foreground hover:text-primary transition-colors py-2"
                  onClick={(e) => handleNavClick(e, link.sectionId)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>
    </>
  )
}