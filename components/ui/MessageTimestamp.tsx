import React from 'react';

export interface MessageTimestampProps {
  timestamp: string | Date;
  format?: 'relative' | 'absolute' | 'both';
  className?: string;
}

export const MessageTimestamp: React.FC<MessageTimestampProps> = ({
  timestamp,
  format = 'relative',
  className = '',
}) => {
  const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
  
  const getRelativeTime = (date: Date): string => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return date.toLocaleDateString();
  };
  
  const getAbsoluteTime = (date: Date): string => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  const displayText = format === 'relative' 
    ? getRelativeTime(date)
    : format === 'absolute'
    ? getAbsoluteTime(date)
    : `${getRelativeTime(date)} (${getAbsoluteTime(date)})`;
  
  return (
    <time 
      dateTime={date.toISOString()} 
      className={`text-xs text-gray-500 dark:text-gray-400 ${className}`}
      title={date.toLocaleString()}
    >
      {displayText}
    </time>
  );
};
