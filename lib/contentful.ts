import { createClient } from 'contentful';

export const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

// ========================
// Our clean data models
// ========================

export interface ExperienceData {
  id: string;
  position: string;
  companyName?: string;
  companyAlias?: string;
  companyAddress?: string;
  companyDescription?: string;
  jobType?: string;
  jobArrangement?: string;
  jobdesk?: string;
  dateStart?: string;
  dateEnd?: string;
  companyLogoUrl?: string;
}

export interface ArticleData {
  id: string;
  articleTittle: string;
  articleSlug: string;
  thumbnailUrl?: string;
  articleContent: string;
  authorName: string;
  categoryName: string;
  categoryId: string;
  articleDateCreate: string;
}

export interface TestimonialData {
  id: string;
  name: string;
  companyName: string;
  jobTittle: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  testimonial: any; // RichText document
}

// Helper to extract asset URL
function resolveAssetUrl(asset: unknown): string | undefined {
  if (!asset || typeof asset !== 'object') return undefined;
  const a = asset as Record<string, unknown>;
  const fields = a.fields as Record<string, unknown> | undefined;
  const file = fields?.file as Record<string, unknown> | undefined;
  const url = file?.url as string | undefined;
  return url ? `https:${url}` : undefined;
}

// Helper to extract entry field value
function resolveField(entry: unknown, field: string): string {
  if (!entry || typeof entry !== 'object') return '';
  const e = entry as Record<string, unknown>;
  const fields = e.fields as Record<string, unknown> | undefined;
  return String(fields?.[field] ?? '');
}

function resolveEntryId(entry: unknown): string {
  if (!entry || typeof entry !== 'object') return '';
  const e = entry as Record<string, unknown>;
  const sys = e.sys as Record<string, unknown> | undefined;
  return String(sys?.id ?? '');
}

export async function getExperiences(): Promise<ExperienceData[]> {
  const res = await contentfulClient.getEntries({
    content_type: 'experiences',
    include: 2,
  });

  const items: ExperienceData[] = res.items.map((item) => {
    const f = item.fields as Record<string, unknown>;
    return {
      id: item.sys.id,
      position: String(f.position ?? ''),
      companyName: f.companyName ? String(f.companyName) : undefined,
      companyAlias: f.companyAlias ? String(f.companyAlias) : undefined,
      companyAddress: f.companyAddress ? String(f.companyAddress) : undefined,
      companyDescription: f.companyDescription ? String(f.companyDescription) : undefined,
      jobType: f.jobType ? String(f.jobType) : undefined,
      jobArrangement: f.jobArrangement ? String(f.jobArrangement) : undefined,
      jobdesk: f.jobdesk ? String(f.jobdesk) : undefined,
      dateStart: f.dateStart ? String(f.dateStart) : undefined,
      dateEnd: f.dateEnd ? String(f.dateEnd) : undefined,
      companyLogoUrl: resolveAssetUrl(f.companyLogo),
    };
  });

  // Sort: null dateEnd (Present) first, then by dateEnd descending
  return items.sort((a, b) => {
    const aEnd = a.dateEnd;
    const bEnd = b.dateEnd;
    if (!aEnd && !bEnd) return 0;
    if (!aEnd) return -1;
    if (!bEnd) return 1;
    return new Date(bEnd).getTime() - new Date(aEnd).getTime();
  });
}

export async function getArticles(limit?: number): Promise<ArticleData[]> {
  const query: Record<string, unknown> = {
    content_type: 'articles',
    order: ['-fields.articleDateCreate'],
    include: 2,
  };
  if (limit) query.limit = limit;

  const res = await contentfulClient.getEntries(query);
  return res.items.map((item) => {
    const f = item.fields as Record<string, unknown>;
    return {
      id: item.sys.id,
      articleTittle: String(f.articleTittle ?? ''),
      articleSlug: String(f.articleSlug ?? ''),
      thumbnailUrl: resolveAssetUrl(f.articleThumbnails),
      articleContent: String(f.articleContent ?? ''),
      authorName: resolveField(f.articleAuthor, 'name'),
      categoryName: resolveField(f.articleType, 'name'),
      categoryId: resolveEntryId(f.articleType),
      articleDateCreate: String(f.articleDateCreate ?? ''),
    };
  });
}

export async function getArticleBySlug(slug: string): Promise<ArticleData | null> {
  const res = await contentfulClient.getEntries({
    content_type: 'articles',
    'fields.articleSlug': slug,
    include: 2,
    limit: 1,
  } as Record<string, unknown>);

  if (res.items.length === 0) return null;
  const item = res.items[0];
  const f = item.fields as Record<string, unknown>;
  return {
    id: item.sys.id,
    articleTittle: String(f.articleTittle ?? ''),
    articleSlug: String(f.articleSlug ?? ''),
    thumbnailUrl: resolveAssetUrl(f.articleThumbnails),
    articleContent: String(f.articleContent ?? ''),
    authorName: resolveField(f.articleAuthor, 'name'),
    categoryName: resolveField(f.articleType, 'name'),
    categoryId: resolveEntryId(f.articleType),
    articleDateCreate: String(f.articleDateCreate ?? ''),
  };
}

export async function getAllArticleSlugs(): Promise<string[]> {
  const res = await contentfulClient.getEntries({
    content_type: 'articles',
    select: ['fields.articleSlug'],
  } as Record<string, unknown>);

  return res.items.map((item) => {
    const f = item.fields as Record<string, unknown>;
    return String(f.articleSlug ?? '');
  });
}

export async function getTestimonials(): Promise<TestimonialData[]> {
  const res = await contentfulClient.getEntries({
    content_type: 'testimonials',
    limit: 6,
    include: 1,
  });

  return res.items.map((item) => {
    const f = item.fields as Record<string, unknown>;
    return {
      id: item.sys.id,
      name: String(f.name ?? ''),
      companyName: String(f.companyName ?? ''),
      jobTittle: String(f.jobTittle ?? ''),
      testimonial: f.testimonial,
    };
  });
}

export async function getRelatedArticles(
  slug: string,
  categoryId: string,
  limit = 3
): Promise<ArticleData[]> {
  const allArticles = await getArticles();
  return allArticles
    .filter((a) => a.articleSlug !== slug && a.categoryId === categoryId)
    .slice(0, limit);
}
