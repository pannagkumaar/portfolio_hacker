// components/TerminalConfirm.tsx
'use client'

import { useState, useEffect } from 'react'
import { useSound } from '@/hooks/useSound'

interface TerminalConfirmProps {
  href: string
  onClose: () => void
}

export default function TerminalConfirm({ href, onClose }: TerminalConfirmProps) {
  const [typedCommand, setTypedCommand] = useState('')
  const [showPrompt, setShowPrompt] = useState(false)
  const playTypingSound = useSound('/sounds/click.mp3', 0.2)
  const playBeepSound = useSound('/sounds/beep.mp3', 0.3) // Assumes you've added beep.mp3

  const command = `open --external --url ${href}`

  // Effect for typing out the command
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    let charIndex = 0

    const typingInterval = setInterval(() => {
      if (charIndex < command.length) {
        setTypedCommand((prev) => prev + command.charAt(charIndex))
        playTypingSound()
        charIndex++
      } else {
        clearInterval(typingInterval)
        setShowPrompt(true)
        playBeepSound()
      }
    }, 50) // Typing speed

    return () => {
      clearInterval(typingInterval)
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