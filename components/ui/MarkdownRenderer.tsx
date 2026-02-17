import React, { useState, useEffect } from 'react';

export interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  className = '',
}) => {
  const [rendered, setRendered] = useState<string>('');
  
  useEffect(() => {
    // Basic markdown parsing (simplified version)
    // In production, you'd use a library like react-markdown or marked
    let html = content;
    
    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mt-4 mb-2">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-4 mb-2">$1</h1>');
    
    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>');
    html = html.replace(/__(.*?)__/g, '<strong class="font-bold">$1</strong>');
    
    // Italic
    html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
    html = html.replace(/_(.*?)_/g, '<em class="italic">$1</em>');
    
    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-sm font-mono text-red-600 dark:text-red-400">$1</code>');
    
    // Code blocks
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
      return `<pre class="my-3 p-4 rounded-lg bg-gray-900 dark:bg-gray-950 overflow-x-auto"><code class="text-sm font-mono text-gray-100">${code.trim()}</code></pre>`;
    });
    
    // Links
    html = html.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2" class="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>');
    
    // Lists
    html = html.replace(/^\* (.*$)/gim, '<li class="ml-4">• $1</li>');
    html = html.replace(/^\d+\. (.*$)/gim, '<li class="ml-4 list-decimal">$1</li>');
    
    // Blockquotes
    html = html.replace(/^> (.*$)/gim, '<blockquote class="pl-4 border-l-4 border-gray-300 dark:border-gray-600 italic text-gray-700 dark:text-gray-400">$1</blockquote>');
    
    // Line breaks
    html = html.replace(/\n\n/g, '<br/><br/>');
    html = html.replace(/\n/g, '<br/>');
    
    setRendered(html);
  }, [content]);
  
  return (
    <div
      className={`prose prose-sm dark:prose-invert max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: rendered }}
    />
  );
};
