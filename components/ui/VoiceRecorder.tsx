import React, { useEffect, useState } from 'react';

export interface VoiceRecorderProps {
  isRecording: boolean;
  onStop?: () => void;
  onCancel?: () => void;
  showWaveform?: boolean;
}

export const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
  isRecording,
  onStop,
  onCancel,
  showWaveform = true,
}) => {
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!isRecording) {
      setDuration(0);
      return;
    }

    const timer = setInterval(() => {
      setDuration(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isRecording]);

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isRecording) return null;

  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-red-50 dark:bg-red-900/20 
      border border-red-200 dark:border-red-800 rounded-lg">
      {/* Recording indicator */}
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse" />
        <span className="text-sm font-medium text-red-900 dark:text-red-100">
          Recording
        </span>
      </div>

      {/* Waveform visualization */}
      {showWaveform && (
        <div className="flex items-center gap-0.5 h-8">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="w-1 bg-red-500 dark:bg-red-400 rounded-full"
              style={{
                height: `${Math.random() * 100}%`,
                minHeight: '20%',
                animation: `pulse ${0.5 + Math.random() * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.05}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Duration */}
      <span className="text-sm font-mono text-red-900 dark:text-red-100 ml-auto">
        {formatDuration(duration)}
      </span>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1 text-sm text-gray-700 dark:text-gray-300 
            hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onStop}
          className="px-3 py-1 text-sm bg-red-600 text-white rounded-md 
            hover:bg-red-700 transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
};
