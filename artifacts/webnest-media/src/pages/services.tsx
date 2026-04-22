import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ArrowRight, Filter, Search, Sparkles, Star, TrendingUp, Users } from 'lucide-react';
import { Link } from 'wouter';

import PageTransition from '@/components/layout/PageTransition';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CMS_WEBSITE_NAME, fetchCmsList, type CmsEntry } from '@/lib/cms-api';

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 260, damping: 24 } },
};

function normalizeSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const fallbackServices: CmsEntry[] = [
  { _id: 'fallback-seo', slug: 'search-engine-optimization', title: 'Search Engine Optimization', excerpt: 'Rank for high-intent keywords and grow sustainable organic demand.', content: [], category: 'Digital Marketing', tags: ['SEO', 'Organic Growth'], writerName: 'WebNest Team' },
  { _id: 'fallback-sem', slug: 'search-engine-marketing', title: 'Search Engine Marketing', excerpt: 'Capture intent-driven traffic with performance-first paid search campaigns.', content: [], category: 'Digital Marketing', tags: ['SEM', 'PPC'], writerName: 'WebNest Team' },
  { _id: 'fallback-smm', slug: 'social-media-marketing', title: 'Social Media Marketing', excerpt: 'Build audience, engagement, and conversion with social-first strategy.', content: [], category: 'Digital Marketing', tags: ['SMM', 'Social'], writerName: 'WebNest Team' },
  { _id: 'fallback-web', slug: 'web-development', title: 'Web Development', excerpt: 'Launch conversion-focused websites with strong UX and performance.', content: [], category: 'Digital Marketing', tags: ['Web', 'Development'], writerName: 'WebNest Team' },
  { _id: 'fallback-ctv', slug: 'ctv-ads-agency', title: 'CTV Ads Agency', excerpt: 'Run connected-TV ad campaigns with precise audience and performance tracking.', content: [], category: 'Digital Marketing', tags: ['CTV', 'Paid Media'], writerName: 'WebNest Team' },
  { _id: 'fallback-content', slug: 'content-marketing', title: 'Content Marketing', excerpt: 'Create strategic content systems that drive visibility and trust.', content: [], category: 'Digital Marketing', tags: ['Content', 'SEO'], writerName: 'WebNest Team' },
  { _id: 'fallback-affiliate', slug: 'affiliate-marketing', title: 'Affiliate Marketing', excerpt: 'Scale revenue through vetted partner and publisher channels.', content: [], category: 'Digital Marketing', tags: ['Affiliate', 'Growth'], writerName: 'WebNest Team' },
  { _id: 'fallback-mobile', slug: 'mobile-marketing', title: 'Mobile Marketing', excerpt: 'Reach and convert mobile users with journey-based campaigns.', content: [], category: 'Promotions', tags: ['Mobile', 'Lifecycle'], writerName: 'WebNest Team' },
  { _id: 'fallback-influencer', slug: 'influencer-marketing', title: 'Influencer Marketing', excerpt: 'Activate creator-led campaigns with measurable business outcomes.', content: [], category: 'Promotions', tags: ['Influencer', 'Creators'], writerName: 'WebNest Team' },
  { _id: 'fallback-sms', slug: 'sms-marketing', title: 'SMS Marketing', excerpt: 'Drive immediate responses with compliant and personalized SMS programs.', content: [], category: 'Promotions', tags: ['SMS', 'Automation'], writerName: 'WebNest Team' },
  { _id: 'fallback-email', slug: 'email-marketing', title: 'Email Marketing', excerpt: 'Build lifecycle email flows that improve retention and LTV.', content: [], category: 'Promotions', tags: ['Email', 'Retention'], writerName: 'WebNest Team' },
  { _id: 'fallback-google', slug: 'google-ads', title: 'Google Ads', excerpt: 'Launch search and performance campaigns designed for measurable lead quality.', content: [], category: 'Promotions', tags: ['Google Ads', 'PPC'], writerName: 'WebNest Team' },
  { _id: 'fallback-meta', slug: 'meta-ads', title: 'Meta Ads', excerpt: 'Scale full-funnel campaigns across Facebook and Instagram with creative testing.', content: [], category: 'Promotions', tags: ['Meta Ads', 'Social Ads'], writerName: 'WebNest Team' },
  { _id: 'fallback-youtube', slug: 'youtube-ads-seo', title: 'YouTube Ads & SEO', excerpt: 'Combine video ad reach with SEO strategy to drive compounding discoverability.', content: [], category: 'Promotions', tags: ['YouTube', 'Video'], writerName: 'WebNest Team' },
  { _id: 'fallback-crm', slug: 'crm', title: 'CRM', excerpt: 'Connect sales and marketing workflows for cleaner conversion paths.', content: [], category: 'Promotions', tags: ['CRM', 'Automation'], writerName: 'WebNest Team' },
  { _id: 'fallback-orm', slug: 'online-reputation-management', title: 'Online Reputation Management', excerpt: 'Protect and improve brand trust across search, social, and review channels.', content: [], category: 'Solutions', tags: ['ORM', 'Brand'], writerName: 'WebNest Team' },
  { _id: 'fallback-brand', slug: 'brand-strategy', title: 'Brand Strategy', excerpt: 'Define clear positioning and messaging that improves conversion clarity.', content: [], category: 'Solutions', tags: ['Brand', 'Positioning'], writerName: 'WebNest Team' },
  { _id: 'fallback-leads', slug: 'lead-generation', title: 'Lead Generation', excerpt: 'Design high-intent funnels to generate reliable pipeline growth.', content: [], category: 'Solutions', tags: ['Leads', 'Pipeline'], writerName: 'WebNest Team' },
  { _id: 'fallback-leads-marketing', slug: 'lead-generation-marketing', title: 'Lead Generation Marketing', excerpt: 'Build qualified pipeline systems with conversion-first offers and targeting.', content: [], category: 'Solutions', tags: ['Lead Gen', 'Demand'], writerName: 'WebNest Team' },
  { _id: 'fallback-retention', slug: 'customer-retention', title: 'Customer Retention', excerpt: 'Increase repeat behavior and customer lifetime value systematically.', content: [], category: 'Solutions', tags: ['Retention', 'LTV'], writerName: 'WebNest Team' },
  { _id: 'fallback-transform', slug: 'digital-transformation', title: 'Digital Transformation', excerpt: 'Modernize workflows and remove bottlenecks with better systems.', content: [], category: 'Solutions', tags: ['Transformation', 'Operations'], writerName: 'WebNest Team' },
  { _id: 'fallback-research', slug: 'market-research-insights', title: 'Market Research & Insights', excerpt: 'Use structured market intelligence to guide faster strategic decisions.', content: [], category: 'Solutions', tags: ['Research', 'Insights'], writerName: 'WebNest Team' },
];

