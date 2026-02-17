import React from 'react';

interface UnreadIndicatorProps {
  count: number;
  position?: 'top' | 'bottom';
  onClick?: () => void;
  className?: string;
}

export const UnreadIndicator: React.FC<UnreadIndicatorProps> = ({
  count,
  position = 'top',
  onClick,
  className = '',
}) => {
  if (count === 0) return null;

  const positionClass = position === 'top' ? 'top-4' : 'bottom-4';

  return (
    <button
      onClick={onClick}
      className={`absolute left-1/2 -translate-x-1/2 ${positionClass} px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center gap-2 ${className}`}
      aria-label={`${count} new message${count !== 1 ? 's' : ''}`}
    >
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
          clipRule="evenodd"
        />
      </svg>
      <span>
        {count > 99 ? '99+' : count} new message{count !== 1 ? 's' : ''}
      </span>
    </button>
  );
};
