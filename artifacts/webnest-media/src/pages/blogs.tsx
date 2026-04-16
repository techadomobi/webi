import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowRight, Clock, Search, Tag } from 'lucide-react';
import PageTransition from '@/components/layout/PageTransition';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const categories = ['All', 'SEO', 'Social Media', 'PPC', 'Content Marketing', 'Email Marketing', 'Analytics', 'Brand Strategy', 'Digital Transformation'];

const posts = [
  {
    title: 'How AI is Reshaping SEO in 2025 and Beyond',
    category: 'SEO',
    date: 'April 10, 2025',
    read: '5 min read',
    excerpt: 'Generative AI is rewriting how search engines index and rank content. From AI Overviews to ChatGPT search integrations, we break down what you must do now to stay ahead of the curve and protect your organic traffic.',
    featured: true,
    author: 'Sarah Jenkins',
    authorRole: 'Head of Strategy',
  },
  {
    title: 'The Rise of Zero-Click Searches: What It Means for Your Traffic',
    category: 'SEO',
    date: 'April 2, 2025',
    read: '4 min read',
    excerpt: 'More than 65% of searches now end without a click. Learn how to capture attention, build brand authority, and drive conversions even when users never visit your site.',
    author: 'Marcus Chen',
    authorRole: 'Creative Director',
  },
  {
    title: 'Building a $1M Email List from Scratch: Our Exact Playbook',
    category: 'Email Marketing',
    date: 'March 24, 2025',
    read: '7 min read',
    excerpt: 'A step-by-step breakdown of the exact email growth strategy we used to generate $1M in attributed revenue for a B2B SaaS client in under 18 months.',
    author: 'Elena Rodriguez',
    authorRole: 'Lead Developer',
  },
  {
    title: 'Why Your PPC Campaigns Are Burning Budget (And How to Fix It)',
    category: 'PPC',
    date: 'March 15, 2025',
    read: '6 min read',
    excerpt: 'Most businesses waste 40-60% of their paid search budget on irrelevant clicks. We reveal the 7 most common PPC mistakes and the frameworks to eliminate them for good.',
    author: 'Alex Vance',
    authorRole: 'CEO',
  },
  {
    title: 'The Content Velocity Framework: Publish More Without Sacrificing Quality',
    category: 'Content Marketing',
    date: 'March 5, 2025',
    read: '5 min read',
    excerpt: 'Most content teams are stuck in a slow publish-and-pray cycle. Our Content Velocity Framework helps you produce 3x more content without compromising quality or brand voice.',
    author: 'Sarah Jenkins',
    authorRole: 'Head of Strategy',
  },
  {
    title: 'Instagram Reels vs TikTok: Where Should Your Brand Be in 2025?',
    category: 'Social Media',
    date: 'February 22, 2025',
    read: '4 min read',
    excerpt: 'Short-form video dominates, but the platforms serve very different audiences and algorithm behaviors. Here\'s our data-backed breakdown of where to invest your video content budget.',
    author: 'Marcus Chen',
    authorRole: 'Creative Director',
  },
  {
    title: 'First-Party Data Strategy: Preparing for a Cookie-Free World',
    category: 'Analytics',
    date: 'February 14, 2025',
    read: '6 min read',
    excerpt: 'Third-party cookies are finally going away. Here\'s how to build a robust first-party data infrastructure that powers personalization, retargeting, and attribution in 2025.',
    author: 'Elena Rodriguez',
    authorRole: 'Lead Developer',
  },
  {
    title: 'How to Build a Brand That Commands Premium Pricing',
    category: 'Brand Strategy',
    date: 'February 3, 2025',
    read: '5 min read',
    excerpt: 'Competing on price is a race to the bottom. We break down the branding frameworks used by Apple, Patagonia, and Notion to build perceived value that justifies premium positioning.',
    author: 'Alex Vance',
    authorRole: 'CEO',
  },
  {
    title: 'Influencer Marketing in 2025: Micro vs Macro — Which Wins?',
    category: 'Social Media',
    date: 'January 28, 2025',
    read: '4 min read',
    excerpt: 'Mega influencers get the headlines, but micro-influencers are quietly delivering 3-6x better engagement rates. We analyze 200 campaigns to reveal when each type actually wins.',
    author: 'Sarah Jenkins',
    authorRole: 'Head of Strategy',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 280, damping: 24 } }
};

