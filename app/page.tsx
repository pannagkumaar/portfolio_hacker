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

export default function Home() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="relative w-full overflow-hidden">
      {/* Matrix background effect */}
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
    </main>
  )
}
