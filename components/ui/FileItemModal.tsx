import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';

interface FileItemModalProps {
  show: boolean;
  onClose: () => void;
  file: {
    id?: string;
    name: string;
    size?: number;
    type?: string;
    content?: string;
    url?: string;
    created_at?: number;
    meta?: {
      content_type?: string;
      [key: string]: any;
    };
  };
}

export const FileItemModal: React.FC<FileItemModalProps> = ({
  show,
  onClose,
  file,
}) => {
  const [selectedTab, setSelectedTab] = useState<'content' | 'preview'>('content');
  const [expandedContent, setExpandedContent] = useState(false);

  const CONTENT_PREVIEW_LIMIT = 10000;

  useEffect(() => {
    if (show) {
      setSelectedTab('content');
      setExpandedContent(false);
    }
  }, [show]);

  const formatFileSize = (bytes?: number): string => {
    if (!bytes) return 'Unknown size';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (timestamp?: number): string => {
    if (!timestamp) return '';
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getLineCount = (content: string): number => {
    return content.split('\n').length;
  };

  const isImage = (fileName: string, contentType?: string): boolean => {
    return (
      contentType?.startsWith('image/') ||
      /\.(png|jpg|jpeg|gif|webp|svg|bmp|ico)$/i.test(fileName)
    );
  };

  const isPDF = (fileName: string, contentType?: string): boolean => {
    return contentType === 'application/pdf' || fileName.toLowerCase().endsWith('.pdf');
  };

  const isAudio = (fileName: string, contentType?: string): boolean => {
    return (
      contentType?.startsWith('audio/') ||
      /\.(mp3|wav|ogg|m4a|webm)$/i.test(fileName)
    );
  };

  const isCode = (fileName: string): boolean => {
    return /\.(py|js|ts|tsx|jsx|java|html|css|json|cpp|c|h|sh|bash|yaml|yml|xml|sql|go|rs|php|rb)$/i.test(
      fileName
    );
  };

  const rawContent = (file.content ?? '').trim() || 'No content';
  const isTruncated = rawContent.length > CONTENT_PREVIEW_LIMIT && !expandedContent;
  const displayContent = isTruncated
    ? rawContent.slice(0, CONTENT_PREVIEW_LIMIT)
    : rawContent;

  const showTabs = isAudio(file.name, file.meta?.content_type) ||
    isPDF(file.name, file.meta?.content_type) ||
    isCode(file.name);

  return (
    <Modal show={show} onClose={onClose} size="lg">
      <div className="px-4.5 py-3.5 w-full flex flex-col justify-center dark:text-gray-400">
        {/* Header */}
        <div className="pb-2">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <div className="font-medium text-lg dark:text-gray-100 line-clamp-1">
                {file.name}
              </div>
            </div>
            <button
              onClick={onClose}
              className="ml-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Metadata */}
          <div className="flex flex-wrap text-xs gap-1 text-gray-500">
            {file.type && (
              <>
                <div className="capitalize">{file.type}</div>
                <span>•</span>
              </>
            )}
            {file.size && (
              <>
                <div>{formatFileSize(file.size)}</div>
                <span>•</span>
              </>
            )}
            {file.content && (
              <>
                <div>
                  {getLineCount(file.content)} lines
                </div>
                <span>•</span>
              </>
            )}
            {file.created_at && <div>{formatDate(file.created_at)}</div>}
          </div>
        </div>

        {/* Tabs */}
        {showTabs && (
          <div className="flex mb-2.5 border-b border-gray-200 dark:border-gray-700 text-sm">
            <button
              className={`py-1.5 px-4 border-b-2 transition ${
                selectedTab === 'content'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              onClick={() => setSelectedTab('content')}
            >
              Content
            </button>
            <button
              className={`py-1.5 px-4 border-b-2 transition ${
                selectedTab === 'preview'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              onClick={() => setSelectedTab('preview')}
            >
              Preview
            </button>
          </div>
        )}

        {/* Content */}
        <div className="max-h-[70vh] overflow-auto">
          {selectedTab === 'content' || !showTabs ? (
            <div className="space-y-2">
              {isImage(file.name, file.meta?.content_type) && file.url ? (
                <img
                  src={file.url}
                  alt={file.name}
                  className="w-full object-contain rounded-lg max-h-[60vh]"
                  loading="lazy"
                />
              ) : (
                <>
                  <div className="max-h-96 overflow-auto bg-gray-50 dark:bg-gray-800 rounded p-4">
                    <pre className="text-xs whitespace-pre-wrap break-words">
                      {displayContent}
                    </pre>
                  </div>
                  {isTruncated && (
                    <button
                      className="text-xs text-blue-500 hover:text-blue-700 dark:hover:text-blue-300 transition"
                      onClick={() => setExpandedContent(true)}
                    >
                      Show all ({rawContent.length.toLocaleString()} characters)
                    </button>
                  )}
                </>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              {isAudio(file.name, file.meta?.content_type) && file.url && (
                <audio src={file.url} className="w-full" controls />
              )}
              {isPDF(file.name, file.meta?.content_type) && file.url && (
                <iframe
                  title={file.name}
                  src={file.url}
                  className="w-full h-[60vh] border-0 rounded-lg"
                />
              )}
              {isCode(file.name) && file.content && (
                <div className="max-h-96 overflow-auto bg-gray-900 text-gray-100 rounded p-4">
                  <pre className="text-xs">
                    <code>{file.content}</code>
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
