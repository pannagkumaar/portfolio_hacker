'use client'

import { useState, useEffect, useRef } from 'react';
import { useSound } from '@/hooks/useSound';

const chars = '!<>-_\\/[]{}—=+*^?#________';

export default function SectionHeader({ title }: { title: string }) {
  const [text, setText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLHeadingElement>(null);
  const playGlitchSound = useSound('/sounds/glitch.mp3', 0.1);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, triggerOnce: true }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let iteration = 0;
    let interval: NodeJS.Timeout | null = null;
    playGlitchSound();

    interval = setInterval(() => {
      setText(
        title
          .split('')
          .map((_letter, index) => {
            if (index < iteration) {
              return title[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= title.length) {
        if (interval) clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 30);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isVisible, title, playGlitchSound]);

  return (
    <h2 ref={ref} className="text-3xl md:text-4xl font-bold font-mono mb-8 neon-glow text-glitch">
      {`> ${text}`}
    </h2>
  );
}