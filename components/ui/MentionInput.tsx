import React, { useState, useRef, useEffect } from 'react';

export interface MentionOption {
  id: string;
  name: string;
  avatar?: string;
}

export interface MentionInputProps {
  value: string;
  onChange: (value: string) => void;
  onMention?: (mention: MentionOption) => void;
  suggestions?: MentionOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export const MentionInput: React.FC<MentionInputProps> = ({
  value,
  onChange,
  onMention,
  suggestions = [],
  placeholder = 'Type @ to mention someone...',
  disabled = false,
  className = '',
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<MentionOption[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mentionQuery, setMentionQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Check for @ symbol and filter suggestions
    const lastAtIndex = value.lastIndexOf('@');
    if (lastAtIndex !== -1) {
      const query = value.slice(lastAtIndex + 1);
      const filtered = suggestions.filter(s =>
        s.name.toLowerCase().includes(query.toLowerCase())
      );
      setMentionQuery(query);
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0 && query.length >= 0);
    } else {
      setShowSuggestions(false);
    }
  }, [value, suggestions]);

  const handleSelectMention = (mention: MentionOption) => {
    const lastAtIndex = value.lastIndexOf('@');
    const newValue = value.slice(0, lastAtIndex) + `@${mention.name} `;
    onChange(newValue);
    onMention?.(mention);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % filteredSuggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredSuggestions.length) % filteredSuggestions.length);
    } else if (e.key === 'Enter' && filteredSuggestions[selectedIndex]) {
      e.preventDefault();
      handleSelectMention(filteredSuggestions[selectedIndex]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      />
      
      {showSuggestions && (
        <div className="absolute z-10 mt-1 w-full max-h-60 overflow-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          {filteredSuggestions.map((suggestion, index) => (
            <button
              key={suggestion.id}
              onClick={() => handleSelectMention(suggestion)}
              className={`w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                index === selectedIndex ? 'bg-gray-100 dark:bg-gray-700' : ''
              }`}
            >
              {suggestion.avatar ? (
                <img src={suggestion.avatar} alt="" className="w-6 h-6 rounded-full" />
              ) : (
                <div className="w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-xs">
                  {suggestion.name.charAt(0).toUpperCase()}
                </div>
              )}
              <span className="text-gray-900 dark:text-gray-100">{suggestion.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
