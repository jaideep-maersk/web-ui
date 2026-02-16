import React, { useState } from 'react';

export interface ToolCall {
  id: string;
  name: string;
  arguments?: Record<string, any>;
  result?: any;
  status?: 'pending' | 'success' | 'error';
  error?: string;
  timestamp?: string;
}

interface ToolCallDisplayProps {
  toolCall: ToolCall;
  expandedByDefault?: boolean;
}

export const ToolCallDisplay: React.FC<ToolCallDisplayProps> = ({
  toolCall,
  expandedByDefault = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(expandedByDefault);

  const getStatusIcon = () => {
    switch (toolCall.status) {
      case 'pending':
        return (
          <svg className="w-4 h-4 text-yellow-500 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        );
      case 'success':
        return (
          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (toolCall.status) {
      case 'pending':
        return 'border-yellow-500/30 bg-yellow-50/50 dark:bg-yellow-900/10';
      case 'success':
        return 'border-green-500/30 bg-green-50/50 dark:bg-green-900/10';
      case 'error':
        return 'border-red-500/30 bg-red-50/50 dark:bg-red-900/10';
      default:
        return 'border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800';
    }
  };

  return (
    <div className={`rounded-lg border p-3 ${getStatusColor()}`}>
      {/* Header */}
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2 flex-1">
          {getStatusIcon()}
          <span className="font-mono text-sm font-semibold text-gray-900 dark:text-white">
            {toolCall.name}
          </span>
          {toolCall.timestamp && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {toolCall.timestamp}
            </span>
          )}
        </div>
        <button
          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
          aria-label={isExpanded ? 'Collapse' : 'Expand'}
        >
          <svg
            className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="mt-3 space-y-2">
          {/* Arguments */}
          {toolCall.arguments && Object.keys(toolCall.arguments).length > 0 && (
            <div>
              <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Arguments:
              </div>
              <pre className="text-xs bg-white dark:bg-gray-900 p-2 rounded border border-gray-200 dark:border-gray-700 overflow-x-auto">
                {JSON.stringify(toolCall.arguments, null, 2)}
              </pre>
            </div>
          )}

          {/* Result */}
          {toolCall.result !== undefined && (
            <div>
              <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Result:
              </div>
              <pre className="text-xs bg-white dark:bg-gray-900 p-2 rounded border border-gray-200 dark:border-gray-700 overflow-x-auto">
                {typeof toolCall.result === 'string'
                  ? toolCall.result
                  : JSON.stringify(toolCall.result, null, 2)}
              </pre>
            </div>
          )}

          {/* Error */}
          {toolCall.error && (
            <div>
              <div className="text-xs font-semibold text-red-700 dark:text-red-300 mb-1">
                Error:
              </div>
              <pre className="text-xs bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-2 rounded border border-red-200 dark:border-red-800 overflow-x-auto">
                {toolCall.error}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
