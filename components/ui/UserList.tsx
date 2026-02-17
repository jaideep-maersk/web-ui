import React, { useState } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'suspended';
  avatar?: string;
  lastActive?: Date;
}

export interface UserListProps {
  users: User[];
  onUserClick?: (user: User) => void;
  onUserDelete?: (userId: string) => void;
  searchable?: boolean;
  filterable?: boolean;
  className?: string;
}

/**
 * UserList component displays a list of users with search, filter, and action capabilities
 */
export const UserList: React.FC<UserListProps> = ({
  users,
  onUserClick,
  onUserDelete,
  searchable = true,
  filterable = true,
  className = '',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      !searchQuery ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || user.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: User['status']) => {
    switch (status) {
      case 'active':
        return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20';
      case 'inactive':
        return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800';
      case 'suspended':
        return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20';
      default:
        return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800';
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search and Filter Bar */}
      {(searchable || filterable) && (
        <div className="flex flex-col sm:flex-row gap-4">
          {searchable && (
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                aria-label="Search users"
              />
            </div>
          )}
          {filterable && (
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              aria-label="Filter by status"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          )}
        </div>
      )}

      {/* User List */}
      <div className="space-y-2">
        {filteredUsers.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No users found
          </div>
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <div
                className="flex items-center gap-4 flex-1 cursor-pointer"
                onClick={() => onUserClick?.(user)}
              >
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center overflow-hidden">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-lg font-semibold text-gray-600 dark:text-gray-300">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 dark:text-white truncate">
                    {user.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {user.email}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {user.role}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              {onUserDelete && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onUserDelete(user.id);
                  }}
                  className="ml-4 p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  aria-label={`Delete ${user.name}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              )}
            </div>
          ))
        )}
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
        Showing {filteredUsers.length} of {users.length} users
      </div>
    </div>
  );
};
