import React from 'react';

interface FileItemProps {
  name: string;
  size?: string;
  type?: string;
  onClick?: () => void;
  onDelete?: () => void;
  className?: string;
}

export const FileItem: React.FC<FileItemProps> = ({
  name,
  size,
  type,
  onClick,
  onDelete,
  className = '',
}) => {
  const getFileIcon = (fileType?: string) => {
    if (!fileType) return '📄';
    
    if (fileType.startsWith('image/')) return '🖼️';
    if (fileType.startsWith('video/')) return '🎥';
    if (fileType.startsWith('audio/')) return '🎵';
    if (fileType.includes('pdf')) return '📕';
    if (fileType.includes('zip') || fileType.includes('rar')) return '📦';
    if (fileType.includes('text')) return '📝';
    
    return '📄';
  };
  
  const formatSize = (bytes?: string) => {
    if (!bytes) return '';
    const num = parseInt(bytes, 10);
    if (num < 1024) return `${num} B`;
    if (num < 1024 * 1024) return `${(num / 1024).toFixed(1)} KB`;
    if (num < 1024 * 1024 * 1024) return `${(num / (1024 * 1024)).toFixed(1)} MB`;
    return `${(num / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  };
  
  return (
    <div
      className={`
        flex items-center gap-3 p-3 rounded-lg
        bg-gray-50 dark:bg-gray-800
        border border-gray-200 dark:border-gray-700
        hover:bg-gray-100 dark:hover:bg-gray-750
        transition-colors
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {/* File Icon */}
      <div className="flex-shrink-0 text-2xl">
        {getFileIcon(type)}
      </div>
      
      {/* File Info */}
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
          {name}
        </div>
        {size && (
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {formatSize(size)}
          </div>
        )}
      </div>
      
      {/* Delete Button */}
      {onDelete && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="flex-shrink-0 p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
          aria-label="Delete file"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  );
};
