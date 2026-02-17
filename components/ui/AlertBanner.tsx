import React from 'react';

export type AlertBannerVariant = 'success' | 'error' | 'warning' | 'info';

export interface AlertBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  message?: string;
  variant?: AlertBannerVariant;
  onClose?: () => void;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const AlertBanner: React.FC<AlertBannerProps> = ({
  title,
  message,
  variant = 'info',
  onClose,
  action,
  className = '',
  ...props
}) => {
  const variantConfig = {
    success: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-500',
      icon: 'text-green-500',
      iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    error: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-500',
      icon: 'text-red-500',
      iconPath: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    warning: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      border: 'border-yellow-500',
      icon: 'text-yellow-500',
      iconPath: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
    },
    info: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-500',
      icon: 'text-blue-500',
      iconPath: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    },
  };

  const config = variantConfig[variant];

  return (
    <div className={`border-l-4 ${config.border} ${config.bg} p-4 ${className}`} role="alert" {...props}>
      <div className="flex items-start gap-3">
        <svg className={`w-6 h-6 flex-shrink-0 ${config.icon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={config.iconPath} />
        </svg>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{title}</h3>
          {message && (
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{message}</p>
          )}
          {action && (
            <button
              onClick={action.onClick}
              className="mt-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              {action.label}
            </button>
          )}
        </div>
        
        {onClose && (
          <button
            onClick={onClose}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            aria-label="Close alert"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
