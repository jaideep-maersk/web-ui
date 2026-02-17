import React from 'react';

export interface UserRoleProps {
  role: string;
  description?: string;
  permissions?: string[];
  onChange?: (role: string) => void;
  availableRoles?: Array<{
    value: string;
    label: string;
    description?: string;
    color?: string;
  }>;
  disabled?: boolean;
  showPermissions?: boolean;
  className?: string;
}

/**
 * UserRole component for displaying and managing user roles
 */
export const UserRole: React.FC<UserRoleProps> = ({
  role,
  description,
  permissions = [],
  onChange,
  availableRoles = [
    { value: 'admin', label: 'Admin', description: 'Full system access', color: 'red' },
    { value: 'moderator', label: 'Moderator', description: 'Content moderation', color: 'yellow' },
    { value: 'user', label: 'User', description: 'Standard user access', color: 'blue' },
    { value: 'guest', label: 'Guest', description: 'Limited access', color: 'gray' },
  ],
  disabled = false,
  showPermissions = true,
  className = '',
}) => {
  const getRoleColor = (roleValue: string) => {
    const roleConfig = availableRoles.find((r) => r.value === roleValue);
    const color = roleConfig?.color || 'blue';

    const colors = {
      red: 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800',
      yellow: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800',
      blue: 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800',
      gray: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700',
      green: 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800',
      purple: 'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800',
    };

    return colors[color as keyof typeof colors] || colors.blue;
  };

  const currentRole = availableRoles.find((r) => r.value === role);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Role Display or Selector */}
      {onChange ? (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            User Role
          </label>
          <select
            value={role}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {availableRoles.map((roleOption) => (
              <option key={roleOption.value} value={roleOption.value}>
                {roleOption.label}
                {roleOption.description && ` - ${roleOption.description}`}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div>
          <span className={`inline-flex items-center px-4 py-2 rounded-lg border text-sm font-medium ${getRoleColor(role)}`}>
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            {currentRole?.label || role}
          </span>
        </div>
      )}

      {/* Description */}
      {(description || currentRole?.description) && (
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {description || currentRole?.description}
        </p>
      )}

      {/* Permissions */}
      {showPermissions && permissions.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Permissions
          </h4>
          <ul className="space-y-1">
            {permissions.map((permission, index) => (
              <li
                key={index}
                className="flex items-center text-sm text-gray-600 dark:text-gray-400"
              >
                <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {permission}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Role Cards (when displaying all available roles) */}
      {!onChange && availableRoles.length > 1 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          {availableRoles.map((roleOption) => (
            <div
              key={roleOption.value}
              className={`p-3 rounded-lg border ${
                roleOption.value === role
                  ? getRoleColor(roleOption.value)
                  : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50'
              }`}
            >
              <div className="font-medium text-sm">
                {roleOption.label}
              </div>
              {roleOption.description && (
                <div className="text-xs mt-1 opacity-75">
                  {roleOption.description}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
