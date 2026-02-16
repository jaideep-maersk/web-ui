import React from 'react';

export interface MessageFooterProps {
  reactions?: Array<{ emoji: string; count: number; reacted?: boolean }>;
  onReactionClick?: (emoji: string) => void;
  onAddReaction?: () => void;
  actions?: React.ReactNode;
  metadata?: React.ReactNode;
  className?: string;
}

export const MessageFooter: React.FC<MessageFooterProps> = ({
  reactions,
  onReactionClick,
  onAddReaction,
  actions,
  metadata,
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-3 mt-2 ${className}`}>
      {/* Reactions */}
      {reactions && reactions.length > 0 && (
        <div className="flex items-center gap-1 flex-wrap">
          {reactions.map((reaction, index) => (
            <button
              key={index}
              onClick={() => onReactionClick?.(reaction.emoji)}
              className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-colors ${
                reaction.reacted
                  ? 'bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700'
                  : 'bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <span>{reaction.emoji}</span>
              <span className="font-medium">{reaction.count}</span>
            </button>
          ))}
          
          {onAddReaction && (
            <button
              onClick={onAddReaction}
              className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Add reaction"
            >
              <span className="text-xs">+</span>
            </button>
          )}
        </div>
      )}
      
      {/* Actions */}
      {actions && <div className="flex items-center gap-2">{actions}</div>}
      
      {/* Metadata */}
      {metadata && (
        <div className="ml-auto text-xs text-gray-500 dark:text-gray-400">
          {metadata}
        </div>
      )}
    </div>
  );
};
