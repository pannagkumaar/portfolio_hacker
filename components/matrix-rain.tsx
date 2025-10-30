"use client"

import React, { useEffect, useRef } from 'react';

const MatrixRain = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas to full screen size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
        const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const nums = '0123456789';
        const alphabet = katakana + latin + nums;

        const fontSize = 16;
        const columns = Math.floor(canvas.width / fontSize);

        // An array of y-positions for each column
        const rainDrops: number[] = [];
        for (let i = 0; i < columns; i++) {
            rainDrops[i] = 1;
        }

        const draw = () => {
            // Semi-transparent background to create the fading trail effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#00ff00'; // Green text
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < rainDrops.length; i++) {
                // Get a random character from the alphabet
                const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
                // Draw it
                ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

                // Reset the drop to the top randomly to make the rain uneven
                if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    rainDrops[i] = 0;
                }
                
                // Move the drop down
                rainDrops[i]++;
            }
        };

        const intervalId = setInterval(draw, 33);

        // Handle window resize
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            // Recalculate columns and reset drops on resize
            const newColumns = Math.floor(canvas.width / fontSize);
            rainDrops.length = 0; // Clear old array
            for (let i = 0; i < newColumns; i++) {
                rainDrops[i] = 1;
            }
        };
        
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            clearInterval(intervalId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas 
            ref={canvasRef} 
            className="matrix-rain"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                pointerEvents: 'none'
            }}
        />
    );
};

export default MatrixRain;