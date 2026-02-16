import React from 'react';
import { TagItem, Tag } from './TagItem';

export interface TagListProps {
  tags: Tag[];
  disabled?: boolean;
  onDelete?: (tagName: string) => void;
  className?: string;
}

export const TagList: React.FC<TagListProps> = ({
  tags,
  disabled = false,
  onDelete,
  className = '',
}) => {
  return (
    <>
      {tags.map((tag, index) => (
        <TagItem
          key={tag.id || tag.name || index}
          tag={tag}
          disabled={disabled}
          onDelete={() => onDelete?.(tag.name)}
          className={className}
        />
      ))}
    </>
  );
};
