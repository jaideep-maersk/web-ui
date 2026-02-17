import React, { useState } from 'react';

export interface EmojiSelectorProps {
  onSelect?: (emoji: string) => void;
  onClose?: () => void;
  categories?: string[];
  recentEmojis?: string[];
  maxRecent?: number;
  className?: string;
}

const defaultEmojis = {
  'Smileys': ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚'],
  'Gestures': ['👍', '👎', '👊', '✊', '🤛', '🤜', '🤞', '✌️', '🤟', '🤘', '👌', '🤌', '🤏', '👈', '👉', '👆', '👇', '☝️', '✋', '🤚'],
  'Objects': ['💼', '📁', '📂', '📅', '📆', '📇', '📈', '📉', '📊', '📋', '📌', '📍', '📎', '📏', '📐', '✏️', '✒️', '🖊️', '🖋️', '📝'],
  'Symbols': ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '✨', '⭐'],
};

export const EmojiSelector: React.FC<EmojiSelectorProps> = ({
  onSelect,
  onClose,
  categories = ['Smileys', 'Gestures', 'Objects', 'Symbols'],
  recentEmojis = [],
  maxRecent = 10,
  className = '',
}) => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [search, setSearch] = useState('');

  const handleEmojiClick = (emoji: string) => {
    onSelect?.(emoji);
    onClose?.();
  };

  const filteredEmojis = search
    ? Object.values(defaultEmojis).flat().filter((emoji) => emoji.includes(search))
    : defaultEmojis[activeCategory as keyof typeof defaultEmojis] || [];

  return (
    <div className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg ${className}`}>
      {/* Header */}
      <div className="p-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            Emoji Selector
          </h3>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              aria-label="Close"
            >
              ✕
            </button>
          )}
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search emoji..."
          className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Recent Emojis */}
      {!search && recentEmojis.length > 0 && (
        <div className="p-3 border-b border-gray-200 dark:border-gray-700">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
            Recently Used
          </p>
          <div className="grid grid-cols-8 gap-1">
            {recentEmojis.slice(0, maxRecent).map((emoji, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleEmojiClick(emoji)}
                className="p-2 text-2xl hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                title={emoji}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Category Tabs */}
      {!search && (
        <div className="flex gap-1 p-2 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                activeCategory === category
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Emoji Grid */}
      <div className="p-3 h-64 overflow-y-auto">
        <div className="grid grid-cols-8 gap-1">
          {filteredEmojis.map((emoji, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleEmojiClick(emoji)}
              className="p-2 text-2xl hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
              title={emoji}
            >
              {emoji}
            </button>
          ))}
        </div>
        {filteredEmojis.length === 0 && (
          <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-500 text-sm">
            No emojis found
          </div>
        )}
      </div>
    </div>
  );
};

export default EmojiSelector;
