'use client';

import { cn } from '@/lib/utils';

interface BackgroundBeamsProps {
  children: React.ReactNode;
  className?: string;
}

export function BackgroundBeams({ children, className }: BackgroundBeamsProps) {
  return (
    <section className={cn('relative overflow-hidden bg-background', className)}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Beam effects */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-indigo-500/40 to-transparent" />
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/40 to-transparent" />
        <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-violet-500/40 to-transparent" />
        {/* Horizontal glow at top */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent" />
        {/* Corner glows */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(79,70,229,0.05),transparent_70%)]" />
      </div>
      <div className="relative z-10">{children}</div>
    </section>
  );
}

interface WavyBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export function WavyBackground({ children, className }: WavyBackgroundProps) {
  return (
    <section className={cn('relative overflow-hidden', className)}>
      <div className="absolute inset-0">
        <svg
          className="absolute bottom-0 left-0 w-full opacity-10 dark:opacity-5"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4f46e5" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
          <path
            fill="url(#wave-gradient)"
            d="M0,160L48,149.3C96,139,192,117,288,128C384,139,480,181,576,181.3C672,181,768,139,864,128C960,117,1056,139,1152,138.7C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
          <path
            fill="url(#wave-gradient)"
            fillOpacity="0.5"
            d="M0,224L48,202.7C96,181,192,139,288,138.7C384,139,480,181,576,197.3C672,213,768,203,864,186.7C960,171,1056,149,1152,154.7C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-indigo-50/10 to-cyan-50/5 dark:from-background dark:via-indigo-950/10 dark:to-cyan-950/5" />
      </div>
      <div className="relative z-10">{children}</div>
    </section>
  );
}
