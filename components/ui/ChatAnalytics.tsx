import React from 'react';

export interface AnalyticsStat {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

interface ChatAnalyticsProps {
  messageCount: number;
  participantCount: number;
  duration: string;
  additionalStats?: AnalyticsStat[];
  className?: string;
}

export const ChatAnalytics: React.FC<ChatAnalyticsProps> = ({
  messageCount,
  participantCount,
  duration,
  additionalStats = [],
  className = '',
}) => {
  const stats: AnalyticsStat[] = [
    {
      label: 'Messages',
      value: messageCount,
      icon: <span>💬</span>,
    },
    {
      label: 'Participants',
      value: participantCount,
      icon: <span>👥</span>,
    },
    {
      label: 'Duration',
      value: duration,
      icon: <span>⏱️</span>,
    },
    ...additionalStats,
  ];

  const getTrendColor = (trend?: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return 'text-green-600 dark:text-green-400';
      case 'down':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className={`chat-analytics ${className}`}>
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Analytics
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{stat.icon}</span>
              {stat.trend && stat.trendValue && (
                <span className={`text-sm ${getTrendColor(stat.trend)}`}>
                  {stat.trend === 'up' ? '↑' : stat.trend === 'down' ? '↓' : '→'} {stat.trendValue}
                </span>
              )}
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
