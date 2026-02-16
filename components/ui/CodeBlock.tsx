import React, { useState } from 'react';

export interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'text',
  filename,
  showLineNumbers = false,
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split('\n');

  return (
    <div className={`rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          {filename && (
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {filename}
            </span>
          )}
          {language && !filename && (
            <span className="text-xs px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
              {language}
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="px-3 py-1 text-xs rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition-colors"
          aria-label="Copy code"
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>

      {/* Code Content */}
      <div className="relative">
        <pre className="overflow-x-auto p-4 bg-gray-50 dark:bg-gray-900">
          <code className="text-sm font-mono text-gray-800 dark:text-gray-200">
            {showLineNumbers ? (
              <table className="w-full border-collapse">
                <tbody>
                  {lines.map((line, index) => (
                    <tr key={index}>
                      <td className="pr-4 text-right text-gray-500 dark:text-gray-500 select-none w-8">
                        {index + 1}
                      </td>
                      <td>{line || '\n'}</td>
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
    </div>
  );
};
