import React from 'react';

export interface InputActionsProps {
  onSubmit?: () => void;
  onClear?: () => void;
  onCancel?: () => void;
  submitLabel?: string;
  clearLabel?: string;
  cancelLabel?: string;
  showSubmit?: boolean;
  showClear?: boolean;
  showCancel?: boolean;
  submitDisabled?: boolean;
  isSubmitting?: boolean;
  className?: string;
}

export const InputActions: React.FC<InputActionsProps> = ({
  onSubmit,
  onClear,
  onCancel,
  submitLabel = 'Send',
  clearLabel = 'Clear',
  cancelLabel = 'Cancel',
  showSubmit = true,
  showClear = true,
  showCancel = false,
  submitDisabled = false,
  isSubmitting = false,
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showCancel && onCancel && (
        <button
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {cancelLabel}
        </button>
      )}
      
      {showClear && onClear && (
        <button
          onClick={onClear}
          disabled={isSubmitting}
          className="px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label={clearLabel}
        >
          {clearLabel}
        </button>
      )}
      
      {showSubmit && onSubmit && (
        <button
          onClick={onSubmit}
          disabled={submitDisabled || isSubmitting}
          className="px-4 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          aria-label={submitLabel}
        >
          {isSubmitting ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Sending...</span>
            </>
          ) : (
            submitLabel
          )}
        </button>
      )}
    </div>
  );
};
