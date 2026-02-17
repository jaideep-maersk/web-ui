import React, { useState } from 'react';

export interface Permission {
  id: string;
  name: string;
  description?: string;
  category?: string;
}

export interface PermissionManagerProps {
  permissions: Permission[];
  selectedPermissions: string[];
  onChange: (selectedIds: string[]) => void;
  searchable?: boolean;
  groupByCategory?: boolean;
  className?: string;
}

/**
 * PermissionManager component for managing user/role permissions
 */
export const PermissionManager: React.FC<PermissionManagerProps> = ({
  permissions,
  selectedPermissions,
  onChange,
  searchable = true,
  groupByCategory = true,
  className = '',
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPermissions = permissions.filter(
    (perm) =>
      !searchQuery ||
      perm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      perm.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedPermissions = groupByCategory
    ? filteredPermissions.reduce((acc, perm) => {
        const category = perm.category || 'Other';
        if (!acc[category]) acc[category] = [];
        acc[category].push(perm);
        return acc;
      }, {} as Record<string, Permission[]>)
    : { All: filteredPermissions };

  const togglePermission = (permId: string) => {
    if (selectedPermissions.includes(permId)) {
      onChange(selectedPermissions.filter((id) => id !== permId));
    } else {
      onChange([...selectedPermissions, permId]);
    }
  };

  const toggleCategory = (categoryPerms: Permission[]) => {
    const categoryIds = categoryPerms.map((p) => p.id);
    const allSelected = categoryIds.every((id) => selectedPermissions.includes(id));
    
    if (allSelected) {
      onChange(selectedPermissions.filter((id) => !categoryIds.includes(id)));
    } else {
      onChange([...new Set([...selectedPermissions, ...categoryIds])]);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Permission Manager</h3>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {selectedPermissions.length} of {permissions.length} selected
        </span>
      </div>

      {/* Search */}
      {searchable && (
        <input
          type="text"
          placeholder="Search permissions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
        />
      )}

      {/* Permissions by Category */}
      <div className="space-y-4">
        {Object.entries(groupedPermissions).map(([category, categoryPerms]) => {
          const allSelected = categoryPerms.every((p) => selectedPermissions.includes(p.id));
          const someSelected = categoryPerms.some((p) => selectedPermissions.includes(p.id));

          return (
            <div key={category} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              {/* Category Header */}
              {groupByCategory && (
                <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      ref={(el) => el && (el.indeterminate = someSelected && !allSelected)}
                      onChange={() => toggleCategory(categoryPerms)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-white">
                      {category}
                    </span>
                    <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                      ({categoryPerms.length})
                    </span>
                  </label>
                </div>
              )}

              {/* Permissions List */}
              <div className="p-4 space-y-3">
                {categoryPerms.map((permission) => (
                  <label
                    key={permission.id}
                    className="flex items-start cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded -m-2"
                  >
                    <input
                      type="checkbox"
                      checked={selectedPermissions.includes(permission.id)}
                      onChange={() => togglePermission(permission.id)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5"
                    />
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {permission.name}
                      </div>
                      {permission.description && (
                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {permission.description}
                        </div>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
