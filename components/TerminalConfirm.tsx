// components/TerminalConfirm.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import { useSound } from '@/hooks/useSound'

interface TerminalConfirmProps {
  href: string
  onClose: () => void
}

export default function TerminalConfirm({ href, onClose }: TerminalConfirmProps) {
  const [typedCommand, setTypedCommand] = useState('')
  const [showPrompt, setShowPrompt] = useState(false)
  const playTypingSound = useSound('/sounds/click.mp3', 0.2)
  const playBeepSound = useSound('/sounds/beep.mp3', 0.3)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)


  const command = `open --external --url ${href}`

  // Effect for typing out the command
  useEffect(() => {
    document.body.style.overflow = 'hidden'

    const typeCharacter = (index: number) => {
      if (index < command.length) {
        setTypedCommand(command.slice(0, index + 1));
        playTypingSound();
        timeoutRef.current = setTimeout(() => typeCharacter(index + 1), 50);
      } else {
        setShowPrompt(true);
        playBeepSound();
      }
    };

    typeCharacter(0);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      document.body.style.overflow = 'auto'
    }
  }, [command, playTypingSound, playBeepSound])

  // Effect to listen for user input (Y/N)
  useEffect(() => {
    if (!showPrompt) return

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'y') {
        window.open(href, '_blank', 'noopener,noreferrer')
        onClose()
      } else if (event.key.toLowerCase() === 'n' || event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [showPrompt, href, onClose])

  return (
    <div className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex items-center justify-center font-mono text-primary p-4">
      <div>
        <div className="flex items-center text-lg md:text-2xl">
          <span className="mr-2">{'>'}</span>
          <span>{typedCommand}</span>
          {!showPrompt && <span className="animate-pulse">_</span>}
        </div>
        {showPrompt && (
          <div className="mt-4 text-lg md:text-2xl text-secondary fade-in-up">
            <span>Redirect to external domain? [Y/N]</span>
            <span className="animate-pulse">_</span>
          </div>
        )}
      </div>
    </div>
  )
}