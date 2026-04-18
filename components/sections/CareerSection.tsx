import { Suspense } from 'react';
import { getExperiences } from '@/lib/contentful';
import CareerTimeline from './CareerTimeline';
import { GridBackground } from '@/components/ui/grid-background';

async function CareerContent() {
  const experiences = await getExperiences();
  return <CareerTimeline experiences={experiences} />;
}

function CareerSkeleton() {
  return (
    <GridBackground>
      <section id="career" className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="h-10 bg-muted rounded w-64 mx-auto mb-4 animate-pulse" />
            <div className="h-4 bg-muted rounded w-full max-w-xl mx-auto animate-pulse" />
          </div>
          <div className="flex flex-col gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-6 animate-pulse">
                <div className="flex gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-muted" />
                  <div className="flex-1 space-y-2">
                    <div className="h-5 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                  </div>
                </div>
                <div className="h-4 bg-muted rounded w-full mb-2" />
                <div className="h-4 bg-muted rounded w-4/5" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </GridBackground>
  );
}

export default function CareerSection() {
  return (
    <Suspense fallback={<CareerSkeleton />}>
      <CareerContent />
    </Suspense>
  );
}
