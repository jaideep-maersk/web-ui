import React from 'react';

interface EmojiProps {
  shortCode: string;
  className?: string;
  baseUrl?: string;
}

export const Emoji: React.FC<EmojiProps> = ({
  shortCode,
  className = 'w-4 h-4',
  baseUrl = '/assets/emojis',
}) => {
  // Simple emoji mapping - in production this would be more comprehensive
  const emojiMap: Record<string, string> = {
    ':smile:': '1f604',
    ':heart:': '2764',
    ':thumbsup:': '1f44d',
    ':fire:': '1f525',
    ':star:': '2b50',
    ':check:': '2705',
    ':warning:': '26a0',
    ':error:': '274c',
  };
  
  const emojiCode = emojiMap[shortCode];
  
  if (emojiCode) {
    return (
      <img
        src={`${baseUrl}/${emojiCode}.svg`}
        alt={shortCode}
        className={className}
        loading="lazy"
      />
    );
  }
  
  return <span>{shortCode}</span>;
};
