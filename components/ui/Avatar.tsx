import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
  xl: 'w-16 h-16 text-xl',
};

const getInitials = (name: string): string => {
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  name,
  size = 'md',
  className = '',
}) => {
  const [imageError, setImageError] = React.useState(false);
  
  const showInitials = !src || imageError;
  const initials = name ? getInitials(name) : '?';
  
  return (
    <div
      className={`
        ${sizeClasses[size]}
        rounded-full overflow-hidden
        flex items-center justify-center
        bg-gradient-to-br from-blue-500 to-purple-600
        text-white font-medium
        ${className}
      `}
    >
      {showInitials ? (
        <span>{initials}</span>
      ) : (
        <img
          src={src}
          alt={alt || name || 'Avatar'}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
};
