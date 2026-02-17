import React from 'react';

export interface SuccessMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  message: string;
  onClose?: () => void;
}

export const SuccessMessage: React.FC<SuccessMessageProps> = ({
  title = 'Success',
  message,
  onClose,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 ${className}`}
      role="alert"
      {...props}
    >
      <svg
        className="w-6 h-6 text-green-500 flex-shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      
      <div className="flex-1 min-w-0">
        {title && (
          <p className="text-sm font-semibold text-green-800 dark:text-green-200">{title}</p>
        )}
        <p className="text-sm text-green-700 dark:text-green-300 mt-1">{message}</p>
      </div>
      
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 text-green-400 hover:text-green-600 dark:hover:text-green-200"
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
