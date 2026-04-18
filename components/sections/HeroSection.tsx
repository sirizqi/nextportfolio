'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { SiWhatsapp } from 'react-icons/si';

const rotatingTitles = [
  'Product Manager',
  'Software Engineer',
  'Product Designer',
  'Teacher',
];

export default function HeroSection() {
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % rotatingTitles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <AuroraBackground>
      <section
        id="hero"
        className="min-h-screen flex items-center pt-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16">
            {/* LEFT — Text Content */}
            <motion.div
              className="flex-1 text-center md:text-left"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              {/* Eyebrow */}
              <motion.p
                className="text-sm font-medium text-muted-foreground mb-3 tracking-widest uppercase"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Hello, I&apos;m
              </motion.p>

              {/* Name */}
              <motion.h1
                className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="text-gradient">Rizqi</span>
                <br />
                <span className="text-foreground">Sarasajati</span>
              </motion.h1>

              {/* Rotating title */}
              <motion.div
                className="h-12 flex items-center justify-center md:justify-start mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <span className="text-xl sm:text-2xl text-muted-foreground font-medium mr-2">
                  You can call me Rizqi or Jati, I&apos;m a professional in
                </span>
                <div className="relative h-10 overflow-hidden flex items-center">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={titleIndex}
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -30, opacity: 0 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      className="text-xl sm:text-2xl font-bold text-gradient whitespace-nowrap"
                    >
                      {rotatingTitles[titleIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Link
                  href="/#portfolio"
                  id="cta-view-work"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl border-2 border-indigo-500/50 text-foreground font-semibold text-sm hover:border-indigo-500 hover:bg-indigo-500/10 transition-all duration-200"
                >
                  View My Work
                </Link>
                <a
                  href="https://wa.me/6285882266490"
                  id="cta-whatsapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold text-sm hover:from-indigo-600 hover:to-cyan-600 transition-all duration-200 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5"
                >
                  <SiWhatsapp className="w-4 h-4" />
                  Let&apos;s Connect
                </a>
              </motion.div>

              {/* Stats */}
              <motion.div
                className="flex items-center gap-8 mt-10 justify-center md:justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                {[
                  { value: '9+', label: 'Years Exp.' },
                  { value: '15+', label: 'Speaking Events' },
                  { value: '10+', label: 'Products Built' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center md:text-left">
                    <p className="text-2xl font-bold text-gradient">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* RIGHT — Profile Photo */}
            <motion.div
              className="flex-shrink-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="relative group">
                {/* Outer glow ring */}
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-indigo-500 via-cyan-400 to-violet-500 opacity-50 group-hover:opacity-80 blur-md transition-all duration-500" />
                {/* Image container */}
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl overflow-hidden border-2 border-white/20 dark:border-white/10">
                  <Image
                    src="/images/profile.png"
                    alt="Rizqi Sarasajati — Product Manager, Software Engineer, Designer"
                    fill
                    sizes="(max-width: 640px) 256px, 320px"
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    priority
                  />
                </div>
                {/* Floating badge */}
                <motion.div
                  className="absolute -bottom-4 -right-4 bg-card border border-border rounded-xl px-3 py-2 shadow-xl"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <p className="text-xs font-semibold text-foreground">
                    🚀 Available Now
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </AuroraBackground>
  );
}
