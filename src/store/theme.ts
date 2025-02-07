import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'system';

type ThemeStore = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const useTheme = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'system',
      setTheme: (theme) => {
        set({ theme });
        
        // Remove both classes first
        document.documentElement.classList.remove('light', 'dark');
        
        // Apply the appropriate theme
        if (theme === 'system') {
          const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light';
          document.documentElement.classList.add(systemTheme);
        } else {
          document.documentElement.classList.add(theme);
        }
      },
    }),
    {
      name: 'theme-storage',
      onRehydrateStorage: () => (state) => {
        // Apply theme on page load
        if (state) {
          state.setTheme(state.theme);
        }
      },
    }
  )
);