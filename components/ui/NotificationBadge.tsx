import React from 'react';

interface NotificationBadgeProps {
  count: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary' | 'danger';
  showZero?: boolean;
  pulse?: boolean;
  className?: string;
}

export const NotificationBadge: React.FC<NotificationBadgeProps> = ({
  count,
  max = 99,
  size = 'md',
  variant = 'danger',
  showZero = false,
  pulse = false,
  className = '',
}) => {
  if (count === 0 && !showZero) return null;

  const displayCount = count > max ? `${max}+` : count;

  const sizeClasses = {
    sm: 'min-w-[16px] h-4 text-[10px] px-1',
    md: 'min-w-[20px] h-5 text-xs px-1.5',
    lg: 'min-w-[24px] h-6 text-sm px-2',
  };

  const variantClasses = {
    default: 'bg-gray-600 text-white',
    primary: 'bg-blue-600 text-white',
    danger: 'bg-red-600 text-white',
  };

  return (
    <span
      className={`inline-flex items-center justify-center ${sizeClasses[size]} ${variantClasses[variant]} font-bold rounded-full ${
        pulse ? 'animate-pulse' : ''
      } ${className}`}
      role="status"
      aria-label={`${count} notification${count !== 1 ? 's' : ''}`}
    >
      {displayCount}
    </span>
  );
};
