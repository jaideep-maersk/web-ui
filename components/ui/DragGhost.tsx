import React, { useEffect, useRef, ReactNode } from 'react';

export interface DragGhostProps {
  x: number;
  y: number;
  children: ReactNode;
  className?: string;
}

export const DragGhost: React.FC<DragGhostProps> = ({ x, y, children, className = '' }) => {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const popupElement = popupRef.current;
    if (popupElement) {
      document.body.appendChild(popupElement);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      if (popupElement && popupElement.parentNode) {
        try {
          popupElement.parentNode.removeChild(popupElement);
        } catch (err) {
          console.warn('Failed to remove popupElement:', err);
        }
      }
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div
      ref={popupRef}
      className="fixed top-0 left-0 w-screen h-screen z-50 touch-none pointer-events-none"
    >
      <div
        className={`absolute text-white z-[99999] ${className}`}
        style={{ top: `${y + 10}px`, left: `${x + 10}px` }}
      >
        {children}
      </div>
    </div>
  );
};
