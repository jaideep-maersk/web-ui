import React, { useState } from 'react';

export interface LinkPreviewProps {
  url: string;
  title?: string;
  description?: string;
  image?: string;
  favicon?: string;
  siteName?: string;
  onClick?: () => void;
}

export const LinkPreview: React.FC<LinkPreviewProps> = ({
  url,
  title,
  description,
  image,
  favicon,
  siteName,
  onClick,
}) => {
  const [imageError, setImageError] = useState(false);

  const getDomain = (url: string): string => {
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return url;
    }
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="w-full max-w-lg text-left border border-gray-200 dark:border-gray-700 
        rounded-lg overflow-hidden hover:border-gray-300 dark:hover:border-gray-600 
        transition-colors group"
    >
      {image && !imageError && (
        <div className="w-full h-48 bg-gray-100 dark:bg-gray-800 overflow-hidden">
          <img
            src={image}
            alt={title || 'Link preview'}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            onError={() => setImageError(true)}
          />
        </div>
      )}
      <div className="p-4 bg-white dark:bg-gray-800">
        {(favicon || siteName) && (
          <div className="flex items-center gap-2 mb-2">
            {favicon && (
              <img src={favicon} alt="" className="w-4 h-4" onError={(e) => e.currentTarget.style.display = 'none'} />
            )}
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {siteName || getDomain(url)}
            </span>
          </div>
        )}
        {title && (
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
            {title}
          </h4>
        )}
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
            {description}
          </p>
        )}
        <div className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400">
          <span className="truncate">{getDomain(url)}</span>
          <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </div>
      </div>
    </button>
  );
};
