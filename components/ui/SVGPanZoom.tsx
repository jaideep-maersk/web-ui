import React, { useState, useRef, useEffect } from 'react';

interface SVGPanZoomProps {
  svgContent: string;
  width?: string | number;
  height?: string | number;
  className?: string;
}

export const SVGPanZoom: React.FC<SVGPanZoomProps> = ({
  svgContent,
  width = '100%',
  height = 400,
  className = '',
}) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setScale((prev) => Math.min(Math.max(0.1, prev * delta), 10));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const zoomIn = () => {
    setScale((prev) => Math.min(prev * 1.2, 10));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(prev / 1.2, 0.1));
  };

  return (
    <div className={`relative ${className}`}>
      {/* Controls */}
      <div className="absolute top-2 right-2 flex flex-col gap-1 bg-white dark:bg-gray-800 rounded-lg shadow p-1 z-10">
        <button
          onClick={zoomIn}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          aria-label="Zoom in"
          title="Zoom in"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
        <button
          onClick={zoomOut}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          aria-label="Zoom out"
          title="Zoom out"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        <button
          onClick={handleReset}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          aria-label="Reset view"
          title="Reset"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      {/* SVG Container */}
      <div
        ref={containerRef}
        className="relative overflow-hidden bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-300 dark:border-gray-700"
        style={{ width, height, cursor: isDragging ? 'grabbing' : 'grab' }}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: 'center',
            transition: isDragging ? 'none' : 'transform 0.1s ease-out',
          }}
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      </div>

      {/* Zoom indicator */}
      <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
        {Math.round(scale * 100)}%
      </div>
    </div>
  );
};
