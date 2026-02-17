import React from 'react';

export interface PresenceIndicatorProps {
  status: 'online' | 'away' | 'busy' | 'offline';
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  pulse?: boolean;
  className?: string;
}

export const PresenceIndicator: React.FC<PresenceIndicatorProps> = ({
  status,
  showLabel = false,
  size = 'md',
  pulse = false,
  className = '',
}) => {
  const getSizeClass = () => {
    switch (size) {
      case 'sm': return 'w-2 h-2';
      case 'md': return 'w-3 h-3';
      case 'lg': return 'w-4 h-4';
    }
  };

  const getStatusConfig = () => {
    switch (status) {
      case 'online':
        return {
          bg: 'bg-green-500',
          label: 'Online',
        };
      case 'away':
        return {
          bg: 'bg-yellow-500',
          label: 'Away',
        };
      case 'busy':
        return {
          bg: 'bg-red-500',
          label: 'Busy',
        };
      case 'offline':
        return {
          bg: 'bg-gray-400',
          label: 'Offline',
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div className="relative">
        <div className={`${getSizeClass()} ${config.bg} rounded-full`} />
        {pulse && status === 'online' && (
          <div className={`absolute inset-0 ${getSizeClass()} ${config.bg} rounded-full animate-ping opacity-75`} />
        )}
      </div>
      {showLabel && (
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {config.label}
        </span>
      )}
    </div>
  );
};
