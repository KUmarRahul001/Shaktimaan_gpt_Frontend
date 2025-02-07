import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../store/theme';
import { cn } from '../lib/utils';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="relative group">
      <div className="flex items-center gap-1 p-1 md:p-1.5 rounded-full glass-morphism border border-gray-200 dark:border-gray-700 shadow-lg">
        <button
          onClick={() => setTheme('light')}
          className={cn(
            "p-1.5 md:p-2 rounded-full transition-all duration-300",
            theme === 'light' 
              ? "bg-primary text-white shadow-lg scale-110" 
              : "text-gray-500 hover:text-primary hover:bg-primary/10"
          )}
          aria-label="Light mode"
        >
          <Sun className="h-3.5 w-3.5 md:h-4 md:w-4" />
          <span className="sr-only">Light Mode</span>
        </button>
        <button
          onClick={() => setTheme('dark')}
          className={cn(
            "p-1.5 md:p-2 rounded-full transition-all duration-300",
            theme === 'dark'
              ? "bg-secondary text-white shadow-lg scale-110"
              : "text-gray-500 hover:text-secondary hover:bg-secondary/10"
          )}
          aria-label="Dark mode"
        >
          <Moon className="h-3.5 w-3.5 md:h-4 md:w-4" />
          <span className="sr-only">Dark Mode</span>
        </button>
        <button
          onClick={() => setTheme('system')}
          className={cn(
            "p-1.5 md:p-2 rounded-full transition-all duration-300",
            theme === 'system'
              ? "bg-accent text-accent-foreground shadow-lg scale-110"
              : "text-gray-500 hover:text-accent hover:bg-accent/10"
          )}
          aria-label="System theme"
        >
          <Monitor className="h-3.5 w-3.5 md:h-4 md:w-4" />
          <span className="sr-only">System Theme</span>
        </button>
      </div>
      <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1 rounded glass-morphism text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
        Current theme: {theme.charAt(0).toUpperCase() + theme.slice(1)}
      </div>
    </div>
  );
}