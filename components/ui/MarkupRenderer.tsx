import React from 'react';

interface MarkupRendererProps {
  content: string;
  className?: string;
  allowedFormats?: ('bold' | 'italic' | 'underline' | 'strikethrough' | 'code' | 'link' | 'list' | 'quote')[];
}

export const MarkupRenderer: React.FC<MarkupRendererProps> = ({
  content,
  className = '',
  allowedFormats = ['bold', 'italic', 'underline', 'strikethrough', 'code', 'link', 'list', 'quote'],
}) => {
  const processedContent = React.useMemo(() => {
    let processed = content;

    // Apply markup transformations based on allowed formats
    if (allowedFormats.includes('bold')) {
      processed = processed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    }
    if (allowedFormats.includes('italic')) {
      processed = processed.replace(/\*(.*?)\*/g, '<em>$1</em>');
    }
    if (allowedFormats.includes('underline')) {
      processed = processed.replace(/__(.*?)__/g, '<u>$1</u>');
    }
    if (allowedFormats.includes('strikethrough')) {
      processed = processed.replace(/~~(.*?)~~/g, '<s>$1</s>');
    }
    if (allowedFormats.includes('code')) {
      processed = processed.replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 bg-gray-200 dark:bg-gray-800 rounded text-sm font-mono">$1</code>');
    }
    if (allowedFormats.includes('link')) {
      processed = processed.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>');
    }
    if (allowedFormats.includes('list')) {
      // Unordered list
      processed = processed.replace(/^\* (.+)$/gm, '<li>$1</li>');
      processed = processed.replace(/(<li>.*<\/li>)/s, '<ul class="list-disc list-inside">$1</ul>');
      // Ordered list
      processed = processed.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');
      processed = processed.replace(/(<li>.*<\/li>)/s, '<ol class="list-decimal list-inside">$1</ol>');
    }
    if (allowedFormats.includes('quote')) {
      processed = processed.replace(/^&gt; (.+)$/gm, '<blockquote class="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic">$1</blockquote>');
    }

    // Convert line breaks
    processed = processed.replace(/\n/g, '<br />');

    return processed;
  }, [content, allowedFormats]);

  return (
    <div
      className={`markup-renderer ${className}`}
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  );
};
