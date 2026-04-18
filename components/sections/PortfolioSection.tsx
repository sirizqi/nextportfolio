'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { BackgroundGradient } from '@/components/ui/background-gradient';
import { Badge } from '@/components/ui/badge';
import type { PortfolioItem } from '@/types';

const portfolioItems: PortfolioItem[] = [
  {
    name: 'KiriminAja',
    url: 'https://kiriminaja.com/',
    description:
      'Logistics Aggregator with 19 courier options, providing COD & international shipping. Available on web, mobile & API.',
    tags: ['Logistics', 'Vue.js', 'GoLang', 'MySQL'],
    extraTags: 1,
  },
  {
    name: 'Komship',
    url: 'https://komship.id/',
    description:
      'Logistics Aggregator with 7 couriers, providing COD & international shipping. Available on web and mobile.',
    tags: ['Logistics', 'Vue.js', 'GoLang', 'MySQL'],
    extraTags: 1,
  },
  {
    name: 'RajaOngkir',
    url: 'https://rajaongkir.com/',
    description:
      'Shipping cost checker & logistics aggregator. 7 shipping couriers, 14 for cost checking. COD available via API only.',
    tags: ['Logistics', 'Vue.js', 'GoLang', 'PHP'],
    extraTags: 2,
  },
  {
    name: 'Aonia.AI',
    url: 'https://aonia.ai/',
    description:
      'AI-powered Customer Service for WhatsApp, Facebook, TikTok, Twitter & Instagram with AI personalization. Web-based.',
    tags: ['CRM', 'React', 'Next.js', 'MongoDB'],
    extraTags: 1,
  },
  {
    name: 'Komcards',
    url: 'https://komcards.id/',
    description: 'Indonesian Virtual Debit Card for seamless digital transactions.',
    tags: ['Banking', 'Vue.js', 'GoLang', 'MySQL'],
    extraTags: 0,
  },
  {
    name: 'Komtim',
    url: 'https://komtim.id/',
    description: 'E-commerce team outsourcing solution for growing businesses.',
    tags: ['Outsourcing', 'Vue.js', 'PHP', 'MySQL'],
    extraTags: 0,
  },
  {
    name: 'Kompack',
    url: 'https://kompack.id/',
    description:
      'Fulfillment service for product storage and streamlined order processing.',
    tags: ['Fulfillment', 'Vue.js', 'PHP', 'MySQL'],
    extraTags: 0,
  },
  {
    name: 'Komplace',
    url: 'https://komplace.id/',
    description:
      'Omnichannel Marketplace to monitor and process all marketplace orders in one unified app. Web & mobile.',
    tags: ['Omnichannel', 'Vue.js', 'JavaScript', 'MySQL'],
    extraTags: 0,
  },
  {
    name: 'Komads',
    url: 'https://komads.id/',
    description:
      'Ads creation and monitoring platform — create, manage and track your advertising campaigns.',
    tags: ['Ads', 'Vue.js', 'Nuxt.js', 'GoLang'],
    extraTags: 2,
  },
];

const tagColors: Record<string, string> = {
  Logistics: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  CRM: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  Banking: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  Outsourcing: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  Fulfillment: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  Omnichannel: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
  Ads: 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300',
};

const techColors: Record<string, string> = {
  default: 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300',
};

function getFaviconUrl(url: string): string {
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;
  } catch {
    return '';
  }
}

function PortfolioCard({ item, index }: { item: PortfolioItem; index: number }) {
  const [imgError, setImgError] = useState(false);
  const faviconUrl = getFaviconUrl(item.url);
  const initials = item.name.slice(0, 2).toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      <BackgroundGradient animate={false}>
        <div className="flex flex-col h-full p-6 rounded-2xl">
          {/* Logo + Name */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-border flex items-center justify-center flex-shrink-0 bg-muted">
              {faviconUrl && !imgError ? (
                <img
                  src={faviconUrl}
                  alt={`${item.name} logo`}
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                  onError={() => setImgError(true)}
                />
              ) : (
                <span className="text-xs font-bold text-foreground">{initials}</span>
              )}
            </div>
            <h3 className="text-lg font-bold text-foreground">{item.name}</h3>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1 mb-4">
            {item.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${tagColors[tag] ?? techColors.default}`}
              >
                {tag}
              </span>
            ))}
            {item.extraTags > 0 && (
              <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-zinc-200 text-zinc-500 dark:bg-zinc-700 dark:text-zinc-400">
                +{item.extraTags}
              </span>
            )}
          </div>

          {/* CTA */}
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            id={`portfolio-${item.name.toLowerCase().replace(/\s/g, '-')}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-500 hover:text-indigo-400 transition-colors group/link"
          >
            View Product
            <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </BackgroundGradient>
    </motion.div>
  );
}


export default function PortfolioSection() {
  return (
    <section id="portfolio" className="py-20 md:py-32 bg-background">
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
            Products &amp; Projects{' '}
            <span className="text-gradient">I&apos;ve Worked On</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A curated selection of products I&apos;ve built, shipped, and managed across
            logistics, finance, AI, and e-commerce.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item, i) => (
            <PortfolioCard key={item.name} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
