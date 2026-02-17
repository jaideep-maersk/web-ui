import React, { useState, useRef, useEffect } from 'react';

export interface Model {
  id: string;
  name: string;
  provider?: string;
  description?: string;
  icon?: string;
}

interface ModelSelectorProps {
  models: Model[];
  selected?: string;
  onSelect: (modelId: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({
  models,
  selected,
  onSelect,
  placeholder = 'Select a model',
  disabled = false,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedModel = models.find((m) => m.id === selected);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (modelId: string) => {
    onSelect(modelId);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Select model"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {selectedModel?.icon && <span className="text-lg">{selectedModel.icon}</span>}
          <div className="flex flex-col items-start min-w-0">
            <span className="text-sm font-medium truncate">
              {selectedModel?.name || placeholder}
            </span>
            {selectedModel?.provider && (
              <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {selectedModel.provider}
              </span>
            )}
          </div>
        </div>
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {models.length === 0 ? (
            <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
              No models available
            </div>
          ) : (
            <ul role="listbox" className="py-1">
              {models.map((model) => (
                <li key={model.id} role="option" aria-selected={model.id === selected}>
                  <button
                    onClick={() => handleSelect(model.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                      model.id === selected ? 'bg-gray-50 dark:bg-gray-700/50' : ''
                    }`}
                  >
                    {model.icon && <span className="text-lg">{model.icon}</span>}
                    <div className="flex-1 text-left min-w-0">
                      <div className="text-sm font-medium truncate">{model.name}</div>
                      {model.provider && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {model.provider}
                        </div>
                      )}
                      {model.description && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {model.description}
                        </div>
                      )}
                    </div>
                    {model.id === selected && (
                      <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
