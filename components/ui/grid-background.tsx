'use client';

import { cn } from '@/lib/utils';

interface GridBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export function GridBackground({ children, className }: GridBackgroundProps) {
  return (
    <section className={cn('relative overflow-hidden', className)}>
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-30 dark:opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(79, 70, 229, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(79, 70, 229, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(79,70,229,0.15),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(79,70,229,0.2),rgba(0,0,0,0))]" />
      <div className="relative z-10">{children}</div>
    </section>
  );
}

interface DotBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export function DotBackground({ children, className }: DotBackgroundProps) {
  return (
    <section className={cn('relative overflow-hidden', className)}>
      <div
        className="absolute inset-0 opacity-40 dark:opacity-20"
        style={{
          backgroundImage: 'radial-gradient(rgba(79, 70, 229, 0.4) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(255,255,255,0.9),transparent)] dark:bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(0,0,0,0.5),transparent)]" />
      <div className="relative z-10">{children}</div>
    </section>
  );
}
