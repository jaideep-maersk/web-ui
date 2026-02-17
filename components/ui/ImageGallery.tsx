import React, { useState } from 'react';

export interface ImageGalleryProps {
  images: string[];
  alt?: string[];
  maxDisplay?: number;
  onImageClick?: (index: number) => void;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  alt = [],
  maxDisplay = 4,
  onImageClick,
}) => {
  const [loadingStates, setLoadingStates] = useState<Record<number, boolean>>(
    images.reduce((acc, _, i) => ({ ...acc, [i]: true }), {})
  );

  const displayedImages = images.slice(0, maxDisplay);
  const remainingCount = images.length - maxDisplay;

  const handleImageLoad = (index: number) => {
    setLoadingStates(prev => ({ ...prev, [index]: false }));
  };

  const getGridClass = () => {
    const count = displayedImages.length;
    if (count === 1) return 'grid-cols-1';
    if (count === 2) return 'grid-cols-2';
    if (count === 3) return 'grid-cols-2';
    return 'grid-cols-2';
  };

  return (
    <div className={`grid ${getGridClass()} gap-2 max-w-2xl`}>
      {displayedImages.map((src, index) => (
        <div
          key={index}
          className={`relative ${
            index === 0 && displayedImages.length === 3 ? 'col-span-2' : ''
          } aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 cursor-pointer 
          group`}
          onClick={() => onImageClick?.(index)}
        >
          {loadingStates[index] && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
            </div>
          )}
          <img
            src={src}
            alt={alt[index] || `Image ${index + 1}`}
            className="w-full h-full object-cover transition-transform duration-200 
              group-hover:scale-110"
            onLoad={() => handleImageLoad(index)}
            loading="lazy"
          />
          {index === maxDisplay - 1 && remainingCount > 0 && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">
                +{remainingCount}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
