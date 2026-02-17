import React from 'react';

export interface MessageSkeletonProps {
  count?: number;
  isUser?: boolean;
  className?: string;
}

export const MessageSkeleton: React.FC<MessageSkeletonProps> = ({
  count = 1,
  isUser = false,
  className = '',
}) => {
  const alignmentClass = isUser ? 'flex-row-reverse' : 'flex-row';
  
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={`flex gap-3 mb-4 ${alignmentClass} ${className} animate-pulse`}>
          {/* Avatar skeleton */}
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          </div>
          
          {/* Message bubble skeleton */}
          <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[70%]`}>
            {/* Name skeleton */}
            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
            
            {/* Content skeleton - multiple lines */}
            <div className="space-y-2 w-full">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
              {index % 2 === 0 && (
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
              )}
            </div>
            
            {/* Timestamp skeleton */}
            <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded mt-2"></div>
          </div>
        </div>
      ))}
    </>
  );
};
