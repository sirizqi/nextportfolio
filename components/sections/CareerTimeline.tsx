'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import { GridBackground } from '@/components/ui/grid-background';
import { calculateDuration, formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import type { ExperienceData } from '@/lib/contentful';

interface CareerTimelineProps {
  experiences: ExperienceData[];
}

function ExperienceCard({
  exp,
  side,
}: {
  exp: ExperienceData;
  side: 'left' | 'right';
}) {
  const [expanded, setExpanded] = useState(false);

  const initials = (exp.companyName ?? 'CO')
    .split(' ')
    .slice(0, 2)
    .map((w: string) => w[0])
    .join('')
    .toUpperCase();

  const jobdesk = exp.jobdesk ?? '';
  const preview = jobdesk.slice(0, 200);
  const hasMore = jobdesk.length > 200;
  const isPresent = !exp.dateEnd;

  return (
    <motion.div
      className={`flex md:w-[calc(50%-2rem)] ${side === 'right' ? 'md:ml-auto' : ''}`}
      initial={{ opacity: 0, x: side === 'left' ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      whileHover={{ scale: 1.01 }}
    >
      <div className="w-full bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-indigo-500/30 transition-all duration-300 group">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            {exp.companyLogoUrl ? (
              <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-border">
                <Image
                  src={exp.companyLogoUrl}
                  alt={`${exp.companyName ?? 'Company'} logo`}
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                {initials}
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            {/* Position */}
            <h3 className="text-lg font-bold text-foreground group-hover:text-gradient transition-all">
              {exp.position}
            </h3>

            {/* Company */}
            <p className="text-sm font-medium text-muted-foreground">
              {exp.companyName}
              {exp.companyAlias && (
                <span className="text-muted-foreground/70"> ({exp.companyAlias})</span>
              )}
            </p>

            {/* Address */}
            {exp.companyAddress && (
              <div className="flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3 text-muted-foreground/60" />
                <p className="text-xs text-muted-foreground/70">{exp.companyAddress}</p>
              </div>
            )}
          </div>
        </div>

        {/* Dates & Duration */}
        <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
          <span>
            {exp.dateStart ? formatDate(exp.dateStart) : '—'}
            {' → '}
            {isPresent ? (
              <span className="text-emerald-500 font-semibold">Present</span>
            ) : (
              exp.dateEnd && formatDate(exp.dateEnd)
            )}
          </span>
          {exp.dateStart && <span className="text-muted-foreground/50">·</span>}
          {exp.dateStart && (
            <span className="font-medium text-foreground/70">
              {calculateDuration(exp.dateStart, exp.dateEnd ?? undefined)}
            </span>
          )}
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {exp.jobType && (
            <Badge variant="secondary" className="text-xs">
              {exp.jobType}
            </Badge>
          )}
          {exp.jobArrangement && (
            <Badge
              variant="outline"
              className="text-xs border-indigo-500/30 text-indigo-500 dark:text-indigo-400"
            >
              {exp.jobArrangement}
            </Badge>
          )}
          {isPresent && (
            <Badge className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
              Current
            </Badge>
          )}
        </div>

        {/* Jobdesk */}
        {jobdesk && (
          <div>
            <AnimatePresence initial={false}>
              <motion.div
                animate={{ height: expanded ? 'auto' : undefined }}
                className="overflow-hidden"
              >
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {expanded ? jobdesk : preview}
                  {!expanded && hasMore && '...'}
                </p>
              </motion.div>
            </AnimatePresence>

            {hasMore && (
              <button
                onClick={() => setExpanded(!expanded)}
                id={`expand-${exp.id}`}
                className="mt-2 flex items-center gap-1 text-xs font-medium text-indigo-500 hover:text-indigo-400 transition-colors"
              >
                {expanded ? (
                  <>Show less <ChevronUp className="w-3 h-3" /></>
                ) : (
                  <>Read more → <ChevronDown className="w-3 h-3" /></>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function CareerTimeline({ experiences }: CareerTimelineProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start center', 'end center'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <GridBackground>
      <section id="career" ref={sectionRef} className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <motion.div
            className="text-center mb-16 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              My <span className="text-gradient">Career Path</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              Hi, this is the story of my professional journey across various fields and
              positions. It may look diverse, but every role reflects the passions and
              talents I&apos;ve dedicated myself to over the years.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line (desktop) */}
            <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border/50">
              {/* Lightsaber animated line */}
              <motion.div
                className="absolute top-0 left-0 w-full origin-top"
                style={{
                  height: lineHeight,
                  background: 'linear-gradient(to bottom, #4f46e5, #06b6d4)',
                  boxShadow: '0 0 12px #4f46e5, 0 0 24px #06b6d4, 0 0 4px #fff',
                }}
              />
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-8 md:gap-12">
              {experiences.map((exp, idx) => (
                <div key={exp.id} className="relative flex flex-col md:flex-row items-start md:items-center gap-4">
                  {/* Timeline dot (desktop) */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10">
                    <motion.div
                      className="w-4 h-4 rounded-full border-2 border-background"
                      style={{
                        background: 'linear-gradient(135deg, #4f46e5, #06b6d4)',
                        boxShadow: '0 0 8px #4f46e5, 0 0 16px #06b6d4',
                      }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                    />
                  </div>

                  {/* Card */}
                  <ExperienceCard
                    exp={exp}
                    side={idx % 2 === 0 ? 'left' : 'right'}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </GridBackground>
  );
}
