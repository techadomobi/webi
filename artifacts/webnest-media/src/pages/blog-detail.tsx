import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock,
  Image as ImageIcon,
  LineChart,
  Megaphone,
  PenSquare,
  Sparkles,
  Tag,
  UserRound,
  Zap,
} from 'lucide-react';
import { Link, useLocation } from 'wouter';

import PageTransition from '@/components/layout/PageTransition';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CMS_WEBSITE_NAME, fetchCmsEntry, fetchCmsList, type CmsContentBlock } from '@/lib/cms-api';

function formatDate(value?: string) {
  if (!value) return 'Recently published';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

function stripHtml(value: string) {
  return value
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function buildAliases(post: { slug: string; title: string }) {
  const aliases = new Set<string>();
  aliases.add(normalizeSlug(post.slug));
  aliases.add(normalizeSlug(post.title));

  try {
    aliases.add(normalizeSlug(decodeURIComponent(post.slug)));
  } catch {
    aliases.add(normalizeSlug(post.slug));
  }

  return aliases;
}

const editorialSteps = [
  {
    title: 'Research and Intent',
    detail: 'Map what readers need to know before they trust the page or take action.',
    icon: LineChart,
  },
  {
    title: 'Structure and Flow',
    detail: 'Build the narrative with a strong opening, readable sections, and clear transitions.',
    icon: PenSquare,
  },
  {
    title: 'Distribution and Conversion',
    detail: 'Prepare the post for search, social, and CTA placement so it supports growth goals.',
    icon: Megaphone,
  },
];

const valueSignals = [
  { metric: '2.8x', label: 'topic authority growth' },
  { metric: '41%', label: 'better engaged read depth' },
  { metric: '34%', label: 'higher assisted conversions' },
  { metric: 'Weekly', label: 'content optimization rhythm' },
];

const useCases = [
  'Founder-led thought leadership',
  'SEO content hubs for services',
  'Sales enablement articles',
  'Product education and retention',
  'Local market expansion content',
  'Evergreen knowledge libraries',
];

const generatedSectionTemplates = [
  {
    title: 'Context and Opportunity',
    body: 'This article is designed to answer a practical question and turn it into a repeatable marketing asset. The goal is to make the content easy to consume while still deep enough to support real decision-making.',
  },
  {
    title: 'Practical Framework',
    body: 'Use this page as a template: define the objective, explain the topic simply, show a step-by-step process, and end with a conversion path that makes the next action obvious.',
  },
  {
    title: 'Execution Checklist',
    body: 'Make sure each article includes a strong hero, a readable article body, supporting proof, and a useful call to action. If content blocks are missing, replace them with editorial sections like these.',
  },
  {
    title: 'What to Do Next',
    body: 'If this topic matches your goals, build adjacent content around the same theme and connect it to a service or consultation step so the page does more than just inform.',
  },
];

function ArticleBlock({ block, image, index }: { block: CmsContentBlock; image?: string; index: number }) {
  if (block.type === 'image') {
    return (
      <Card className="overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-sm">
        {image ? (
          <img src={image} alt="CMS content block" className="h-72 w-full object-cover" />
        ) : (
          <div className="flex h-72 items-center justify-center bg-linear-to-br from-[#081526] via-[#10243f] to-[#183a63] text-white">
            <div className="text-center">
              <ImageIcon className="mx-auto mb-3 h-8 w-8 text-primary" />
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">Image block {index + 1}</p>
              <p className="mt-2 text-sm text-white/75">Add a visual to support the story.</p>
            </div>
          </div>
        )}
      </Card>
    );
  }

  const html = typeof block.text === 'string' ? block.text : '';
  if (!stripHtml(html)) {
    return null;
  }

  return (
    <div
      className="prose prose-slate max-w-none rounded-3xl border border-primary/10 bg-white p-6 shadow-sm md:p-8 prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default function BlogDetail() {
  const [location] = useLocation();
  const slug = useMemo(() => {
    const cleanPath = location.split('?')[0].split('#')[0].replace(/\/+$/, '');
    const raw = cleanPath.split('/')[2] ?? '';

    try {
      return decodeURIComponent(raw).trim();
    } catch {
      return raw.trim();
    }
  }, [location]);

  const { data: directPost, isLoading: directLoading, error, refetch } = useQuery({
    queryKey: ['cms', 'blog', slug],
    queryFn: () => fetchCmsEntry('blogs', slug),
    enabled: Boolean(slug),
    staleTime: 5 * 60 * 1000,
  });

  const { data: fallbackPosts, isLoading: fallbackLoading } = useQuery({
    queryKey: ['cms', 'blogs', 'fallback-list'],
    queryFn: () => fetchCmsList('blogs'),
    enabled: Boolean(slug) && !directPost,
    staleTime: 5 * 60 * 1000,
  });

  const fallbackPost = useMemo(() => {
    if (!slug || !fallbackPosts?.length) return null;

    const normalizedSlug = normalizeSlug(slug);
    return fallbackPosts.find(item => buildAliases(item).has(normalizedSlug)) ?? null;
  }, [fallbackPosts, slug]);

  const needsCanonicalFetch = Boolean(fallbackPost?.slug) && !directPost && normalizeSlug(fallbackPost?.slug ?? '') !== normalizeSlug(slug);

  const { data: canonicalPost, isLoading: canonicalLoading } = useQuery({
    queryKey: ['cms', 'blog', 'canonical', fallbackPost?.slug],
    queryFn: () => fetchCmsEntry('blogs', fallbackPost?.slug ?? ''),
    enabled: needsCanonicalFetch,
    staleTime: 5 * 60 * 1000,
  });

  const post = directPost ?? canonicalPost ?? fallbackPost ?? null;
  const isLoading = directLoading || (!directPost && (fallbackLoading || (needsCanonicalFetch && canonicalLoading)));

  const { data: relatedPostsData } = useQuery({
    queryKey: ['cms', 'blogs', 'related-list'],
    queryFn: () => fetchCmsList('blogs'),
    enabled: Boolean(post),
    staleTime: 5 * 60 * 1000,
  });

  const [heroImageFailed, setHeroImageFailed] = useState(false);

  useEffect(() => {
    setHeroImageFailed(false);
  }, [post?.slug]);

  if (!slug) {
    return (
      <PageTransition>
        <section className="pt-28 pb-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl font-bold">Blog Not Found</h1>
            <p className="mt-4 text-muted-foreground">The requested article URL is missing a slug.</p>
            <Link href="/blogs">
              <Button className="mt-8 rounded-full bg-gradient-brand text-white">Back to Blogs</Button>
            </Link>
          </div>
        </section>
      </PageTransition>
    );
  }

  if (isLoading) {
    return (
      <PageTransition>
        <section className="pt-28 pb-24">
          <div className="container mx-auto px-4">
            <div className="animate-pulse overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-sm">
              <div className="grid gap-0 lg:grid-cols-2">
                <div className="h-80 bg-secondary/50 lg:h-full" />
                <div className="space-y-4 p-8 md:p-12">
                  <div className="h-3 w-28 rounded-full bg-secondary/70" />
                  <div className="h-10 w-4/5 rounded-full bg-secondary/70" />
                  <div className="h-4 w-full rounded-full bg-secondary/60" />
                  <div className="h-4 w-5/6 rounded-full bg-secondary/60" />
                  <div className="h-4 w-2/3 rounded-full bg-secondary/60" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </PageTransition>
    );
  }

  if (error || !post) {
    return (
      <PageTransition>
        <section className="pt-28 pb-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl font-bold">Blog Not Found</h1>
            <p className="mt-4 text-muted-foreground">
              {error instanceof Error ? error.message : 'The CMS did not return a matching article.'}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button onClick={() => refetch()} className="rounded-full bg-gradient-brand text-white">
                Retry
              </Button>
              <Link href="/blogs">
                <Button variant="outline" className="rounded-full border-2 border-primary/20 text-primary hover:bg-primary hover:text-white">
                  Back to Blogs
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </PageTransition>
    );
  }

  const contentBlocks = post.content ?? [];
  const images = post.images?.length ? post.images : post.coverImage ? [post.coverImage] : [];
  const relatedPosts = (relatedPostsData ?? []).filter(item => normalizeSlug(item.slug) !== normalizeSlug(post.slug)).slice(0, 3);
  const generatedSections = generatedSectionTemplates.map(section => ({
    ...section,
    body: section.body.replace('This article', post.excerpt || 'This article').replace('the same theme', post.focusKeyphrase || post.category || 'this topic'),
  }));

  return (
    <PageTransition>
      <section className="relative overflow-hidden border-b border-primary/20 bg-linear-to-b from-[#f7f5ff] via-white to-[#fff4f8] pt-16 pb-12 lg:pt-20 lg:pb-16">
        <img src="/decor/blog-orbit.svg" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-linear-to-b from-white/80 via-white/70 to-secondary/20" />
        <div className="pointer-events-none absolute left-6 top-6 h-40 w-40 rounded-full bg-primary/12 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-24 h-56 w-56 rounded-full bg-pink-400/12 blur-3xl" />
        <div className="container relative z-10 mx-auto px-4">
          <Link href="/blogs" className="mb-6 inline-flex">
            <Button variant="outline" className="rounded-full border-2 border-primary/20 bg-white/90 text-primary hover:border-primary hover:bg-primary hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blogs
            </Button>
          </Link>

          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <div className="mb-5 flex flex-wrap items-center gap-3 text-sm font-medium text-muted-foreground">
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-primary">
                  <Tag className="h-3.5 w-3.5" />
                  {post.category || 'CMS Blog'}
                </span>
                <span className="inline-flex items-center gap-1">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {formatDate(post.date)}
                </span>
                <span className="inline-flex items-center gap-1">
                  <UserRound className="h-3.5 w-3.5" />
                  {post.writerName || CMS_WEBSITE_NAME}
                </span>
              </div>

              <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl font-display text-5xl font-black leading-[1.04] md:text-7xl">
                {post.title}
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="mt-6 max-w-3xl text-xl leading-relaxed text-muted-foreground">
                {post.excerpt}
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }} className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact">
                  <Button className="h-12 rounded-full bg-gradient-brand px-6 text-white shadow-lg hover:shadow-xl">Talk to Us</Button>
                </Link>
                <Link href="/services">
                  <Button variant="outline" className="h-12 rounded-full border-2 border-primary/20 px-6 text-primary hover:border-primary hover:bg-primary hover:text-white">
                    Explore Services
                  </Button>
                </Link>
              </motion.div>

              {post.tags?.length ? (
                <div className="mt-8 flex flex-wrap gap-2">
                  {post.tags.slice(0, 8).map(tag => (
                    <Badge key={tag} variant="secondary" className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-foreground shadow-sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              ) : null}

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  { label: 'Read time', value: '7 min' },
                  { label: 'Focus', value: post.category || 'CMS Blog' },
                  { label: 'Format', value: 'Long-form guide' },
                ].map(item => (
                  <div key={item.label} className="rounded-2xl border border-primary/10 bg-white p-4 shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary/70">{item.label}</p>
                    <p className="mt-2 text-lg font-semibold text-foreground">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-white/60 bg-white shadow-2xl">
              {post.coverImage && !heroImageFailed ? (
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="h-full min-h-90 w-full object-cover"
                  onError={() => setHeroImageFailed(true)}
                />
              ) : (
                <div className="min-h-90 bg-linear-to-br from-[#081526] via-[#10243f] to-[#183a63] p-10 text-white">
                  <p className="text-sm font-bold uppercase tracking-[0.24em] text-white/70">Featured Insight</p>
                  <h2 className="mt-4 font-display text-3xl font-bold leading-tight">{post.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/80">
                    {post.focusKeyphrase || post.excerpt || 'Practical growth guidance from the WebNest editorial team.'}
                  </p>
                  <div className="mt-6 space-y-3">
                    {['Clear strategic context', 'Actionable execution breakdown', 'Conversion-focused recommendations'].map(item => (
                      <div key={item} className="flex items-center gap-2 text-sm text-white/90">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-primary/15 bg-white/85 py-4 backdrop-blur">
        <div className="container mx-auto px-4">
          <div className="overflow-hidden">
            <div className="animate-marquee flex min-w-max items-center gap-8 whitespace-nowrap">
              {[
                'Story-first content structure',
                'SEO intent and readability aligned',
                'CMS-driven publishing speed',
                'Design-led editorial experience',
                'Stronger conversion pathways',
                'Share-worthy content architecture',
              ]
                .concat([
                  'Story-first content structure',
                  'SEO intent and readability aligned',
                  'CMS-driven publishing speed',
                  'Design-led editorial experience',
                  'Stronger conversion pathways',
                  'Share-worthy content architecture',
                ])
                .map((item, idx) => (
                  <div key={`${item}-${idx}`} className="inline-flex items-center gap-2 text-sm font-medium text-foreground/80">
                    <Zap className="h-3.5 w-3.5 text-primary" />
                    {item}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-10 grid gap-4 rounded-3xl border border-primary/10 bg-linear-to-r from-primary/6 via-white to-pink-500/6 p-5 md:grid-cols-3">
            <div className="rounded-2xl border border-white bg-white/90 p-4 shadow-sm">
              <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/12 text-primary">
                <Sparkles className="h-4 w-4" />
              </div>
              <p className="text-sm font-semibold text-foreground">Editorial Design Quality</p>
              <p className="mt-1 text-xs text-muted-foreground">Readable, structured, and easy to scan.</p>
            </div>
            <div className="rounded-2xl border border-white bg-white/90 p-4 shadow-sm">
              <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/12 text-primary">
                <Clock className="h-4 w-4" />
              </div>
              <p className="text-sm font-semibold text-foreground">Fast Publishing Operations</p>
              <p className="mt-1 text-xs text-muted-foreground">New articles can go live without frontend edits.</p>
            </div>
            <div className="rounded-2xl border border-white bg-white/90 p-4 shadow-sm">
              <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/12 text-primary">
                <Tag className="h-4 w-4" />
              </div>
              <p className="text-sm font-semibold text-foreground">SEO-Ready Metadata</p>
              <p className="mt-1 text-xs text-muted-foreground">Categories, keywords, and metadata stay visible.</p>
            </div>
          </div>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(280px,0.9fr)] lg:items-start">
            <div className="space-y-6">
              {contentBlocks.length > 0 ? (
                contentBlocks.map((block, index) => (
                  <ArticleBlock key={block._id || `${block.type}-${index}`} block={block} image={images[index]} index={index} />
                ))
              ) : (
                <div className="space-y-5">
                  {generatedSectionTemplates.map((section, index) => (
                    <div key={section.title} className="rounded-3xl border border-primary/10 bg-linear-to-br from-white to-primary/5 p-7 shadow-sm">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Editorial Note</p>
                      <h3 className="mt-2 font-display text-3xl font-bold text-foreground">{section.title}</h3>
                      <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                        {section.title === 'What to Do Next' && post.tags?.length
                          ? `${section.body} Connect this article to ${post.tags.slice(0, 3).join(', ')} and a clear service CTA.`
                          : section.body}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <aside className="space-y-6 lg:sticky lg:top-28">
              <div className="rounded-3xl border border-primary/10 bg-secondary/30 p-6 shadow-sm">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Article Details</p>
                <div className="mt-5 space-y-4 text-sm text-muted-foreground">
                  <div>
                    <p className="font-semibold text-foreground">Website</p>
                    <p>{post.websiteName || CMS_WEBSITE_NAME}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Focus Keyphrase</p>
                    <p>{post.focusKeyphrase || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">SEO Title</p>
                    <p>{post.seoTitle || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Meta Description</p>
                    <p>{post.metaDescription || 'Not provided'}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-primary/10 bg-white p-6 shadow-sm">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">SEO Keywords</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {(post.seoKeywords || []).slice(0, 12).map(keyword => (
                    <span key={keyword} className="rounded-full bg-secondary/60 px-3 py-1 text-xs font-medium text-foreground">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-primary/15 bg-[#081526] p-6 text-white shadow-xl">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/70">Need this on your site?</p>
                <p className="mt-4 text-lg leading-relaxed text-white/80">
                  The CMS backend can power article creation, featured content, and future editorial workflows.
                </p>
                <Link href="/contact">
                  <Button className="mt-6 w-full rounded-full bg-gradient-brand text-white shadow-lg hover:shadow-xl">
                    Request Implementation
                  </Button>
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-y border-primary/15 bg-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Continue Reading</p>
              <h2 className="mt-2 font-display text-4xl font-bold md:text-5xl">Related Insights</h2>
            </div>
            <Link href="/blogs">
              <Button variant="outline" className="rounded-full border-2 border-primary/20 text-primary hover:border-primary hover:bg-primary hover:text-white">
                View All Blogs
              </Button>
            </Link>
          </div>

          {relatedPosts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-3">
              {relatedPosts.map((item, index) => (
                <motion.article
                  key={item._id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-sm"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img src={item.coverImage || '/decor/blog-orbit.svg'} alt={item.title} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/20 to-transparent" />
                    <p className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-foreground">
                      {item.category || 'CMS Blog'}
                    </p>
                  </div>
                  <div className="p-5">
                    <h3 className="line-clamp-2 font-display text-2xl font-bold text-foreground">{item.title}</h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                      {item.excerpt || 'Open this article to explore the full CMS-powered content experience.'}
                    </p>
                    <Link href={`/blogs/${encodeURIComponent(item.slug)}`}>
                      <Button className="mt-5 h-10 rounded-full bg-gradient-brand px-5 text-white">Read Article</Button>
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-primary/20 bg-secondary/20 p-8 text-center text-muted-foreground">
              More related insights will appear here as additional posts are published.
            </div>
          )}
        </div>
      </section>

      <section className="border-y border-primary/20 bg-linear-to-b from-[#fff8fb] via-white to-[#f7fbff] py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">Editorial Operating Model</p>
            <h2 className="font-display text-4xl font-black md:text-6xl">How Great Content Gets Built</h2>
            <p className="mt-4 text-muted-foreground">
              This page design now supports a longer storytelling flow, so users can understand strategy, process, and business value in one continuous experience.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {editorialSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div key={step.title} className="rounded-3xl border border-primary/15 bg-white p-6 shadow-lg shadow-primary/5">
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/12 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-lg font-semibold text-foreground">{step.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.detail}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-10 grid gap-4 rounded-3xl border border-primary/20 bg-linear-to-r from-primary/10 via-white to-pink-500/12 p-5 md:grid-cols-4 shadow-lg shadow-primary/5">
            {valueSignals.map(signal => (
              <div key={signal.label} className="rounded-2xl border border-primary/10 bg-white p-4 shadow-md shadow-primary/5">
                <p className="font-display text-3xl font-black text-gradient">{signal.metric}</p>
                <p className="mt-1 text-sm font-semibold text-foreground">{signal.label}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div className="rounded-3xl border border-primary/15 bg-white p-7 shadow-lg shadow-primary/5">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">Where This Content Model Wins</p>
              <div className="grid gap-3 md:grid-cols-2">
                {useCases.map((item, idx) => (
                  <div key={item} className="rounded-2xl border border-primary/10 bg-linear-to-br from-white to-primary/5 p-4">
                    <div className="mb-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/14 text-xs font-bold text-primary">
                      {idx + 1}
                    </div>
                    <p className="text-sm leading-relaxed text-foreground/90">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-primary/30 bg-linear-to-br from-[#071124] via-[#0c1f3a] to-[#102b4d] p-7 text-white shadow-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">Long-Form Advantage</p>
              <h3 className="mt-3 font-display text-3xl font-bold">Deeper Pages Convert Better</h3>
              <p className="mt-4 text-sm leading-relaxed text-white/80">
                Long pages let visitors self-qualify. They answer more objections, demonstrate expertise, and create clearer conversion intent.
              </p>
              <ul className="mt-5 space-y-3">
                {[
                  'Higher average time on page',
                  'Better signal quality for search engines',
                  'Stronger trust before contact actions',
                  'More reusable content for campaigns',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2 text-sm text-white/90">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-primary/20 bg-[#081526] py-20 text-white md:py-24">
        <div className="absolute inset-0 bg-gradient-brand opacity-[0.12]" />
        <div className="pointer-events-none absolute -left-10 top-10 h-64 w-64 rounded-full bg-primary/20 blur-[100px]" />
        <div className="pointer-events-none absolute -right-10 bottom-10 h-64 w-64 rounded-full bg-pink-400/20 blur-[100px]" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="mx-auto max-w-3xl">
            <Sparkles className="mx-auto mb-4 h-8 w-8 text-primary" />
            <h2 className="font-display text-4xl font-black md:text-6xl">Want Blog Pages This Detailed for Your Brand?</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-white/80">
              We can build and connect the same long-form, animation-rich CMS page system for your services and blog library.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/contact">
                <Button className="h-12 rounded-full bg-gradient-brand px-7 text-white shadow-lg hover:shadow-xl">Start a Project</Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" className="h-12 rounded-full border-2 border-white/35 px-7 text-white hover:border-white hover:bg-white hover:text-foreground">
                  Explore Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
