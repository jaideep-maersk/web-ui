import React from 'react';

export interface ChatSummaryProps {
  messageCount?: number;
  participantCount?: number;
  duration?: string;
  topics?: string[];
  keyPoints?: string[];
  className?: string;
}

export const ChatSummary: React.FC<ChatSummaryProps> = ({
  messageCount = 0,
  participantCount = 0,
  duration = '0m',
  topics = [],
  keyPoints = [],
  className = '',
}) => {
  return (
    <div className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Chat Summary
      </h3>

      {/* Statistics */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {messageCount}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Messages</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {participantCount}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Participants</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {duration}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Duration</div>
        </div>
      </div>

      {/* Topics */}
      {topics.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Topics Discussed
          </h4>
          <div className="flex flex-wrap gap-2">
            {topics.map((topic, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Key Points */}
      {keyPoints.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Key Points
          </h4>
          <ul className="space-y-1">
            {keyPoints.map((point, index) => (
              <li
                key={index}
                className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2"
              >
                <span className="text-blue-500 mt-0.5">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {messageCount === 0 && topics.length === 0 && keyPoints.length === 0 && (
        <div className="text-center text-gray-400 dark:text-gray-500 py-4">
          No summary available
        </div>
      )}
    </div>
  );
};

export default ChatSummary;
