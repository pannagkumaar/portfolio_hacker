"use client"

import { useEffect, useState } from "react"

export default function Hero() {
  const [displayText, setDisplayText] = useState("")
  const [roleIndex, setRoleIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [animationStep, setAnimationStep] = useState(0)

  const roles = ["Ethical Hacker", "Cybersecurity Engineer", "Tool Builder", "Privacy Advocate", "Learner"]

  // Role typing effect
  useEffect(() => {
    if (animationStep < 4) return;

    const currentRole = roles[roleIndex];
    let timeout: NodeJS.Timeout;

    if (isTyping) {
      if (displayText.length < currentRole.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        }, 100);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      }
    } else {
      timeout = setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % roles.length);
        setDisplayText("");
        setIsTyping(true);
      }, 500);
    }

    return () => clearTimeout(timeout);
  }, [displayText, roleIndex, isTyping, animationStep, roles]);

  // Staggered load-in animation
  useEffect(() => {
    const timers = [
      setTimeout(() => setAnimationStep(1), 500),
      setTimeout(() => setAnimationStep(2), 1500),
      setTimeout(() => setAnimationStep(3), 2000),
      setTimeout(() => setAnimationStep(4), 2500),
      setTimeout(() => setAnimationStep(5), 3000),
      setTimeout(() => setAnimationStep(6), 3500),
      setTimeout(() => setAnimationStep(7), 4000),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);


  return (
    <section className="min-h-screen flex items-center justify-center relative pt-16 overflow-hidden">
      
      {/* Decorative blobs are now less prominent and behind the content */}
      <div className="absolute inset-0 opacity-5 z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary rounded-full mix-blend-multiply filter blur-3xl animate-pulse [animation-delay:500ms]" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className={`font-mono text-primary mb-4 text-sm md:text-base transition-opacity duration-500 ${animationStep >= 1 ? 'opacity-100' : 'opacity-0'}`}>
          <span className="text-glitch">{"> Initializing Identity..."}</span>
        </div>
        <div className={`font-mono text-primary mb-8 text-sm md:text-base transition-opacity duration-500 ${animationStep >= 2 ? 'opacity-100' : 'opacity-0'}`}>
          {"> Access Granted."}
        </div>

        <h1 className={`text-4xl md:text-6xl font-bold mb-4 font-mono transition-opacity duration-1000 ${animationStep >= 3 ? 'opacity-100' : 'opacity-0'}`}>
          Hello, I'm <span className="neon-glow">Pannag Kumaar</span>
        </h1>

        <div className="text-2xl md:text-4xl font-mono mb-8 h-16 flex items-center justify-center">
            {animationStep >= 4 && (
                 <span className="text-primary">
                    the {displayText}
                    <span className="animate-pulse">_</span>
                </span>
            )}
        </div>

        <p className={`text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed transition-opacity duration-1000 ${animationStep >= 5 ? 'opacity-100' : 'opacity-0'}`}>
          Cybersecurity isn't about walls — it's about awareness. I explore, I learn, I build — not to exploit, but to
          understand.
        </p>

        <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-opacity duration-1000 ${animationStep >= 6 ? 'opacity-100' : 'opacity-0'}`}>
          <a
            href="#about"
            className="px-8 py-3 bg-primary text-primary-foreground font-mono font-bold hover:shadow-lg hover:shadow-primary/50 transition-all terminal-border flicker"
          >
            {"> Enter The System"}
          </a>
          <a
            href="https://github.com/pannagkumaar"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 border-2 border-secondary text-secondary font-mono font-bold hover:shadow-lg hover:shadow-secondary/50 transition-all flicker"
          >
            {"> View GitHub"}
          </a>
        </div>

        <div className={`mt-16 text-muted-foreground font-mono text-sm transition-opacity duration-1000 ${animationStep >= 7 ? 'opacity-100' : 'opacity-0'}`}>
          <div>{"[+] TryHackMe: Top 1%"}</div>
          <div>{"[+] Société Générale: Cybersecurity Analyst"}</div>
          <div>{"[+] PES University: CSE Specialization"}</div>
        </div>
      </div>
    </section>
  )
}