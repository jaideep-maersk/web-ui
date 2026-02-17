import React from 'react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export interface ChatTranscriptProps {
  messages: ChatMessage[];
  title?: string;
  showTimestamps?: boolean;
  format?: 'text' | 'markdown' | 'html';
  className?: string;
}

export const ChatTranscript: React.FC<ChatTranscriptProps> = ({
  messages,
  title = 'Chat Transcript',
  showTimestamps = true,
  format = 'text',
  className = '',
}) => {
  const formatTimestamp = (date: Date): string => {
    return date.toLocaleString();
  };

  const exportTranscript = (exportFormat: 'txt' | 'json' | 'md') => {
    let content = '';

    if (exportFormat === 'json') {
      content = JSON.stringify(messages, null, 2);
    } else if (exportFormat === 'md') {
      content = `# ${title}\n\n`;
      messages.forEach((msg) => {
        content += `## ${msg.role.toUpperCase()}${
          showTimestamps ? ` - ${formatTimestamp(msg.timestamp)}` : ''
        }\n\n${msg.content}\n\n`;
      });
    } else {
      // txt format
      content = `${title}\n${'='.repeat(title.length)}\n\n`;
      messages.forEach((msg) => {
        content += `[${msg.role.toUpperCase()}]${
          showTimestamps ? ` ${formatTimestamp(msg.timestamp)}` : ''
        }\n${msg.content}\n\n`;
      });
    }

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transcript.${exportFormat}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => exportTranscript('txt')}
            className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded transition-colors"
          >
            Export TXT
          </button>
          <button
            type="button"
            onClick={() => exportTranscript('md')}
            className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded transition-colors"
          >
            Export MD
          </button>
          <button
            type="button"
            onClick={() => exportTranscript('json')}
            className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded transition-colors"
          >
            Export JSON
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
        {messages.map((message) => (
          <div key={message.id} className="border-l-4 border-blue-500 pl-4">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-sm text-gray-900 dark:text-gray-100 uppercase">
                {message.role}
              </span>
              {showTimestamps && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {formatTimestamp(message.timestamp)}
                </span>
              )}
            </div>
            <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
              {message.content}
            </div>
          </div>
        ))}
        {messages.length === 0 && (
          <div className="text-center text-gray-400 dark:text-gray-500 py-8">
            No messages in transcript
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatTranscript;
