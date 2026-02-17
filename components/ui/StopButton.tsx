import React from 'react';

export interface StopButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const StopButton: React.FC<StopButtonProps> = ({
  onClick,
  disabled = false,
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 p-1.5',
    md: 'w-10 h-10 p-2',
    lg: 'w-12 h-12 p-2.5',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label="Stop generation"
      className={`
        ${sizeClasses[size]}
        inline-flex items-center justify-center
        bg-red-600 hover:bg-red-700 text-white
        rounded-lg
        active:scale-95
        transition-all duration-150
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <rect x="6" y="6" width="12" height="12" rx="2" />
      </svg>
    </button>
  );
};
