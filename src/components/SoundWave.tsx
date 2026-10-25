import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

export function SoundWave({ isPlaying = false, barCount = 20 }) {
  const [heights, setHeights] = useState(() => 
    Array.from({ length: barCount }, () => Math.floor(Math.random() * 20) + 8)
  );

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setHeights(Array.from({ length: barCount }, () => Math.floor(Math.random() * 28) + 4));
    }, 150);

    return () => clearInterval(interval);
  }, [isPlaying, barCount]);

  return (
    <div className="w-full h-8 flex items-center justify-between gap-1 cursor-pointer">
      {heights.map((h, index) => (
        <span
          key={index}
          className="w-1 bg-primary rounded-full transition-all duration-300"
          style={{ 
            height: `${h}px`,
            opacity: isPlaying ? (index % 2 === 0 ? 0.9 : 0.6) : 0.4
          }}
        />
      ))}
    </div>
  );
}