import React from 'react';

export interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  onDismiss?: () => void;
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title = 'Error',
  message,
  onRetry,
  onDismiss,
  className = '',
}) => {
  return (
    <div className={`rounded-lg border border-red-200 dark:border-red-900 
                     bg-red-50 dark:bg-red-900/20 p-4 ${className}`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <svg
            className="w-5 h-5 text-red-600 dark:text-red-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        
        <div className="flex-1">
          <h3 className="text-sm font-medium text-red-800 dark:text-red-300 mb-1">
            {title}
          </h3>
          <p className="text-sm text-red-700 dark:text-red-400">
            {message}
          </p>
          
          {(onRetry || onDismiss) && (
            <div className="mt-3 flex gap-2">
              {onRetry && (
                <button
                  onClick={onRetry}
                  className="px-3 py-1 text-sm font-medium rounded-md
                           bg-red-600 text-white hover:bg-red-700
                           focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Retry
                </button>
              )}
              
              {onDismiss && (
                <button
                  onClick={onDismiss}
                  className="px-3 py-1 text-sm font-medium rounded-md
                           text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/40
                           focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Dismiss
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