function mergeServices(cmsItems: CmsEntry[]) {
  const merged = new Map<string, CmsEntry>();

  fallbackServices.forEach(item => {
    merged.set(normalizeSlug(item.slug), item);
  });

  cmsItems.forEach(item => {
    const normalized = normalizeSlug(item.slug || item.title || item._id);
    if (normalized) {
      merged.set(normalized, item);
    }
  });

  return Array.from(merged.values());
}

function getCategories(items: CmsEntry[]) {
  return ['All', ...Array.from(new Set(items.map(item => item.category?.trim()).filter(Boolean) as string[]))];
}

function filterItems(items: CmsEntry[], search: string, category: string) {
  const searchTerm = search.trim().toLowerCase();

  return items.filter(item => {
    const matchCategory = category === 'All' || item.category?.trim() === category;
    const haystack = [item.title, item.excerpt, item.category, item.tags?.join(' '), item.writerName, item.focusKeyphrase]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    const matchSearch = searchTerm === '' || haystack.includes(searchTerm);

    return matchCategory && matchSearch;
  });
}

function ServiceCard({ item }: { item: CmsEntry }) {
  const image = item.coverImage || '/decor/service-wave.svg';
  const href = `/services/${encodeURIComponent(item.slug)}`;

  return (
    <Link href={href}>
      <motion.article
        variants={cardVariants}
        whileHover={{ y: -6, rotateX: 1.2 }}
        className="group relative h-full"
      >
        <Card className="gradient-border-animated card-hover-glow flex h-full flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white/95 shadow-sm backdrop-blur-sm">
          <div className="relative h-52 overflow-hidden">
            <img src={image} alt={item.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top right, rgba(8, 21, 38, 0.85), rgba(21, 51, 91, 0.45) 55%, transparent 100%)' }}
            />
            <div className="absolute left-0 top-0 m-5 inline-flex rounded-full border border-white/15 bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-sm">
              {item.category || 'CMS Service'}
            </div>
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <h3 className="font-display text-2xl font-bold leading-tight">{item.title}</h3>
            </div>
          </div>
          <CardContent className="flex flex-1 flex-col p-6">
            <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <Badge variant="secondary" className="inline-flex items-center gap-1 rounded-full px-3 py-1 font-medium text-foreground">
                <Users className="h-3.5 w-3.5" />
                {item.writerName || CMS_WEBSITE_NAME}
              </Badge>
              <Badge variant="secondary" className="inline-flex items-center gap-1 rounded-full px-3 py-1 font-medium text-foreground">
                <Sparkles className="h-3.5 w-3.5" />
                {item.tags?.[0] || 'Growth service'}
              </Badge>
            </div>

            <p className="mb-6 line-clamp-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              {item.excerpt || 'Open the service page to read the full CMS description and content blocks.'}
            </p>

            <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
              <div className="text-xs font-medium uppercase tracking-[0.2em] text-primary">View details</div>
              <ArrowRight className="h-4 w-4 text-primary transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </CardContent>
        </Card>
        <div className="pointer-events-none absolute -right-7 -top-7 h-20 w-20 rounded-full bg-primary/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
        <div className="pointer-events-none absolute -bottom-7 -left-7 h-20 w-20 rounded-full bg-pink-400/10 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="sr-only">Open {item.title}</div>
      </motion.article>
    </Link>
  );
}

