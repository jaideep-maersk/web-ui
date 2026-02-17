import React from 'react';

export interface MessageSuggestion {
  id: string;
  text: string;
  icon?: string;
}

export interface MessageSuggestionsProps {
  suggestions: MessageSuggestion[];
  onSelect?: (id: string, text: string) => void;
  position?: 'top' | 'bottom';
  className?: string;
}

export const MessageSuggestions: React.FC<MessageSuggestionsProps> = ({
  suggestions,
  onSelect,
  position = 'bottom',
  className = '',
}) => {
  if (suggestions.length === 0) return null;

  return (
    <div className={`flex flex-wrap gap-2 ${position === 'top' ? 'mb-4' : 'mt-4'} ${className}`}>
      {suggestions.map((suggestion) => (
        <button
          key={suggestion.id}
          onClick={() => onSelect?.(suggestion.id, suggestion.text)}
          className="
            px-4 py-2 rounded-full
            bg-gray-100 dark:bg-gray-700
            hover:bg-gray-200 dark:hover:bg-gray-600
            text-sm text-gray-700 dark:text-gray-300
            transition-colors duration-150
            flex items-center gap-2
          "
        >
          {suggestion.icon && <span>{suggestion.icon}</span>}
          <span>{suggestion.text}</span>
        </button>
      ))}
    </div>
  );
};
