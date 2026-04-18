'use client';

import { cn } from '@/lib/utils';

interface BackgroundGradientProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
}

export function BackgroundGradient({
  children,
  className,
  containerClassName,
  animate = true,
}: BackgroundGradientProps) {
  return (
    <div className={cn('relative group/card', containerClassName)}>
      {/* Gradient border glow */}
      <div
        className={cn(
          'absolute -inset-px rounded-2xl opacity-50 group-hover/card:opacity-100 transition-opacity duration-500',
          animate && 'animate-pulse',
          'bg-gradient-to-r from-indigo-500 via-cyan-400 to-violet-500'
        )}
        style={{ filter: 'blur(2px)' }}
      />
      <div
        className={cn(
          'relative rounded-2xl bg-card text-card-foreground',
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}

interface GradientBorderCardProps {
  children: React.ReactNode;
  className?: string;
  featured?: boolean;
}

export function GradientBorderCard({
  children,
  className,
  featured = false,
}: GradientBorderCardProps) {
  return (
    <div
      className={cn(
        'relative rounded-2xl p-px',
        featured
          ? 'bg-gradient-to-br from-indigo-500 via-cyan-400 to-violet-500 shadow-xl shadow-indigo-500/25'
          : 'bg-gradient-to-br from-border via-border to-border hover:from-indigo-400 hover:via-cyan-400 hover:to-violet-400 transition-all duration-500',
        className
      )}
    >
      <div className={cn('relative rounded-[calc(theme(borderRadius.2xl)-1px)] h-full', featured ? 'bg-card' : 'bg-card')}>
        {children}
      </div>
    </div>
  );
}
