import React, { HTMLAttributes } from 'react';

interface FullHeightIframeProps extends Omit<HTMLAttributes<HTMLIFrameElement>, 'src'> {
  src: string;
  title: string;
  minHeight?: string | number;
  loading?: 'lazy' | 'eager';
  sandbox?: string;
  allow?: string;
}

export const FullHeightIframe: React.FC<FullHeightIframeProps> = ({
  src,
  title,
  minHeight = '400px',
  loading = 'lazy',
  sandbox,
  allow,
  className = '',
  ...props
}) => {
  return (
    <div 
      className={`relative w-full ${className}`}
      style={{ minHeight }}
    >
      <iframe
        src={src}
        title={title}
        loading={loading}
        sandbox={sandbox}
        allow={allow}
        className="absolute inset-0 w-full h-full border-0 rounded-lg"
        {...props}
      />
    </div>
  );
};
