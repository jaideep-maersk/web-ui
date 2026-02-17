import React from 'react';

export interface AdminStat {
  label: string;
  value: string | number;
  change?: number; // percentage change
  icon?: React.ReactNode;
}

export interface AdminPanelProps {
  stats?: AdminStat[];
  recentActivity?: Array<{
    id: string;
    title: string;
    description: string;
    timestamp: Date;
    type: 'info' | 'success' | 'warning' | 'error';
  }>;
  quickActions?: Array<{
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
  }>;
  children?: React.ReactNode;
  className?: string;
}

/**
 * AdminPanel component - Main admin dashboard
 */
export const AdminPanel: React.FC<AdminPanelProps> = ({
  stats = [],
  recentActivity = [],
  quickActions = [],
  children,
  className = '',
}) => {
  const getActivityColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20';
      case 'warning':
        return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20';
      case 'error':
        return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20';
      default:
        return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20';
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - new Date(date).getTime()) / 1000);

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome to the admin panel</p>
        </div>
      </div>

      {/* Stats Grid */}
      {stats.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</span>
                {stat.icon && (
                  <div className="text-gray-400 dark:text-gray-500">{stat.icon}</div>
                )}
              </div>
              <div className="flex items-end justify-between">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                {stat.change !== undefined && (
                  <span
                    className={`text-sm font-medium ${
                      stat.change >= 0
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {stat.change >= 0 ? '+' : ''}
                    {stat.change}%
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      {quickActions.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                className="flex items-center justify-center gap-2 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                {action.icon && <div>{action.icon}</div>}
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {action.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        {recentActivity.length > 0 && (
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
              </div>
              <div className="p-6 space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${getActivityColor(activity.type)}`}>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {activity.title}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {activity.description}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                        {formatTimestamp(activity.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Custom Content */}
        {children && (
          <div className={recentActivity.length > 0 ? 'lg:col-span-1' : 'lg:col-span-3'}>
            {children}
          </div>
        )}
      </div>
    </div>
  );
};
