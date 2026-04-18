import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: "Reading's — Coming Soon | siRizqi",
  description:
    'A curated reading list — books, articles, and resources that shaped my thinking. Coming soon!',
};

export default function ReadingsPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background animated blobs */}
      <div className="absolute top-1/3 left-1/5 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse [animation-delay:1.2s]" />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse [animation-delay:2.4s]" />

      <div className="relative z-10 text-center max-w-xl mx-auto">
        {/* Icon */}
        <div className="text-7xl mb-8 select-none" style={{ animation: 'bounce 2s infinite' }}>
          📚
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-500 dark:text-violet-400 text-sm font-semibold mb-6">
          <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
          Coming Soon
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
          <span className="text-gradient">Reading</span>
          <br />
          <span className="text-foreground">List in Progress</span>
        </h1>

        {/* Body */}
        <p className="text-muted-foreground text-lg leading-relaxed mb-10">
          I&apos;m curating a list of{' '}
          <strong className="text-foreground">books, articles, and resources</strong>{' '}
          that have shaped the way I think about product, design, and engineering.
        </p>

        {/* Preview categories */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {[
            '📖 Books',
            '📰 Articles',
            '🎙 Podcasts',
            '🎬 Talks',
            '🔬 Research',
          ].map((item) => (
            <span
              key={item}
              className="px-3 py-1 rounded-full text-xs font-medium border border-border bg-muted/50 text-muted-foreground"
            >
              {item}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            id="readings-back-home"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold text-sm hover:from-indigo-600 hover:to-cyan-600 transition-all duration-200 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <a
            href="https://wa.me/6285882266490"
            target="_blank"
            rel="noopener noreferrer"
            id="readings-notify"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-border hover:border-violet-500/50 hover:bg-violet-500/5 text-foreground font-semibold text-sm transition-all duration-200"
          >
            🔔 Notify Me
          </a>
        </div>
      </div>
    </div>
  );
}
