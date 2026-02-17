import React from 'react';

export type FilterType = 'all' | 'unread' | 'starred' | 'archived' | 'user' | 'assistant';

interface ChatFilterProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  counts?: Record<FilterType, number>;
  disabled?: boolean;
  className?: string;
}

export const ChatFilter: React.FC<ChatFilterProps> = ({
  activeFilter,
  onFilterChange,
  counts = {},
  disabled = false,
  className = '',
}) => {
  const filters: { type: FilterType; label: string; icon: JSX.Element }[] = [
    {
      type: 'all',
      label: 'All',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      ),
    },
    {
      type: 'unread',
      label: 'Unread',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
        </svg>
      ),
    },
    {
      type: 'starred',
      label: 'Starred',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ),
    },
    {
      type: 'user',
      label: 'From Me',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      type: 'assistant',
      label: 'From Bot',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className={`flex items-center gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg ${className}`}>
      {filters.map((filter) => (
        <button
          key={filter.type}
          onClick={() => !disabled && onFilterChange(filter.type)}
          disabled={disabled}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
            activeFilter === filter.type
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
          aria-label={`Filter by ${filter.label}`}
          aria-pressed={activeFilter === filter.type}
        >
          {filter.icon}
          <span>{filter.label}</span>
          {counts[filter.type] !== undefined && counts[filter.type] > 0 && (
            <span
              className={`ml-1 px-1.5 py-0.5 rounded-full text-xs font-bold ${
                activeFilter === filter.type
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}
            >
              {counts[filter.type]}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};
