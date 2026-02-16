import React from 'react';

export interface MessageHeaderProps {
  senderName: string;
  senderRole?: string;
  badge?: React.ReactNode;
  avatar?: React.ReactNode;
  timestamp?: string;
  isEdited?: boolean;
  className?: string;
}

export const MessageHeader: React.FC<MessageHeaderProps> = ({
  senderName,
  senderRole,
  badge,
  avatar,
  timestamp,
  isEdited = false,
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-2 mb-2 ${className}`}>
      {avatar && <div className="flex-shrink-0">{avatar}</div>}
      
      <div className="flex items-center gap-2 flex-wrap">
        <span className="font-semibold text-gray-900 dark:text-white">
          {senderName}
        </span>
        
        {senderRole && (
          <span className="text-xs px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
            {senderRole}
          </span>
        )}
        
        {badge && <div className="flex-shrink-0">{badge}</div>}
        
        {timestamp && (
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {timestamp}
          </span>
        )}
        
        {isEdited && (
          <span className="text-xs text-gray-400 dark:text-gray-500 italic">
            (edited)
          </span>
        )}
      </div>
    </div>
  );
};
