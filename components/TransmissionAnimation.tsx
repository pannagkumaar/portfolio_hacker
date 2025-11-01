'use client'

import { useState, useEffect } from 'react';

const getRandomChars = (length: number) => {
  const chars = '0123456789ABCDEF!@#$%^&*()_+{}|:<>?[]\\;\',./';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export default function TransmissionAnimation({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [packet, setPacket] = useState('');

  useEffect(() => {
    const duration = 3000; // 3 seconds
    const intervalTime = 50;
    let elapsedTime = 0;

    const interval = setInterval(() => {
      elapsedTime += intervalTime;
      const currentProgress = (elapsedTime / duration) * 100;
      setProgress(currentProgress);
      setPacket(getRandomChars(50));

      if (elapsedTime >= duration) {
        clearInterval(interval);
        setProgress(100);
        setTimeout(onComplete, 500); // Wait a bit after completion
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[300] bg-black/95 flex flex-col items-center justify-center font-mono text-primary p-4 animate-fadeIn">
      <div className="w-full max-w-2xl text-center">
        <h3 className="text-2xl md:text-4xl mb-4 text-glitch">[ ENCRYPTING & TRANSMITTING PACKET ]</h3>
        
        <div className="text-left h-48 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
            <p className="text-xs break-all opacity-50 animate-pulse">{packet}{getRandomChars(1000)}</p>
        </div>

        <div className="w-full max-w-md mx-auto mt-8">
          <div className="text-primary font-mono text-sm mb-2">
            {`> Transmission progress... [${Math.floor(progress)}%]`}
          </div>
          <div className="w-full h-4 border-2 border-primary p-0.5">
            <div
              className="h-full bg-primary transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        <div className="mt-4 text-secondary text-sm animate-pulse">
            // Establishing secure tunnel... Bypassing firewalls... Packet injected.
        </div>
      </div>
    </div>
  );
}