import React from 'react';

export interface ChatMetadataProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  createdAt?: Date;
  updatedAt?: Date;
  participants?: string[];
  messageCount?: number;
  model?: string;
  tags?: string[];
}

export const ChatMetadata: React.FC<ChatMetadataProps> = ({
  title,
  createdAt,
  updatedAt,
  participants = [],
  messageCount,
  model,
  tags = [],
  className = '',
  ...props
}) => {
  const formatDate = (date: Date): string => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const MetadataItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) => (
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0 text-gray-400 dark:text-gray-500">{icon}</div>
      <div className="flex-1">
        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</dt>
        <dd className="mt-1 text-sm text-gray-900 dark:text-white">{value}</dd>
      </div>
    </div>
  );

  return (
    <div className={`space-y-4 ${className}`} {...props}>
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white pb-2 border-b border-gray-200 dark:border-gray-700">
          {title}
        </h3>
      )}
      
      <dl className="space-y-4">
        {createdAt && (
          <MetadataItem
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
            label="Created"
            value={formatDate(createdAt)}
          />
        )}
        
        {updatedAt && (
          <MetadataItem
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            label="Last Updated"
            value={formatDate(updatedAt)}
          />
        )}
        
        {participants.length > 0 && (
          <MetadataItem
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            }
            label="Participants"
            value={
              <div className="flex flex-wrap gap-2 mt-1">
                {participants.map((participant, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  >
                    {participant}
                  </span>
                ))}
              </div>
            }
          />
        )}
        
        {messageCount !== undefined && (
          <MetadataItem
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            }
            label="Messages"
            value={messageCount.toLocaleString()}
          />
        )}
        
        {model && (
          <MetadataItem
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            }
            label="Model"
            value={model}
          />
        )}
        
        {tags.length > 0 && (
          <MetadataItem
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            }
            label="Tags"
            value={
              <div className="flex flex-wrap gap-2 mt-1">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            }
          />
        )}
      </dl>
    </div>
  );
};
