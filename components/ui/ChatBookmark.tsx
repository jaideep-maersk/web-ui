import React, { useState } from 'react';

export interface ChatBookmarkProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isBookmarked?: boolean;
  onBookmarkChange?: (isBookmarked: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const ChatBookmark: React.FC<ChatBookmarkProps> = ({
  isBookmarked: controlledBookmarked,
  onBookmarkChange,
  size = 'md',
  showLabel = false,
  className = '',
  ...props
}) => {
  const [internalBookmarked, setInternalBookmarked] = useState(false);
  
  const isBookmarked = controlledBookmarked !== undefined ? controlledBookmarked : internalBookmarked;
  
  const handleClick = () => {
    const newValue = !isBookmarked;
    if (controlledBookmarked === undefined) {
      setInternalBookmarked(newValue);
    }
    onBookmarkChange?.(newValue);
  };

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const paddingClasses = {
    sm: 'p-1',
    md: 'p-1.5',
    lg: 'p-2',
  };

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center gap-2 ${paddingClasses[size]} rounded-lg transition-colors ${
        isBookmarked
          ? 'text-yellow-500 hover:text-yellow-600 dark:text-yellow-400 dark:hover:text-yellow-300'
          : 'text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300'
      } hover:bg-gray-100 dark:hover:bg-gray-800 ${className}`}
      aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
      {...props}
    >
      <svg
        className={sizeClasses[size]}
        fill={isBookmarked ? 'currentColor' : 'none'}
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
        />
      </svg>
      {showLabel && (
        <span className="text-sm font-medium">
          {isBookmarked ? 'Bookmarked' : 'Bookmark'}
        </span>
      )}
    </button>
  );
};
