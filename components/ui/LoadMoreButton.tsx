import React from 'react';

interface LoadMoreButtonProps {
  onLoadMore: () => void;
  isLoading?: boolean;
  hasMore?: boolean;
  disabled?: boolean;
  className?: string;
  text?: string;
  loadingText?: string;
  noMoreText?: string;
}

export const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
  onLoadMore,
  isLoading = false,
  hasMore = true,
  disabled = false,
  className = '',
  text = 'Load earlier messages',
  loadingText = 'Loading...',
  noMoreText = 'No more messages',
}) => {
  if (!hasMore) {
    return (
      <div className={`text-center py-4 text-sm text-gray-500 dark:text-gray-400 ${className}`}>
        {noMoreText}
      </div>
    );
  }

  return (
    <div className={`flex justify-center py-4 ${className}`}>
      <button
        onClick={onLoadMore}
        disabled={disabled || isLoading}
        className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        aria-label="Load more messages"
      >
        {isLoading ? (
          <>
            <svg
              className="w-4 h-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>{loadingText}</span>
          </>
        ) : (
          <>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
            <span>{text}</span>
          </>
        )}
      </button>
    </div>
  );
};
