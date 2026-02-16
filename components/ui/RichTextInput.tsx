import React, { TextareaHTMLAttributes, useState, useRef, useEffect } from 'react';

export interface RichTextInputProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
  helperText?: string;
  showToolbar?: boolean;
  minRows?: number;
  maxRows?: number;
}

export const RichTextInput: React.FC<RichTextInputProps> = ({
  id,
  value,
  onChange,
  label,
  error,
  helperText,
  placeholder,
  disabled,
  showToolbar = true,
  minRows = 3,
  maxRows = 10,
  className = '',
  ...props
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [rows, setRows] = useState(minRows);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      const lineHeight = parseInt(window.getComputedStyle(textareaRef.current).lineHeight);
      const lines = value.split('\n').length;
      const calculatedRows = Math.min(Math.max(lines, minRows), maxRows);
      setRows(calculatedRows);
    }
  }, [value, minRows, maxRows]);

  const insertFormatting = (before: string, after: string = '') => {
    if (!textareaRef.current || disabled) return;
    
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const newValue = value.substring(0, start) + before + selectedText + after + value.substring(end);
    
    onChange(newValue);
    
    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + before.length + selectedText.length + after.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const formatButtons = [
    { label: 'B', title: 'Bold', action: () => insertFormatting('**', '**') },
    { label: 'I', title: 'Italic', action: () => insertFormatting('*', '*') },
    { label: 'Code', title: 'Code', action: () => insertFormatting('`', '`') },
    { label: 'Link', title: 'Link', action: () => insertFormatting('[', '](url)') },
    { label: 'List', title: 'List', action: () => insertFormatting('\n- ') },
    { label: 'Quote', title: 'Quote', action: () => insertFormatting('\n> ') },
  ];

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
        </label>
      )}

      {showToolbar && !disabled && (
        <div className="flex gap-1 mb-2 p-1 bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600">
          {formatButtons.map((btn) => (
            <button
              key={btn.label}
              type="button"
              onClick={btn.action}
              title={btn.title}
              className="px-2 py-1 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
            >
              {btn.label}
            </button>
          ))}
        </div>
      )}

      <textarea
        ref={textareaRef}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none ${
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 dark:border-gray-600'
        } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed`}
        {...props}
      />

      {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helperText}</p>
      )}
    </div>
  );
};
