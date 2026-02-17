import React, { useState, useRef, KeyboardEvent, ChangeEvent } from 'react';

export interface MessageInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  multiline?: boolean;
  rows?: number;
  showCounter?: boolean;
  showFormatting?: boolean;
  showAttachments?: boolean;
  showEmoji?: boolean;
  autoFocus?: boolean;
  className?: string;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  value: controlledValue,
  onChange,
  onSubmit,
  placeholder = 'Type a message...',
  disabled = false,
  maxLength = 5000,
  multiline = true,
  rows = 3,
  showCounter = true,
  showFormatting = false,
  showAttachments = false,
  showEmoji = false,
  autoFocus = false,
  className = '',
}) => {
  const [internalValue, setInternalValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const length = value.length;
  const isOverLimit = maxLength && length > maxLength;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const newValue = e.target.value;
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !multiline) {
      e.preventDefault();
      if (value.trim() && !isOverLimit) {
        onSubmit?.(value);
        if (controlledValue === undefined) {
          setInternalValue('');
        }
      }
    } else if (e.key === 'Enter' && e.ctrlKey && multiline) {
      e.preventDefault();
      if (value.trim() && !isOverLimit) {
        onSubmit?.(value);
        if (controlledValue === undefined) {
          setInternalValue('');
        }
      }
    }
  };

  const handleSubmitClick = () => {
    if (value.trim() && !isOverLimit) {
      onSubmit?.(value);
      if (controlledValue === undefined) {
        setInternalValue('');
      }
    }
  };

  const commonClasses = `
    w-full px-4 py-3 border rounded-lg
    focus:outline-none focus:ring-2 focus:ring-blue-500
    disabled:opacity-50 disabled:cursor-not-allowed
    transition-colors
    ${isOverLimit ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'}
    bg-white dark:bg-gray-800
    text-gray-900 dark:text-gray-100
    placeholder-gray-400 dark:placeholder-gray-500
  `;

  return (
    <div className={`relative ${className}`}>
      {/* Toolbar */}
      {(showFormatting || showAttachments || showEmoji) && (
        <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-200 dark:border-gray-700">
          {showFormatting && (
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                title="Bold"
                disabled={disabled}
              >
                <span className="font-bold text-sm">B</span>
              </button>
              <button
                type="button"
                className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                title="Italic"
                disabled={disabled}
              >
                <span className="italic text-sm">I</span>
              </button>
              <button
                type="button"
                className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                title="Underline"
                disabled={disabled}
              >
                <span className="underline text-sm">U</span>
              </button>
            </div>
          )}
          {showAttachments && (
            <button
              type="button"
              className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
              title="Attach file"
              disabled={disabled}
            >
              📎
            </button>
          )}
          {showEmoji && (
            <button
              type="button"
              className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
              title="Add emoji"
              disabled={disabled}
            >
              😊
            </button>
          )}
        </div>
      )}

      {/* Input Field */}
      {multiline ? (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          rows={rows}
          autoFocus={autoFocus}
          className={commonClasses}
          aria-label="Message input"
          aria-invalid={isOverLimit}
        />
      ) : (
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          autoFocus={autoFocus}
          className={commonClasses}
          aria-label="Message input"
          aria-invalid={isOverLimit}
        />
      )}

      {/* Footer with counter and submit */}
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-2">
          {showCounter && maxLength && (
            <span
              className={`text-xs ${
                isOverLimit
                  ? 'text-red-600 dark:text-red-400 font-semibold'
                  : length > maxLength * 0.9
                  ? 'text-yellow-600 dark:text-yellow-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              {length}/{maxLength}
            </span>
          )}
          {multiline && (
            <span className="text-xs text-gray-400 dark:text-gray-500">
              Press Ctrl+Enter to send
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={handleSubmitClick}
          disabled={disabled || !value.trim() || isOverLimit}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg text-sm font-medium transition-colors disabled:cursor-not-allowed"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
