import React from 'react';

export interface InputErrorProps {
  message?: string;
  show?: boolean;
  className?: string;
}

export const InputError: React.FC<InputErrorProps> = ({
  message,
  show = true,
  className = '',
}) => {
  if (!show || !message) return null;

  return (
    <div
      className={`mt-1 text-sm text-red-600 dark:text-red-400 ${className}`}
      role="alert"
      aria-live="polite"
    >
      <span className="inline-flex items-center gap-1">
        <span aria-hidden="true">⚠️</span>
        {message}
      </span>
    </div>
  );
};

export default InputError;
