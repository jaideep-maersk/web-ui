import React from 'react';

export interface ReactionProps {
  emoji: string;
  count?: number;
  reacted?: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
  className?: string;
}

export const Reaction: React.FC<ReactionProps> = ({
  emoji,
  count = 0,
  reacted = false,
  onClick,
  size = 'md',
  showCount = true,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'px-1.5 py-0.5 text-xs',
    md: 'px-2 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };
  
  const baseClass = `inline-flex items-center gap-1 rounded-full transition-all ${sizeClasses[size]}`;
  const interactiveClass = onClick ? 'cursor-pointer hover:scale-110' : '';
  const statusClass = reacted
    ? 'bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-500 dark:border-blue-400'
    : 'bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700';
  
  return (
    <button
      onClick={onClick}
      disabled={!onClick}
      className={`${baseClass} ${interactiveClass} ${statusClass} ${className}`}
      aria-label={`${emoji} reaction${count > 0 ? `, ${count} reactions` : ''}`}
    >
      <span className="leading-none">{emoji}</span>
      {showCount && count > 0 && (
        <span className={`font-medium ${reacted ? 'text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300'}`}>
          {count}
        </span>
      )}
    </button>
  );
};
