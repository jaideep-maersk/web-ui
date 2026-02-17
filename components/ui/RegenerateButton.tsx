import React from 'react';

export interface RegenerateButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'icon' | 'text';
  label?: string;
  className?: string;
}

export const RegenerateButton: React.FC<RegenerateButtonProps> = ({
  onClick,
  disabled = false,
  loading = false,
  size = 'md',
  variant = 'icon',
  label = 'Regenerate',
  className = '',
}) => {
  const sizeClasses = {
    sm: variant === 'icon' ? 'w-8 h-8 p-1.5' : 'px-3 py-1.5 text-sm',
    md: variant === 'icon' ? 'w-10 h-10 p-2' : 'px-4 py-2 text-base',
    lg: variant === 'icon' ? 'w-12 h-12 p-2.5' : 'px-5 py-2.5 text-lg',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={label}
      className={`
        ${sizeClasses[size]}
        inline-flex items-center justify-center gap-2
        bg-blue-600 hover:bg-blue-700 text-white
        rounded-lg
        active:scale-95
        transition-all duration-150
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      <svg 
        className={`${variant === 'icon' ? 'w-5 h-5' : 'w-4 h-4'} ${loading ? 'animate-spin' : ''}`}
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
        />
      </svg>
      {variant === 'text' && <span>{label}</span>}
    </button>
  );
};
