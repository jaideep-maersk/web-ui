import React, { TextareaHTMLAttributes, useId } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  resize?: boolean;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helperText,
  resize = true,
  className = '',
  id,
  ...props
}) => {
  const generatedId = useId();
  const textareaId = id || generatedId;
  
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
        </label>
      )}
      
      <textarea
        id={textareaId}
        className={`
          w-full px-4 py-2
          bg-white dark:bg-gray-900
          border ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}
          rounded-lg
          focus:outline-none focus:ring-2 focus:ring-blue-500
          disabled:opacity-50 disabled:cursor-not-allowed
          ${!resize ? 'resize-none' : ''}
          ${className}
        `}
        {...props}
      />
      
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helperText}</p>
      )}
    </div>
  );
};
