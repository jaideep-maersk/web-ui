import React from 'react';

export interface FormattingButtonsProps {
  onFormat: (format: string, value?: string) => void;
  disabled?: boolean;
  className?: string;
}

export const FormattingButtons: React.FC<FormattingButtonsProps> = ({
  onFormat,
  disabled = false,
  className = '',
}) => {
  const buttons = [
    { icon: 'B', title: 'Bold', format: 'bold', style: 'font-bold' },
    { icon: 'I', title: 'Italic', format: 'italic', style: 'italic' },
    { icon: 'U', title: 'Underline', format: 'underline', style: 'underline' },
    { icon: 'S', title: 'Strikethrough', format: 'strikethrough', style: 'line-through' },
    { icon: 'Code', title: 'Code', format: 'code' },
    { icon: 'H1', title: 'Heading 1', format: 'h1' },
    { icon: 'H2', title: 'Heading 2', format: 'h2' },
    { icon: '•', title: 'Bullet List', format: 'ul' },
    { icon: '1.', title: 'Numbered List', format: 'ol' },
    { icon: '"', title: 'Quote', format: 'quote' },
    { icon: '🔗', title: 'Link', format: 'link' },
  ];

  return (
    <div className={`flex flex-wrap gap-1 p-2 bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600 ${className}`}>
      {buttons.map((btn) => (
        <button
          key={btn.format}
          type="button"
          onClick={() => onFormat(btn.format)}
          disabled={disabled}
          title={btn.title}
          className={`px-2 py-1 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
            btn.style || ''
          }`}
        >
          {btn.icon}
        </button>
      ))}
    </div>
  );
};
