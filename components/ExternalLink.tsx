// components/ExternalLink.tsx
'use client'

import { useState } from 'react'
import TerminalConfirm from './TerminalConfirm'

// This component wraps a standard anchor tag to add the terminal confirmation logic.
interface ExternalLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    children: React.ReactNode;
    href: string;
}

export default function ExternalLink({ href, children, onClick, ...props }: ExternalLinkProps) {
    const [isConfirming, setIsConfirming] = useState(false)

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        // Prevent the browser's default link behavior
        e.preventDefault()
        
        // If the parent component passed an onClick (e.g., to play a sound), run it
        if (onClick) {
            onClick(e)
        }

        // Show the confirmation terminal
        setIsConfirming(true)
    }

    const handleClose = () => {
        setIsConfirming(false)
    }

    return (
        <>
            {isConfirming && <TerminalConfirm href={href} onClose={handleClose} />}
            <a href={href} onClick={handleClick} {...props}>
                {children}
            </a>
        </>
    )
}