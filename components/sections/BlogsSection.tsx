import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { getArticles } from '@/lib/contentful';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import type { ArticleData } from '@/lib/contentful';

async function BlogsContent() {
  const articles = await getArticles(3);

  if (articles.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-12">
        No articles yet. Check back soon!
      </p>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {articles.map((article: ArticleData) => {
          const content = article.articleContent;
          const preview = content.length > 100 ? content.slice(0, 100) + '...' : content;

          return (
            <Link
              key={article.id}
              href={`/blogs/${article.articleSlug}`}
              id={`blog-card-${article.id}`}
              className="group block"
            >
              <div className="bg-card border border-border rounded-2xl overflow-hidden hover:border-indigo-500/30 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                {/* Thumbnail */}
                <div className="relative aspect-video bg-muted overflow-hidden">
                  {article.thumbnailUrl ? (
                    <Image
                      src={article.thumbnailUrl}
                      alt={article.articleTittle}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 flex items-center justify-center">
                      <span className="text-4xl">📝</span>
                    </div>
                  )}
                  {article.categoryName && (
                    <div className="absolute top-3 left-3">
                      <Badge className="text-xs bg-indigo-500 text-white border-none">
                        {article.categoryName}
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-foreground line-clamp-2 mb-2 group-hover:text-indigo-500 transition-colors">
                    {article.articleTittle}
                  </h3>

                  <p className="text-sm text-muted-foreground flex-1 mb-4">
                    {preview}{' '}
                    {content.length > 100 && (
                      <span className="text-indigo-500 font-medium">Read story...</span>
                    )}
                  </p>

                  {/* Author + Date */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3 h-3" />
                      <span>{article.authorName}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(article.articleDateCreate)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="text-center">
        <Link
          href="/blogs"
          id="see-more-blogs"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-indigo-500/30 text-indigo-500 font-semibold text-sm hover:bg-indigo-500/10 transition-all duration-200 group"
        >
          See More Articles
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </>
  );
}

function BlogsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-card border border-border rounded-2xl overflow-hidden animate-pulse"
        >
          <div className="aspect-video bg-muted" />
          <div className="p-5 space-y-3">
            <div className="h-4 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function BlogsSection() {
  return (
    <section id="blogs" className="py-20 md:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Read, Learn &amp; <span className="text-gradient">Grow</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore articles on Product Management, Design, and Software Engineering. Stay
            tuned for more.
          </p>
        </div>

        <Suspense fallback={<BlogsSkeleton />}>
          <BlogsContent />
        </Suspense>
      </div>
    </section>
  );
}
