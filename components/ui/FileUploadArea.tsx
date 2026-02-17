import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';

export interface FileUploadAreaProps {
  onFileSelect?: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in MB
  maxFiles?: number;
  disabled?: boolean;
  showPreview?: boolean;
  className?: string;
}

export const FileUploadArea: React.FC<FileUploadAreaProps> = ({
  onFileSelect,
  accept = '*/*',
  multiple = true,
  maxSize = 10, // 10MB default
  maxFiles = 5,
  disabled = false,
  showPreview = true,
  className = '',
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFiles = (fileList: File[]): { valid: File[]; error: string } => {
    if (!multiple && fileList.length > 1) {
      return { valid: [], error: 'Only one file allowed' };
    }

    if (maxFiles && fileList.length > maxFiles) {
      return { valid: [], error: `Maximum ${maxFiles} files allowed` };
    }

    const maxSizeBytes = maxSize * 1024 * 1024;
    const validFiles: File[] = [];
    
    for (const file of fileList) {
      if (file.size > maxSizeBytes) {
        return { valid: [], error: `File ${file.name} exceeds ${maxSize}MB limit` };
      }
      validFiles.push(file);
    }

    return { valid: validFiles, error: '' };
  };

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;

    const fileArray = Array.from(fileList);
    const { valid, error: validationError } = validateFiles(fileArray);

    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    setFiles(valid);
    onFileSelect?.(valid);
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (!disabled) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onFileSelect?.(newFiles);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className={className}>
      {/* Drop Zone */}
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`
          border-2 border-dashed rounded-lg p-8
          flex flex-col items-center justify-center
          cursor-pointer transition-all
          ${isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-600'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-blue-400 dark:hover:border-blue-500'}
          bg-gray-50 dark:bg-gray-800
        `}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label="File upload area"
      >
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          className="hidden"
          aria-label="File input"
        />
        
        <div className="text-4xl mb-4">📁</div>
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
          {isDragging ? 'Drop files here' : 'Drag & drop files here'}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          or click to browse
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500">
          {multiple ? `Up to ${maxFiles} files` : '1 file'} • Max {maxSize}MB each
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* File Preview */}
      {showPreview && files.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Selected Files ({files.length})
          </p>
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <span className="text-2xl">📄</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
                className="ml-2 p-1 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                aria-label={`Remove ${file.name}`}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploadArea;
