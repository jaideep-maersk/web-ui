import React, { useEffect, useState } from 'react';

interface HotkeyHintProps {
  keys: string[];
  className?: string;
}

export const HotkeyHint: React.FC<HotkeyHintProps> = ({
  keys,
  className = '',
}) => {
  const [isMac, setIsMac] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setIsMac(/Mac/i.test(navigator.userAgent));
    setMounted(true);
  }, []);

  const formatKey = (key: string): string => {
    const lowerKey = key.toLowerCase();

    if (lowerKey === 'mod') return isMac ? '⌘' : 'Ctrl';
    if (lowerKey === 'shift') return isMac ? '⇧' : 'Shift';
    if (lowerKey === 'alt') return isMac ? '⌥' : 'Alt';
    if (lowerKey === 'ctrl') return isMac ? '⌃' : 'Ctrl';
    if (lowerKey.startsWith('key')) return key.slice(-1);

    return key;
  };

  if (!mounted) return null;

  return (
    <div
      className={`hidden md:flex items-center self-center text-xs text-gray-400 dark:text-gray-600 ${className}`}
    >
      <span>{keys.map(formatKey).join(isMac ? ' ' : '+')}</span>
    </div>
  );
};
