import React, { useState } from 'react';

interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-8 h-4',
  md: 'w-11 h-6',
  lg: 'w-14 h-7',
};

const dotSizeClasses = {
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
};

const translateClasses = {
  sm: 'translate-x-4',
  md: 'translate-x-5',
  lg: 'translate-x-7',
};

export const Switch: React.FC<SwitchProps> = ({
  checked: controlledChecked,
  onChange,
  disabled = false,
  size = 'md',
  className = '',
}) => {
  const [internalChecked, setInternalChecked] = useState(false);
  
  const checked = controlledChecked !== undefined ? controlledChecked : internalChecked;
  
  const handleToggle = () => {
    if (disabled) return;
    
    const newValue = !checked;
    setInternalChecked(newValue);
    onChange?.(newValue);
  };
  
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={handleToggle}
      className={`
        relative inline-flex flex-shrink-0 cursor-pointer rounded-full
        border-2 border-transparent transition-colors duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${sizeClasses[size]}
        ${checked ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      <span className="sr-only">Toggle switch</span>
      <span
        aria-hidden="true"
        className={`
          ${dotSizeClasses[size]}
          pointer-events-none inline-block rounded-full bg-white shadow
          transform ring-0 transition duration-200 ease-in-out
          ${checked ? translateClasses[size] : 'translate-x-0'}
        `}
      />
    </button>
  );
};
