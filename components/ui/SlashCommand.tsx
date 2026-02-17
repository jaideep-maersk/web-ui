import React, { useState, useEffect } from 'react';

export interface Command {
  id: string;
  name: string;
  description: string;
  icon?: React.ReactNode;
}

export interface SlashCommandProps {
  value: string;
  onChange: (value: string) => void;
  onCommand?: (command: Command) => void;
  commands?: Command[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export const SlashCommand: React.FC<SlashCommandProps> = ({
  value,
  onChange,
  onCommand,
  commands = [],
  placeholder = 'Type / for commands...',
  disabled = false,
  className = '',
}) => {
  const [showCommands, setShowCommands] = useState(false);
  const [filteredCommands, setFilteredCommands] = useState<Command[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    // Check for / symbol and filter commands
    if (value.startsWith('/')) {
      const query = value.slice(1);
      const filtered = commands.filter(c =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCommands(filtered);
      setShowCommands(filtered.length > 0);
    } else {
      setShowCommands(false);
    }
  }, [value, commands]);

  const handleSelectCommand = (command: Command) => {
    onChange('');
    onCommand?.(command);
    setShowCommands(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showCommands) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
      e.preventDefault();
      handleSelectCommand(filteredCommands[selectedIndex]);
    } else if (e.key === 'Escape') {
      setShowCommands(false);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      />
      
      {showCommands && (
        <div className="absolute z-10 mt-1 w-full max-h-60 overflow-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          {filteredCommands.map((command, index) => (
            <button
              key={command.id}
              onClick={() => handleSelectCommand(command)}
              className={`w-full text-left px-3 py-2 flex items-start gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                index === selectedIndex ? 'bg-gray-100 dark:bg-gray-700' : ''
              }`}
            >
              {command.icon && (
                <div className="mt-0.5 text-gray-500 dark:text-gray-400">
                  {command.icon}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 dark:text-gray-100">
                  /{command.name}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {command.description}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
