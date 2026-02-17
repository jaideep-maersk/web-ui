import React, { useState } from 'react';

export interface QuickSetting {
  id: string;
  label: string;
  type: 'toggle' | 'select';
  value: boolean | string;
  options?: string[];
}

export interface QuickSettingsProps {
  settings: QuickSetting[];
  onChange?: (id: string, value: boolean | string) => void;
  onClose?: () => void;
  className?: string;
}

export const QuickSettings: React.FC<QuickSettingsProps> = ({
  settings,
  onChange,
  onClose,
  className = '',
}) => {
  const [localSettings, setLocalSettings] = useState(settings);

  const handleChange = (id: string, value: boolean | string) => {
    setLocalSettings((prev) =>
      prev.map((setting) =>
        setting.id === id ? { ...setting, value } : setting
      )
    );
    onChange?.(id, value);
  };

  return (
    <div className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Quick Settings
        </h3>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            aria-label="Close"
          >
            ✕
          </button>
        )}
      </div>

      {/* Settings List */}
      <div className="p-4 space-y-3">
        {localSettings.map((setting) => (
          <div key={setting.id} className="flex items-center justify-between">
            <label
              htmlFor={setting.id}
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {setting.label}
            </label>
            {setting.type === 'toggle' ? (
              <button
                id={setting.id}
                type="button"
                onClick={() => handleChange(setting.id, !setting.value)}
                className={`
                  relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                  ${
                    setting.value
                      ? 'bg-blue-600'
                      : 'bg-gray-200 dark:bg-gray-700'
                  }
                `}
                role="switch"
                aria-checked={setting.value as boolean}
              >
                <span
                  className={`
                    inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                    ${setting.value ? 'translate-x-6' : 'translate-x-1'}
                  `}
                />
              </button>
            ) : (
              <select
                id={setting.id}
                value={setting.value as string}
                onChange={(e) => handleChange(setting.id, e.target.value)}
                className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {setting.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}
        {localSettings.length === 0 && (
          <div className="text-center text-gray-400 dark:text-gray-500 py-4">
            No settings available
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickSettings;
