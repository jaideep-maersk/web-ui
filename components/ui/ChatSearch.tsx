import React, { useState, useEffect, useRef } from 'react';

export interface SearchResult {
  messageId: string;
  content: string;
  timestamp: Date;
  sender: string;
  highlight?: string;
}

interface ChatSearchProps {
  onSearch: (query: string) => void;
  results?: SearchResult[];
  onResultClick?: (result: SearchResult) => void;
  onClose?: () => void;
  isLoading?: boolean;
  placeholder?: string;
  className?: string;
}

export const ChatSearch: React.FC<ChatSearchProps> = ({
  onSearch,
  results = [],
  onResultClick,
  onClose,
  isLoading = false,
  placeholder = 'Search messages...',
  className = '',
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Auto-focus on mount
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    // Debounced search
    const timer = setTimeout(() => {
      if (query.trim()) {
        onSearch(query);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose?.();
    }
  };

  const highlightText = (text: string, highlight?: string) => {
    if (!highlight) return text;
    
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <mark key={index} className="bg-yellow-200 dark:bg-yellow-800">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className={`bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg ${className}`}>
      <div className="flex items-center gap-2 p-3 border-b border-gray-200 dark:border-gray-700">
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none text-sm"
          aria-label="Search messages"
        />
        {isLoading && (
          <svg className="w-5 h-5 text-gray-400 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            aria-label="Close search"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {query && (
        <div className="max-h-96 overflow-y-auto">
          {results.length === 0 && !isLoading && (
            <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
              No results found
            </div>
          )}
          {results.map((result) => (
            <button
              key={result.messageId}
              onClick={() => onResultClick?.(result)}
              className="w-full p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left border-b border-gray-100 dark:border-gray-700 last:border-b-0"
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <span className="text-sm font-medium">{result.sender}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {result.timestamp.toLocaleDateString()}
                </span>
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                {highlightText(result.content, result.highlight)}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
