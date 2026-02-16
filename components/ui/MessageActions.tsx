import React from 'react';

export interface MessageAction {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  variant?: 'default' | 'danger';
  disabled?: boolean;
}

export interface MessageActionsProps {
  actions: MessageAction[];
  className?: string;
}

export const MessageActions: React.FC<MessageActionsProps> = ({
  actions,
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {actions.map((action, index) => {
        const variantClass = action.variant === 'danger'
          ? 'hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400'
          : 'hover:bg-gray-100 dark:hover:bg-gray-700';

        return (
          <button
            key={index}
            onClick={action.onClick}
            disabled={action.disabled}
            title={action.label}
            className={`p-2 rounded-lg transition-colors duration-200
                       text-gray-600 dark:text-gray-400
                       ${variantClass}
                       disabled:opacity-50 disabled:cursor-not-allowed
                       focus:outline-none focus:ring-2 focus:ring-blue-500`}
            aria-label={action.label}
          >
            {action.icon}
          </button>
        );
      })}
    </div>
  );
};
