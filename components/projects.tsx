"use client"

import { useEffect, useRef, useState } from "react"
import ExternalLink from './ExternalLink'
import SectionLoader from "./SectionLoader" // 1. Import the loader

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false) // 2. Add loaded state
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true) // 3. Trigger visibility
          observer.unobserve(entry.target); // 4. Observe only once
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

  const projects = [
    {
      name: "PryGuard",
      type: "Anti-Fingerprinting Browser",
      status: "Deployed",
      description:
        "A privacy-focused browser that masks fingerprints, isolates cookies, and auto-generates disposable emails for secure browsing.",
      link: "https://github.com/pannagkumaar",
    },
    {
      name: "Malicious URL Scanner",
      type: "ML-based Web Threat Analyzer",
      status: "Active",
      description:
        "Machine learning-powered scanner that identifies and analyzes malicious URLs with real-time threat intelligence.",
      link: "https://github.com/pannagkumaar",
    },
    {
      name: "WriteRightAI",
      type: "AI Writing Assistant",
      status: "Active",
      description: "Intelligent writing tool powered by AI to enhance content quality and improve writing efficiency.",
      link: "https://github.com/pannagkumaar",
    },
    {
      name: "PlagU",
      type: "Plagiarism Detector",
      status: "Active",
      description: "Advanced plagiarism detection system using NLP and machine learning algorithms.",
      link: "https://github.com/pannagkumaar",
    },
    {
      name: "WebVuln Scanner",
      type: "Web Vulnerability Scanner",
      status: "Active",
      description: "Comprehensive web application vulnerability scanner for identifying security flaws.",
      link: "https://github.com/pannagkumaar",
    },
    {
      name: "P-Gen",
      type: "Password Generator",
      status: "Active",
      description: "Secure password generation tool with customizable parameters and strength analysis.",
      link: "https://github.com/pannagkumaar",
    },
  ]

  return (
    <section id="projects" ref={ref} className="py-20 px-4 max-w-6xl mx-auto">
      {/* 5. The h2 animates on its own */}
      <h2 className="text-3xl md:text-4xl font-bold font-mono mb-8 neon-glow text-glitch">{"> Accessing Projects..."}</h2>

      {/* 6. Show loader when visible but not yet loaded */}
      {isVisible && !isLoaded && (
        <SectionLoader onComplete={() => setIsLoaded(true)} />
      )}

      {/* 7. Show content only after loading is complete */}
      {isLoaded && (
        <div className="grid md:grid-cols-2 gap-6 animate-fadeInUp">
          {projects.map((project) => (
            <ExternalLink
              key={project.name}
              href={project.link}
              className="terminal-border p-6 bg-card/50 hover:shadow-lg hover:shadow-primary/30 transition-all group"
            >
              <div className="font-mono mb-4">
                <div className="text-primary font-bold group-hover:neon-glow transition-all">{"> " + project.name}</div>
                <div className="text-secondary text-sm">Type: {project.type}</div>
                <div className="text-muted-foreground text-sm">Status: {project.status}</div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{project.description}</p>
              <div className="text-primary font-mono text-xs">{"[View on GitHub →]"}</div>
            </ExternalLink>
          ))}
        </div>
      )}
    </section>
  )
}