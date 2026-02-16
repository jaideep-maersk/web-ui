import React from 'react';

export interface ThreadIndicatorProps {
  count: number;
  isExpanded?: boolean;
  onClick?: () => void;
  latestReply?: {
    author: string;
    timestamp: string;
  };
  className?: string;
}

export const ThreadIndicator: React.FC<ThreadIndicatorProps> = ({
  count,
  isExpanded = false,
  onClick,
  latestReply,
  className = '',
}) => {
  if (count === 0) return null;
  
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-2 mt-2 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm ${className}`}
    >
      {/* Thread Icon */}
      <svg
        className="w-4 h-4 text-gray-500 dark:text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
        />
      </svg>
      
      {/* Reply Count */}
      <span className="font-medium text-blue-600 dark:text-blue-400">
        {count} {count === 1 ? 'reply' : 'replies'}
      </span>
      
      {/* Latest Reply Info */}
      {latestReply && !isExpanded && (
        <>
          <span className="text-gray-400">·</span>
          <span className="text-gray-600 dark:text-gray-400">
            Latest from {latestReply.author}
          </span>
          <span className="text-gray-400 dark:text-gray-500 text-xs">
            {latestReply.timestamp}
          </span>
        </>
      )}
      
      {/* Expand/Collapse Indicator */}
      <svg
        className={`w-4 h-4 ml-auto text-gray-400 transition-transform ${
          isExpanded ? 'rotate-180' : ''
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>
  );
};
