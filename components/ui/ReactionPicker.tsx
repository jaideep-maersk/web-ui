import React, { useState } from 'react';

export interface ReactionPickerProps {
  onSelect: (emoji: string) => void;
  onClose?: () => void;
  position?: 'top' | 'bottom';
  customEmojis?: string[];
  className?: string;
}

const DEFAULT_EMOJIS = [
  '👍', '❤️', '😂', '😮', '😢', '🙏',
  '🎉', '🔥', '👏', '✅', '💯', '🚀',
];

export const ReactionPicker: React.FC<ReactionPickerProps> = ({
  onSelect,
  onClose,
  position = 'top',
  customEmojis,
  className = '',
}) => {
  const emojis = customEmojis || DEFAULT_EMOJIS;
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSelect = (emoji: string) => {
    onSelect(emoji);
    onClose?.();
  };
  
  const filteredEmojis = searchQuery
    ? emojis.filter((emoji) => emoji.includes(searchQuery))
    : emojis;
  
  const positionClass = position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2';
  
  return (
    <div className={`absolute ${positionClass} left-0 z-50 ${className}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-3 min-w-[280px]">
        {/* Search Input */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search reactions..."
          className="w-full px-3 py-2 mb-3 text-sm rounded-md bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoFocus
        />
        
        {/* Emoji Grid */}
        <div className="grid grid-cols-6 gap-2 max-h-48 overflow-y-auto">
          {filteredEmojis.map((emoji, index) => (
            <button
              key={index}
              onClick={() => handleSelect(emoji)}
              className="w-10 h-10 flex items-center justify-center text-2xl rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label={`React with ${emoji}`}
            >
              {emoji}
            </button>
          ))}
        </div>
        
        {filteredEmojis.length === 0 && (
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 py-4">
            No reactions found
          </div>
        )}
        
        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="w-full mt-3 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};
