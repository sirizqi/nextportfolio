'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AuroraBackgroundProps {
  children: React.ReactNode;
  className?: string;
  showRadialGradient?: boolean;
}

export function AuroraBackground({
  children,
  className,
  showRadialGradient = true,
}: AuroraBackgroundProps) {
  return (
    <div
      className={cn(
        'relative flex flex-col min-h-screen bg-zinc-50 dark:bg-zinc-950 text-slate-950 transition-bg overflow-hidden',
        className
      )}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(
            'pointer-events-none absolute -inset-[10px] opacity-50 dark:opacity-30',
            showRadialGradient &&
              '[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]'
          )}
        >
          {/* Aurora layers */}
          <div className="absolute inset-0 animate-[aurora_8s_ease_infinite_alternate] bg-[linear-gradient(110deg,#4f46e5,45%,#06b6d4,55%,#7c3aed)] dark:bg-[linear-gradient(110deg,#4f46e5,45%,#06b6d4,55%,#7c3aed)] blur-[80px] opacity-60" />
          <div className="absolute inset-0 animate-[aurora_12s_ease_infinite_alternate-reverse] bg-[linear-gradient(110deg,#ec4899,30%,#4f46e5,70%)] blur-[100px] opacity-30 translate-y-8" />
          <div className="absolute inset-0 animate-[aurora_10s_ease_infinite_alternate] bg-[linear-gradient(110deg,#06b6d4,20%,#7c3aed,80%)] blur-[120px] opacity-20 -translate-y-4" />
        </div>
      </div>
      <style>{`
        @keyframes aurora {
          0% { transform: translateX(-10%) rotate(-5deg); }
          50% { transform: translateX(5%) rotate(3deg) scaleY(1.1); }
          100% { transform: translateX(10%) rotate(5deg); }
        }
      `}</style>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function AuroraSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn('relative overflow-hidden', className)}>
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 via-indigo-50/30 to-cyan-50/30 dark:from-zinc-950 dark:via-indigo-950/30 dark:to-cyan-950/30" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-indigo-400/10 dark:bg-indigo-600/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-cyan-400/10 dark:bg-cyan-600/10 blur-3xl" />
      </div>
      <div className="relative z-10">{children}</div>
    </section>
  );
}