export default function Blogs() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const featured = posts[0];
  const rest = posts.slice(1);

  const filtered = rest.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <PageTransition>
      {/* Hero */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 relative overflow-hidden bg-secondary/20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm font-bold uppercase tracking-widest text-primary mb-4"
          >
            Knowledge Hub
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6"
          >
            Insights That <span className="text-gradient">Drive Growth</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Cutting-edge strategies, case studies, and playbooks from the team that has generated over $50M in revenue for our clients.
          </motion.p>
          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-md mx-auto relative"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full h-14 pl-12 pr-4 rounded-full border border-input bg-white shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 border-b bg-white">
        <div className="container mx-auto px-4">
          <p className="text-sm font-bold uppercase tracking-widest text-primary mb-8 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" /> Featured Article
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="group grid lg:grid-cols-2 gap-8 bg-secondary/30 rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <div className="h-64 lg:h-auto bg-gradient-to-br from-primary/30 to-pink-500/20 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-brand opacity-15" />
              <div className="relative z-10 text-center p-8">
                <span className="text-xs font-bold uppercase tracking-widest text-white bg-primary px-3 py-1 rounded-full">{featured.category}</span>
                <p className="text-white/80 text-5xl font-display font-black mt-6 opacity-20">SEO</p>
              </div>
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full mb-4 w-fit">{featured.category}</span>
              <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4 group-hover:text-primary transition-colors leading-tight">{featured.title}</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">{featured.excerpt}</p>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-10 w-10 rounded-full bg-gradient-brand flex items-center justify-center text-white text-xs font-bold">
                  {featured.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-bold text-sm text-foreground">{featured.author}</p>
                  <p className="text-xs text-muted-foreground">{featured.authorRole}</p>
                </div>
                <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {featured.read}
                </div>
              </div>
              <Button className="bg-gradient-brand text-white border-0 shadow-md rounded-full w-fit h-11 px-7 hover:shadow-lg hover:scale-105 transition-all duration-300">
                Read Article <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-10 bg-white border-b sticky top-20 z-30 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide">
            <Tag className="h-4 w-4 text-muted-foreground shrink-0" />
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeCategory === cat ? 'bg-gradient-brand text-white shadow-md' : 'bg-secondary/50 text-foreground hover:bg-secondary'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20 bg-secondary/10">
        <div className="container mx-auto px-4">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-2xl font-display font-bold mb-3">No articles found</p>
              <p className="text-muted-foreground">Try a different search term or category.</p>
            </div>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filtered.map((post, i) => (
                <motion.article
                  key={i}
                  variants={item}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
                >
                  <div className="h-48 bg-gradient-to-br from-primary/15 to-pink-500/10 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-brand opacity-10 group-hover:opacity-20 transition-opacity duration-500" />
                    <span className="relative z-10 text-xs font-bold uppercase tracking-widest text-primary bg-white px-3 py-1 rounded-full shadow-sm">{post.category}</span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                      <span>{post.date}</span>
                      <span>·</span>
                      <Clock className="h-3 w-3" />
                      <span>{post.read}</span>
                    </div>
                    <h3 className="font-display font-bold text-xl mb-3 group-hover:text-primary transition-colors leading-tight flex-1">{post.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center gap-3 border-t pt-4">
                      <div className="h-8 w-8 rounded-full bg-gradient-brand flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {post.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-foreground truncate">{post.author}</p>
                        <p className="text-xs text-muted-foreground truncate">{post.authorRole}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 shrink-0" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24 bg-white border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Stay Ahead</p>
            <h2 className="font-display text-4xl font-bold mb-4">
              Get the <span className="text-gradient">Latest Strategies</span> in Your Inbox
            </h2>
            <p className="text-muted-foreground mb-8">Join 10,000+ marketers who receive our weekly insights on what's actually working in digital marketing right now.</p>
            <div className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 h-12 px-4 rounded-full border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <Button className="bg-gradient-brand text-white border-0 rounded-full h-12 px-6 hover:shadow-lg hover:scale-105 transition-all duration-300 shrink-0">
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-3">No spam, ever. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-foreground">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-brand rounded-full blur-[120px] opacity-20" />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">Ready to apply these strategies?</h2>
          <p className="text-gray-300 mb-8 text-lg">Let our team build a custom plan tailored specifically to your business.</p>
          <Link href="/contact">
            <Button size="lg" className="bg-white text-foreground hover:bg-gray-100 shadow-xl hover:scale-105 transition-all duration-300 h-14 px-10 rounded-full text-base">
              Get a Free Consultation
            </Button>
          </Link>
        </div>
      </section>
    </PageTransition>
  );
}
