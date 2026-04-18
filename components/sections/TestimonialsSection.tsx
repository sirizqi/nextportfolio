import { Suspense } from 'react';
import { getTestimonials } from '@/lib/contentful';
import { TestimonialsCarousel } from './TestimonialsCarousel';
import { WavyBackground } from '@/components/ui/background-beams';

async function TestimonialsContent() {
  const testimonials = await getTestimonials();
  return <TestimonialsCarousel testimonials={testimonials} />;
}

function TestimonialsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-card border border-border rounded-2xl p-6 animate-pulse"
        >
          <div className="h-4 bg-muted rounded w-full mb-2" />
          <div className="h-4 bg-muted rounded w-5/6 mb-2" />
          <div className="h-4 bg-muted rounded w-4/6 mb-6" />
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-muted" />
            <div className="space-y-1.5">
              <div className="h-3 bg-muted rounded w-24" />
              <div className="h-3 bg-muted rounded w-32" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <WavyBackground>
      <section id="testimonials" className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What <span className="text-gradient">Colleagues Say</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Testimonials from professional colleagues across various projects and
              workplaces.
            </p>
          </div>

          <Suspense fallback={<TestimonialsSkeleton />}>
            <TestimonialsContent />
          </Suspense>
        </div>
      </section>
    </WavyBackground>
  );
}
