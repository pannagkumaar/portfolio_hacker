"use client"

import { useEffect, useRef, useState } from "react"
import SectionHeader from "./SectionHeader"

export default function About() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null) // MODIFICATION: Typed ref as HTMLElement

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          
          // ADDITION: Find all children with 'stagger-in' and make them visible
          const children = ref.current?.querySelectorAll('.stagger-in');
          children?.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add('visible');
            }, index * 100); // 100ms delay for each item
          });
          
          observer.unobserve(entry.target); // Stop observing once animated
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
    <section id="about" ref={ref} className="py-20 px-4 max-w-6xl mx-auto">
      {/* MODIFICATION: Changed class for new animation */}
      <div className={`transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
        {/* ADDITION: Added stagger-in class */}
        <div className="stagger-in">
          <SectionHeader title="About Me" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            {/* ADDITION: Added stagger-in class to each paragraph */}
            <p className="stagger-in">
              I've always been fascinated by how systems work — and more importantly, how they break. What started as
              curiosity became a craft — understanding vulnerabilities, building defenses, and learning endlessly.
            </p>
            <p className="stagger-in">
              My focus today is on ethical hacking, privacy engineering, and creating tools that empower security. I
              believe in the philosophy that cybersecurity is a form of art — a balance between logic, curiosity, and
              chaos.
            </p>
            <p className="text-primary font-mono stagger-in">"Always learning, always experimenting, always evolving."</p>
          </div>

          {/* ADDITION: Added stagger-in class to the info box */}
          <div className="terminal-border p-6 bg-card/50 stagger-in">
            <div className="space-y-3 font-mono text-sm">
              <div className="flex justify-between">
                <span className="text-secondary">[Age]</span>
                <span>22</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">[Location]</span>
                <span>Bengaluru, India</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">[Current Role]</span>
                <span>Cybersecurity Engineer</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">[Company]</span>
                <span>Société Générale</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">[TryHackMe]</span>
                <span className="text-primary">Top 1%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">[Education]</span>
                <span>PES University (2025)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {/* ADDITION: Added stagger-in class to each hobby item */}
          {["Writing", "Painting", "3D Printing", "Gaming", "Fitness", "Cooking"].map((hobby) => (
            <div key={hobby} className="p-4 bg-card border border-primary/30 text-center font-mono text-sm stagger-in">
              {hobby}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}