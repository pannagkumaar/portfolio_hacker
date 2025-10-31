// components/TerminalNav.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import { useSound } from '@/hooks/useSound'

interface TerminalNavProps {
  targetSection: string
  onComplete: () => void
}

export default function TerminalNav({ targetSection, onComplete }: TerminalNavProps) {
  const command = `goto ${targetSection}`
  const [typedCommand, setTypedCommand] = useState('')
  const playTypingSound = useSound('/sounds/click.mp3', 0.2)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    const typeCharacter = (index: number) => {
      if (index < command.length) {
        setTypedCommand(command.slice(0, index + 1));
        playTypingSound();
        timeoutRef.current = setTimeout(() => typeCharacter(index + 1), 75);
      } else {
        const element = document.getElementById(targetSection)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        
        setTimeout(onComplete, 800);
      }
    };

    typeCharacter(0);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      document.body.style.overflow = 'auto'
    }
  }, [command, onComplete, playTypingSound, targetSection])

  return (
    <div className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex items-center justify-center font-mono text-lg md:text-2xl text-primary p-4">
      <div className="flex items-center">
        <span className="mr-2">{'>'}</span>
        <span>{typedCommand}</span>
        <span className="animate-pulse">_</span>
      </div>
    </div>
  )
}