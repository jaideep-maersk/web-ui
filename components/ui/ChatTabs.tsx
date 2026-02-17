import React, { useState } from 'react';

export interface ChatTab {
  id: string;
  title: string;
  icon?: React.ReactNode;
  unreadCount?: number;
  closeable?: boolean;
}

export interface ChatTabsProps extends React.HTMLAttributes<HTMLDivElement> {
  tabs: ChatTab[];
  activeTabId: string;
  onTabChange: (tabId: string) => void;
  onTabClose?: (tabId: string) => void;
  maxVisibleTabs?: number;
}

export const ChatTabs: React.FC<ChatTabsProps> = ({
  tabs,
  activeTabId,
  onTabChange,
  onTabClose,
  maxVisibleTabs = 10,
  className = '',
  ...props
}) => {
  const [showOverflow, setShowOverflow] = useState(false);
  
  const visibleTabs = tabs.slice(0, maxVisibleTabs);
  const overflowTabs = tabs.slice(maxVisibleTabs);
  const hasOverflow = overflowTabs.length > 0;

  return (
    <div className={`flex items-center border-b border-gray-200 dark:border-gray-700 ${className}`} {...props}>
      <div className="flex-1 flex items-center overflow-x-auto scrollbar-thin">
        {visibleTabs.map((tab) => (
          <div
            key={tab.id}
            className={`group relative flex items-center gap-2 px-4 py-2 cursor-pointer transition-colors border-b-2 whitespace-nowrap ${
              activeTabId === tab.id
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                : 'border-transparent hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
            }`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.icon && <span className="text-sm">{tab.icon}</span>}
            <span className="text-sm font-medium">{tab.title}</span>
            {tab.unreadCount && tab.unreadCount > 0 && (
              <span className="flex items-center justify-center min-w-[18px] h-[18px] px-1 text-xs font-bold text-white bg-red-500 rounded-full">
                {tab.unreadCount > 99 ? '99+' : tab.unreadCount}
              </span>
            )}
            {tab.closeable && onTabClose && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onTabClose(tab.id);
                }}
                className="opacity-0 group-hover:opacity-100 ml-1 p-0.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-opacity"
                aria-label={`Close ${tab.title}`}
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>
      
      {hasOverflow && (
        <div className="relative">
          <button
            onClick={() => setShowOverflow(!showOverflow)}
            className="px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
            aria-label="Show more tabs"
          >
            +{overflowTabs.length}
          </button>
          {showOverflow && (
            <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
              {overflowTabs.map((tab) => (
                <div
                  key={tab.id}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 text-sm"
                  onClick={() => {
                    onTabChange(tab.id);
                    setShowOverflow(false);
                  }}
                >
                  {tab.title}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
