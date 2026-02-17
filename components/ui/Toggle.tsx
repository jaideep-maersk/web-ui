import React, { useState } from 'react';

interface ToggleProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  className?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  checked: controlledChecked,
  onChange,
  disabled = false,
  label,
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
    <label className={`inline-flex items-center cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={handleToggle}
          disabled={disabled}
          className="sr-only"
        />
        <div
          className={`
            block w-11 h-6 rounded-full transition-colors
            ${checked ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}
          `}
        />
        <div
          className={`
            absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform
            ${checked ? 'translate-x-5' : 'translate-x-0'}
          `}
        />
      </div>
      {label && (
        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          {label}
        </span>
      )}
    </label>
  );
};
