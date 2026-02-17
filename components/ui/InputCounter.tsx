import React from 'react';

export interface InputCounterProps {
  current: number;
  max?: number;
  type?: 'characters' | 'words';
  showWarning?: boolean;
  warningThreshold?: number;
  className?: string;
}

export const InputCounter: React.FC<InputCounterProps> = ({
  current,
  max,
  type = 'characters',
  showWarning = true,
  warningThreshold = 0.9,
  className = '',
}) => {
  const percentage = max ? current / max : 0;
  const isWarning = showWarning && max && percentage >= warningThreshold;
  const isOverLimit = max && current > max;

  const getColor = () => {
    if (isOverLimit) return 'text-red-600 dark:text-red-400';
    if (isWarning) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-gray-500 dark:text-gray-400';
  };

  const label = type === 'characters' ? 'chars' : 'words';

  return (
    <div className={`flex items-center gap-1 text-xs ${getColor()} ${className}`}>
      <span>{current}</span>
      {max && (
        <>
          <span>/</span>
          <span>{max}</span>
        </>
      )}
      <span className="text-gray-400 dark:text-gray-500">{label}</span>
      {isOverLimit && (
        <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      )}
    </div>
  );
};
