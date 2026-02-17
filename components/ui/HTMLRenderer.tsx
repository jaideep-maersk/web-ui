import React from 'react';

interface HTMLRendererProps {
  html: string;
  className?: string;
  allowedTags?: string[];
  sanitize?: boolean;
}

export const HTMLRenderer: React.FC<HTMLRendererProps> = ({
  html,
  className = '',
  allowedTags = ['p', 'br', 'strong', 'em', 'u', 'a', 'ul', 'ol', 'li', 'code', 'pre'],
  sanitize = true,
}) => {
  const sanitizedHtml = React.useMemo(() => {
    if (!sanitize) return html;

    // Basic sanitization (in production, use DOMPurify)
    // Remove script tags and event handlers
    let cleaned = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    cleaned = cleaned.replace(/on\w+\s*=\s*["'][^"']*["']/gi, '');
    
    return cleaned;
  }, [html, sanitize]);

  return (
    <div
      className={`prose dark:prose-invert max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
};
