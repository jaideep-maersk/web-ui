import React, { useState } from 'react';

export interface ChatTemplateOption {
  id: string;
  name: string;
  description: string;
  content: string;
  category?: string;
}

export interface ChatTemplateProps {
  templates: ChatTemplateOption[];
  onSelect?: (template: ChatTemplateOption) => void;
  onClose?: () => void;
  showCategories?: boolean;
  className?: string;
}

export const ChatTemplate: React.FC<ChatTemplateProps> = ({
  templates,
  onSelect,
  onClose,
  showCategories = true,
  className = '',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [search, setSearch] = useState('');

  const categories = showCategories
    ? ['all', ...new Set(templates.map((t) => t.category).filter(Boolean))]
    : ['all'];

  const filteredTemplates = templates.filter((template) => {
    const matchesCategory =
      selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch =
      search === '' ||
      template.name.toLowerCase().includes(search.toLowerCase()) ||
      template.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Chat Templates
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
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search templates..."
          className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Categories */}
      {showCategories && categories.length > 1 && (
        <div className="flex gap-2 p-4 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`
                px-3 py-1.5 text-sm font-medium rounded whitespace-nowrap transition-colors
                ${
                  selectedCategory === category
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }
              `}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      )}

      {/* Template List */}
      <div className="max-h-96 overflow-y-auto">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            onClick={() => onSelect?.(template)}
            className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0"
          >
            <div className="flex items-start justify-between mb-1">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                {template.name}
              </h4>
              {template.category && (
                <span className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">
                  {template.category}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {template.description}
            </p>
            <div className="text-xs text-gray-500 dark:text-gray-500 font-mono bg-gray-50 dark:bg-gray-900 p-2 rounded line-clamp-2">
              {template.content}
            </div>
          </div>
        ))}
        {filteredTemplates.length === 0 && (
          <div className="p-8 text-center text-gray-400 dark:text-gray-500">
            No templates found
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatTemplate;
