// app/page.tsx
"use client"

import { useState } from "react"
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
import BootSequence from "@/components/BootSequence" // 1. Import the new component

export default function Home() {
  // 2. State to manage the boot sequence
  const [booting, setBooting] = useState(true)

  // 3. Callback to hide the boot sequence when it's done
  const handleBootComplete = () => {
    setBooting(false)
  }

  // 4. Render the boot sequence conditionally
  if (booting) {
    return <BootSequence onComplete={handleBootComplete} />
  }

  return (
    // Your existing main content
    <main className="relative w-full overflow-hidden">
      <MatrixRain />
      
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