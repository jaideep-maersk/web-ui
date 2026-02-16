import React from 'react';
import { Modal } from './Modal';
import { CodeEditor } from './CodeEditor';

interface CodeEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  value: string;
  onChange: (value: string) => void;
  title?: string;
  language?: string;
  onSave?: () => void;
  saveLabel?: string;
}

export const CodeEditorModal: React.FC<CodeEditorModalProps> = ({
  isOpen,
  onClose,
  value,
  onChange,
  title = 'Code Editor',
  language = 'javascript',
  onSave,
  saveLabel = 'Save',
}) => {
  const handleSave = () => {
    if (onSave) {
      onSave();
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          {title}
        </h2>
        
        <CodeEditor
          value={value}
          onChange={onChange}
          language={language}
          minHeight={300}
          maxHeight={500}
        />
        
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            Cancel
          </button>
          {onSave && (
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              {saveLabel}
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};
