import React from 'react';

export interface FileCardProps {
  fileName: string;
  fileSize: number;
  fileType?: string;
  downloadUrl?: string;
  onDownload?: () => void;
  onPreview?: () => void;
  showPreview?: boolean;
}

export const FileCard: React.FC<FileCardProps> = ({
  fileName,
  fileSize,
  fileType,
  downloadUrl,
  onDownload,
  onPreview,
  showPreview = true,
}) => {
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getFileIcon = (type?: string, name?: string): string => {
    if (!type && name) {
      const ext = name.split('.').pop()?.toLowerCase();
      if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext || '')) return '🖼️';
      if (['mp4', 'mov', 'avi', 'mkv', 'webm'].includes(ext || '')) return '🎥';
      if (['mp3', 'wav', 'ogg', 'flac'].includes(ext || '')) return '🎵';
      if (ext === 'pdf') return '📕';
      if (['doc', 'docx'].includes(ext || '')) return '📄';
      if (['xls', 'xlsx', 'csv'].includes(ext || '')) return '📊';
      if (['zip', 'rar', 'tar', 'gz', '7z'].includes(ext || '')) return '📦';
      if (['txt', 'md'].includes(ext || '')) return '📝';
    }
    
    if (type?.startsWith('image/')) return '🖼️';
    if (type?.startsWith('video/')) return '🎥';
    if (type?.startsWith('audio/')) return '🎵';
    if (type?.includes('pdf')) return '📕';
    if (type?.includes('word') || type?.includes('document')) return '📄';
    if (type?.includes('sheet') || type?.includes('excel')) return '📊';
    if (type?.includes('zip') || type?.includes('rar') || type?.includes('tar')) return '📦';
    if (type?.includes('text')) return '📝';
    return '📎';
  };

  const handleDownload = () => {
    if (onDownload) {
      onDownload();
    } else if (downloadUrl) {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const canPreview = showPreview && onPreview && fileType && 
    (fileType.startsWith('image/') || fileType.startsWith('text/') || fileType.includes('pdf'));

  return (
    <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 border 
      border-gray-200 dark:border-gray-700 rounded-lg max-w-md">
      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center 
        bg-gray-100 dark:bg-gray-700 rounded-lg text-2xl">
        {getFileIcon(fileType, fileName)}
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
          {fileName}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {formatFileSize(fileSize)}
        </p>
      </div>

      <div className="flex items-center gap-2">
        {canPreview && (
          <button
            type="button"
            onClick={onPreview}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 
              dark:hover:text-blue-400 transition-colors"
            aria-label="Preview file"
            title="Preview"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
        )}
        <button
          type="button"
          onClick={handleDownload}
          className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 
            dark:hover:text-blue-400 transition-colors"
          aria-label="Download file"
          title="Download"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </button>
      </div>
    </div>
  );
};
