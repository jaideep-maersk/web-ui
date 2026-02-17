import React, { useState, useRef, ChangeEvent } from 'react';

export interface ComposeAreaProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  minHeight?: number;
  maxHeight?: number;
  showToolbar?: boolean;
  autoFocus?: boolean;
  className?: string;
}

export const ComposeArea: React.FC<ComposeAreaProps> = ({
  value: controlledValue,
  onChange,
  placeholder = 'Start typing...',
  disabled = false,
  minHeight = 100,
  maxHeight = 400,
  showToolbar = true,
  autoFocus = false,
  className = '',
}) => {
  const [internalValue, setInternalValue] = useState('');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const insertFormatting = (before: string, after: string) => {
    if (!textareaRef.current) return;

    const start = textareaRef.current.selectionStart;
    const end = textareaRef.current.selectionEnd;
    const selected = value.substring(start, end);
    const newValue = value.substring(0, start) + before + selected + after + value.substring(end);

    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);

    // Restore selection
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(start + before.length, end + before.length);
      }
    }, 0);
  };

  return (
    <div className={`border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden bg-white dark:bg-gray-800 ${className}`}>
      {/* Toolbar */}
      {showToolbar && (
        <div className="flex items-center gap-1 p-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <button
            type="button"
            onClick={() => {
              insertFormatting('**', '**');
              setIsBold(!isBold);
            }}
            disabled={disabled}
            className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              isBold ? 'bg-gray-200 dark:bg-gray-700' : ''
            }`}
            title="Bold (Ctrl+B)"
            aria-label="Bold"
          >
            <span className="font-bold text-sm">B</span>
          </button>
          <button
            type="button"
            onClick={() => {
              insertFormatting('*', '*');
              setIsItalic(!isItalic);
            }}
            disabled={disabled}
            className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              isItalic ? 'bg-gray-200 dark:bg-gray-700' : ''
            }`}
            title="Italic (Ctrl+I)"
            aria-label="Italic"
          >
            <span className="italic text-sm">I</span>
          </button>
          <button
            type="button"
            onClick={() => insertFormatting('`', '`')}
            disabled={disabled}
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Code"
            aria-label="Code"
          >
            <span className="font-mono text-sm">{'<>'}</span>
          </button>
          <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />
          <button
            type="button"
            onClick={() => insertFormatting('[', '](url)')}
            disabled={disabled}
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Link"
            aria-label="Insert link"
          >
            🔗
          </button>
          <button
            type="button"
            onClick={() => insertFormatting('- ', '')}
            disabled={disabled}
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="List"
            aria-label="Insert list"
          >
            📝
          </button>
        </div>
      )}

      {/* Text Area */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        autoFocus={autoFocus}
        className="w-full px-4 py-3 resize-none focus:outline-none bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ minHeight: `${minHeight}px`, maxHeight: `${maxHeight}px` }}
        aria-label="Compose area"
      />
    </div>
  );
};

export default ComposeArea;
