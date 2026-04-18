'use client';

import { motion } from 'framer-motion';
import { Mic2, GraduationCap, Laptop, Check, ExternalLink } from 'lucide-react';
import { SparklesCore } from '@/components/ui/sparkles-core';
import { GradientBorderCard } from '@/components/ui/background-gradient';
import { useTheme } from 'next-themes';
import type { ServiceCard } from '@/types';

const LucideIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Mic2,
  GraduationCap,
  Laptop,
};

const services: ServiceCard[] = [
  {
    icon: 'Mic2',
    title: 'Speaker',
    highlighted: true,
    badge: 'Most Requested',
    stat: '15+ Speaking Events',
    description: 'Available for community, student, and corporate events.',
    points: [
      'Free for community / student events (limited slots available)',
      'Regional · National · International scales',
      'Topics: Product Management, UI/UX Design, Career Path',
    ],
    pricing: 'Contact for pricing',
    cta: 'Book a Session',
    ctaUrl: 'https://wa.me/6285882266490',
  },
  {
    icon: 'GraduationCap',
    title: 'Training & Mentorship',
    highlighted: false,
    description: 'Mentorship and training sessions for teams or individuals.',
    points: [
      'Product Manager & Design core skills',
      'Data Analysis for Product People',
      'Career Preparation & Portfolio Review',
    ],
    pricing: 'Starting from negotiable',
    cta: 'Start Learning',
    ctaUrl: 'https://wa.me/6285882266490',
  },
  {
    icon: 'Laptop',
    title: 'Project Consulting',
    highlighted: false,
    description: 'Consulting and end-to-end implementation for your product needs.',
    points: [
      'End-to-end Product Management',
      'Product Design (UI/UX) & Prototyping',
      'Full-stack Web Development',
    ],
    pricing: 'Project-based pricing',
    cta: 'Discuss Project',
    ctaUrl: 'https://wa.me/6285882266490',
  },
];

export default function AvailableForSection() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <section id="available-for" className="relative py-20 md:py-32 overflow-hidden">
      {/* SparklesCore background */}
      <div className="absolute inset-0">
        <SparklesCore
          id="sparkles-available"
          background="transparent"
          particleColor={isDark ? '#818cf8' : '#4f46e5'}
          particleDensity={1400}
          minSize={0.3}
          maxSize={0.8}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Services <span className="text-gradient">I Offer</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Here are the services I provide. Don&apos;t hesitate to reach out if you need
            any of these.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {services.map((service) => {
            const Icon = LucideIcons[service.icon] ?? Mic2;
            return (
              <motion.div
                key={service.title}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
              >
                <GradientBorderCard featured={service.highlighted} className="h-full">
                  <div className="p-6 flex flex-col h-full">
                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {service.highlighted && service.badge && (
                        <span className="text-xs px-2.5 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold">
                          {service.badge}
                        </span>
                      )}
                      {service.highlighted && service.stat && (
                        <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 font-medium">
                          {service.stat}
                        </span>
                      )}
                    </div>

                    {/* Icon + Title */}
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          service.highlighted
                            ? 'bg-gradient-to-br from-indigo-500 to-cyan-500'
                            : 'bg-muted'
                        }`}
                      >
                        <Icon
                          className={`w-5 h-5 ${
                            service.highlighted ? 'text-white' : 'text-foreground'
                          }`}
                        />
                      </div>
                      <h3
                        className={`text-lg font-bold ${
                          service.highlighted ? 'text-gradient' : 'text-foreground'
                        }`}
                      >
                        {service.title}
                      </h3>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4">
                      {service.description}
                    </p>

                    {/* Points */}
                    <ul className="space-y-2 flex-1 mb-6">
                      {service.points.map((point) => (
                        <li key={point} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{point}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Pricing */}
                    <p className="text-xs text-muted-foreground mb-4 font-medium italic">
                      {service.pricing}
                    </p>

                    {/* CTA */}
                    <a
                      href={service.ctaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      id={`service-cta-${service.title.toLowerCase().replace(/\s/g, '-')}`}
                      className={`inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        service.highlighted
                          ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white hover:from-indigo-600 hover:to-cyan-600 shadow-lg shadow-indigo-500/25'
                          : 'border border-border hover:border-indigo-500/50 hover:bg-indigo-500/5 text-foreground'
                      }`}
                    >
                      {service.cta}
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </GradientBorderCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
