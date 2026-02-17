import React from 'react';

export interface FormatButtonsProps {
  onFormat: (format: string) => void;
  activeFormats?: string[];
  disabled?: boolean;
  showBold?: boolean;
  showItalic?: boolean;
  showUnderline?: boolean;
  showStrikethrough?: boolean;
  showCode?: boolean;
  showLink?: boolean;
  className?: string;
}

export const FormatButtons: React.FC<FormatButtonsProps> = ({
  onFormat,
  activeFormats = [],
  disabled = false,
  showBold = true,
  showItalic = true,
  showUnderline = true,
  showStrikethrough = true,
  showCode = true,
  showLink = true,
  className = '',
}) => {
  const isActive = (format: string) => activeFormats.includes(format);

  const buttonClass = (format: string) => `
    p-2 rounded transition-colors
    ${isActive(format)
      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
    }
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {showBold && (
        <button
          onClick={() => onFormat('bold')}
          disabled={disabled}
          className={buttonClass('bold')}
          aria-label="Bold"
          aria-pressed={isActive('bold')}
          title="Bold (Ctrl+B)"
        >
          <span className="font-bold">B</span>
        </button>
      )}
      
      {showItalic && (
        <button
          onClick={() => onFormat('italic')}
          disabled={disabled}
          className={buttonClass('italic')}
          aria-label="Italic"
          aria-pressed={isActive('italic')}
          title="Italic (Ctrl+I)"
        >
          <span className="italic">I</span>
        </button>
      )}
      
      {showUnderline && (
        <button
          onClick={() => onFormat('underline')}
          disabled={disabled}
          className={buttonClass('underline')}
          aria-label="Underline"
          aria-pressed={isActive('underline')}
          title="Underline (Ctrl+U)"
        >
          <span className="underline">U</span>
        </button>
      )}
      
      {showStrikethrough && (
        <button
          onClick={() => onFormat('strikethrough')}
          disabled={disabled}
          className={buttonClass('strikethrough')}
          aria-label="Strikethrough"
          aria-pressed={isActive('strikethrough')}
          title="Strikethrough"
        >
          <span className="line-through">S</span>
        </button>
      )}
      
      {showCode && (
        <button
          onClick={() => onFormat('code')}
          disabled={disabled}
          className={buttonClass('code')}
          aria-label="Code"
          aria-pressed={isActive('code')}
          title="Code (Ctrl+`)"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </button>
      )}
      
      {showLink && (
        <button
          onClick={() => onFormat('link')}
          disabled={disabled}
          className={buttonClass('link')}
          aria-label="Insert link"
          aria-pressed={isActive('link')}
          title="Insert link (Ctrl+K)"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </button>
      )}
    </div>
  );
};
