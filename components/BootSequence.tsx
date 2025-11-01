// components/BootSequence.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import { useSound } from '@/hooks/useSound' // 1. Import useSound

export default function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  // 2. Use the hook to get the playSound function
  const { playSound: playTypeSound } = useSound('/sounds/click.wav', 0.2);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isCompleteRef = useRef(false);

  useEffect(() => {
    // Generate dynamic date and time for the BIOS line
    const now = new Date();
    const date = now.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' });
    const time = now.toLocaleTimeString('en-US', { hour12: false });
    const biosDateLine = `BIOS Date: ${date} ${time} Ver: 1.33.7`;

    const bootLines = [
      biosDateLine,
      'CPU: Quantum Core Processor @ 9.8GHz',
      'Memory Test: 65536K OK',
      '',
      'Initializing Kernel...',
      'Loading drivers...........................[OK]',
      'Mounting root filesystem..................[OK]',
      'Starting network interface [eth0].........[OK]',
      'Requesting DHCP lease.....................[GRANTED]',
      'Pinging gateway...........................[SUCCESS]',
      '',
      'Establishing secure connection to mainframe...',
      'Connection established.',
      'Authenticating user: pannag_kumaar...',
      'Authentication successful.',
      'Loading user profile...',
      'Welcome.',
    ];

    let currentLineIndex = 0;
    // 3. Removed the old new Audio() line

    intervalRef.current = setInterval(() => {
      if (isCompleteRef.current) return; // Stop if skipped

      if (currentLineIndex < bootLines.length) {
        // 4. Use the playTypeSound function from the hook
        if (bootLines[currentLineIndex]) {
           playTypeSound();
        }
        setLines((prevLines) => [...prevLines, bootLines[currentLineIndex]]);
        setProgress(((currentLineIndex + 1) / bootLines.length) * 100);
        currentLineIndex++;
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current);
        isCompleteRef.current = true;
        setShowCursor(false);
        setTimeout(onComplete, 750);
      }
    }, 120); // Adjust speed here (in milliseconds)

    // Add skip key listener
    const handleSkip = (event: KeyboardEvent) => {
      if ((event.key === 'Enter' || event.key === 'Escape') && !isCompleteRef.current) {
        isCompleteRef.current = true;
        if (intervalRef.current) clearInterval(intervalRef.current);
        setLines(bootLines); // Show all lines immediately
        setProgress(100);
        setShowCursor(false);
        onComplete();
      }
    };
    
    window.addEventListener('keydown', handleSkip);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      window.removeEventListener('keydown', handleSkip);
    };
  }, [onComplete, playTypeSound]); // 5. Add playTypeSound to dependency array

  return (
    <div className="font-mono text-primary text-sm md:text-base w-full max-w-3xl text-left mx-auto">
      <div>
        {lines.map((line, index) => (
          <div key={index}>{line || '\u00A0'}</div> // \u00A0 is a non-breaking space for empty lines
        ))}
        {showCursor && <span className="animate-pulse">_</span>}
      </div>
      <div className="w-full max-w-md mx-auto mt-4">
        <div className="text-primary font-mono text-sm mb-2">
          {`> Loading system modules... [${Math.round(progress)}%]`}
        </div>
        <div className="w-full h-4 border-2 border-primary p-0.5">
          <div
            className="h-full bg-primary transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}