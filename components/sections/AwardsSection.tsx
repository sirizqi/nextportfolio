'use client';

import { motion } from 'framer-motion';
import { Trophy, Star } from 'lucide-react';
import { BackgroundBeams } from '@/components/ui/background-beams';

const awards = [
  {
    name: 'Mind.ID Goes Digital',
    year: '2022',
    level: 'Finalist',
    description:
      'A national digital innovation competition organized by Mind.ID (Mining Industry Indonesia), challenging participants to develop impactful digital solutions for the mining and energy sector.',
    logo: null,
    orgName: 'Mind.ID',
  },
];

export default function AwardsSection() {
  return (
    <BackgroundBeams>
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Recognition &amp;{' '}
              <span className="text-gradient">Achievements</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Proud moments that marked milestones in my professional journey.
            </p>
          </motion.div>

          {/* Awards */}
          <div className="flex justify-center">
            <div className="grid grid-cols-1 gap-8 max-w-2xl w-full">
              {awards.map((award, i) => (
                <motion.div
                  key={award.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group relative"
                >
                  {/* Shimmer border */}
                  <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-indigo-500 via-cyan-400 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute -inset-px rounded-2xl shimmer opacity-0 group-hover:opacity-30 transition-opacity duration-500" />

                  <div className="relative bg-card border border-border rounded-2xl p-8 text-center">
                    {/* Icon */}
                    <div className="mx-auto mb-6 w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 border border-indigo-500/20 flex items-center justify-center">
                      <Trophy className="w-9 h-9 text-indigo-500" />
                    </div>

                    {/* Award name */}
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {award.name}
                    </h3>

                    {/* Org & Year */}
                    <p className="text-sm text-muted-foreground mb-4">
                      {award.orgName} · {award.year}
                    </p>

                    {/* Level badge */}
                    <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-sm font-semibold mb-4">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      {award.level}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
                      {award.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </BackgroundBeams>
  );
}
