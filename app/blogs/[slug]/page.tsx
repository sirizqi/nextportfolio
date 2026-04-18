import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  getArticleBySlug,
  getAllArticleSlugs,
  getRelatedArticles,
} from '@/lib/contentful';
import { formatDate } from '@/lib/utils';

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: 'Article Not Found' };

  const description = article.articleContent.slice(0, 160);

  return {
    title: article.articleTittle,
    description,
    openGraph: {
      title: article.articleTittle,
      description,
      images: article.thumbnailUrl
        ? [{ url: article.thumbnailUrl, width: 1200, height: 630 }]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.articleTittle,
      description,
      images: article.thumbnailUrl ? [article.thumbnailUrl] : [],
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) notFound();

  const content = article.articleContent;
  const relatedArticles = article.categoryId
    ? await getRelatedArticles(slug, article.categoryId)
    : [];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero image */}
      {article.thumbnailUrl && (
        <div className="relative w-full h-64 md:h-96 overflow-hidden">
          <Image
            src={article.thumbnailUrl}
            alt={article.articleTittle}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back link */}
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          id="blog-detail-back"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blogs
        </Link>

        {/* Article header */}
        <div className="mb-10">
          {article.categoryName && (
            <Badge className="mb-4 bg-indigo-500 text-white border-none">
              {article.categoryName}
            </Badge>
          )}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
            {article.articleTittle}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pb-6 border-b border-border">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              {article.authorName}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {formatDate(article.articleDateCreate)}
            </span>
            <span>{content.split(' ').length} words</span>
          </div>
        </div>

        {/* Article content */}
        <div className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-indigo-500 prose-a:no-underline hover:prose-a:underline prose-code:bg-muted prose-code:rounded prose-code:px-1 prose-img:rounded-xl">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight, rehypeRaw]}
          >
            {content}
          </ReactMarkdown>
        </div>

        {/* Related articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-16 pt-8 border-t border-border">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedArticles.map((related) => (
                <Link
                  key={related.id}
                  href={`/blogs/${related.articleSlug}`}
                  id={`related-${related.id}`}
                  className="group block bg-card border border-border rounded-xl overflow-hidden hover:border-indigo-500/30 transition-all"
                >
                  <div className="relative aspect-video bg-muted">
                    {related.thumbnailUrl ? (
                      <Image
                        src={related.thumbnailUrl}
                        alt={related.articleTittle}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 flex items-center justify-center text-2xl">
                        📝
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-sm text-foreground line-clamp-2 group-hover:text-indigo-500 transition-colors">
                      {related.articleTittle}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDate(related.articleDateCreate)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
