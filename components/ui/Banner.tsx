import React, { useState, useEffect } from 'react';

interface BannerProps {
  id?: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  content: string;
  url?: string;
  dismissible?: boolean;
  onDismiss?: (id?: string) => void;
  className?: string;
}

const typeClasses: Record<string, string> = {
  info: 'bg-blue-500/20 text-blue-700 dark:text-blue-200',
  success: 'bg-green-500/20 text-green-700 dark:text-green-200',
  warning: 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-200',
  error: 'bg-red-500/20 text-red-700 dark:text-red-200',
};

export const Banner: React.FC<BannerProps> = ({
  id,
  type = 'info',
  title,
  content,
  url,
  dismissible = true,
  onDismiss,
  className = 'mx-2 px-2 rounded-lg',
}) => {
  const [dismissed, setDismissed] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.(id);
  };
  
  if (dismissed || !mounted) return null;
  
  return (
    <div
      className={`
        ${className}
        top-0 left-0 right-0 py-1 flex justify-center items-center relative
        border border-transparent text-gray-800 dark:text-gray-100
        bg-transparent backdrop-blur-xl z-30
      `}
    >
      <div className="flex flex-col md:flex-row md:items-center flex-1 text-sm w-fit gap-1.5">
        <div className="flex justify-between self-start">
          <div
            className={`
              text-xs font-semibold w-fit px-2 rounded-sm uppercase
              line-clamp-1 mr-0.5 ${typeClasses[type] || typeClasses.info}
            `}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </div>
          
          {url && (
            <div className="flex md:hidden group w-fit md:items-center">
              <a
                className="text-gray-700 dark:text-white text-xs font-semibold underline"
                href={url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn More
              </a>
              <div className="ml-1 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex-1 text-xs text-gray-700 dark:text-white max-h-60 overflow-y-auto">
          <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br>') }} />
        </div>
      </div>
      
      {url && (
        <div className="hidden md:flex group w-fit md:items-center">
          <a
            className="text-gray-700 dark:text-white text-xs font-semibold underline"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More
          </a>
          <div className="ml-1 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      )}
      
      {dismissible && (
        <div className="flex self-start">
          <button
            type="button"
            onClick={handleDismiss}
            className="-mt-1 -mb-2 ml-1.5 mr-1 text-gray-400 hover:text-gray-600 dark:hover:text-white text-xl"
            aria-label="Close Banner"
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};
