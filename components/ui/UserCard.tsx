import React from 'react';

export interface UserCardProps {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'suspended';
  avatar?: string;
  bio?: string;
  joinedDate?: Date;
  lastActive?: Date;
  stats?: {
    posts?: number;
    followers?: number;
    following?: number;
  };
  onEdit?: () => void;
  onDelete?: () => void;
  className?: string;
}

/**
 * UserCard component displays a user profile card with details and actions
 */
export const UserCard: React.FC<UserCardProps> = ({
  name,
  email,
  role,
  status,
  avatar,
  bio,
  joinedDate,
  lastActive,
  stats,
  onEdit,
  onDelete,
  className = '',
}) => {
  const getStatusColor = (userStatus: typeof status) => {
    switch (userStatus) {
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

  const formatDate = (date?: Date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className={`border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden ${className}`}>
      {/* Header with Avatar */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-24" />
      <div className="px-6 pb-6">
        <div className="flex items-start -mt-12 mb-4">
          <div className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-900 bg-gray-300 dark:bg-gray-600 flex items-center justify-center overflow-hidden">
            {avatar ? (
              <img src={avatar} alt={name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-3xl font-bold text-gray-600 dark:text-gray-300">
                {name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          {/* Action Buttons */}
          {(onEdit || onDelete) && (
            <div className="ml-auto flex gap-2 mt-12">
              {onEdit && (
                <button
                  onClick={onEdit}
                  className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                  aria-label="Edit user"
                >
                  Edit
                </button>
              )}
              {onDelete && (
                <button
                  onClick={onDelete}
                  className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  aria-label="Delete user"
                >
                  Delete
                </button>
              )}
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="space-y-3">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{name}</h2>
            <p className="text-gray-600 dark:text-gray-400">{email}</p>
          </div>

          {/* Status and Role */}
          <div className="flex items-center gap-2">
            <span className={`text-sm px-3 py-1 rounded-full font-medium ${getStatusColor(status)}`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
            <span className="text-sm px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              {role}
            </span>
          </div>

          {/* Bio */}
          {bio && (
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              {bio}
            </p>
          )}

          {/* Stats */}
          {stats && (
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              {stats.posts !== undefined && (
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.posts}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Posts</div>
                </div>
              )}
              {stats.followers !== undefined && (
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.followers}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Followers</div>
                </div>
              )}
              {stats.following !== undefined && (
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.following}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Following</div>
                </div>
              )}
            </div>
          )}

          {/* Dates */}
          {(joinedDate || lastActive) && (
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 space-y-1">
              {joinedDate && (
                <div>Joined: {formatDate(joinedDate)}</div>
              )}
              {lastActive && (
                <div>Last active: {formatDate(lastActive)}</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
