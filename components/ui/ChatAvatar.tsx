import React from 'react';

export interface ChatAvatarProps {
  src?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  isBot?: boolean;
  status?: 'online' | 'offline' | 'away';
  className?: string;
}

export const ChatAvatar: React.FC<ChatAvatarProps> = ({
  src,
  name = '',
  size = 'md',
  isBot = false,
  status,
  className = '',
}) => {
  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    away: 'bg-yellow-500',
  };

  return (
    <div className={`relative ${className}`}>
      <div
        className={`${sizeClasses[size]} rounded-full flex items-center justify-center
                   overflow-hidden bg-gray-200 dark:bg-gray-700
                   ${isBot ? 'bg-gradient-to-br from-purple-500 to-blue-500' : ''}
                   text-white font-semibold`}
      >
        {src ? (
          <img src={src} alt={name} className="w-full h-full object-cover" />
        ) : isBot ? (
          <svg className="w-3/5 h-3/5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" />
          </svg>
        ) : (
          <span>{getInitials(name)}</span>
        )}
      </div>

      {status && (
        <div
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-900 ${statusColors[status]}`}
        ></div>
      )}
    </div>
  );
};
