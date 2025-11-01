// components/ProgressBar.tsx
'use client'

import { useState, useEffect } from 'react'

export default function ProgressBar({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(onComplete, 500)
          return 100
        }
        return prev + Math.random() * 10
      })
    }, 100)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div className="w-full max-w-md mx-auto">
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
  )
}