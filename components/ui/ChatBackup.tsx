import React from 'react';

export interface Backup {
  id: string;
  timestamp: Date;
  size: string;
  messageCount: number;
}

interface ChatBackupProps {
  backups?: Backup[];
  autoBackup?: boolean;
  onBackup: () => void;
  onRestore: (backupId: string) => void;
  onDelete?: (backupId: string) => void;
  className?: string;
}

export const ChatBackup: React.FC<ChatBackupProps> = ({
  backups = [],
  autoBackup = false,
  onBackup,
  onRestore,
  onDelete,
  className = '',
}) => {
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [selectedBackup, setSelectedBackup] = React.useState<string | null>(null);

  const handleBackup = async () => {
    setIsProcessing(true);
    try {
      await onBackup();
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRestore = async (backupId: string) => {
    if (!confirm('Are you sure you want to restore this backup? Current data will be replaced.')) {
      return;
    }
    setIsProcessing(true);
    try {
      await onRestore(backupId);
      setSelectedBackup(null);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async (backupId: string) => {
    if (!confirm('Are you sure you want to delete this backup?')) {
      return;
    }
    setIsProcessing(true);
    try {
      await onDelete?.(backupId);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className={`chat-backup ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Backups
        </h3>
        <button
          onClick={handleBackup}
          disabled={isProcessing}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors flex items-center gap-2"
        >
          <span>💾</span>
          {isProcessing ? 'Processing...' : 'Create Backup'}
        </button>
      </div>

      {autoBackup && (
        <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <div className="flex items-center gap-2">
            <span>✓</span>
            <span className="text-sm text-green-800 dark:text-green-200">
              Auto-backup is enabled
            </span>
          </div>
        </div>
      )}

      {backups.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No backups yet
        </div>
      ) : (
        <div className="space-y-2">
          {backups.map((backup) => (
            <div
              key={backup.id}
              className={`p-4 border rounded-lg transition-colors ${
                selectedBackup === backup.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {backup.timestamp.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {backup.messageCount} messages • {backup.size}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleRestore(backup.id)}
                    disabled={isProcessing}
                    className="px-3 py-1 text-sm bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded transition-colors"
                  >
                    Restore
                  </button>
                  {onDelete && (
                    <button
                      onClick={() => handleDelete(backup.id)}
                      disabled={isProcessing}
                      className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white rounded transition-colors"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
