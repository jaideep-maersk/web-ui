import React from 'react';

export interface ChatItem {
  id: string;
  title: string;
  timestamp?: string;
  unread?: number;
  active?: boolean;
}

interface ChatListProps {
  items: ChatItem[];
  onSelectChat: (id: string) => void;
  onDeleteChat?: (id: string) => void;
  emptyMessage?: string;
}

export const ChatList: React.FC<ChatListProps> = ({
  items,
  onSelectChat,
  onDeleteChat,
  emptyMessage = 'No chats available',
}) => {
  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 text-gray-500 dark:text-gray-400">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => onSelectChat(item.id)}
          className={`
            group relative flex items-center justify-between p-3 rounded-lg cursor-pointer
            transition-colors
            ${
              item.active
                ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            }
          `}
        >
          <div className="flex-1 min-w-0 mr-2">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-gray-900 dark:text-white truncate">
                {item.title}
              </h3>
              {item.unread && item.unread > 0 && (
                <span className="flex-shrink-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                  {item.unread > 99 ? '99+' : item.unread}
                </span>
              )}
            </div>
            {item.timestamp && (
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                {item.timestamp}
              </p>
            )}
          </div>

          {onDeleteChat && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteChat(item.id);
              }}
              className="flex-shrink-0 opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-all"
              aria-label="Delete chat"
            >
              <svg
                className="w-4 h-4 text-red-600 dark:text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
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
      ))}
    </div>
  );
};
