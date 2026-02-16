import React, { useState } from 'react';

type CheckboxState = 'unchecked' | 'checked';

interface CheckboxProps {
  state?: CheckboxState;
  indeterminate?: boolean;
  disabled?: boolean;
  onChange?: (state: CheckboxState) => void;
  className?: string;
  disabledClassName?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  state: controlledState,
  indeterminate = false,
  disabled = false,
  onChange,
  className = '',
  disabledClassName = 'opacity-50 cursor-not-allowed',
}) => {
  const [internalState, setInternalState] = useState<CheckboxState>('unchecked');
  
  // Use controlled state if provided, otherwise use internal state
  const state = controlledState !== undefined ? controlledState : internalState;
  
  const handleClick = () => {
    if (disabled) return;
    
    let newState: CheckboxState;
    
    if (state === 'unchecked') {
      newState = 'checked';
      setInternalState(newState);
      onChange?.(newState);
    } else if (state === 'checked') {
      newState = 'unchecked';
      if (!indeterminate) {
        setInternalState(newState);
        onChange?.(newState);
      }
    } else if (indeterminate) {
      newState = 'checked';
      setInternalState(newState);
      onChange?.(newState);
    }
  };
  
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleClick}
      className={`
        outline -outline-offset-1 outline-[1.5px]  outline-gray-200 dark:outline-gray-600
        ${state !== 'unchecked'
          ? 'bg-black outline-black'
          : 'hover:outline-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800'
        }
        text-white transition-all rounded-sm inline-block w-3.5 h-3.5 relative
        ${disabled ? disabledClassName : ''}
        ${className}
      `}
    >
      <div className="top-0 left-0 absolute w-full flex justify-center">
        {state === 'checked' ? (
          <svg
            className="w-3.5 h-3.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="m5 12 4.7 4.5 9.3-9"
            />
          </svg>
        ) : indeterminate ? (
          <svg
            className="w-3 h-3.5 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M5 12h14"
            />
          </svg>
        ) : null}
      </div>
    </button>
  );
};
