import React from 'react';

export interface EmojiButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const EmojiButton: React.FC<EmojiButtonProps> = ({
  onClick,
  disabled = false,
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-lg',
    md: 'w-10 h-10 text-xl',
    lg: 'w-12 h-12 text-2xl',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label="Add emoji"
      className={`
        ${sizeClasses[size]}
        inline-flex items-center justify-center
        rounded-lg
        hover:bg-gray-100 dark:hover:bg-gray-700
        active:scale-95
        transition-all duration-150
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      😊
    </button>
  );
};
