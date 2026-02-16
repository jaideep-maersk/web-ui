import React, { useRef, useEffect, HTMLAttributes } from 'react';

interface CodeEditorProps extends Omit<HTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  minHeight?: number;
  maxHeight?: number;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  language = 'javascript',
  placeholder = 'Enter code...',
  disabled = false,
  readOnly = false,
  minHeight = 200,
  maxHeight = 600,
  className = '',
  ...props
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = 'auto';
    const scrollHeight = Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight);
    textarea.style.height = `${scrollHeight}px`;
  }, [value, minHeight, maxHeight]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Handle Tab key for indentation
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newValue = value.substring(0, start) + '  ' + value.substring(end);
      onChange(newValue);
      // Set cursor position after the inserted spaces
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        spellCheck={false}
        className={`
          w-full px-4 py-3 font-mono text-sm
          bg-gray-50 dark:bg-gray-900 
          text-gray-900 dark:text-gray-100
          border border-gray-300 dark:border-gray-700
          rounded-lg resize-none overflow-auto
          focus:outline-none focus:ring-2 focus:ring-blue-500
          disabled:opacity-50 disabled:cursor-not-allowed
          ${readOnly ? 'cursor-default' : ''}
        `}
        style={{
          minHeight: `${minHeight}px`,
          maxHeight: `${maxHeight}px`,
          tabSize: 2,
        }}
        {...props}
      />
      {language && (
        <div className="absolute top-2 right-2 text-xs text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
          {language}
        </div>
      )}
    </div>
  );
};
