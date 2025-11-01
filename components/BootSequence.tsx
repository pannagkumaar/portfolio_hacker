// components/BootSequence.tsx
'use client'

import { useState, useEffect } from 'react'

export default function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

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
    const typeSound = new Audio('/sounds/click.wav');
    typeSound.volume = 0.2;

    const interval = setInterval(() => {
      if (currentLineIndex < bootLines.length) {
        // Play sound for non-empty lines
        if (bootLines[currentLineIndex]) {
           typeSound.currentTime = 0; // Rewind to start for rapid playback
           typeSound.play().catch(e => {}); // Play and ignore autoplay errors
        }
        setLines((prevLines) => [...prevLines, bootLines[currentLineIndex]]);
        setProgress(((currentLineIndex + 1) / bootLines.length) * 100);
        currentLineIndex++;
      } else {
        clearInterval(interval);
        setShowCursor(false);
        // Signal to the parent component that the animation is complete
        setTimeout(onComplete, 750);
      }
    }, 120); // Adjust speed here (in milliseconds)

    return () => clearInterval(interval);
  }, [onComplete]);

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