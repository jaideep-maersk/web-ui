import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';

export interface AutocompleteOption {
  id: string;
  label: string;
  description?: string;
  icon?: string;
}

export interface AutocompleteMenuProps {
  options: AutocompleteOption[];
  onSelect?: (option: AutocompleteOption) => void;
  onClose?: () => void;
  position?: 'top' | 'bottom';
  maxHeight?: number;
  className?: string;
}

export const AutocompleteMenu: React.FC<AutocompleteMenuProps> = ({
  options,
  onSelect,
  onClose,
  position = 'bottom',
  maxHeight = 300,
  className = '',
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % options.length);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + options.length) % options.length);
          break;
        case 'Enter':
          e.preventDefault();
          if (options[selectedIndex]) {
            onSelect?.(options[selectedIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose?.();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [options, selectedIndex, onSelect, onClose]);

  useEffect(() => {
    // Scroll selected option into view
    if (optionRefs.current[selectedIndex]) {
      optionRefs.current[selectedIndex]?.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    }
  }, [selectedIndex]);

  useEffect(() => {
    // Click outside to close
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose?.();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  if (options.length === 0) return null;

  return (
    <div
      ref={menuRef}
      className={`
        absolute ${position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'}
        left-0 right-0 z-50
        bg-white dark:bg-gray-800
        border border-gray-200 dark:border-gray-700
        rounded-lg shadow-lg
        ${className}
      `}
      style={{ maxHeight: `${maxHeight}px` }}
      role="listbox"
      aria-label="Autocomplete suggestions"
    >
      <div className="overflow-y-auto max-h-full">
        {options.map((option, index) => (
          <div
            key={option.id}
            ref={(el) => (optionRefs.current[index] = el)}
            onClick={() => onSelect?.(option)}
            className={`
              px-4 py-3 cursor-pointer transition-colors
              ${
                index === selectedIndex
                  ? 'bg-blue-50 dark:bg-blue-900/30'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700'
              }
              ${index > 0 ? 'border-t border-gray-100 dark:border-gray-700' : ''}
            `}
            role="option"
            aria-selected={index === selectedIndex}
          >
            <div className="flex items-start gap-3">
              {option.icon && (
                <span className="text-2xl flex-shrink-0">{option.icon}</span>
              )}
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 dark:text-gray-100">
                  {option.label}
                </div>
                {option.description && (
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    {option.description}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutocompleteMenu;
