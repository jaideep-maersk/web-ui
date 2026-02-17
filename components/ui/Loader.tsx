import React, { useEffect, useRef, ReactNode } from 'react';

interface LoaderProps {
  onVisible?: () => void;
  children?: ReactNode;
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  onVisible,
  children,
  className = '',
}) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    if (!loaderRef.current || !onVisible) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Call onVisible every 100ms while visible
            intervalRef.current = setInterval(() => {
              onVisible();
            }, 100);
          } else {
            // Clear interval when not visible
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
          }
        });
      },
      {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1, // When 10% of the loader is visible
      }
    );
    
    observer.observe(loaderRef.current);
    
    return () => {
      observer.disconnect();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [onVisible]);
  
  return (
    <div ref={loaderRef} className={className}>
      {children}
    </div>
  );
};

// Spinner component for loading states
export const Spinner: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };
  
  return (
    <div
      className={`
        animate-spin rounded-full border-2 border-gray-300
        border-t-blue-600 dark:border-gray-600 dark:border-t-blue-400
        ${sizeClasses[size]}
        ${className}
      `}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};
