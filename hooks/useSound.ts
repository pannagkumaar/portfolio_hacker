// hooks/useSound.ts
'use client';

import { useCallback } from 'react';

export const useSound = (soundPath: string, volume: number = 0.5) => {
  const playSound = useCallback(() => {
    // Sounds can only be played after a user interaction. We'll wrap this in a try-catch.
    try {
      const audio = new Audio(soundPath);
      audio.volume = volume;
      audio.play().catch(error => {
        // This catch handles cases where the browser blocks autoplay
        console.warn("Sound autoplay was prevented.", error);
      });
    } catch (error) {
      console.error("Could not play sound:", error);
    }
  }, [soundPath, volume]);

  return playSound;
};