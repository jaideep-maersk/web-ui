import React from 'react';

interface BadgeProps {
  type?: 'info' | 'success' | 'warning' | 'error' | 'muted';
  content: string;
  className?: string;
}

const typeClasses: Record<string, string> = {
  info: 'bg-blue-500/20 text-blue-700 dark:text-blue-200',
  success: 'bg-green-500/20 text-green-700 dark:text-green-200',
  warning: 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-200',
  error: 'bg-red-500/20 text-red-700 dark:text-red-200',
  muted: 'bg-gray-500/20 text-gray-700 dark:text-gray-200',
};

export const Badge: React.FC<BadgeProps> = ({
  type = 'info',
  content,
  className = '',
}) => {
  return (
    <div
      className={`
        text-xs font-medium uppercase line-clamp-1 mr-0.5
        w-fit px-1.5 py-[1px] rounded-lg
        ${typeClasses[type] || typeClasses.info}
        ${className}
      `}
    >
      {content}
    </div>
  );
};
