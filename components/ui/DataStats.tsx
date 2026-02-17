import React from 'react';

export interface Stat {
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
}

export interface DataStatsProps {
  stats: Stat[];
  layout?: 'grid' | 'list';
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

/**
 * DataStats component for displaying statistics and metrics
 */
export const DataStats: React.FC<DataStatsProps> = ({
  stats,
  layout = 'grid',
  columns = 4,
  className = '',
}) => {
  const getTrendColor = (trend?: 'up' | 'down' | 'neutral', change?: number) => {
    if (change === undefined) return '';
    if (trend === 'up' || (trend === undefined && change > 0)) {
      return 'text-green-600 dark:text-green-400';
    }
    if (trend === 'down' || (trend === undefined && change < 0)) {
      return 'text-red-600 dark:text-red-400';
    }
    return 'text-gray-600 dark:text-gray-400';
  };

  const getTrendIcon = (trend?: 'up' | 'down' | 'neutral', change?: number) => {
    if (change === undefined) return null;
    const isUp = trend === 'up' || (trend === undefined && change > 0);
    const isDown = trend === 'down' || (trend === undefined && change < 0);

    if (isUp) {
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      );
    }
    if (isDown) {
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      );
    }
    return null;
  };

  if (layout === 'list') {
    return (
      <div className={`space-y-4 ${className}`}>
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
          >
            <div className="flex items-center gap-4">
              {stat.icon && (
                <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-400">
                  {stat.icon}
                </div>
              )}
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</div>
              </div>
            </div>
            {stat.change !== undefined && (
              <div className={`flex items-center gap-1 text-sm font-medium ${getTrendColor(stat.trend, stat.change)}`}>
                {getTrendIcon(stat.trend, stat.change)}
                <span>{Math.abs(stat.change)}%</span>
                {stat.changeLabel && <span className="text-xs ml-1">({stat.changeLabel})</span>}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-4 ${className}`}>
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</span>
            {stat.icon && (
              <div className="text-gray-400 dark:text-gray-500">{stat.icon}</div>
            )}
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
            {stat.change !== undefined && (
              <div className={`flex items-center gap-1 text-sm font-medium ${getTrendColor(stat.trend, stat.change)}`}>
                {getTrendIcon(stat.trend, stat.change)}
                <span>{Math.abs(stat.change)}%</span>
                {stat.changeLabel && <span className="text-xs ml-1">({stat.changeLabel})</span>}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
