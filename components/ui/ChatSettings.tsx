import React, { useState } from 'react';

export interface ChatSetting {
  id: string;
  label: string;
  description?: string;
  type: 'toggle' | 'select' | 'number';
  value: boolean | string | number;
  options?: { label: string; value: string }[];
  min?: number;
  max?: number;
}

export interface ChatSettingsProps extends React.HTMLAttributes<HTMLDivElement> {
  settings: ChatSetting[];
  onSettingChange?: (id: string, value: boolean | string | number) => void;
  title?: string;
}

export const ChatSettings: React.FC<ChatSettingsProps> = ({
  settings,
  onSettingChange,
  title = 'Chat Settings',
  className = '',
  ...props
}) => {
  return (
    <div className={`space-y-4 ${className}`} {...props}>
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      )}
      
      <div className="space-y-4">
        {settings.map((setting) => (
          <div
            key={setting.id}
            className="flex items-start justify-between gap-4 py-3 border-b border-gray-200 dark:border-gray-700 last:border-0"
          >
            <div className="flex-1">
              <label htmlFor={setting.id} className="block text-sm font-medium text-gray-900 dark:text-white">
                {setting.label}
              </label>
              {setting.description && (
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{setting.description}</p>
              )}
            </div>
            
            <div className="flex-shrink-0">
              {setting.type === 'toggle' && (
                <button
                  id={setting.id}
                  onClick={() => onSettingChange?.(setting.id, !setting.value)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    setting.value ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                  role="switch"
                  aria-checked={setting.value as boolean}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      setting.value ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              )}
              
              {setting.type === 'select' && setting.options && (
                <select
                  id={setting.id}
                  value={setting.value as string}
                  onChange={(e) => onSettingChange?.(setting.id, e.target.value)}
                  className="block w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                >
                  {setting.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}
              
              {setting.type === 'number' && (
                <input
                  id={setting.id}
                  type="number"
                  value={setting.value as number}
                  min={setting.min}
                  max={setting.max}
                  onChange={(e) => onSettingChange?.(setting.id, Number(e.target.value))}
                  className="block w-24 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
