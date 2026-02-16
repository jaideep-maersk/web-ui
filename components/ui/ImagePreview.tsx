import React, { useEffect, useRef, useState } from 'react';

interface ImagePreviewProps {
  show: boolean;
  src: string;
  alt?: string;
  onClose: () => void;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  show,
  src,
  alt = '',
  onClose,
}) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!show) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      setScale((prev) => Math.min(Math.max(0.5, prev * delta), 5));
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    
    const imageElement = imageRef.current;
    if (imageElement) {
      imageElement.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
      if (imageElement) {
        imageElement.removeEventListener('wheel', handleWheel);
      }
    };
  }, [show, onClose]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
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

  const handleDownload = async () => {
    try {
      if (src.startsWith('data:image/')) {
        const base64Data = src.split(',')[1];
        const blob = new Blob(
          [Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0))],
          { type: 'image/png' }
        );
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'image.png';
        a.click();
        URL.revokeObjectURL(url);
      } else if (src.startsWith('blob:') || src.startsWith('http')) {
        const response = await fetch(src);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = alt || 'image.png';
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  if (!show) return null;

  return (
    <div
      className="fixed top-0 right-0 left-0 bottom-0 bg-black text-white w-full min-h-screen h-screen flex justify-center z-[9999] overflow-hidden"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Header Controls */}
      <div className="absolute left-0 top-0 w-full flex justify-between select-none z-20">
        <div>
          <button
            className="p-5 hover:bg-white/10 rounded transition"
            onClick={onClose}
            aria-label="Close preview"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex gap-2">
          <button
            className="p-5 hover:bg-white/10 rounded transition"
            onClick={handleReset}
            aria-label="Reset zoom and position"
            title="Reset"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </button>
          <button
            className="p-5 hover:bg-white/10 rounded transition"
            onClick={handleDownload}
            aria-label="Download image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
              <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Zoom indicator */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-black/50 px-3 py-1 rounded text-sm">
        {Math.round(scale * 100)}%
      </div>

      {/* Image */}
      <div
        className="flex h-full max-h-full justify-center items-center z-0 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          className="mx-auto h-full object-scale-down select-none"
          draggable="false"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transition: isDragging ? 'none' : 'transform 0.1s',
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
        />
      </div>

      {/* Help text */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-black/50 px-4 py-2 rounded text-sm text-center">
        <div className="flex gap-4 text-xs">
          <span>Scroll to zoom</span>
          <span>•</span>
          <span>Drag to pan</span>
          <span>•</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
};
