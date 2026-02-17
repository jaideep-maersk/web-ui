import React from 'react';

export interface WelcomeMessageProps {
  title?: string;
  subtitle?: string;
  icon?: string;
  features?: string[];
  className?: string;
}

export const WelcomeMessage: React.FC<WelcomeMessageProps> = ({
  title = 'Welcome to Chat',
  subtitle = 'Start a conversation to get help with anything',
  icon = '👋',
  features = [],
  className = '',
}) => {
  return (
    <div className={`text-center py-12 px-4 max-w-2xl mx-auto ${className}`}>
      {/* Icon */}
      <div className="text-6xl mb-6 animate-bounce">{icon}</div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
        {title}
      </h1>

      {/* Subtitle */}
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        {subtitle}
      </p>

      {/* Features */}
      {features.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
            >
              <p className="text-sm text-gray-700 dark:text-gray-300">{feature}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
