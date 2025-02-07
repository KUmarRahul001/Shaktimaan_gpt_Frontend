import { type ClassValue } from 'clsx';
import { cn } from '../lib/utils';

type LogoProps = {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

export function Logo({ size = 'md', className }: LogoProps) {
  const sizes = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-12'
  };

  return (
    <div className={cn(
      "flex items-center gap-2",
      "group", // Added for hover effects
      className
    )}>
      <div className="relative">
        <div className={cn(
          "relative z-10 rounded-xl overflow-hidden",
          "shadow-lg transition-transform duration-300",
          "group-hover:scale-105",
          sizes[size]
        )}>
          <svg
            viewBox="0 0 32 32"
            fill="none"
            className={cn(
              "text-white",
              sizes[size]
            )}
          >
            <defs>
              <linearGradient
                id="logoGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="50%" stopColor="hsl(var(--secondary))" />
                <stop offset="100%" stopColor="hsl(var(--accent))" />
              </linearGradient>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
                <feComposite in2="SourceAlpha" operator="in" />
              </filter>
            </defs>
            
            <circle
              cx="16"
              cy="16"
              r="15"
              fill="url(#logoGradient)"
              className="animate-pulse"
              style={{ animationDuration: '3s' }}
            />
            
            <path
              d="M16 7C19.9 7 23 10.1 23 14C23 17.9 19.9 21 16 21M16 7C12.1 7 9 10.1 9 14C9 17.9 12.1 21 16 21M16 7V21M9 14H23"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="opacity-90"
            />
            
            <circle
              cx="16"
              cy="14"
              r="2"
              fill="white"
              filter="url(#glow)"
              className="animate-pulse"
              style={{ animationDuration: '2s' }}
            />
            
            <path
              d="M16 7L23 14L16 21L9 14L16 7Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-80"
            />
          </svg>
        </div>
        
        <div className={cn(
          "absolute -inset-1 rounded-xl",
          "bg-gradient-to-r from-primary/30 via-secondary/30 to-accent/30",
          "blur opacity-75 transition-opacity duration-300",
          "group-hover:opacity-100"
        )} />
      </div>

      <div className="flex flex-col">
        <span className={cn(
          "font-bold tracking-tight",
          "bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent",
          "transition-transform duration-300 group-hover:scale-105",
          size === 'sm' ? 'text-lg' : size === 'md' ? 'text-2xl' : 'text-3xl'
        )}>
          ShaktiMaanGPT
        </span>
        {size === 'lg' && (
          <span className="text-sm text-gray-600 dark:text-gray-300 tracking-wide transition-colors duration-300">
            AI-Powered Intelligence
          </span>
        )}
      </div>
    </div>
  );
}