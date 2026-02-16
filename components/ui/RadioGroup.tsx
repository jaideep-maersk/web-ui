import React, { useState, useId } from 'react';

interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  label?: string;
  className?: string;
  disabled?: boolean;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  value: controlledValue,
  onChange,
  name: providedName,
  label,
  className = '',
  disabled = false,
}) => {
  const [internalValue, setInternalValue] = useState('');
  const generatedId = useId();
  const groupName = providedName || `radio-group-${generatedId}`;
  
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  
  const handleChange = (optionValue: string) => {
    if (disabled) return;
    setInternalValue(optionValue);
    onChange?.(optionValue);
  };
  
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      
      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option.value}
            className={`
              flex items-start p-3 rounded-lg border border-gray-200 dark:border-gray-700
              cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors
              ${value === option.value ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-600' : ''}
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            <input
              type="radio"
              name={groupName}
              value={option.value}
              checked={value === option.value}
              onChange={() => handleChange(option.value)}
              disabled={disabled}
              className="mt-0.5 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600"
            />
            <div className="ml-3">
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {option.label}
              </span>
              {option.description && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {option.description}
                </p>
              )}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};
