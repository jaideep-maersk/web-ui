import React, { useEffect, useState } from 'react';

interface MarqueeProps {
  words: string[];
  duration?: number;
  className?: string;
}

export const Marquee: React.FC<MarqueeProps> = ({
  words,
  duration = 4000,
  className = '',
}) => {
  const [idx, setIdx] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setIdx((prevIdx) => (prevIdx === words.length - 1 ? 0 : prevIdx + 1));
        setIsAnimating(false);
      }, 500);
    }, duration);

    return () => clearInterval(interval);
  }, [words.length, duration]);

  return (
    <div className={className}>
      <div className="relative overflow-hidden h-8 flex items-center">
        <div
          key={idx}
          className={`absolute w-full transition-all duration-500 ${
            isAnimating
              ? 'opacity-0 translate-y-4'
              : 'opacity-100 translate-y-0'
          }`}
        >
          {words[idx]}
        </div>
      </div>
    </div>
  );
};
