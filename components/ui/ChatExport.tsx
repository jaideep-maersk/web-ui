import React from 'react';

export type ExportFormat = 'json' | 'txt' | 'md' | 'csv';

interface ChatExportProps {
  onExport: (format: ExportFormat) => void;
  disabled?: boolean;
  className?: string;
}

export const ChatExport: React.FC<ChatExportProps> = ({
  onExport,
  disabled = false,
  className = '',
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [exporting, setExporting] = React.useState(false);

  const formats: { value: ExportFormat; label: string; description: string }[] = [
    { value: 'json', label: 'JSON', description: 'Machine-readable format' },
    { value: 'txt', label: 'Plain Text', description: 'Simple text file' },
    { value: 'md', label: 'Markdown', description: 'Formatted markdown' },
    { value: 'csv', label: 'CSV', description: 'Spreadsheet format' },
  ];

  const handleExport = async (format: ExportFormat) => {
    setExporting(true);
    setIsOpen(false);
    try {
      await onExport(format);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className={`chat-export relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled || exporting}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors flex items-center gap-2"
        aria-label="Export chat"
      >
        <span>📤</span>
        {exporting ? 'Exporting...' : 'Export'}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-20">
            <div className="p-2">
              <div className="text-sm font-semibold text-gray-900 dark:text-white px-3 py-2">
                Export Format
              </div>
              {formats.map((format) => (
                <button
                  key={format.value}
                  onClick={() => handleExport(format.value)}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                >
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {format.label}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {format.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
