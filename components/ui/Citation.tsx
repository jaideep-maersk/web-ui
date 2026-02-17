import React, { useState } from 'react';

export interface CitationProps {
  number: number;
  title: string;
  source?: string;
  url?: string;
  snippet?: string;
  onClick?: () => void;
  className?: string;
}

export const Citation: React.FC<CitationProps> = ({
  number,
  title,
  source,
  url,
  snippet,
  onClick,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div
      className={`border border-gray-200 dark:border-gray-700 rounded-lg p-3 
                 hover:border-gray-300 dark:hover:border-gray-600 
                 transition-colors duration-200 ${className}`}
    >
      <button
        onClick={handleClick}
        className="w-full text-left focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
      >
        <div className="flex items-start gap-2">
          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 
                         text-blue-600 dark:text-blue-300 text-xs font-medium
                         flex items-center justify-center">
            {number}
          </span>
          
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {title}
            </h4>
            
            {source && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {source}
              </p>
            )}
            
            {isExpanded && snippet && (
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-3">
                {snippet}
              </p>
            )}
          </div>
          
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      
      {url && isExpanded && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 mt-2 text-xs text-blue-600 dark:text-blue-400 
                   hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
        >
          View source
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      )}
    </div>
  );
};
