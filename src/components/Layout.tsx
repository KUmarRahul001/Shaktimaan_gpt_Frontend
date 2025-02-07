import { cn } from '../lib/utils';

type LayoutProps = {
  children: React.ReactNode;
  className?: string;
};

export function Layout({ children, className }: LayoutProps) {
  return (
    <div className={cn(
      "min-h-screen w-full",
      "flex flex-col",
      className
    )}>
      {children}
    </div>
  );
}

export function Container({ children, className }: LayoutProps) {
  return (
    <div className={cn(
      "w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
      className
    )}>
      {children}
    </div>
  );
}

export function Paper({ children, className }: LayoutProps) {
  return (
    <div className={cn(
      "rounded-xl shadow-lg overflow-hidden",
      "bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg",
      "border border-gray-200/50 dark:border-gray-700/50",
      "transition-all duration-300",
      "hover:shadow-xl hover:border-primary/20 dark:hover:border-primary/20",
      "p-4 sm:p-6 lg:p-8",
      "my-4 sm:my-6 lg:my-8",
      className
    )}>
      {children}
    </div>
  );
}

export function Grid({ children, className }: LayoutProps) {
  return (
    <div className={cn(
      "grid gap-6 sm:gap-8 lg:gap-10",
      "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      className
    )}>
      {children}
    </div>
  );
}