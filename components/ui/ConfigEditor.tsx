import React, { useState } from 'react';

export interface ConfigItem {
  key: string;
  value: string;
  type?: 'string' | 'number' | 'boolean' | 'json';
  description?: string;
}

export interface ConfigEditorProps {
  config: ConfigItem[];
  onChange: (key: string, value: string) => void;
  onSave?: () => void;
  onDelete?: (key: string) => void;
  onAdd?: (key: string, value: string) => void;
  isLoading?: boolean;
  className?: string;
}

/**
 * ConfigEditor component for editing configuration key-value pairs
 */
export const ConfigEditor: React.FC<ConfigEditorProps> = ({
  config,
  onChange,
  onSave,
  onDelete,
  onAdd,
  isLoading = false,
  className = '',
}) => {
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [editingKey, setEditingKey] = useState<string | null>(null);

  const handleAdd = () => {
    if (newKey.trim() && newValue.trim() && onAdd) {
      onAdd(newKey.trim(), newValue.trim());
      setNewKey('');
      setNewValue('');
    }
  };

  const handleEdit = (key: string, value: string) => {
    onChange(key, value);
    setEditingKey(null);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Configuration Editor</h3>
        {onSave && (
          <button
            onClick={onSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 text-sm"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save All'}
          </button>
        )}
      </div>

      {/* Config List */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Key</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Value</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {config.map((item) => (
              <tr key={item.key} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="px-4 py-3 text-sm font-mono text-gray-900 dark:text-white">
                  {item.key}
                  {item.description && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-sans">
                      {item.description}
                    </div>
                  )}
                </td>
                <td className="px-4 py-3">
                  {editingKey === item.key ? (
                    <input
                      type="text"
                      defaultValue={item.value}
                      onBlur={(e) => handleEdit(item.key, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleEdit(item.key, e.currentTarget.value);
                        if (e.key === 'Escape') setEditingKey(null);
                      }}
                      autoFocus
                      className="w-full px-2 py-1 text-sm border border-blue-500 rounded focus:outline-none dark:bg-gray-700 dark:text-white"
                    />
                  ) : (
                    <div
                      onClick={() => setEditingKey(item.key)}
                      className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer hover:text-gray-900 dark:hover:text-white font-mono"
                    >
                      {item.value}
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setEditingKey(item.key)}
                      className="text-blue-600 hover:text-blue-700 dark:text-blue-400 text-sm"
                      disabled={isLoading}
                    >
                      Edit
                    </button>
                    {onDelete && (
                      <button
                        onClick={() => onDelete(item.key)}
                        className="text-red-600 hover:text-red-700 dark:text-red-400 text-sm"
                        disabled={isLoading}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add New Config */}
      {onAdd && (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Add New Configuration</h4>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Key"
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
              disabled={isLoading}
            />
            <input
              type="text"
              placeholder="Value"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
              disabled={isLoading}
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            />
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 text-sm"
              disabled={isLoading || !newKey.trim() || !newValue.trim()}
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
