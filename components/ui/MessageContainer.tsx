import React from 'react';

export interface MessageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  sender?: 'user' | 'assistant' | 'system';
  align?: 'left' | 'right';
  showAvatar?: boolean;
  avatar?: React.ReactNode;
  timestamp?: string;
  status?: 'sending' | 'sent' | 'error';
  children: React.ReactNode;
}

export const MessageContainer: React.FC<MessageContainerProps> = ({
  sender = 'assistant',
  align,
  showAvatar = true,
  avatar,
  timestamp,
  status,
  children,
  className = '',
  ...props
}) => {
  const alignment = align || (sender === 'user' ? 'right' : 'left');
  const isUser = sender === 'user';
  
  const containerClass = `flex gap-3 ${alignment === 'right' ? 'flex-row-reverse' : 'flex-row'} ${className}`;
  
  return (
    <div className={containerClass} {...props}>
      {showAvatar && (
        <div className="flex-shrink-0">
          {avatar || (
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              isUser 
                ? 'bg-blue-500 text-white' 
                : 'bg-gradient-to-br from-purple-500 to-blue-500 text-white'
            }`}>
              {isUser ? 'U' : 'A'}
            </div>
          )}
        </div>
      )}
      
      <div className={`flex-1 ${alignment === 'right' ? 'flex flex-col items-end' : ''}`}>
        {children}
        
        {(timestamp || status) && (
          <div className={`flex items-center gap-2 mt-1 text-xs text-gray-500 dark:text-gray-400 ${
            alignment === 'right' ? 'justify-end' : ''
          }`}>
            {timestamp && <span>{timestamp}</span>}
            {status && (
              <span className="flex items-center gap-1">
                {status === 'sending' && '⏳'}
                {status === 'sent' && '✓'}
                {status === 'error' && '⚠️'}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
