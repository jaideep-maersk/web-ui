import React from 'react';

export interface ChatSuggestionProps {
  text: string;
  icon?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export const ChatSuggestion: React.FC<ChatSuggestionProps> = ({
  text,
  icon,
  onClick,
  disabled = false,
  className = '',
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        group relative p-4 rounded-lg border border-gray-200 dark:border-gray-700
        bg-white dark:bg-gray-800 
        hover:border-blue-500 dark:hover:border-blue-400
        hover:shadow-md transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-200
        text-left w-full
        ${className}
      `}
    >
      <div className="flex items-start gap-3">
        {icon && (
          <span className="text-2xl shrink-0 group-hover:scale-110 transition-transform">
            {icon}
          </span>
        )}
        <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
          {text}
        </span>
      </div>
    </button>
  );
};

export interface ChatSuggestionsListProps {
  suggestions: Array<{
    id: string;
    text: string;
    icon?: string;
  }>;
  onSelect?: (id: string, text: string) => void;
  title?: string;
  className?: string;
}

export const ChatSuggestionsList: React.FC<ChatSuggestionsListProps> = ({
  suggestions,
  onSelect,
  title = 'Suggested prompts',
  className = '',
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {title && (
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {title}
        </h3>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {suggestions.map((suggestion) => (
          <ChatSuggestion
            key={suggestion.id}
            text={suggestion.text}
            icon={suggestion.icon}
            onClick={() => onSelect?.(suggestion.id, suggestion.text)}
          />
        ))}
      </div>
    </div>
  );
};
