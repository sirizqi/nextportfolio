'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, Search } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import type { ArticleData } from '@/lib/contentful';

type SortOption = 'latest' | 'oldest' | 'popular';

interface BlogsClientListProps {
  articles: ArticleData[];
}

export default function BlogsClientList({ articles }: BlogsClientListProps) {
  const [sort, setSort] = useState<SortOption>('latest');
  const [search, setSearch] = useState('');
  const [cmdOpen, setCmdOpen] = useState(false);
  const router = useRouter();

  // Cmd+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCmdOpen(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const sortedArticles = useCallback(() => {
    const list = [...articles];
    if (sort === 'latest') {
      list.sort(
        (a, b) =>
          new Date(b.articleDateCreate).getTime() -
          new Date(a.articleDateCreate).getTime()
      );
    } else if (sort === 'oldest') {
      list.sort(
        (a, b) =>
          new Date(a.articleDateCreate).getTime() -
          new Date(b.articleDateCreate).getTime()
      );
    } else {
      // Popular = sort by content length as proxy
      list.sort((a, b) => b.articleContent.length - a.articleContent.length);
    }
    return list;
  }, [articles, sort]);

  const filteredArticles = sortedArticles().filter((a) => {
    if (!search) return true;
    return a.articleTittle.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <>
      {/* Search + Sort bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            id="blog-search"
            type="text"
            placeholder="Search articles... (⌘K)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all"
          />
        </div>

        {/* Sort buttons */}
        <div className="flex gap-1 p-1 bg-muted/50 rounded-xl">
          {(['latest', 'oldest', 'popular'] as SortOption[]).map((opt) => (
            <button
              key={opt}
              id={`sort-${opt}`}
              onClick={() => setSort(opt)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all capitalize ${
                sort === opt
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Article list */}
      {filteredArticles.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-5xl mb-4">🔍</p>
          <p>No articles found for &quot;{search}&quot;</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredArticles.map((article) => {
            const content = article.articleContent;
            const preview = content.length > 100 ? content.slice(0, 100) : content;

            return (
              <Link
                key={article.id}
                href={`/blogs/${article.articleSlug}`}
                id={`blog-list-${article.id}`}
                className="group block"
              >
                <div className="flex flex-col sm:flex-row gap-4 bg-card border border-border rounded-2xl p-4 hover:border-indigo-500/30 hover:shadow-md transition-all duration-300">
                  {/* Thumbnail */}
                  <div className="relative w-full sm:w-40 h-28 sm:h-24 rounded-xl overflow-hidden flex-shrink-0 bg-muted">
                    {article.thumbnailUrl ? (
                      <Image
                        src={article.thumbnailUrl}
                        alt={article.articleTittle}
                        fill
                        sizes="160px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 flex items-center justify-center text-2xl">
                        📝
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center flex-1 min-w-0">
                    {article.categoryName && (
                      <Badge className="text-xs mb-1.5 self-start bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20">
                        {article.categoryName}
                      </Badge>
                    )}
                    <h3 className="font-bold text-foreground group-hover:text-indigo-500 transition-colors mb-1 line-clamp-2">
                      {article.articleTittle}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {preview}
                      {content.length > 100 && (
                        <span className="text-indigo-500 font-medium"> See more →</span>
                      )}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {article.authorName}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(article.articleDateCreate)}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Command+K Dialog */}
      <CommandDialog open={cmdOpen} onOpenChange={setCmdOpen}>
        <CommandInput placeholder="Search articles..." />
        <CommandList>
          <CommandEmpty>No articles found.</CommandEmpty>
          <CommandGroup heading="Articles">
            {articles.slice(0, 20).map((article) => (
              <CommandItem
                key={article.id}
                value={article.articleTittle}
                onSelect={() => {
                  router.push(`/blogs/${article.articleSlug}`);
                  setCmdOpen(false);
                }}
              >
                <span>{article.articleTittle}</span>
                <span className="ml-auto text-xs text-muted-foreground">
                  {formatDate(article.articleDateCreate)}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
