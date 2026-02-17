import React, { useState } from 'react';

export interface MessagePinProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isPinned?: boolean;
  onPinChange?: (isPinned: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const MessagePin: React.FC<MessagePinProps> = ({
  isPinned: controlledPinned,
  onPinChange,
  size = 'md',
  showLabel = false,
  className = '',
  ...props
}) => {
  const [internalPinned, setInternalPinned] = useState(false);
  
  const isPinned = controlledPinned !== undefined ? controlledPinned : internalPinned;
  
  const handleClick = () => {
    const newValue = !isPinned;
    if (controlledPinned === undefined) {
      setInternalPinned(newValue);
    }
    onPinChange?.(newValue);
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
        isPinned
          ? 'text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300'
          : 'text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300'
      } hover:bg-gray-100 dark:hover:bg-gray-800 ${className}`}
      aria-label={isPinned ? 'Unpin message' : 'Pin message'}
      title={isPinned ? 'Unpin message' : 'Pin message'}
      {...props}
    >
      <svg
        className={`${sizeClasses[size]} ${isPinned ? 'rotate-45' : ''} transition-transform`}
        fill={isPinned ? 'currentColor' : 'none'}
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
          {isPinned ? 'Pinned' : 'Pin'}
        </span>
      )}
    </button>
  );
};
