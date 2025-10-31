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
  
  // Use a ref to hold the timeout ID so we can clear it in the cleanup function
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    // A function that types one character at a time and then calls itself
    const typeCharacter = (index: number) => {
      if (index < command.length) {
        setTypedCommand(command.slice(0, index + 1))
        playTypingSound()
        // Schedule the next character
        timeoutRef.current = setTimeout(() => typeCharacter(index + 1), 75)
      } else {
        // Typing is finished
        const element = document.getElementById(targetSection)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        
        // Wait for scroll before closing
        setTimeout(onComplete, 800)
      }
    }

    // Start the animation
    typeCharacter(0)

    // Cleanup function: this will clear the scheduled timeout when the component unmounts
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      document.body.style.overflow = 'auto'
    }
    // The dependency array ensures this effect only runs when props change
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