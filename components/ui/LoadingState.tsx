import React from 'react';

export interface LoadingStateProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'dots' | 'pulse';
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading...',
  size = 'md',
  variant = 'spinner',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  const renderSpinner = () => (
    <div className={`${sizeClasses[size]} relative`}>
      <div className="absolute inset-0 border-4 border-gray-200 dark:border-gray-700 rounded-full" />
      <div className="absolute inset-0 border-4 border-blue-600 dark:border-blue-400 rounded-full border-t-transparent animate-spin" />
    </div>
  );

  const renderDots = () => (
    <div className="flex gap-2">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`${size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : 'w-4 h-4'} bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce`}
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  );

  const renderPulse = () => (
    <div className={`${sizeClasses[size]} bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse`} />
  );

  return (
    <div className={`flex flex-col items-center justify-center py-12 ${className}`}>
      {variant === 'spinner' && renderSpinner()}
      {variant === 'dots' && renderDots()}
      {variant === 'pulse' && renderPulse()}
      {message && (
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">{message}</p>
      )}
    </div>
  );
};
