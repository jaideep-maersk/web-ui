import React, { useState } from 'react';

export interface Setting {
  id: string;
  label: string;
  description?: string;
  type: 'toggle' | 'select' | 'text' | 'number';
  value: any;
  options?: Array<{ label: string; value: any }>;
  category?: string;
}

export interface SettingsPanelProps {
  settings: Setting[];
  onChange: (settingId: string, value: any) => void;
  onSave?: () => void;
  onReset?: () => void;
  isLoading?: boolean;
  className?: string;
}

/**
 * SettingsPanel component for managing system settings
 */
export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  settings,
  onChange,
  onSave,
  onReset,
  isLoading = false,
  className = '',
}) => {
  const [hasChanges, setHasChanges] = useState(false);

  const handleChange = (settingId: string, value: any) => {
    onChange(settingId, value);
    setHasChanges(true);
  };

  const handleSave = () => {
    onSave?.();
    setHasChanges(false);
  };

  const handleReset = () => {
    onReset?.();
    setHasChanges(false);
  };

  // Group settings by category
  const settingsByCategory = settings.reduce((acc, setting) => {
    const category = setting.category || 'General';
    if (!acc[category]) acc[category] = [];
    acc[category].push(setting);
    return acc;
  }, {} as Record<string, Setting[]>);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your system settings</p>
        </div>
        {hasChanges && (
          <div className="flex gap-2">
            {onReset && (
              <button
                onClick={handleReset}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                disabled={isLoading}
              >
                Reset
              </button>
            )}
            {onSave && (
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Settings by Category */}
      {Object.entries(settingsByCategory).map(([category, categorySettings]) => (
        <div key={category} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{category}</h3>
          </div>
          <div className="p-6 space-y-6">
            {categorySettings.map((setting) => (
              <div key={setting.id} className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {setting.label}
                  </label>
                  {setting.description && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {setting.description}
                    </p>
                  )}
                </div>
                <div className="flex-shrink-0 w-48">
                  {setting.type === 'toggle' && (
                    <button
                      onClick={() => handleChange(setting.id, !setting.value)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        setting.value ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                      disabled={isLoading}
                      aria-pressed={setting.value}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          setting.value ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  )}
                  {setting.type === 'select' && (
                    <select
                      value={setting.value}
                      onChange={(e) => handleChange(setting.id, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                      disabled={isLoading}
                    >
                      {setting.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  )}
                  {setting.type === 'text' && (
                    <input
                      type="text"
                      value={setting.value}
                      onChange={(e) => handleChange(setting.id, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                      disabled={isLoading}
                    />
                  )}
                  {setting.type === 'number' && (
                    <input
                      type="number"
                      value={setting.value}
                      onChange={(e) => handleChange(setting.id, Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                      disabled={isLoading}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
