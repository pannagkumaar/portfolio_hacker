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
  
  const { playSound: playTypingSound } = useSound('/sounds/click.wav', 0.2)
  const { playSound: playBeepSound } = useSound('/sounds/beep.wav', 0.3)
  
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

  // --- HANDLER FUNCTIONS ---

  const handleConfirm = () => {
    window.open(href, '_blank', 'noopener,noreferrer')
    onClose()
  }

  const handleCancel = () => {
    onClose()
  }

  // Effect to listen for user input (Y/N)
  useEffect(() => {
    if (!showPrompt) return

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'y') {
        handleConfirm()
      } else if (event.key.toLowerCase() === 'n' || event.key === 'Escape') {
        handleCancel()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <div>
              <span>Redirect to external domain? [Y/N]</span>
              <span className="animate-pulse">_</span>
            </div>
            
            {/* --- ADDED BUTTONS FOR MOBILE --- */}
            <div className="flex gap-4 mt-6">
              <button 
                onClick={handleConfirm}
                className="px-6 py-2 bg-primary text-primary-foreground font-mono font-bold hover:shadow-lg hover:shadow-primary/50 transition-all terminal-border flicker"
              >
                {"> [Y]es"}
              </button>
              <button 
                onClick={handleCancel}
                className="px-6 py-2 border-2 border-secondary text-secondary font-mono font-bold hover:shadow-lg hover:shadow-secondary/50 transition-all flicker"
              >
                {"> [N]o"}
              </button>
            </div>
            {/* --- END OF ADDED BUTTONS --- */}

          </div>
        )}
      </div>
    </div>
  )
}
