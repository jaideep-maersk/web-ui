import React from 'react';

export interface InputHelperProps {
  text?: string;
  show?: boolean;
  className?: string;
}

export const InputHelper: React.FC<InputHelperProps> = ({
  text,
  show = true,
  className = '',
}) => {
  if (!show || !text) return null;

  return (
    <div
      className={`mt-1 text-sm text-gray-500 dark:text-gray-400 ${className}`}
      id="input-helper"
    >
      {text}
    </div>
  );
};

export default InputHelper;
