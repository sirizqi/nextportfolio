import { EntrySkeletonType, EntryFields, Asset, Entry } from 'contentful';
import { Document } from '@contentful/rich-text-types';

export interface ExperienceSkeleton extends EntrySkeletonType {
  contentTypeId: 'experiences';
  fields: {
    position: EntryFields.Symbol;
    companyName?: EntryFields.Symbol;
    companyAlias?: EntryFields.Symbol;
    companyAddress?: EntryFields.Symbol;
    companyDescription?: EntryFields.Text;
    jobType?: EntryFields.Symbol;
    jobArrangement?: EntryFields.Symbol;
    jobdesk?: EntryFields.Text;
    dateStart?: EntryFields.Symbol;
    dateEnd?: EntryFields.Symbol;
    companyLogo?: EntryFields.AssetLink;
  };
}

export interface AuthorSkeleton extends EntrySkeletonType {
  contentTypeId: 'author';
  fields: {
    name: EntryFields.Symbol;
    photo?: EntryFields.AssetLink;
    bio?: EntryFields.Text;
  };
}

export interface CategorySkeleton extends EntrySkeletonType {
  contentTypeId: 'category';
  fields: {
    name: EntryFields.Symbol;
    slug?: EntryFields.Symbol;
  };
}

export interface ArticleSkeleton extends EntrySkeletonType {
  contentTypeId: 'articles';
  fields: {
    articleTittle: EntryFields.Symbol;
    articleSlug: EntryFields.Symbol;
    articleThumbnails: EntryFields.AssetLink;
    articleContent: EntryFields.Text;
    articleAuthor: EntryFields.EntryLink<AuthorSkeleton>;
    articleType: EntryFields.EntryLink<CategorySkeleton>;
    articleDateCreate: EntryFields.Symbol;
  };
}

export interface TestimonialSkeleton extends EntrySkeletonType {
  contentTypeId: 'testimonials';
  fields: {
    name: EntryFields.Symbol;
    companyName: EntryFields.Symbol;
    jobTittle: EntryFields.Symbol;
    testimonial: EntryFields.RichText;
  };
}

// Convenience type aliases
export type ExperienceFields = ExperienceSkeleton['fields'];
export type ArticleFields = ArticleSkeleton['fields'];
export type TestimonialFields = TestimonialSkeleton['fields'];
export type AuthorFields = AuthorSkeleton['fields'];
export type CategoryFields = CategorySkeleton['fields'];

export interface PortfolioItem {
  name: string;
  url: string;
  description: string;
  tags: string[];
  extraTags: number;
}

export interface ServiceCard {
  icon: string;
  title: string;
  highlighted: boolean;
  badge?: string;
  stat?: string;
  description: string;
  points: string[];
  pricing: string;
  cta: string;
  ctaUrl: string;
}

export interface ToolItem {
  name: string;
  siIcon?: string;
  lucideIcon?: string;
  description: string;
}

export interface ToolCategory {
  category: string;
  lucideIcon: string;
  items: ToolItem[];
}

export interface Award {
  name: string;
  year: string;
  level: string;
  description: string;
  logo?: string;
}
