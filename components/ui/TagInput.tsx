import React, { useState, useRef, useEffect } from 'react';

export interface TagInputProps {
  suggestionTags?: Array<{ name: string }>;
  disabled?: boolean;
  onAdd?: (tagName: string) => void;
  placeholder?: string;
  className?: string;
}

export const TagInput: React.FC<TagInputProps> = ({
  suggestionTags = [],
  disabled = false,
  onAdd,
  placeholder = 'Add Tag',
  className = '',
}) => {
  const [showInput, setShowInput] = useState(false);
  const [tagName, setTagName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput]);

  const addTagHandler = () => {
    const trimmedTag = tagName.trim();
    if (trimmedTag !== '') {
      onAdd?.(trimmedTag);
      setTagName('');
    }
  };

  const openInput = () => {
    setShowInput(true);
  };

  const closeInput = () => {
    if (tagName.trim() === '') {
      setShowInput(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      addTagHandler();
    } else if (e.key === 'Escape') {
      setTagName('');
      setShowInput(false);
    }
  };

  if (disabled) {
    return null;
  }

  if (showInput) {
    return (
      <>
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-200/80 dark:bg-gray-700 ${className}`}>
          <span className="text-gray-500 dark:text-blue-400">+</span>
          <input
            ref={inputRef}
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            className="w-20 text-sm bg-transparent outline-none text-gray-700 dark:text-blue-400 placeholder:text-gray-400 dark:placeholder:text-blue-400/50"
            placeholder={placeholder}
            aria-label="Add a tag"
            list={suggestionTags.length > 0 ? 'tagOptions' : undefined}
            onKeyDown={handleKeyDown}
            onBlur={closeInput}
          />
        </div>
        {suggestionTags.length > 0 && (
          <datalist id="tagOptions">
            {suggestionTags.map((tag, index) => (
              <option key={tag.name || index} value={tag.name} />
            ))}
          </datalist>
        )}
      </>
    );
  }

  return (
    <button
      type="button"
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-200/80 dark:bg-gray-700 text-gray-500 dark:text-blue-400 text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors ${className}`}
      onClick={openInput}
    >
      <span>+</span>
      <span>{placeholder}</span>
    </button>
  );
};
