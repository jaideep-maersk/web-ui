import React from 'react';

export interface WarningMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  message: string;
  onClose?: () => void;
}

export const WarningMessage: React.FC<WarningMessageProps> = ({
  title = 'Warning',
  message,
  onClose,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 ${className}`}
      role="alert"
      {...props}
    >
      <svg
        className="w-6 h-6 text-yellow-500 flex-shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      
      <div className="flex-1 min-w-0">
        {title && (
          <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-200">{title}</p>
        )}
        <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">{message}</p>
      </div>
      
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 text-yellow-400 hover:text-yellow-600 dark:hover:text-yellow-200"
          aria-label="Close message"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};
