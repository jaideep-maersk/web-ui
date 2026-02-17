import React, { useState } from 'react';
import { TagList, Tag } from './TagItem';

export interface TagsProps {
  tags: Tag[];
  suggestionTags?: Array<{ name: string }>;
  disabled?: boolean;
  onAdd?: (tagName: string) => void;
  onDelete?: (tagName: string) => void;
  placeholder?: string;
  className?: string;
}

export const Tags: React.FC<TagsProps> = ({
  tags,
  suggestionTags = [],
  disabled = false,
  onAdd,
  onDelete,
  placeholder = 'Add a tag...',
  className = '',
}) => {
  const [inputValue, setInputValue] = useState('');

  const addTag = () => {
    const value = inputValue.trim();
    if (value !== '') {
      onAdd?.(value);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className={`flex flex-wrap items-center gap-1 w-full ${className}`}>
      <TagList tags={tags} disabled={disabled} onDelete={onDelete} />

      {!disabled && (
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className={`flex-1 min-w-24 ${
            tags.length > 0 ? 'px-0.5' : ''
          } text-xs bg-transparent outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500`}
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
        />
      )}
    </div>
  );
};
