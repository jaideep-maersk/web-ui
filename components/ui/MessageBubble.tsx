import React from 'react';

export interface MessageBubbleProps {
  content: string;
  isUser?: boolean;
  timestamp?: string;
  avatar?: React.ReactNode;
  name?: string;
  status?: 'sending' | 'sent' | 'error';
  className?: string;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  content,
  isUser = false,
  timestamp,
  avatar,
  name,
  status,
  className = '',
}) => {
  const bubbleClass = isUser
    ? 'bg-blue-600 text-white ml-auto'
    : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white';

  const alignmentClass = isUser ? 'flex-row-reverse' : 'flex-row';

  return (
    <div className={`flex gap-3 mb-4 ${alignmentClass} ${className}`}>
      {avatar && (
        <div className="flex-shrink-0">
          {avatar}
        </div>
      )}
      
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[70%]`}>
        {name && (
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1 px-1">
            {name}
          </div>
        )}
        
        <div className={`rounded-2xl px-4 py-2 ${bubbleClass} whitespace-pre-wrap break-words`}>
          {content}
        </div>
        
        <div className="flex items-center gap-2 mt-1 px-1">
          {timestamp && (
            <span className="text-xs text-gray-500 dark:text-gray-500">
              {timestamp}
            </span>
          )}
          
          {status === 'sending' && (
            <span className="text-xs text-gray-400 dark:text-gray-600">Sending...</span>
          )}
          
          {status === 'error' && (
            <span className="text-xs text-red-500">Failed to send</span>
          )}
        </div>
      </div>
    </div>
  );
};
