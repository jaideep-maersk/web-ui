import React from 'react';

interface OverlayProps {
  isOpen: boolean;
  onClose?: () => void;
  className?: string;
  zIndex?: string;
}

export const Overlay: React.FC<OverlayProps> = ({
  isOpen,
  onClose,
  className = '',
  zIndex = 'z-40',
}) => {
  if (!isOpen) return null;
  
  return (
    <div
      className={`fixed inset-0 bg-black/60 transition-opacity ${zIndex} ${className}`}
      onClick={onClose}
      role="presentation"
      aria-hidden="true"
    />
  );
};
