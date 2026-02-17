import React from 'react';

interface ChatImportProps {
  onImport: (data: any) => void;
  acceptedFormats?: string[];
  maxSizeBytes?: number;
  disabled?: boolean;
  className?: string;
}

export const ChatImport: React.FC<ChatImportProps> = ({
  onImport,
  acceptedFormats = ['.json', '.txt', '.md', '.csv'],
  maxSizeBytes = 10 * 1024 * 1024, // 10MB
  disabled = false,
  className = '',
}) => {
  const [importing, setImporting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [preview, setPreview] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);
    setPreview(null);

    // Validate file size
    if (file.size > maxSizeBytes) {
      setError(`File too large. Maximum size: ${(maxSizeBytes / 1024 / 1024).toFixed(1)}MB`);
      return;
    }

    // Validate file type
    const extension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!acceptedFormats.includes(extension)) {
      setError(`Unsupported format. Accepted: ${acceptedFormats.join(', ')}`);
      return;
    }

    setImporting(true);

    try {
      const text = await file.text();
      setPreview(text.substring(0, 500) + (text.length > 500 ? '...' : ''));

      // Parse based on file type
      let data;
      if (extension === '.json') {
        data = JSON.parse(text);
      } else {
        data = text;
      }

      onImport(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to import file');
    } finally {
      setImporting(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className={`chat-import ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedFormats.join(',')}
        onChange={handleFileSelect}
        disabled={disabled || importing}
        className="hidden"
        aria-label="Import file"
      />
      
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={disabled || importing}
        className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg transition-colors flex items-center gap-2"
      >
        <span>📥</span>
        {importing ? 'Importing...' : 'Import'}
      </button>

      {error && (
        <div className="mt-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="text-sm text-red-800 dark:text-red-200">{error}</div>
        </div>
      )}

      {preview && !error && (
        <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
          <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
            Preview:
          </div>
          <div className="text-sm text-gray-900 dark:text-white font-mono whitespace-pre-wrap overflow-hidden">
            {preview}
          </div>
        </div>
      )}
    </div>
  );
};
