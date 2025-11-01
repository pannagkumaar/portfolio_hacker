"use client"

import React, { useEffect, useRef } from 'react';

const MatrixRain = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // 1. Ref to store mouse position without causing re-renders
    const mouseRef = useRef({ x: -1000, y: -1000 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
        const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const nums = '0123456789';
        const alphabet = katakana + latin + nums;

        const fontSize = 16;
        const columns = Math.floor(canvas.width / fontSize);

        const rainDrops: number[] = [];
        for (let i = 0; i < columns; i++) {
            rainDrops[i] = 1;
        }

        // 2. Mouse move event listener
        const handleMouseMove = (event: MouseEvent) => {
            mouseRef.current = { x: event.clientX, y: event.clientY };
        };
        window.addEventListener('mousemove', handleMouseMove);

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < rainDrops.length; i++) {
                const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
                const xPos = i * fontSize;
                const yPos = rainDrops[i] * fontSize;

                // 3. Check distance from mouse
                const dx = xPos - mouseRef.current.x;
                const dy = yPos - mouseRef.current.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 50) {
                    // If close to mouse, make it white and bright
                    ctx.fillStyle = '#ffffff'; 
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = '#ffffff';
                    // Make it fall faster
                    if (Math.random() > 0.8) rainDrops[i] = 0;
                } else {
                    // Default style
                    ctx.fillStyle = '#00ff00'; // Green text
                    ctx.shadowBlur = 0;
                }

                ctx.fillText(text, xPos, yPos);
                
                if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    rainDrops[i] = 0;
                }
                
                rainDrops[i]++;
            }
            
            // Reset shadow blur for next frame
            ctx.shadowBlur = 0;
        };

        const intervalId = setInterval(draw, 33);

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            const newColumns = Math.floor(canvas.width / fontSize);
            rainDrops.length = 0;
            for (let i = 0; i < newColumns; i++) {
                rainDrops[i] = 1;
            }
        };
        
        window.addEventListener('resize', handleResize);

        return () => {
            clearInterval(intervalId);
            window.removeEventListener('resize', handleResize);
            // 4. Clean up mouse listener
            window.removeEventListener('mousemove', handleMouseMove);
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