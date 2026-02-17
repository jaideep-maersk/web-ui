import React from 'react';

export interface InfoMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  message: string;
  onClose?: () => void;
}

export const InfoMessage: React.FC<InfoMessageProps> = ({
  title = 'Info',
  message,
  onClose,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 ${className}`}
      role="alert"
      {...props}
    >
      <svg
        className="w-6 h-6 text-blue-500 flex-shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      
      <div className="flex-1 min-w-0">
        {title && (
          <p className="text-sm font-semibold text-blue-800 dark:text-blue-200">{title}</p>
        )}
        <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">{message}</p>
      </div>
      
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 text-blue-400 hover:text-blue-600 dark:hover:text-blue-200"
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
