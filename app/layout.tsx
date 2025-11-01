import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Pannag Kumaar — Ethical Hacker & Cybersecurity Engineer",
  description:
    "Dark hacker portfolio showcasing cybersecurity expertise, ethical hacking, and innovative security tools.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // MODIFICATION: Removed 'dark' class, added default 'data-theme'
    <html lang="en" className="scroll-smooth" data-theme="matrix">
      <body className={`font-sans antialiased bg-background text-foreground`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}