'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Sun, Moon, Monitor, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavLink {
  label: string;
  href: string;
  section: string | null;
  subpageHref?: string;
  external?: boolean;
}

const navLinks: NavLink[] = [
  { label: 'Home', href: '/#hero', section: 'hero' },
  { label: 'Career', href: '/#career', section: 'career' },
  { label: 'Portfolio', href: '/#portfolio', section: 'portfolio' },
  { label: 'Connect', href: '/#available-for', section: 'available-for' },
  { label: 'Blogs', href: '/#blogs', section: 'blogs', subpageHref: '/blogs' },
  { label: "Reading's", href: '/readings', section: null },
  { label: 'Toolbox', href: '/toolbox', section: null },
];


type Theme = 'light' | 'dark' | 'system';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const isHomepage = pathname === '/';

  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll detection for glassmorphism effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for active section tracking (homepage only)
  useEffect(() => {
    if (!isHomepage) return;

    const sections = ['hero', 'career', 'portfolio', 'available-for', 'blogs'];
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [isHomepage]);

  const cycleTheme = useCallback(() => {
    const order: Theme[] = ['light', 'dark', 'system'];
    const currentIndex = order.indexOf((theme as Theme) ?? 'system');
    setTheme(order[(currentIndex + 1) % order.length]);
  }, [theme, setTheme]);

  const ThemeIcon =
    !mounted ? Monitor : theme === 'light' ? Sun : theme === 'dark' ? Moon : Monitor;

  const getLinkHref = (link: (typeof navLinks)[number]) => {
    if (!isHomepage && link.subpageHref) return link.subpageHref;
    return link.href;
  };

  const isActive = (link: (typeof navLinks)[number]) => {
    if (link.section && isHomepage) return activeSection === link.section;
    if (link.href === '/toolbox') return pathname === '/toolbox';
    if (link.href === '/readings') return pathname === '/readings';
    if (link.subpageHref === '/blogs')
      return pathname.startsWith('/blogs');
    return false;
  };

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'backdrop-blur-md bg-background/80 border-b border-border/50 shadow-sm'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="flex-shrink-0 group"
              aria-label="siRizqi Home"
            >
              <span className="text-xl font-bold tracking-tight">
                <span className="text-gradient">si</span>
                <span className="text-foreground">Rizqi</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={getLinkHref(link)}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className={cn(
                    'relative px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200',
                    isActive(link)
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  )}
                >
                  {link.label}
                  {isActive(link) && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500"
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-2">
              {/* Theme toggle */}
              <button
                onClick={cycleTheme}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                aria-label={`Current theme: ${theme ?? 'system'}. Click to cycle.`}
                id="theme-toggle"
              >
                <ThemeIcon className="w-4 h-4" />
              </button>

              {/* Mobile hamburger */}
              <button
                className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                id="mobile-menu-toggle"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-card border-l border-border shadow-2xl md:hidden"
            >
              <div className="flex flex-col h-full p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <span className="text-lg font-bold">
                    <span className="text-gradient">si</span>
                    <span>Rizqi</span>
                  </span>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="p-2 rounded-lg hover:bg-muted transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Links */}
                <nav className="flex flex-col gap-1 flex-1">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={getLinkHref(link)}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noopener noreferrer' : undefined}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          'flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                          isActive(link)
                            ? 'bg-primary/10 text-primary font-semibold'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Footer */}
                <div className="pt-6 border-t border-border">
                  <p className="text-xs text-muted-foreground text-center">
                    © 2026 siRizqi
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
