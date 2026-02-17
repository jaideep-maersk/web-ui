import React from 'react';

export type ConnectionState = 'connected' | 'connecting' | 'disconnected' | 'error';

interface ConnectionStatusProps {
  status: ConnectionState;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({
  status,
  message,
  onRetry,
  className = '',
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'connected':
        return {
          bg: 'bg-green-100 dark:bg-green-900/20',
          border: 'border-green-500',
          text: 'text-green-700 dark:text-green-400',
          icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          ),
          label: message || 'Connected',
        };
      case 'connecting':
        return {
          bg: 'bg-yellow-100 dark:bg-yellow-900/20',
          border: 'border-yellow-500',
          text: 'text-yellow-700 dark:text-yellow-400',
          icon: (
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
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
          ),
          label: message || 'Connecting...',
        };
      case 'disconnected':
        return {
          bg: 'bg-gray-100 dark:bg-gray-900/20',
          border: 'border-gray-500',
          text: 'text-gray-700 dark:text-gray-400',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414"
              />
            </svg>
          ),
          label: message || 'Disconnected',
        };
      case 'error':
        return {
          bg: 'bg-red-100 dark:bg-red-900/20',
          border: 'border-red-500',
          text: 'text-red-700 dark:text-red-400',
          icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          ),
          label: message || 'Connection error',
        };
    }
  };

  const config = getStatusConfig();

  if (status === 'connected') {
    // Don't show connected status prominently
    return null;
  }

  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 ${config.bg} border-l-4 ${config.border} ${config.text} ${className}`}
      role="status"
      aria-live="polite"
    >
      {config.icon}
      <span className="text-sm font-medium flex-1">{config.label}</span>
      {status === 'error' && onRetry && (
        <button
          onClick={onRetry}
          className="text-sm font-medium underline hover:no-underline"
        >
          Retry
        </button>
      )}
    </div>
  );
};
