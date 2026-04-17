import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Search, Tag, UserRound } from 'lucide-react';
import { Link } from 'wouter';

import PageTransition from '@/components/layout/PageTransition';
import { Button } from '@/components/ui/button';
import { CMS_WEBSITE_NAME, fetchCmsList, type CmsEntry } from '@/lib/cms-api';

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 260, damping: 24 } },
};

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

function initialsFromName(name?: string) {
  if (!name) return 'CM';

  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0])
    .join('')
    .toUpperCase();
}

function getCategoryList(posts: CmsEntry[]) {
  return ['All', ...Array.from(new Set(posts.map(post => post.category?.trim()).filter(Boolean) as string[]))];
}

function filterPosts(posts: CmsEntry[], search: string, category: string) {
  const searchTerm = search.trim().toLowerCase();

  return posts.filter(post => {
    const matchCategory = category === 'All' || post.category?.trim() === category;
    const haystack = [post.title, post.excerpt, post.category, post.tags?.join(' '), post.writerName, post.seoTitle]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    const matchSearch = searchTerm === '' || haystack.includes(searchTerm);

    return matchCategory && matchSearch;
  });
}

function BlogCard({ post, featured = false }: { post: CmsEntry; featured?: boolean }) {
  const image = post.coverImage || '/decor/blog-orbit.svg';

  return (
    <Link href={`/blogs/${encodeURIComponent(post.slug)}`} className={featured ? 'block h-full' : 'block h-full'}>
      <motion.article
        variants={cardVariants}
        whileHover={{ y: -4 }}
        className={`group h-full overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-2xl ${featured ? 'grid lg:grid-cols-[1.15fr_0.85fr]' : 'flex flex-col'}`}
      >
        <div
          className="relative overflow-hidden"
          style={featured ? { minHeight: 320 } : undefined}
        >
          <img src={image} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top right, rgba(8, 21, 38, 0.85), rgba(14, 36, 67, 0.45) 55%, transparent 100%)' }}
          />
          <div className="absolute left-0 top-0 m-5 inline-flex rounded-full border border-white/15 bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-sm">
            {post.category || 'CMS Blog'}
          </div>
          <div className="absolute inset-x-0 bottom-0 p-6 text-white">
            <p className="mb-2 text-sm text-white/70">{formatDate(post.date)}</p>
            <h3 className={`font-display font-bold leading-tight ${featured ? 'text-3xl md:text-4xl' : 'text-2xl'}`}>
              {post.title}
            </h3>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6 md:p-7">
          <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1 rounded-full bg-secondary/60 px-3 py-1 font-medium text-foreground">
              <Clock className="h-3.5 w-3.5" />
              CMS article
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-secondary/60 px-3 py-1 font-medium text-foreground">
              <Tag className="h-3.5 w-3.5" />
              {post.tags?.[0] || post.category || 'Marketing'}
            </span>
          </div>
          <p className="mb-6 line-clamp-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            {post.excerpt || 'Open the article to read the full CMS content and image blocks.'}
          </p>
          <div className="mt-auto flex items-center gap-3 border-t border-gray-100 pt-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-xs font-bold text-white">
              {initialsFromName(post.writerName)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-foreground">{post.writerName || 'CMS Editor'}</p>
              <p className="truncate text-xs text-muted-foreground">{post.websiteName || CMS_WEBSITE_NAME}</p>
            </div>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-transform duration-300 group-hover:translate-x-1">
              Read
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

function LoadingState() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="animate-pulse overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
          <div className="h-52 bg-secondary/50" />
          <div className="space-y-4 p-6">
            <div className="h-3 w-24 rounded-full bg-secondary/70" />
            <div className="h-8 w-4/5 rounded-full bg-secondary/70" />
            <div className="space-y-2">
              <div className="h-3 rounded-full bg-secondary/60" />
              <div className="h-3 rounded-full bg-secondary/60" />
              <div className="h-3 w-3/4 rounded-full bg-secondary/60" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Blogs() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['cms', 'blogs'],
    queryFn: () => fetchCmsList('blogs'),
    staleTime: 5 * 60 * 1000,
  });

  const posts = data ?? [];
  const categories = useMemo(() => getCategoryList(posts), [posts]);
  const filtered = useMemo(() => filterPosts(posts, search, activeCategory), [posts, search, activeCategory]);
  const featured = filtered[0] ?? posts[0];
  const rest = filtered.slice(featured ? 1 : 0);

  return (
    <PageTransition>
      <section className="relative overflow-hidden border-b border-border/70 pt-24 pb-16 lg:pt-32 lg:pb-24 bg-secondary/25 text-foreground">
        <img src="/decor/blog-orbit.svg" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-linear-to-b from-white/80 via-white/70 to-secondary/20" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-primary">
            CMS Blog Feed
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="font-display text-5xl font-extrabold leading-tight md:text-6xl lg:text-7xl">
            Live Articles With <span className="text-gradient">Rich Content Blocks</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground md:text-xl">
            Articles are pulled directly from the CMS backend and rendered with search, category filters, featured coverage, and slug-based detail pages.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mx-auto mt-10 max-w-xl">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={event => setSearch(event.target.value)}
                placeholder="Search CMS blog posts..."
                className="h-14 w-full rounded-full border border-white/20 bg-white/95 pl-12 pr-4 text-base text-foreground shadow-sm outline-none transition focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-border/70 bg-white/85 py-8 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide">
            <Tag className="h-4 w-4 shrink-0 text-muted-foreground" />
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  activeCategory === category ? 'bg-gradient-brand text-white shadow-md' : 'bg-secondary/50 text-foreground hover:bg-secondary'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary/15 py-16">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <LoadingState />
          ) : error ? (
            <div className="rounded-3xl border border-red-200 bg-red-50 px-6 py-10 text-center text-red-900">
              <p className="font-display text-3xl font-bold">Could not load CMS blogs</p>
              <p className="mt-3 text-sm text-red-800">{error instanceof Error ? error.message : 'The backend request failed.'}</p>
              <Button onClick={() => refetch()} className="mt-6 rounded-full bg-red-600 text-white hover:bg-red-700">
                Try Again
              </Button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border bg-white px-6 py-16 text-center">
              <p className="font-display text-3xl font-bold">No matching posts</p>
              <p className="mt-3 text-muted-foreground">Try a different search term or category.</p>
            </div>
          ) : (
            <>
              {featured ? (
                <div className="mb-12">
                  <p className="mb-6 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-primary">
                    <span className="h-2 w-2 rounded-full bg-primary" /> Featured article
                  </p>
                  <BlogCard post={featured} featured />
                </div>
              ) : null}

              {rest.length > 0 ? (
                <motion.div variants={{ show: { transition: { staggerChildren: 0.08 } } }} initial="hidden" animate="show" className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
                  {rest.map(post => (
                    <BlogCard key={post._id} post={post} />
                  ))}
                </motion.div>
              ) : null}
            </>
          )}
        </div>
      </section>

      <section className="border-t bg-white py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-primary">Need more content?</p>
            <h2 className="font-display text-4xl font-bold md:text-5xl">Build a CMS workflow around your marketing site.</h2>
            <p className="mt-5 text-muted-foreground">
              This blog view now reads directly from the backend at {CMS_WEBSITE_NAME}, so new articles appear here without touching the frontend.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/contact">
                <Button className="h-12 rounded-full bg-gradient-brand px-7 text-white shadow-lg hover:shadow-xl">
                  Talk to Us <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" className="h-12 rounded-full border-2 border-primary/20 px-7 text-primary hover:border-primary hover:bg-primary hover:text-white">
                  Explore Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-primary/20 bg-[#081526] py-20 text-white">
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-brand opacity-15 blur-[120px]" />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Want the CMS to drive the rest of the site too?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/75">The same backend can power service detail pages, category pages, and future admin screens.</p>
          <Link href="/contact">
            <Button size="lg" className="mt-8 h-14 rounded-full bg-gradient-brand px-10 text-base text-white shadow-xl hover:opacity-95">
              Get a Free Consultation
            </Button>
          </Link>
        </div>
      </section>
    </PageTransition>
  );
}
