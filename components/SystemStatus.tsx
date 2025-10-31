"use client"

import { useEffect, useState } from "react"

const statuses = [
  "System Nominal",
  "Encrypted",
  "Firewall Active",
  "Threats Neutralized",
  "Secure",
]

export default function SystemStatus() {
  const [status, setStatus] = useState(statuses[0])

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(statuses[Math.floor(Math.random() * statuses.length)])
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-background/80 backdrop-blur-sm border border-primary/30 text-primary font-mono text-xs px-3 py-1 rounded-full">
        {`// STATUS: ${status}`}
      </div>
    </div>
  )
}