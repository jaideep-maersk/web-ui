import React from 'react';

export interface ChatPlaceholderProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  suggestions?: string[];
  onSuggestionClick?: (suggestion: string) => void;
}

export const ChatPlaceholder: React.FC<ChatPlaceholderProps> = ({
  title = 'Start a new conversation',
  description = 'Ask me anything, or try one of these suggestions:',
  icon,
  suggestions = [],
  onSuggestionClick,
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
      {icon && <div className="mb-6 text-gray-400 dark:text-gray-600">{icon}</div>}
      
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h2>
      
      {description && (
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
          {description}
        </p>
      )}
      
      {suggestions.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => onSuggestionClick?.(suggestion)}
              className="p-4 text-left rounded-lg border border-gray-200 dark:border-gray-700 
                       hover:border-gray-300 dark:hover:border-gray-600 
                       hover:bg-gray-50 dark:hover:bg-gray-800 
                       transition-colors duration-200
                       text-sm text-gray-700 dark:text-gray-300"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
