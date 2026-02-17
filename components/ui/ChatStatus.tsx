import React from 'react';

export interface ChatStatusProps {
  status: 'online' | 'connecting' | 'offline' | 'error';
  message?: string;
  onRetry?: () => void;
  showIcon?: boolean;
  className?: string;
}

export const ChatStatus: React.FC<ChatStatusProps> = ({
  status,
  message,
  onRetry,
  showIcon = true,
  className = '',
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'online':
        return {
          bg: 'bg-green-50 dark:bg-green-900/20',
          border: 'border-green-200 dark:border-green-800',
          text: 'text-green-800 dark:text-green-200',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          label: message || 'Connected',
        };
      case 'connecting':
        return {
          bg: 'bg-blue-50 dark:bg-blue-900/20',
          border: 'border-blue-200 dark:border-blue-800',
          text: 'text-blue-800 dark:text-blue-200',
          icon: (
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ),
          label: message || 'Connecting...',
        };
      case 'offline':
        return {
          bg: 'bg-gray-50 dark:bg-gray-900/20',
          border: 'border-gray-200 dark:border-gray-700',
          text: 'text-gray-800 dark:text-gray-200',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" />
            </svg>
          ),
          label: message || 'Offline',
        };
      case 'error':
        return {
          bg: 'bg-red-50 dark:bg-red-900/20',
          border: 'border-red-200 dark:border-red-800',
          text: 'text-red-800 dark:text-red-200',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          label: message || 'Connection error',
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className={`flex items-center justify-between px-3 py-2 border rounded-lg ${config.bg} ${config.border} ${config.text} ${className}`}>
      <div className="flex items-center gap-2">
        {showIcon && config.icon}
        <span className="text-sm font-medium">{config.label}</span>
      </div>
      
      {status === 'error' && onRetry && (
        <button
          onClick={onRetry}
          className="text-sm underline hover:no-underline"
        >
          Retry
        </button>
      )}
    </div>
  );
};
