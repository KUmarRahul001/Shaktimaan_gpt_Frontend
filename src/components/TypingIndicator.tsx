import React from 'react';
import { cn } from '../lib/utils';

export function TypingIndicator() {
  return (
    <div className="flex items-center space-x-2 p-2 bg-white dark:bg-gray-800 rounded-lg max-w-fit">
      <div className="flex space-x-1">
        {[1, 2, 3].map((dot) => (
          <div
            key={dot}
            className={cn(
              "w-2 h-2 rounded-full bg-purple-600 dark:bg-purple-400",
              "animate-bounce",
              dot === 2 && "animation-delay-200",
              dot === 3 && "animation-delay-400"
            )}
          />
        ))}
      </div>
      <span className="text-sm text-gray-500 dark:text-gray-400">
        ShaktimaanGPT is typing...
      </span>
    </div>
  );
}