import React from 'react';

export interface TypingUsersProps {
  users: string[];
  maxDisplay?: number;
  showAvatar?: boolean;
  className?: string;
}

export const TypingUsers: React.FC<TypingUsersProps> = ({
  users,
  maxDisplay = 3,
  showAvatar = false,
  className = '',
}) => {
  if (users.length === 0) return null;

  const displayUsers = users.slice(0, maxDisplay);
  const remaining = users.length - maxDisplay;

  const getMessage = () => {
    if (users.length === 1) {
      return `${users[0]} is typing...`;
    } else if (users.length === 2) {
      return `${users[0]} and ${users[1]} are typing...`;
    } else if (users.length === 3 && maxDisplay >= 3) {
      return `${users[0]}, ${users[1]}, and ${users[2]} are typing...`;
    } else {
      const names = displayUsers.join(', ');
      return remaining > 0
        ? `${names}, and ${remaining} other${remaining > 1 ? 's' : ''} are typing...`
        : `${names} are typing...`;
    }
  };

  return (
    <div className={`flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 ${className}`}>
      {showAvatar && (
        <div className="flex -space-x-2">
          {displayUsers.map((user, index) => (
            <div
              key={index}
              className="w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-600 border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs font-medium"
            >
              {user.charAt(0).toUpperCase()}
            </div>
          ))}
          {remaining > 0 && (
            <div className="w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-600 border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs font-medium">
              +{remaining}
            </div>
          )}
        </div>
      )}
      
      <div className="flex items-center gap-1">
        <span>{getMessage()}</span>
        <div className="flex gap-1">
          <span className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
          <span className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '400ms' }} />
        </div>
      </div>
    </div>
  );
};
