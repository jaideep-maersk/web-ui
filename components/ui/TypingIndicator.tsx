import React from 'react';

export interface TypingIndicatorProps {
  name?: string;
  avatar?: React.ReactNode;
  className?: string;
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({
  name = 'Assistant',
  avatar,
  className = '',
}) => {
  return (
    <div className={`flex gap-3 items-end mb-4 ${className}`}>
      {avatar && (
        <div className="flex-shrink-0">
          {avatar}
        </div>
      )}
      
      <div className="flex flex-col items-start">
        {name && (
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1 px-1">
            {name}
          </div>
        )}
        
        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-3">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce"
                 style={{ animationDelay: '0ms', animationDuration: '1.4s' }}></div>
            <div className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce"
                 style={{ animationDelay: '200ms', animationDuration: '1.4s' }}></div>
            <div className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce"
                 style={{ animationDelay: '400ms', animationDuration: '1.4s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
