import React, { ReactNode } from 'react';

interface CardProps {
  title?: string | ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
  headerActions?: ReactNode;
}

export const Card: React.FC<CardProps> = ({
  title,
  children,
  footer,
  className = '',
  headerActions,
}) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm ${className}`}>
      {title && (
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
          {headerActions && <div>{headerActions}</div>}
        </div>
      )}
      
      <div className="px-6 py-4">
        {children}
      </div>
      
      {footer && (
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 rounded-b-lg">
          {footer}
        </div>
      )}
    </div>
  );
};
