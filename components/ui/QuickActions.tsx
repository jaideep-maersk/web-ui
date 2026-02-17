import React, { useState, useRef, useEffect } from 'react';

export interface QuickAction {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  shortcut?: string;
  disabled?: boolean;
  variant?: 'default' | 'danger';
}

interface QuickActionsProps {
  actions: QuickAction[];
  trigger?: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  actions,
  trigger,
  position = 'bottom',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleActionClick = (action: QuickAction) => {
    if (!action.disabled) {
      action.onClick();
      setIsOpen(false);
    }
  };

  const positionClasses = {
    top: 'bottom-full mb-2',
    bottom: 'top-full mt-2',
    left: 'right-full mr-2',
    right: 'left-full ml-2',
  };

  return (
    <div ref={menuRef} className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Quick actions"
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        {trigger || (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        )}
      </button>

      {isOpen && (
        <div
          className={`absolute z-50 ${positionClasses[position]} min-w-[200px] bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg py-1`}
          role="menu"
        >
          {actions.map((action) => (
            <button
              key={action.id}
              onClick={() => handleActionClick(action)}
              disabled={action.disabled}
              className={`w-full flex items-center gap-3 px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                action.variant === 'danger'
                  ? 'text-red-600 dark:text-red-400'
                  : 'text-gray-900 dark:text-gray-100'
              }`}
              role="menuitem"
            >
              {action.icon && <span className="flex-shrink-0">{action.icon}</span>}
              <span className="flex-1">{action.label}</span>
              {action.shortcut && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {action.shortcut}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
