import React from 'react';

export interface ChatStat {
  label: string;
  value: string | number;
  icon?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export interface ChatOverviewProps {
  stats?: ChatStat[];
  recentChats?: {
    id: string;
    title: string;
    timestamp: Date;
    preview: string;
  }[];
  onChatClick?: (id: string) => void;
  className?: string;
}

export const ChatOverview: React.FC<ChatOverviewProps> = ({
  stats = [],
  recentChats = [],
  onChatClick,
  className = '',
}) => {
  const getTrendIcon = (trend?: 'up' | 'down' | 'neutral') => {
    if (trend === 'up') return '📈';
    if (trend === 'down') return '📉';
    return '➡️';
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Statistics */}
      {stats.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</span>
                {stat.icon && <span className="text-2xl">{stat.icon}</span>}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </span>
                {stat.trend && (
                  <span className="text-sm">{getTrendIcon(stat.trend)}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Recent Chats */}
      {recentChats.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Chats
          </h3>
          <div className="space-y-3">
            {recentChats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => onChatClick?.(chat.id)}
                className="w-full text-left p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-start justify-between mb-1">
                  <h4 className="font-medium text-gray-900 dark:text-white truncate flex-1">
                    {chat.title}
                  </h4>
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                    {formatTimestamp(chat.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {chat.preview}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {stats.length === 0 && recentChats.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📊</div>
          <p className="text-gray-600 dark:text-gray-400">
            No chat activity yet. Start a conversation to see your overview.
          </p>
        </div>
      )}
    </div>
  );
};
