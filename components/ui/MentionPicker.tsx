import React, { useState, useEffect, useRef } from 'react';

export interface MentionOption {
  id: string;
  name: string;
  avatar?: string;
  role?: string;
}

export interface MentionPickerProps {
  isOpen: boolean;
  options: MentionOption[];
  onSelect: (option: MentionOption) => void;
  onClose: () => void;
  searchTerm?: string;
  position?: { top: number; left: number };
}

export const MentionPicker: React.FC<MentionPickerProps> = ({
  isOpen,
  options,
  onSelect,
  onClose,
  searchTerm = '',
  position,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const pickerRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter(option =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [searchTerm, options]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : 0);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredOptions[selectedIndex]) {
          onSelect(filteredOptions[selectedIndex]);
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredOptions, onSelect, onClose]);

  if (!isOpen || filteredOptions.length === 0) return null;

  const positionStyle = position
    ? { top: `${position.top}px`, left: `${position.left}px` }
    : {};

  return (
    <div
      ref={pickerRef}
      className="absolute z-50 w-64 bg-white dark:bg-gray-800 border border-gray-200 
        dark:border-gray-700 rounded-lg shadow-lg overflow-hidden"
      style={positionStyle}
    >
      <div className="max-h-64 overflow-y-auto">
        {filteredOptions.map((option, index) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onSelect(option)}
            className={`w-full flex items-center gap-3 px-4 py-2 text-left transition-colors
              ${index === selectedIndex
                ? 'bg-blue-50 dark:bg-blue-900/20'
                : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
              }`}
          >
            {option.avatar ? (
              <img
                src={option.avatar}
                alt={option.name}
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 
                flex items-center justify-center text-sm font-medium text-gray-700 dark:text-gray-300">
                {option.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {option.name}
              </p>
              {option.role && (
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {option.role}
                </p>
              )}
            </div>
          </button>
        ))}
      </div>
      <div className="px-4 py-2 text-xs text-gray-500 dark:text-gray-400 border-t 
        border-gray-200 dark:border-gray-700">
        ↑↓ to navigate, ↵ to select, Esc to close
      </div>
    </div>
  );
};
