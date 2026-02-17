import React from 'react';

interface ExportButtonProps {
  onExport: (format: 'txt' | 'json' | 'md' | 'pdf') => void;
  disabled?: boolean;
  formats?: ('txt' | 'json' | 'md' | 'pdf')[];
  className?: string;
}

export const ExportButton: React.FC<ExportButtonProps> = ({
  onExport,
  disabled = false,
  formats = ['txt', 'json', 'md'],
  className = '',
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const formatLabels = {
    txt: 'Plain Text',
    json: 'JSON',
    md: 'Markdown',
    pdf: 'PDF',
  };

  const formatIcons = {
    txt: '📄',
    json: '{ }',
    md: 'MD',
    pdf: '📕',
  };

  if (formats.length === 1) {
    // Single format - direct button
    return (
      <button
        onClick={() => onExport(formats[0])}
        disabled={disabled}
        className={`flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        aria-label="Export chat"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
        <span>Export</span>
      </button>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Export chat"
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
        <span>Export</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg py-1">
          {formats.map((format) => (
            <button
              key={format}
              onClick={() => {
                onExport(format);
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              role="menuitem"
            >
              <span className="text-lg">{formatIcons[format]}</span>
              <span>{formatLabels[format]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
