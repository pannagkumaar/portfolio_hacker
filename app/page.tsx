// app/page.tsx
"use client"

import { useState, useEffect, useRef } from "react" // 1. Import useEffect and useRef
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
import BootSequence from "@/components/BootSequence"
import SystemStatus from "@/components/SystemStatus"
import { useSound } from "@/hooks/useSound" // 2. Import useSound

export default function Home() {
  const [booting, setBooting] = useState(true)

  // 3. Setup background hum sound
  const { playSound: playHum } = useSound('/sounds/hum.wav', 0.1, true); // ASSUMES hum.wav exists
  const hasPlayedHum = useRef(false);

  // 4. Play hum on first user interaction
  useEffect(() => {
    const playOnFirstInteraction = () => {
      if (!hasPlayedHum.current) {
        playHum();
        hasPlayedHum.current = true;
        // Clean up this listener once it has run
        window.removeEventListener('click', playOnFirstInteraction);
        window.removeEventListener('keydown', playOnFirstInteraction);
      }
    };

    window.addEventListener('click', playOnFirstInteraction);
    window.addEventListener('keydown', playOnFirstInteraction);

    return () => {
      window.removeEventListener('click', playOnFirstInteraction);
      window.removeEventListener('keydown', playOnFirstInteraction);
    };
  }, [playHum]);

  const handleBootComplete = () => {
    setBooting(false)
  }
 
  return (
    <main className="relative w-full overflow-hidden">
      <MatrixRain />
      
      <div className="relative z-10 bg-black/85">
        <div className="fixed inset-0 pointer-events-none opacity-5 scanlines" />
        <div className="vignette" />
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
        <SystemStatus />
      </div>
    </main>
  )
}