import React from 'react';

export interface QuickReplyOption {
  id: string;
  text: string;
  icon?: React.ReactNode;
}

export interface QuickReplyProps {
  options: QuickReplyOption[];
  onSelect: (option: QuickReplyOption) => void;
  disabled?: boolean;
  maxDisplay?: number;
  layout?: 'horizontal' | 'vertical' | 'grid';
  className?: string;
}

export const QuickReply: React.FC<QuickReplyProps> = ({
  options,
  onSelect,
  disabled = false,
  maxDisplay,
  layout = 'horizontal',
  className = '',
}) => {
  const displayOptions = maxDisplay ? options.slice(0, maxDisplay) : options;
  const hasMore = maxDisplay && options.length > maxDisplay;

  const getLayoutClass = () => {
    switch (layout) {
      case 'vertical':
        return 'flex-col items-stretch';
      case 'grid':
        return 'grid grid-cols-2 gap-2';
      default:
        return 'flex-row flex-wrap';
    }
  };

  return (
    <div className={`flex ${getLayoutClass()} gap-2 ${className}`}>
      {displayOptions.map((option) => (
        <button
          key={option.id}
          onClick={() => onSelect(option)}
          disabled={disabled}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {option.icon && <span className="flex-shrink-0">{option.icon}</span>}
          <span>{option.text}</span>
        </button>
      ))}
      
      {hasMore && (
        <button
          disabled={disabled}
          className="flex items-center justify-center px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium text-gray-600 dark:text-gray-400"
        >
          +{options.length - maxDisplay!} more
        </button>
      )}
    </div>
  );
};
