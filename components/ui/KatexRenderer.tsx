import React from 'react';

interface KatexRendererProps {
  math: string;
  displayMode?: boolean;
  errorColor?: string;
  className?: string;
}

export const KatexRenderer: React.FC<KatexRendererProps> = ({
  math,
  displayMode = false,
  errorColor = '#cc0000',
  className = '',
}) => {
  const [error, setError] = React.useState<string | null>(null);
  const [html, setHtml] = React.useState<string>('');

  React.useEffect(() => {
    // In a real implementation, you would use katex library
    // For this migration, we'll show a placeholder
    try {
      // Simulate KaTeX rendering
      // const rendered = katex.renderToString(math, { displayMode, throwOnError: false });
      setHtml(math);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error rendering math');
    }
  }, [math, displayMode]);

  if (error) {
    return (
      <span
        className={`${className} font-mono`}
        style={{ color: errorColor }}
        title={error}
      >
        {math}
      </span>
    );
  }

  if (displayMode) {
    return (
      <div
        className={`${className} my-4 overflow-x-auto text-center`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <span
      className={`${className} inline-block`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
