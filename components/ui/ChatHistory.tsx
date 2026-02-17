import React from 'react';

export interface ChatHistoryItem {
  id: string;
  title: string;
  timestamp: Date;
  preview?: string;
  unread?: boolean;
}

export interface ChatHistoryProps extends React.HTMLAttributes<HTMLDivElement> {
  items: ChatHistoryItem[];
  onItemClick?: (item: ChatHistoryItem) => void;
  onItemDelete?: (id: string) => void;
  selectedId?: string;
  emptyMessage?: string;
}

export const ChatHistory: React.FC<ChatHistoryProps> = ({
  items,
  onItemClick,
  onItemDelete,
  selectedId,
  emptyMessage = 'No chat history',
  className = '',
  ...props
}) => {
  const formatTimestamp = (date: Date): string => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    
    return date.toLocaleDateString();
  };

  if (items.length === 0) {
    return (
      <div className={`p-8 text-center text-gray-500 dark:text-gray-400 ${className}`} {...props}>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={`space-y-1 ${className}`} {...props}>
      {items.map((item) => (
        <div
          key={item.id}
          className={`group relative p-3 rounded-lg cursor-pointer transition-colors ${
            selectedId === item.id
              ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500'
              : 'hover:bg-gray-50 dark:hover:bg-gray-800 border-l-4 border-transparent'
          }`}
          onClick={() => onItemClick?.(item)}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3
                  className={`text-sm font-medium truncate ${
                    item.unread
                      ? 'text-gray-900 dark:text-white font-semibold'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {item.title}
                </h3>
                {item.unread && (
                  <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full" />
                )}
              </div>
              {item.preview && (
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-1">
                  {item.preview}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">
                {formatTimestamp(item.timestamp)}
              </span>
              {onItemDelete && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onItemDelete(item.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-opacity"
                  aria-label="Delete chat"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
