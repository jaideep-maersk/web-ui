import React from 'react';

export interface VoiceButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isRecording?: boolean;
  onToggle?: () => void;
  disabled?: boolean;
}

export const VoiceButton: React.FC<VoiceButtonProps> = ({
  isRecording = false,
  onToggle,
  disabled = false,
  className = '',
  ...props
}) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      className={`inline-flex items-center justify-center p-2 rounded-lg transition-all
        ${disabled 
          ? 'text-gray-400 cursor-not-allowed' 
          : isRecording
          ? 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30'
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
        }
        ${className}`}
      aria-label={isRecording ? 'Stop recording' : 'Start voice recording'}
      aria-pressed={isRecording}
      {...props}
    >
      {isRecording ? (
        <svg className="w-5 h-5 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
          <rect x="6" y="4" width="12" height="16" rx="2" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" 
          />
        </svg>
      )}
    </button>
  );
};
