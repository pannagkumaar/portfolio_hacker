// components/SectionLoader.tsx
'use client'

import { useState, useEffect } from 'react'

export default function SectionLoader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Make this loader faster than the boot sequence
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(onComplete, 250) // Shorter wait
          return 100
        }
        return prev + Math.random() * 20 // Faster increments
      })
    }, 80); // Faster interval

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div className="w-full max-w-md mx-auto my-8 animate-fadeIn">
      <div className="text-primary font-mono text-sm mb-2">
        {`> Accessing data... [${Math.round(progress)}%]`}
      </div>
      <div className="w-full h-4 border-2 border-primary p-0.5">
        <div
          className="h-full bg-primary transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  )
}