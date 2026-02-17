import React, { useState } from 'react';

interface EmojiOption {
  shortCode: string;
  category: string;
}

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
  className?: string;
}

const emojiCategories = {
  Smileys: [
    { shortCode: ':smile:', emoji: '😄' },
    { shortCode: ':grin:', emoji: '😁' },
    { shortCode: ':joy:', emoji: '😂' },
    { shortCode: ':heart_eyes:', emoji: '😍' },
    { shortCode: ':thinking:', emoji: '🤔' },
    { shortCode: ':wink:', emoji: '😉' },
  ],
  Symbols: [
    { shortCode: ':heart:', emoji: '❤️' },
    { shortCode: ':star:', emoji: '⭐' },
    { shortCode: ':fire:', emoji: '🔥' },
    { shortCode: ':thumbsup:', emoji: '👍' },
    { shortCode: ':check:', emoji: '✅' },
    { shortCode: ':warning:', emoji: '⚠️' },
  ],
};

export const EmojiPicker: React.FC<EmojiPickerProps> = ({
  onSelect,
  className = '',
}) => {
  const [activeCategory, setActiveCategory] = useState('Smileys');
  
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 ${className}`}>
      {/* Category Tabs */}
      <div className="flex gap-2 mb-4 border-b border-gray-200 dark:border-gray-700">
        {Object.keys(emojiCategories).map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={`
              px-3 py-2 text-sm font-medium transition-colors
              ${activeCategory === category
                ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }
            `}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* Emoji Grid */}
      <div className="grid grid-cols-6 gap-2 max-h-48 overflow-y-auto">
        {emojiCategories[activeCategory as keyof typeof emojiCategories]?.map((item) => (
          <button
            key={item.shortCode}
            type="button"
            onClick={() => onSelect(item.emoji)}
            className="
              p-2 text-2xl hover:bg-gray-100 dark:hover:bg-gray-700
              rounded transition-colors
            "
            title={item.shortCode}
          >
            {item.emoji}
          </button>
        ))}
      </div>
    </div>
  );
};
