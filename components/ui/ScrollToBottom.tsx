import React from 'react';

interface ScrollToBottomProps {
  onClick: () => void;
  show?: boolean;
  unreadCount?: number;
  className?: string;
}

export const ScrollToBottom: React.FC<ScrollToBottomProps> = ({
  onClick,
  show = true,
  unreadCount = 0,
  className = '',
}) => {
  if (!show) return null;

  return (
    <button
      onClick={onClick}
      className={`fixed bottom-24 right-6 p-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 ${className}`}
      aria-label={`Scroll to bottom${unreadCount > 0 ? ` (${unreadCount} new messages)` : ''}`}
    >
      {unreadCount > 0 && (
        <div className="absolute -top-2 -right-2 min-w-[20px] h-5 px-1 flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full">
          {unreadCount > 99 ? '99+' : unreadCount}
        </div>
      )}
      <svg
        className="w-6 h-6 text-gray-700 dark:text-gray-200"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
      </svg>
    </button>
  );
};
