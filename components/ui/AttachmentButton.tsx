import React, { useRef } from 'react';

export interface AttachmentButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onFilesSelected?: (files: FileList) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in bytes
  disabled?: boolean;
}

export const AttachmentButton: React.FC<AttachmentButtonProps> = ({
  onFilesSelected,
  accept = '*/*',
  multiple = true,
  maxSize,
  disabled = false,
  className = '',
  ...props
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Check file sizes if maxSize is specified
    if (maxSize) {
      const oversizedFiles = Array.from(files).filter(file => file.size > maxSize);
      if (oversizedFiles.length > 0) {
        alert(`Some files exceed the maximum size of ${(maxSize / 1024 / 1024).toFixed(1)}MB`);
        return;
      }
    }

    onFilesSelected?.(files);
    
    // Reset input to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled}
      />
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled}
        className={`inline-flex items-center justify-center p-2 rounded-lg
          ${disabled 
            ? 'text-gray-400 cursor-not-allowed' 
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
          }
          transition-colors ${className}`}
        aria-label="Attach files"
        {...props}
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" 
          />
        </svg>
      </button>
    </>
  );
};
