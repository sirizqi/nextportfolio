import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getArticles } from '@/lib/contentful';
import BlogsClientList from './BlogsClientList';

export const metadata: Metadata = {
  title: 'Blog | siRizqi',
  description:
    "Explore Rizqi Sarasajati's articles on Product Management, Design, and Software Engineering.",
  openGraph: {
    title: 'Blog | siRizqi',
    description: 'Articles on Product Management, Design, and Software Engineering.',
  },
};

export default async function BlogsPage() {
  const articles = await getArticles();

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/#blogs"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          id="blogs-back"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Read, Learn &amp; <span className="text-gradient">Grow</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            {articles.length} article{articles.length !== 1 ? 's' : ''} on Product
            Management, Design, and Software Engineering.
          </p>
        </div>

        <BlogsClientList articles={articles} />
      </div>
    </div>
  );
}
