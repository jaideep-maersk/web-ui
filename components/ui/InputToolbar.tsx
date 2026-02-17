import React from 'react';

export interface InputToolbarProps {
  onFormat?: (format: string) => void;
  onAttach?: () => void;
  onEmoji?: () => void;
  onMention?: () => void;
  onCommand?: () => void;
  showFormat?: boolean;
  showAttach?: boolean;
  showEmoji?: boolean;
  showMention?: boolean;
  showCommand?: boolean;
  disabled?: boolean;
  className?: string;
}

export const InputToolbar: React.FC<InputToolbarProps> = ({
  onFormat,
  onAttach,
  onEmoji,
  onMention,
  onCommand,
  showFormat = true,
  showAttach = true,
  showEmoji = true,
  showMention = true,
  showCommand = true,
  disabled = false,
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-1 p-1 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 ${className}`}>
      {showFormat && onFormat && (
        <div className="flex items-center gap-1 border-r border-gray-200 dark:border-gray-700 pr-2">
          <button
            onClick={() => onFormat('bold')}
            disabled={disabled}
            className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Bold"
            title="Bold"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z" />
            </svg>
          </button>
          <button
            onClick={() => onFormat('italic')}
            disabled={disabled}
            className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Italic"
            title="Italic"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </button>
          <button
            onClick={() => onFormat('underline')}
            disabled={disabled}
            className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Underline"
            title="Underline"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v10a5 5 0 0010 0V4M4 20h16" />
            </svg>
          </button>
        </div>
      )}
      
      {showAttach && onAttach && (
        <button
          onClick={onAttach}
          disabled={disabled}
          className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Attach file"
          title="Attach file"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
          </svg>
        </button>
      )}
      
      {showEmoji && onEmoji && (
        <button
          onClick={onEmoji}
          disabled={disabled}
          className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Add emoji"
          title="Add emoji"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      )}
      
      {showMention && onMention && (
        <button
          onClick={onMention}
          disabled={disabled}
          className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Mention user"
          title="Mention user (@)"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
          </svg>
        </button>
      )}
      
      {showCommand && onCommand && (
        <button
          onClick={onCommand}
          disabled={disabled}
          className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Slash command"
          title="Slash command (/)"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>
      )}
    </div>
  );
};