function HighlightsStrip() {
  const highlights = [
    'Conversion-first funnels',
    'Performance reporting cadence',
    'Creative + channel execution',
    'Growth experiments every sprint',
    'CMS-powered service publishing',
    'Transparent optimization process',
  ];

  return (
    <section className="border-y border-primary/15 bg-white/80 py-4 backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="overflow-hidden">
          <div className="animate-marquee flex min-w-max items-center gap-8 whitespace-nowrap">
            {[...highlights, ...highlights].map((text, index) => (
              <div key={`${text}-${index}`} className="inline-flex items-center gap-2 text-sm font-medium text-foreground/80">
                <Star className="h-3.5 w-3.5 text-primary" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
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

export default function Services() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['cms', 'services'],
    queryFn: () => fetchCmsList('services'),
    staleTime: 5 * 60 * 1000,
  });

  const items = useMemo(() => mergeServices(data ?? []), [data]);
  const categories = useMemo(() => getCategories(items), [items]);
  const filtered = useMemo(() => filterItems(items, search, activeCategory), [items, search, activeCategory]);
  const featured = filtered[0] ?? items[0];
  const rest = filtered.slice(featured ? 1 : 0);
  const counts = useMemo(() => {
    const uniqueSlugs = new Set(items.map(item => item.slug));
    const categoriesCount = new Set(items.map(item => item.category?.trim()).filter(Boolean));

    return {
      services: uniqueSlugs.size,
      categories: categoriesCount.size,
      creators: new Set(items.map(item => item.writerName).filter(Boolean)).size,
    };
  }, [items]);

  return (
    <PageTransition>
      <section className="relative overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-28 bg-secondary/20">
        <div className="absolute inset-0">
          <div className="absolute right-10 top-10 h-80 w-80 rounded-full bg-primary/15 blur-[120px]" />
          <div className="absolute bottom-10 left-10 h-80 w-80 rounded-full bg-pink-500/15 blur-[120px]" />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-primary">
            Live CMS Services
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="font-display text-5xl font-extrabold leading-tight md:text-6xl lg:text-7xl">
            Services Backed by <span className="text-gradient">Real Backend Content</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground md:text-xl">
            The catalog below is powered by the same CMS that drives the blog. New entries, titles, images, and slugs can appear here without frontend changes.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-3">
            {[
              { value: counts.services || '10+', label: 'Live Services' },
              { value: counts.categories || '3+', label: 'CMS Categories' },
              { value: counts.creators || '1', label: 'Publishers' },
            ].map(stat => (
              <div key={stat.label} className="rounded-3xl border border-white/60 bg-white/85 p-5 shadow-sm backdrop-blur-sm">
                <div className="font-display text-4xl font-black text-gradient">{stat.value}</div>
                <div className="mt-1 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mx-auto mt-10 max-w-xl">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={event => setSearch(event.target.value)}
                placeholder="Search services, categories, or keywords..."
                className="h-14 w-full rounded-full border border-white/20 bg-white/95 pl-12 pr-4 text-base text-foreground shadow-sm outline-none transition focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-border/70 bg-white/85 py-8 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide">
            <Filter className="h-4 w-4 shrink-0 text-muted-foreground" />
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

      <HighlightsStrip />

      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <LoadingState />
          ) : error ? (
            <div className="rounded-3xl border border-red-200 bg-red-50 px-6 py-10 text-center text-red-900">
              <p className="font-display text-3xl font-bold">Could not load CMS services</p>
              <p className="mt-3 text-sm text-red-800">{error instanceof Error ? error.message : 'The backend request failed.'}</p>
              <Button onClick={() => refetch()} className="mt-6 rounded-full bg-red-600 text-white hover:bg-red-700">
                Try Again
              </Button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border bg-secondary/15 px-6 py-16 text-center">
              <p className="font-display text-3xl font-bold">No matching services</p>
              <p className="mt-3 text-muted-foreground">Try a different search term or category.</p>
            </div>
          ) : (
            <>
              {featured ? (
                <div className="mb-12 overflow-hidden border border-gray-100 bg-white shadow-2xl lg:grid lg:grid-cols-[0.95fr_1.05fr]" style={{ borderRadius: '2rem' }}>
                  <div className="relative overflow-hidden" style={{ minHeight: 300 }}>
                    <img src={featured.coverImage || '/decor/service-wave.svg'} alt={featured.title} className="absolute inset-0 h-full w-full object-cover" />
                    <div
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(to top right, rgba(8, 21, 38, 0.9), rgba(18, 50, 91, 0.55) 55%, transparent 100%)' }}
                    />
                    <div className="absolute inset-x-0 bottom-0 p-8 text-white">
                      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-white/80">Featured service</p>
                      <h2 className="font-display text-3xl font-bold md:text-4xl">{featured.title}</h2>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center p-8 md:p-12">
                    <div className="mb-4 flex flex-wrap gap-2 text-xs font-medium text-muted-foreground">
                      <Badge variant="secondary" className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-foreground">{featured.category || 'CMS Service'}</Badge>
                      <Badge variant="secondary" className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-foreground">{featured.writerName || CMS_WEBSITE_NAME}</Badge>
                    </div>
                    <p className="text-muted-foreground leading-relaxed md:text-lg">{featured.excerpt}</p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Link href={`/services/${encodeURIComponent(featured.slug)}`}>
                        <Button className="h-12 rounded-full bg-gradient-brand px-6 text-white shadow-lg hover:shadow-xl">
                          View Service Page <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href="/contact">
                        <Button variant="outline" className="h-12 rounded-full border-2 border-primary/20 px-6 text-primary hover:border-primary hover:bg-primary hover:text-white">
                          Get a Quote
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : null}

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-10 grid gap-4 rounded-3xl border border-primary/10 bg-linear-to-r from-primary/6 via-white to-pink-500/6 p-5 md:grid-cols-3"
              >
                <div className="rounded-2xl border border-white bg-white/90 p-4 shadow-sm">
                  <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/12 text-primary">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">Performance-Driven Services</p>
                  <p className="mt-1 text-xs text-muted-foreground">Every service maps to measurable growth outcomes.</p>
                </div>
                <div className="rounded-2xl border border-white bg-white/90 p-4 shadow-sm">
                  <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/12 text-primary">
                    <Users className="h-4 w-4" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">Senior Specialists</p>
                  <p className="mt-1 text-xs text-muted-foreground">Execution by focused teams, not generic templates.</p>
                </div>
                <div className="rounded-2xl border border-white bg-white/90 p-4 shadow-sm">
                  <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/12 text-primary">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">Rapid Iteration Rhythm</p>
                  <p className="mt-1 text-xs text-muted-foreground">Weekly experiments and optimization loops built in.</p>
                </div>
              </motion.div>

              {rest.length > 0 ? (
                <motion.div variants={{ show: { transition: { staggerChildren: 0.08 } } }} initial="hidden" animate="show" className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
                  {rest.map(item => (
                    <ServiceCard key={item._id} item={item} />
                  ))}
                </motion.div>
              ) : null}
            </>
          )}
        </div>
      </section>

      <section className="bg-secondary/15 py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-primary">Why this matters</p>
            <h2 className="font-display text-4xl font-bold md:text-5xl">Your services page is now CMS-ready.</h2>
            <p className="mt-5 text-muted-foreground">
              Slugs from the backend feed the service detail route, which means you can manage titles, categories, and descriptions from one place.
            </p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-primary/20 bg-[#081526] py-20 text-white">
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-brand opacity-15 blur-[120px]" />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Need the CMS wired into admin screens too?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/75">The same backend also exposes create, update, and delete endpoints for blogs, services, and categories.</p>
          <Link href="/contact">
            <Button size="lg" className="mt-8 h-14 rounded-full bg-gradient-brand px-10 text-base text-white shadow-xl hover:opacity-95">
              Request Implementation
            </Button>
          </Link>
        </div>
      </section>
    </PageTransition>
  );
}
