import React, { useState } from 'react';
import { Modal } from './Modal';
import { Input } from './Input';
import { Button } from './Button';

interface InputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (value: string) => void;
  title: string;
  placeholder?: string;
  defaultValue?: string;
  inputType?: 'text' | 'email' | 'password' | 'url';
  confirmText?: string;
  cancelText?: string;
}

export const InputModal: React.FC<InputModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  placeholder = '',
  defaultValue = '',
  inputType = 'text',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
}) => {
  const [value, setValue] = useState(defaultValue);
  
  const handleConfirm = () => {
    onConfirm(value);
    setValue('');
    onClose();
  };
  
  const handleClose = () => {
    setValue(defaultValue);
    onClose();
  };
  
  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={title} size="md">
      <div className="space-y-4">
        <Input
          type={inputType}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleConfirm();
            }
          }}
        />
        
        <div className="flex gap-2 justify-end">
          <Button variant="secondary" onClick={handleClose}>
            {cancelText}
          </Button>
          <Button onClick={handleConfirm} disabled={!value.trim()}>
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
