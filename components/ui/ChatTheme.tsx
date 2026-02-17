import React, { useState } from 'react';

export type Theme = 'light' | 'dark' | 'auto';

export interface ChatThemeProps extends React.HTMLAttributes<HTMLDivElement> {
  currentTheme?: Theme;
  onThemeChange?: (theme: Theme) => void;
  showLabel?: boolean;
}

export const ChatTheme: React.FC<ChatThemeProps> = ({
  currentTheme: controlledTheme,
  onThemeChange,
  showLabel = true,
  className = '',
  ...props
}) => {
  const [internalTheme, setInternalTheme] = useState<Theme>('auto');
  
  const currentTheme = controlledTheme !== undefined ? controlledTheme : internalTheme;
  
  const handleThemeChange = (theme: Theme) => {
    if (controlledTheme === undefined) {
      setInternalTheme(theme);
    }
    onThemeChange?.(theme);
  };

  const themes: { value: Theme; label: string; icon: React.ReactNode }[] = [
    {
      value: 'light',
      label: 'Light',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
    },
    {
      value: 'dark',
      label: 'Dark',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      ),
    },
    {
      value: 'auto',
      label: 'Auto',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className={`inline-flex items-center gap-2 ${className}`} {...props}>
      {showLabel && (
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Theme:</span>
      )}
      <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 p-1">
        {themes.map((theme) => (
          <button
            key={theme.value}
            onClick={() => handleThemeChange(theme.value)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              currentTheme === theme.value
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
            aria-label={`Switch to ${theme.label} theme`}
            aria-pressed={currentTheme === theme.value}
          >
            {theme.icon}
            <span className="hidden sm:inline">{theme.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
