import React from 'react';

interface SyntaxHighlighterProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  theme?: 'light' | 'dark';
  className?: string;
  onCopy?: () => void;
}

export const SyntaxHighlighter: React.FC<SyntaxHighlighterProps> = ({
  code,
  language = 'javascript',
  showLineNumbers = false,
  theme = 'dark',
  className = '',
  onCopy,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      onCopy?.();
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const lines = code.split('\n');

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center justify-between px-4 py-2 bg-gray-700 dark:bg-gray-800 rounded-t-lg">
        <span className="text-xs text-gray-300 font-mono">{language}</span>
        <button
          onClick={handleCopy}
          className="px-2 py-1 text-xs bg-gray-600 hover:bg-gray-500 text-white rounded transition-colors"
          aria-label="Copy code"
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <pre
        className={`p-4 overflow-x-auto rounded-b-lg ${
          theme === 'dark'
            ? 'bg-gray-800 text-gray-100'
            : 'bg-gray-100 text-gray-900'
        }`}
      >
        <code className="font-mono text-sm">
          {showLineNumbers ? (
            <table className="w-full">
              <tbody>
                {lines.map((line, i) => (
                  <tr key={i}>
                    <td className="pr-4 text-gray-500 select-none text-right" style={{ width: '1%' }}>
                      {i + 1}
                    </td>
                    <td>{line || ' '}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            code
          )}
        </code>
      </pre>
    </div>
  );
};
