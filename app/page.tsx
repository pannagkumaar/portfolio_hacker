"use client"

import { useEffect, useState } from "react"
import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Experience from "@/components/experience"
import Projects from "@/components/projects"
import Achievements from "@/components/achievements"
import Philosophy from "@/components/philosophy"
import SideMissions from "@/components/side-missions"
import Contact from "@/components/contact"
import Navigation from "@/components/navigation"
import MatrixRain from "@/components/matrix-rain"

export default function Home() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    // REMOVED `bg-black` from here
    <main className="relative w-full overflow-hidden">
      {/* Matrix background effect - it's in the back */}
      <MatrixRain />
      
      {/* This div is the global overlay that ensures readability. It wraps all content. */}
      <div className="relative z-10 bg-black/85">
        <div className="fixed inset-0 pointer-events-none opacity-5 scanlines" />

        <Navigation />
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Achievements />
        <Philosophy />
        <SideMissions />
        <Contact />
      </div>
    </main>
  )
}