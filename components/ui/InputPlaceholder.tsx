import React from 'react';

export interface InputPlaceholderProps {
  text: string;
  show?: boolean;
  animated?: boolean;
  className?: string;
}

export const InputPlaceholder: React.FC<InputPlaceholderProps> = ({
  text,
  show = true,
  animated = false,
  className = '',
}) => {
  if (!show) return null;

  return (
    <div
      className={`
        absolute inset-0 px-4 py-3 pointer-events-none
        text-gray-400 dark:text-gray-500
        ${animated ? 'transition-opacity duration-200' : ''}
        ${className}
      `}
      aria-hidden="true"
    >
      {text}
    </div>
  );
};

export default InputPlaceholder;
