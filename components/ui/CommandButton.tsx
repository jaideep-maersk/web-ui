import React from 'react';

export interface CommandButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onCommand?: () => void;
  disabled?: boolean;
  hasCommands?: boolean;
}

export const CommandButton: React.FC<CommandButtonProps> = ({
  onCommand,
  disabled = false,
  hasCommands = true,
  className = '',
  ...props
}) => {
  return (
    <button
      type="button"
      onClick={onCommand}
      disabled={disabled || !hasCommands}
      className={`inline-flex items-center justify-center p-2 rounded-lg transition-colors
        ${disabled || !hasCommands
          ? 'text-gray-400 cursor-not-allowed' 
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
        }
        ${className}`}
      aria-label="Open command menu"
      title="Commands (/)"
      {...props}
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
        />
      </svg>
    </button>
  );
};
