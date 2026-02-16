import React from 'react';

export interface Tag {
  name: string;
  id?: string;
}

export interface TagItemProps {
  tag: Tag;
  disabled?: boolean;
  onDelete?: () => void;
  className?: string;
}

export const TagItem: React.FC<TagItemProps> = ({
  tag,
  disabled = false,
  onDelete,
  className = '',
}) => {
  if (!tag) return null;

  const baseClassName =
    'flex items-center gap-1 px-1.5 py-[1px] rounded-full bg-gray-100/50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-300 text-xs font-medium';

  if (disabled) {
    return (
      <span className={`${baseClassName} ${className}`}>
        <span className="line-clamp-1">{tag.name}</span>
      </span>
    );
  }

  return (
    <button
      type="button"
      className={`${baseClassName} hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${className}`}
      onClick={() => onDelete?.()}
      aria-label={`Remove tag ${tag.name}`}
    >
      <span className="line-clamp-1">{tag.name}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2.5}
        stroke="currentColor"
        className="w-3 h-3"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  );
};
