import React from 'react';

export interface SearchResult {
  id: string;
  content: string;
  timestamp: Date;
  sender: string;
}

interface MessageSearchProps {
  onSearch: (query: string) => void;
  results?: SearchResult[];
  isSearching?: boolean;
  onResultClick?: (result: SearchResult) => void;
  className?: string;
}

export const MessageSearch: React.FC<MessageSearchProps> = ({
  onSearch,
  results = [],
  isSearching = false,
  onResultClick,
  className = '',
}) => {
  const [query, setQuery] = React.useState('');
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        onSearch(query);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  const handleNext = () => {
    if (results.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % results.length);
    }
  };

  const handlePrevious = () => {
    if (results.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + results.length) % results.length);
    }
  };

  const highlightMatch = (text: string, search: string) => {
    if (!search) return text;
    const parts = text.split(new RegExp(`(${search})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === search.toLowerCase() ? (
        <mark key={i} className="bg-yellow-200 dark:bg-yellow-900">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className={`message-search ${className}`}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search messages..."
          className="w-full px-4 py-2 pr-24 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {results.length > 0 && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {currentIndex + 1} / {results.length}
            </span>
            <button
              onClick={handlePrevious}
              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
              aria-label="Previous result"
            >
              ▲
            </button>
            <button
              onClick={handleNext}
              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
              aria-label="Next result"
            >
              ▼
            </button>
          </div>
        )}
      </div>

      {isSearching && (
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Searching...
        </div>
      )}

      {query && !isSearching && results.length === 0 && (
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          No results found
        </div>
      )}

      {results.length > 0 && (
        <div className="mt-4 space-y-2 max-h-96 overflow-y-auto">
          {results.map((result, index) => (
            <div
              key={result.id}
              onClick={() => onResultClick?.(result)}
              className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                index === currentIndex
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <div className="text-sm text-gray-900 dark:text-white">
                {highlightMatch(result.content, query)}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {result.sender} • {result.timestamp.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
