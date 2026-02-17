import React from 'react';

export type SortType = 'recent' | 'oldest' | 'unread' | 'alphabetical';

interface ChatSortProps {
  activeSort: SortType;
  onSortChange: (sort: SortType) => void;
  direction?: 'asc' | 'desc';
  onDirectionChange?: (direction: 'asc' | 'desc') => void;
  disabled?: boolean;
  className?: string;
}

export const ChatSort: React.FC<ChatSortProps> = ({
  activeSort,
  onSortChange,
  direction = 'desc',
  onDirectionChange,
  disabled = false,
  className = '',
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const sortOptions: { type: SortType; label: string }[] = [
    { type: 'recent', label: 'Most Recent' },
    { type: 'oldest', label: 'Oldest First' },
    { type: 'unread', label: 'Unread First' },
    { type: 'alphabetical', label: 'Alphabetical' },
  ];

  const activeSortLabel = sortOptions.find((opt) => opt.type === activeSort)?.label || 'Sort';

  const handleSortChange = (sort: SortType) => {
    onSortChange(sort);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center gap-1">
        <button
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Sort options"
          aria-expanded={isOpen}
          aria-haspopup="menu"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
            />
          </svg>
          <span>{activeSortLabel}</span>
          <svg
            className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {onDirectionChange && (
          <button
            onClick={() => onDirectionChange(direction === 'asc' ? 'desc' : 'asc')}
            disabled={disabled}
            className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={`Sort direction: ${direction === 'asc' ? 'Ascending' : 'Descending'}`}
            title={direction === 'asc' ? 'Ascending' : 'Descending'}
          >
            <svg
              className={`w-5 h-5 transition-transform ${direction === 'asc' ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-50 right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg py-1">
          {sortOptions.map((option) => (
            <button
              key={option.type}
              onClick={() => handleSortChange(option.type)}
              className={`w-full flex items-center justify-between px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                activeSort === option.type ? 'text-blue-600 dark:text-blue-400' : ''
              }`}
              role="menuitem"
            >
              <span>{option.label}</span>
              {activeSort === option.type && (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
