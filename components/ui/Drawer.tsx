import React, { useEffect, useRef, ReactNode } from 'react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
  className = '',
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  return (
    <div
      className="fixed right-0 bottom-0 left-0 z-50 flex h-screen max-h-screen w-full justify-center overflow-hidden bg-black/60"
      onClick={onClose}
    >
      <div
        ref={drawerRef}
        className={`
          mt-auto w-full bg-gray-50 dark:bg-gray-900 dark:text-gray-100
          max-h-screen overflow-y-auto
          ${className}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
