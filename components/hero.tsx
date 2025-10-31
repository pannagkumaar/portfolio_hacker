// components/hero.tsx
"use client"

import { useEffect, useState, useCallback } from "react" 
import BootSequence from "./BootSequence"
import { useSound } from "@/hooks/useSound"
import TerminalNav from "./TerminalNav"
import ExternalLink from './ExternalLink'

export default function Hero() {
  const [displayText, setDisplayText] = useState("")
  const [roleIndex, setRoleIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [showBootSequence, setShowBootSequence] = useState(true)
  const [showMainContent, setShowMainContent] = useState(false)
  const [terminalTarget, setTerminalTarget] = useState<string | null>(null); 
  const playClickSound = useSound('/sounds/click.mp3', 0.4);

  const roles = ["Ethical Hacker", "Cybersecurity Engineer", "Tool Builder", "Privacy Advocate", "Learner"]

  useEffect(() => {
    if (!showMainContent) return;
    
    const currentRole = roles[roleIndex];
    let timeout: NodeJS.Timeout;

    if (isTyping) {
      if (displayText.length < currentRole.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        }, 100);
      } else {
        timeout = setTimeout(() => setIsTyping(false), 2000);
      }
    } else {
      timeout = setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % roles.length);
        setDisplayText("");
        setIsTyping(true);
      }, 500);
    }

    return () => clearTimeout(timeout);
  }, [displayText, roleIndex, isTyping, showMainContent, roles]);

  const handleBootComplete = () => {
    setShowBootSequence(false);
    setTimeout(() => {
      setShowMainContent(true);
    }, 500); 
  };
  
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, section: string) => {
    e.preventDefault();
    playClickSound();
    setTerminalTarget(section);
  };
  
  const handleTerminalComplete = useCallback(() => {
    setTerminalTarget(null);
  }, []);

  return (
    <>
      {terminalTarget && (
        <TerminalNav 
            targetSection={terminalTarget} 
            onComplete={handleTerminalComplete} 
        />
      )}
      <section className="min-h-screen flex items-center justify-center relative pt-16 overflow-hidden">
        
        <div className="absolute inset-0 opacity-5 z-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary rounded-full mix-blend-multiply filter blur-3xl animate-pulse [animation-delay:500ms]" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className={`transition-opacity duration-500 ${showBootSequence ? 'opacity-100' : 'opacity-0'}`}>
            {showBootSequence && <BootSequence onComplete={handleBootComplete} />}
          </div>
          
          {showMainContent && (
              <div className="animate-fadeInUp">
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
                    Cybersecurity isn't about walls — it's about awareness. I explore, I learn, I build — not to exploit, but to understand.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="#about"
                      onClick={(e) => handleNavClick(e, 'about')}
                      className="px-8 py-3 bg-primary text-primary-foreground font-mono font-bold hover:shadow-lg hover:shadow-primary/50 transition-all terminal-border flicker"
                    >
                      {"> Enter The System"}
                    </a>
                    <ExternalLink
                      href="https://github.com/pannagkumaar"
                      onClick={playClickSound}
                      className="px-8 py-3 border-2 border-secondary text-secondary font-mono font-bold hover:shadow-lg hover:shadow-secondary/50 transition-all flicker"
                    >
                      {"> View GitHub"}
                    </ExternalLink>
                  </div>

                  <div className="mt-16 text-muted-foreground font-mono text-sm">
                    <div>{"[+] TryHackMe: Top 1%"}</div>
                    <div>{"[+] Société Générale: Cybersecurity Analyst"}</div>
                    <div>{"[+] PES University: CSE Specialization"}</div>
                  </div>
              </div>
          )}
        </div>
      </section>
    </>
  )
}