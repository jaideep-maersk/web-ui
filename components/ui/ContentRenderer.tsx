import React from 'react';

type ContentType = 'markdown' | 'html' | 'text' | 'auto';

interface ContentRendererProps {
  content: string;
  type?: ContentType;
  className?: string;
}

export const ContentRenderer: React.FC<ContentRendererProps> = ({
  content,
  type = 'auto',
  className = '',
}) => {
  const detectedType = React.useMemo(() => {
    if (type !== 'auto') return type;

    // Auto-detect content type
    if (content.includes('<') && content.includes('>')) {
      return 'html';
    }
    if (content.includes('**') || content.includes('##') || content.includes('[')) {
      return 'markdown';
    }
    return 'text';
  }, [content, type]);

  const renderContent = () => {
    switch (detectedType) {
      case 'html':
        return (
          <div
            className={`prose dark:prose-invert ${className}`}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        );
      
      case 'markdown':
        // Basic markdown rendering (in production, use a proper markdown library)
        let html = content
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>')
          .replace(/`([^`]+)`/g, '<code>$1</code>')
          .replace(/^### (.*$)/gim, '<h3>$1</h3>')
          .replace(/^## (.*$)/gim, '<h2>$1</h2>')
          .replace(/^# (.*$)/gim, '<h1>$1</h1>')
          .replace(/\n/g, '<br />');
        
        return (
          <div
            className={`prose dark:prose-invert ${className}`}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      
      case 'text':
      default:
        return (
          <div className={`whitespace-pre-wrap ${className}`}>
            {content}
          </div>
        );
    }
  };

  return <div className="content-renderer">{renderContent()}</div>;
};
