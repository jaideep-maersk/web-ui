import React from 'react';

export interface SystemMessageProps {
  message: string;
  type?: 'info' | 'warning' | 'error' | 'success';
  icon?: React.ReactNode;
  timestamp?: string;
  className?: string;
}

export const SystemMessage: React.FC<SystemMessageProps> = ({
  message,
  type = 'info',
  icon,
  timestamp,
  className = '',
}) => {
  const typeStyles = {
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300',
    warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-300',
    error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300',
    success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300',
  };

  const defaultIcons = {
    info: 'ℹ️',
    warning: '⚠️',
    error: '❌',
    success: '✅',
  };

  return (
    <div className={`flex justify-center my-4 ${className}`}>
      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border ${typeStyles[type]}`}>
        <span className="flex-shrink-0">
          {icon || defaultIcons[type]}
        </span>
        <span className="text-sm font-medium">{message}</span>
        {timestamp && (
          <span className="text-xs opacity-70 ml-2">{timestamp}</span>
        )}
      </div>
    </div>
  );
};
