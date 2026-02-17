import React from 'react';

export interface Attachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
}

export interface InputAttachmentsProps {
  attachments: Attachment[];
  onRemove?: (id: string) => void;
  onPreview?: (attachment: Attachment) => void;
  maxDisplay?: number;
  className?: string;
}

export const InputAttachments: React.FC<InputAttachmentsProps> = ({
  attachments,
  onRemove,
  onPreview,
  maxDisplay = 5,
  className = '',
}) => {
  const formatSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) {
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    }
    if (type.startsWith('video/')) {
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      );
    }
    return (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    );
  };

  const displayAttachments = attachments.slice(0, maxDisplay);
  const remaining = attachments.length - maxDisplay;

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {displayAttachments.map((attachment) => (
        <div
          key={attachment.id}
          className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg group hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <div className="text-gray-500 dark:text-gray-400">
            {getFileIcon(attachment.type)}
          </div>
          
          <button
            onClick={() => onPreview?.(attachment)}
            className="flex-1 min-w-0 text-left"
          >
            <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
              {attachment.name}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {formatSize(attachment.size)}
            </div>
          </button>
          
          {onRemove && (
            <button
              onClick={() => onRemove(attachment.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 hover:text-red-600 dark:hover:text-red-400"
              aria-label={`Remove ${attachment.name}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      ))}
      
      {remaining > 0 && (
        <div className="flex items-center justify-center px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-600 dark:text-gray-400">
          +{remaining} more
        </div>
      )}
    </div>
  );
};
