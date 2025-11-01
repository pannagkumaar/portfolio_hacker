// hooks/useSound.ts
'use client';

import { useCallback, useRef, useEffect } from 'react';

// 1. Create a ref to hold the audio object
const audioCache = new Map<string, HTMLAudioElement>();

export const useSound = (soundPath: string, volume: number = 0.5, loop: boolean = false) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 2. Pre-load the audio element
  useEffect(() => {
    if (audioCache.has(soundPath)) {
      audioRef.current = audioCache.get(soundPath)!;
    } else {
      const audio = new Audio(soundPath);
      audio.volume = volume;
      audio.loop = loop;
      audioCache.set(soundPath, audio);
      audioRef.current = audio;
    }

    // 3. Update settings if they change
    if (audioRef.current) {
        audioRef.current.volume = volume;
        audioRef.current.loop = loop;
    }
  }, [soundPath, volume, loop]);

  const playSound = useCallback(() => {
    try {
      if (audioRef.current) {
        audioRef.current.currentTime = 0; // Rewind to start
        audioRef.current.play().catch(error => {
          console.warn("Sound autoplay was prevented.", error);
        });
      }
    } catch (error) {
      console.error("Could not play sound:", error);
    }
  }, []);

  // 4. Add a stop function
  const stopSound = useCallback(() => {
    try {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    } catch (error) {
        console.error("Could not stop sound:", error)
    }
  }, []);

  return { playSound, stopSound };
};