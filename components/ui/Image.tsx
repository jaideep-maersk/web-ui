import React, { useState } from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  imageClassName?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  enablePreview?: boolean;
}

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  className = 'w-full',
  imageClassName = 'rounded-lg',
  dismissible = false,
  onDismiss,
  enablePreview = true,
  ...props
}) => {
  const [showPreview, setShowPreview] = useState(false);
  
  // Handle relative URLs (prepend base URL if needed)
  const imageSrc = src.startsWith('/') ? src : src;
  
  return (
    <>
      <div className="relative group w-fit flex items-center">
        <button
          type="button"
          className={className}
          onClick={() => enablePreview && setShowPreview(true)}
          aria-label="Show image preview"
        >
          <img
            src={imageSrc}
            alt={alt}
            className={imageClassName}
            draggable={false}
            {...props}
          />
        </button>
        
        {dismissible && (
          <div className="absolute -top-1 -right-1">
            <button
              type="button"
              onClick={onDismiss}
              className="bg-white text-black border border-white rounded-full group-hover:visible invisible transition p-1"
              aria-label="Remove image"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
      
      {/* Image Preview Modal */}
      {showPreview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={() => setShowPreview(false)}
        >
          <div className="relative max-w-7xl max-h-screen p-4">
            <button
              type="button"
              onClick={() => setShowPreview(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition"
              aria-label="Close preview"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <img
              src={imageSrc}
              alt={alt}
              className="max-w-full max-h-screen object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
};
