import React from 'react';

export interface NavItem {
  id: string;
  label: string;
  icon?: string;
  badge?: number;
  active?: boolean;
}

export interface ChatNavigationProps {
  items: NavItem[];
  onItemClick?: (id: string) => void;
  variant?: 'sidebar' | 'tabs';
  className?: string;
}

export const ChatNavigation: React.FC<ChatNavigationProps> = ({
  items,
  onItemClick,
  variant = 'tabs',
  className = '',
}) => {
  if (variant === 'sidebar') {
    return (
      <nav className={`space-y-1 ${className}`}>
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onItemClick?.(item.id)}
            className={`
              w-full flex items-center justify-between px-4 py-3 rounded-lg
              transition-colors duration-150
              ${
                item.active
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
              }
            `}
          >
            <div className="flex items-center gap-3">
              {item.icon && <span>{item.icon}</span>}
              <span className="font-medium">{item.label}</span>
            </div>
            {item.badge && item.badge > 0 && (
              <span className={`
                px-2 py-0.5 rounded-full text-xs font-semibold
                ${item.active ? 'bg-white text-blue-600' : 'bg-blue-600 text-white'}
              `}>
                {item.badge > 99 ? '99+' : item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>
    );
  }

  return (
    <div className={`flex border-b border-gray-200 dark:border-gray-700 ${className}`}>
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onItemClick?.(item.id)}
          className={`
            relative px-6 py-3 font-medium transition-colors duration-150
            ${
              item.active
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }
          `}
        >
          <div className="flex items-center gap-2">
            {item.icon && <span>{item.icon}</span>}
            <span>{item.label}</span>
            {item.badge && item.badge > 0 && (
              <span className="ml-2 px-2 py-0.5 rounded-full bg-blue-600 text-white text-xs font-semibold">
                {item.badge > 99 ? '99+' : item.badge}
              </span>
            )}
          </div>
          {item.active && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400" />
          )}
        </button>
      ))}
    </div>
  );
};
