import React, { useState, useRef, useEffect } from 'react';

export interface DropdownOption {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  danger?: boolean;
  divider?: boolean;
}

interface DropdownOptionsProps {
  trigger: React.ReactNode;
  options: DropdownOption[];
  onSelect: (id: string) => void;
  position?: 'left' | 'right';
  className?: string;
}

export const DropdownOptions: React.FC<DropdownOptionsProps> = ({
  trigger,
  options,
  onSelect,
  position = 'right',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleSelect = (option: DropdownOption) => {
    if (option.disabled || option.divider) return;
    onSelect(option.id);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative inline-block ${className}`}>
      {/* Trigger */}
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`
            absolute z-50 mt-2 min-w-[200px] py-1
            bg-white dark:bg-gray-800
            border border-gray-200 dark:border-gray-700
            rounded-lg shadow-lg
            ${position === 'right' ? 'right-0' : 'left-0'}
          `}
        >
          {options.map((option, index) => {
            if (option.divider) {
              return (
                <div
                  key={`divider-${index}`}
                  className="h-px bg-gray-200 dark:bg-gray-700 my-1"
                />
              );
            }

            return (
              <button
                key={option.id}
                onClick={() => handleSelect(option)}
                disabled={option.disabled}
                className={`
                  w-full flex items-center gap-2 px-4 py-2 text-left text-sm
                  transition-colors
                  ${
                    option.disabled
                      ? 'opacity-50 cursor-not-allowed'
                      : option.danger
                      ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }
                `}
              >
                {option.icon && <span className="flex-shrink-0">{option.icon}</span>}
                <span className="flex-1">{option.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
