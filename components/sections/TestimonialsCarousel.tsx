'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { getInitials, hashColor } from '@/lib/utils';
import type { TestimonialData } from '@/lib/contentful';
import type { Document } from '@contentful/rich-text-types';

interface TestimonialsCarouselProps {
  testimonials: TestimonialData[];
}

function TestimonialCard({ testimonial }: { testimonial: TestimonialData }) {
  const initials = getInitials(testimonial.name);
  const colorClass = hashColor(testimonial.name);

  return (
    <div className="flex-[0_0_100%] md:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)] min-w-0 px-2">
      <motion.div
        className="h-full bg-card border border-border rounded-2xl p-6 hover:border-indigo-500/30 hover:shadow-lg transition-all duration-300"
        whileHover={{ y: -4 }}
      >
        {/* Quote mark */}
        <div className="text-4xl text-indigo-500/20 font-serif leading-none mb-3">&quot;</div>

        {/* Testimonial */}
        <div className="text-sm text-muted-foreground leading-relaxed mb-6 prose prose-sm dark:prose-invert max-w-none">
          {testimonial.testimonial
            ? documentToReactComponents(testimonial.testimonial as Document)
            : <p className="italic">No testimonial content.</p>
          }
        </div>

        {/* Author */}
        <div className="flex items-center gap-3 mt-auto">
          <div
            className={`w-10 h-10 rounded-xl ${colorClass} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}
          >
            {initials}
          </div>
          <div>
            <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
            <p className="text-xs text-muted-foreground">
              {testimonial.jobTittle} · {testimonial.companyName}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    onSelect();
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi, onSelect]);

  if (testimonials.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-8">No testimonials yet.</p>
    );
  }

  return (
    <div className="w-full">
      <div ref={emblaRef} className="overflow-hidden -mx-2">
        <div className="flex">
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {scrollSnaps.map((_, idx) => (
          <button
            key={idx}
            id={`testimonial-dot-${idx}`}
            onClick={() => emblaApi?.scrollTo(idx)}
            aria-label={`Go to testimonial ${idx + 1}`}
            className={`rounded-full transition-all duration-300 ${
              idx === selectedIndex
                ? 'w-6 h-2 bg-indigo-500'
                : 'w-2 h-2 bg-border hover:bg-muted-foreground/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
