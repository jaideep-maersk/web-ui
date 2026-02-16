import React, { useState, useRef, useEffect } from 'react';

interface SelectorOption {
  value: string;
  label: string;
}

interface SelectorProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectorOption[];
  placeholder?: string;
  searchEnabled?: boolean;
  searchPlaceholder?: string;
  className?: string;
}

export const Selector: React.FC<SelectorProps> = ({
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  searchEnabled = true,
  searchPlaceholder = 'Search...',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const selectedOption = options.find((opt) => opt.value === value);
  
  const filteredOptions = searchValue
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(searchValue.toLowerCase()) ||
        opt.value.toLowerCase().includes(searchValue.toLowerCase())
      )
    : options;
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchValue('');
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const handleSelect = (option: SelectorOption) => {
    onChange(option.value);
    setIsOpen(false);
    setSearchValue('');
  };
  
  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-full inline-flex h-10 px-2 bg-transparent truncate text-lg font-semibold focus:outline-none"
      >
        <span className="truncate">{selectedOption?.label || placeholder}</span>
        <svg
          className={`absolute end-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {/* Dropdown */}
      {isOpen && (
        <div className="absolute w-full mt-1 rounded-lg bg-white dark:bg-gray-900 dark:text-white shadow-lg border border-gray-300/30 dark:border-gray-700/40 z-50">
          {searchEnabled && (
            <>
              <div className="flex items-center gap-2.5 px-5 mt-3.5 mb-3">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-full text-sm bg-transparent outline-none"
                  placeholder={searchPlaceholder}
                />
              </div>
              <hr className="border-gray-100/30 dark:border-gray-850/30" />
            </>
          )}
          
          <div className="px-3 my-2 max-h-80 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option)}
                  className={`
                    flex w-full font-medium line-clamp-1 select-none items-center
                    rounded-lg py-2 pl-3 pr-1.5 text-sm text-gray-700 dark:text-gray-100
                    outline-none transition-all duration-75
                    hover:bg-gray-100 dark:hover:bg-gray-850 cursor-pointer
                    ${value === option.value ? 'bg-blue-50 dark:bg-blue-900/20' : ''}
                  `}
                >
                  {option.label}
                  {value === option.value && (
                    <div className="ml-auto">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </button>
              ))
            ) : (
              <div className="block px-5 py-2 text-sm text-gray-700 dark:text-gray-100">
                No results found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
