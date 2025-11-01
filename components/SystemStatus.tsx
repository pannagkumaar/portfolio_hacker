"use client"

import { useEffect, useState } from "react"
// 1. Import Popover components
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

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
    // 2. Wrap the component in <Popover>
    <Popover>
      <div className="fixed bottom-4 right-4 z-50">
        {/* 3. Make the original div the <PopoverTrigger> and add flicker */}
        <PopoverTrigger asChild>
          <div className="bg-background/80 backdrop-blur-sm border border-primary/30 text-primary font-mono text-xs px-3 py-1 rounded-full cursor-pointer flicker">
            {`// STATUS: ${status}`}
          </div>
        </PopoverTrigger>
      </div>
      {/* 4. Add the <PopoverContent> */}
      <PopoverContent className="w-64 font-mono text-sm terminal-border bg-black/90 text-primary">
        <div className="grid gap-2">
          <div className="text-secondary font-bold">[SYSTEM DIAGNOSTICS]</div>
          <div className="flex justify-between">
            <span>CPU LOAD:</span>
            <span>15%</span>
          </div>
          <div className="flex justify-between">
            <span>MEM USAGE:</span>
            <span>CLASSIFIED</span>
          </div>
          <div className="flex justify-between">
            <span>FIREWALL:</span>
            <span className="text-primary">ACTIVE</span>
          </div>
          <div className="flex justify-between">
            <span>NET UPLINK:</span>
            <span>SECURE</span>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}