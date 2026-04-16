import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowRight, CheckCircle2, Search, TrendingUp, Share2, Globe, PenTool, Megaphone, Users, MessageSquare, Mail, Database, Shield, Target, Repeat, Cpu, BarChart2, Star } from 'lucide-react';
import PageTransition from '@/components/layout/PageTransition';
import TiltCard from '@/components/ui/TiltCard';
import RevealSection from '@/components/ui/RevealSection';
import AnimatedWords from '@/components/ui/AnimatedWords';
import GlowButton from '@/components/ui/GlowButton';
import FloatingOrbs from '@/components/ui/FloatingOrbs';
import { Button } from '@/components/ui/button';

import AnimatedCounter from '@/components/ui/AnimatedCounter';

import servicesImg from '@/assets/images/services-digital.svg';

const digitalMarketing = [
  {
    icon: Search,
    title: 'Search Engine Optimization',
    slug: 'seo',
    tagline: 'Rank higher. Get found faster.',
    description: 'We go far beyond keywords. Our SEO approach combines deep technical audits, content strategy, and high-authority link building to produce durable first-page rankings that compound over time.',
    features: ['Comprehensive technical site audits', 'Semantic keyword architecture', 'High-authority link acquisition', 'Core Web Vitals & performance tuning', 'Local & international search strategies', 'Monthly ranking & traffic reports'],
  },
  {
    icon: TrendingUp,
    title: 'Search Engine Marketing',
    slug: 'sem',
    tagline: 'Paid search that pays back.',
    description: 'Capturing bottom-of-funnel intent with precision-targeted PPC campaigns. We manage every dollar to ensure maximum ROI — from keyword selection and ad copy to landing page optimization and bid strategy.',
    features: ['Google Ads & Microsoft Ads management', 'Smart bidding strategy', 'Dynamic search & shopping ads', 'Landing page optimization & CRO', 'Negative keyword management', 'Transparent cost-per-acquisition tracking'],
  },
  {
    icon: Share2,
    title: 'Social Media Marketing',
    slug: 'smm',
    tagline: 'Communities that convert.',
    description: 'We build engaged, loyal communities on every relevant platform — transforming casual followers into brand advocates. Platform-specific content calendars, community management, and data-driven growth tactics.',
    features: ['Platform-specific content strategy', 'Daily community management', 'Viral campaign ideation & execution', 'Story and Reel production', 'Hashtag & trend leveraging', 'Monthly growth & engagement reports'],
  },
  {
    icon: Globe,
    title: 'Web Development',
    slug: 'web',
    tagline: 'Websites that work as hard as you do.',
    description: 'Your website is your most important sales asset. We build blazing-fast, beautifully designed, conversion-optimized web experiences — whether that\'s a marketing site, e-commerce store, or complex web application.',
    features: ['Custom UI/UX design', 'React, Next.js & Webflow builds', 'E-commerce & headless commerce', 'Core Web Vitals & Lighthouse optimization', 'CMS integration (WordPress, Contentful)', 'Ongoing maintenance & hosting'],
  },
  {
    icon: PenTool,
    title: 'Content Marketing',
    slug: 'content',
    tagline: 'Content that ranks and resonates.',
    description: 'We create authoritative, SEO-optimized content at scale. From long-form blog content and pillar pages to whitepapers, case studies, and email sequences — all crafted to drive organic traffic and build brand trust.',
    features: ['SEO-driven content strategy', 'Blog articles & pillar pages', 'Whitepapers & in-depth guides', 'Video scripts & podcast outlines', 'Email newsletters & drip sequences', 'Editing, publishing & distribution'],
  },
  {
    icon: Users,
    title: 'Affiliate Marketing',
    slug: 'affiliate',
    tagline: 'Scale growth through partnerships.',
    description: 'Leverage a network of high-quality publishers, bloggers, and content creators to drive performance-based traffic and sales. We recruit, manage, and optimize affiliate programs to generate measurable revenue growth.',
    features: ['Affiliate program setup & management', 'Publisher recruitment & vetting', 'Commission structure design', 'Creative asset production', 'Performance tracking & fraud prevention', 'Monthly partner performance reviews'],
  },
];

const promotions = [
  {
    icon: Megaphone,
    title: 'Mobile Marketing',
    slug: 'mobile',
    tagline: 'Your audience is on mobile. So are we.',
    description: 'With over 55% of web traffic coming from mobile devices, a mobile-first strategy is non-negotiable. We run SMS, push notification, and in-app ad campaigns designed specifically for the small screen.',
    features: ['Mobile-first campaign design', 'SMS marketing campaigns', 'In-app advertising', 'Push notification strategy', 'App install campaigns', 'Mobile A/B testing'],
  },
  {
    icon: Users,
    title: 'Influencer Marketing',
    slug: 'influencer',
    tagline: 'Authentic reach at scale.',
    description: 'We connect brands with the right voices — from mega-influencers for awareness to micro-influencers for high-trust, targeted reach. Every campaign is tracked with clear performance metrics and brand-safety protocols.',
    features: ['Influencer discovery & vetting', 'Contract & brief management', 'Content review & approval', 'Micro and macro influencer campaigns', 'Performance tracking & ROI reporting', 'Long-term ambassador programs'],
  },
  {
    icon: MessageSquare,
    title: 'SMS Marketing',
    slug: 'sms',
    tagline: 'The highest open rate channel.',
    description: 'SMS boasts a 98% open rate. We build compliant, personalized SMS campaigns that cut through the noise and drive immediate action — from flash sales to appointment reminders.',
    features: ['List growth & segmentation', 'Compliant opt-in collection', 'Automated drip sequences', 'Transactional SMS integration', 'A/B testing of message copy', 'Detailed delivery & conversion analytics'],
  },
  {
    icon: Mail,
    title: 'Email Marketing',
    slug: 'email',
    tagline: 'Nurture, convert, and retain.',
    description: 'Email remains the highest-ROI digital channel at $42 per $1 spent. We design, write, build, and optimize every element of your email program — from welcome flows to re-engagement campaigns.',
    features: ['Email strategy & calendar planning', 'Custom email design & coding', 'List growth & hygiene', 'Welcome, nurture & re-engagement flows', 'Deliverability optimization', 'Monthly performance & A/B test reporting'],
  },
  {
    icon: Database,
    title: 'CRM',
    slug: 'crm',
    tagline: 'Turn contacts into loyal customers.',
    description: 'Your CRM is only as powerful as the strategy behind it. We implement, configure, and optimize CRM platforms to automate lead nurturing, improve sales efficiency, and reduce customer churn.',
    features: ['CRM platform selection & setup', 'Data migration & cleansing', 'Sales pipeline configuration', 'Workflow & automation design', 'Lead scoring models', 'Team training & ongoing support'],
  },
];

const solutions = [
  {
    icon: Shield,
    title: 'Online Reputation Management',
    slug: 'orm',
    tagline: 'Protect what you\'ve built.',
    description: 'Your online reputation is your most valuable — and most fragile — asset. We proactively monitor, defend, and build your brand\'s reputation across review sites, social media, news, and search results.',
    features: ['Brand monitoring & alert setup', 'Negative content suppression', 'Review acquisition strategy', 'Crisis communication planning', 'Wikipedia & knowledge panel management', 'Monthly reputation score reports'],
  },
  {
    icon: Target,
    title: 'Brand Strategy',
    slug: 'brand',
    tagline: 'Define your market position.',
    description: 'Before you market, you must be clear on who you are. We lead brand discovery workshops, competitive audits, and customer research to build brand identities that command attention and justify premium pricing.',
    features: ['Brand audit & competitive analysis', 'Audience persona development', 'Brand positioning & messaging', 'Visual identity guidelines', 'Tone of voice documentation', 'Brand launch strategy'],
  },
  {
    icon: ArrowRight,
    title: 'Lead Generation',
    slug: 'leads',
    tagline: 'A full pipeline, always.',
    description: 'We build multi-channel lead generation systems — combining SEO, paid media, content, and outbound — to create a consistent, predictable flow of qualified leads for your sales team.',
    features: ['Lead generation strategy design', 'Landing page & funnel creation', 'Lead magnet development', 'LinkedIn & outbound campaigns', 'Lead scoring & qualification', 'CRM handoff & reporting'],
  },
  {
    icon: Repeat,
    title: 'Customer Retention',
    slug: 'retention',
    tagline: 'Keep the customers you\'ve earned.',
    description: 'Acquiring a new customer costs 5-7x more than retaining one. We build loyalty programs, re-engagement campaigns, and customer success systems that dramatically improve lifetime value.',
    features: ['Customer lifecycle mapping', 'Churn prediction & prevention', 'Loyalty program design', 'Winback email campaigns', 'Net Promoter Score programs', 'LTV optimization strategy'],
  },
  {
    icon: Cpu,
    title: 'Digital Transformation',
    slug: 'transformation',
    tagline: 'Modernize to grow.',
    description: 'We help traditional businesses migrate to modern digital infrastructure — automating operations, adopting cloud tools, and building data pipelines that unlock new levels of efficiency and insight.',
    features: ['Digital maturity assessment', 'Technology stack advisory', 'Marketing automation implementation', 'Data infrastructure & analytics', 'Process automation (Zapier, Make)', 'Team training & change management'],
  },
  {
    icon: BarChart2,
    title: 'Market Research & Insights',
    slug: 'research',
    tagline: 'Know your market. Own it.',
    description: 'Data-driven decision making starts with the right research. We conduct primary and secondary market research, customer surveys, competitor audits, and trend analysis to reveal growth opportunities.',
    features: ['Competitive landscape analysis', 'Customer survey design & analysis', 'Market sizing & opportunity mapping', 'Consumer behavior research', 'Industry trend reporting', 'Actionable strategic recommendations'],
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 280, damping: 24 } }
};

function ServiceCard({ service, idx }: { service: typeof digitalMarketing[0], idx: number }) {
  return (
    <TiltCard intensity={8}>
      <motion.div
        variants={item}
        className="group gradient-border-animated bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col"
      >
        <motion.div
          className="h-1.5 w-full bg-gradient-brand"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.06 + 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: 'left' }}
        />
        <div className="p-8 flex flex-col flex-1">
          <motion.div
            className="h-14 w-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6"
            whileHover={{ rotate: [0, -8, 8, 0], scale: 1.15, backgroundColor: '#7c3aed', color: '#fff' }}
            transition={{ duration: 0.4 }}
          >
            <service.icon className="h-7 w-7" />
          </motion.div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">{service.tagline}</p>
          <h3 className="font-display text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
          <p className="text-muted-foreground leading-relaxed mb-6 text-sm flex-1">{service.description}</p>
          <ul className="space-y-2 mb-8">
            {service.features.map((f, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-2 text-sm"
              >
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                <span className="text-foreground/80">{f}</span>
              </motion.li>
            ))}
          </ul>
          <Link href="/contact">
            <GlowButton variant="outline" size="sm" className="w-full justify-center">
              Discuss this service <ArrowRight className="h-4 w-4" />
            </GlowButton>
          </Link>
        </div>
      </motion.div>
    </TiltCard>
  );
}

export default function Services() {
  return (
    <PageTransition>
      {/* Header */}
      <section className="pt-24 pb-20 lg:pt-32 lg:pb-28 bg-secondary/20 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
          <div className="absolute top-10 right-10 w-96 h-96 bg-primary/15 rounded-full blur-[100px]" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-pink-500/15 rounded-full blur-[100px]" />
        </div>

        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm font-bold uppercase tracking-widest text-primary mb-4"
          >
            Everything You Need
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6"
          >
            Digital <span className="text-gradient">Domination</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            We don't offer generic packages. We engineer bespoke growth engines across 17 specialized disciplines — tailored to your unique market position and growth objectives.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-4 justify-center mt-10"
          >
            <a href="#digital-marketing">
              <Button variant="outline" className="border-2 border-primary/20 hover:border-primary text-primary hover:bg-primary hover:text-white rounded-full h-11 px-7 transition-all duration-300">
                Digital Marketing
              </Button>
            </a>
            <a href="#promotions">
              <Button variant="outline" className="border-2 border-primary/20 hover:border-primary text-primary hover:bg-primary hover:text-white rounded-full h-11 px-7 transition-all duration-300">
                Promotions
              </Button>
            </a>
            <a href="#solutions">
              <Button variant="outline" className="border-2 border-primary/20 hover:border-primary text-primary hover:bg-primary hover:text-white rounded-full h-11 px-7 transition-all duration-300">
                Solutions
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden aspect-[21/9] max-h-[500px] shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
            <img src={servicesImg} alt="Digital Marketing Services" className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 z-20 p-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">Full-Service Digital Growth</h2>
              <p className="text-white/70">17 disciplines. One integrated strategy. Measurable results.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-14 bg-secondary/20 border-y">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { end: 17, suffix: '+', label: 'Specialized Services' },
              { end: 500, suffix: '+', label: 'Clients Worldwide' },
              { end: 50, prefix: '$', suffix: 'M+', label: 'Revenue Generated' },
              { end: 30, suffix: '+', label: 'Countries Served' },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 200 }}
              >
                <p className="font-display text-4xl font-black text-gradient">
                  <AnimatedCounter end={s.end} suffix={s.suffix} prefix={s.prefix || ''} />
                </p>
                <p className="text-sm text-muted-foreground font-medium mt-1 uppercase tracking-wider">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Marketing */}
      <section id="digital-marketing" className="py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Category 01</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Digital Marketing</h2>
            <p className="text-muted-foreground text-lg">The core disciplines that build your online presence, attract your audience, and convert at every stage of the funnel.</p>
          </div>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-7"
          >
            {digitalMarketing.map((service, idx) => (
              <ServiceCard key={service.slug} service={service} idx={idx} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Promotions */}
      <section id="promotions" className="py-24 lg:py-32 bg-secondary/20 border-y">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Category 02</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Promotions</h2>
            <p className="text-muted-foreground text-lg">High-impact promotional channels that amplify your message, reach new audiences, and generate immediate revenue.</p>
          </div>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-7"
          >
            {promotions.map((service, idx) => (
              <ServiceCard key={service.slug} service={service} idx={idx} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Solutions */}
      <section id="solutions" className="py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Category 03</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Solutions</h2>
            <p className="text-muted-foreground text-lg">Strategic frameworks and long-term programs that build sustainable competitive advantage and protect your market position.</p>
          </div>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-7"
          >
            {solutions.map((service, idx) => (
              <ServiceCard key={service.slug} service={service} idx={idx} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-28 bg-foreground text-background relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-brand rounded-full blur-[150px] opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <p className="text-sm font-bold uppercase tracking-widest text-primary mb-3">How We Work</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">Our Methodology</h2>
            <p className="text-xl text-gray-400">From where you are to where you want to be — a clear, repeatable system for growth.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { num: '01', title: 'Audit & Discover', desc: 'Deep dive into your current metrics, competitors, and market positioning to uncover every opportunity.' },
              { num: '02', title: 'Strategy Design', desc: 'Architecting a bespoke growth plan with clear KPIs, timelines, budgets, and accountability structures.' },
              { num: '03', title: 'Execute & Launch', desc: 'Flawless multi-channel deployment with rapid A/B testing and iteration built in from the start.' },
              { num: '04', title: 'Scale & Optimize', desc: 'Weekly data reviews to double down on winners, eliminate waste, and continuously raise the ceiling.' },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="group relative"
              >
                <div className="text-7xl font-display font-black text-gray-800 mb-4 leading-none">{step.num}</div>
                <div className="h-1 w-12 bg-gradient-brand mb-6 group-hover:w-24 transition-all duration-500" />
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-secondary/10 border-y">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-sm font-bold uppercase tracking-widest text-primary mb-3">What Clients Say</p>
            <h2 className="font-display text-4xl font-bold">Trusted by 500+ Brands</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { quote: 'Their SEO work tripled our organic traffic in 8 months. The team is meticulous, transparent, and genuinely invested in our success.', name: 'James Okoye', company: 'BuildStack Inc.', service: 'SEO' },
              { quote: 'The email campaigns WeeoMedia built for us consistently outperform industry benchmarks. 45% open rates are our new normal.', name: 'Amanda Wright', company: 'Venture Partners', service: 'Email Marketing' },
              { quote: 'Our web rebuild by WeeoMedia converted at 3.2x our previous site. It was the best investment we\'ve made this year.', name: 'Elena Rodriguez', company: 'FinTech Innovations', service: 'Web Dev' },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(s => <Star key={s} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-sm text-primary font-bold uppercase tracking-widest mb-3">{t.service}</p>
                <p className="text-foreground leading-relaxed mb-6 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3 border-t pt-4">
                  <div className="h-9 w-9 rounded-full bg-gradient-brand flex items-center justify-center text-white text-xs font-bold">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-foreground">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-brand rounded-full blur-[130px] opacity-20" />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center max-w-2xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">Not sure where to start?</h2>
          <p className="text-gray-300 text-lg mb-10">Every engagement starts with a free strategy consultation. We'll audit your current state and show you exactly where the biggest wins are.</p>
          <Link href="/contact">
            <Button size="lg" className="bg-white text-foreground hover:bg-gray-100 shadow-xl hover:scale-105 transition-all duration-300 text-lg h-16 px-12 rounded-full">
              Book a Free Consultation <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </PageTransition>
  );
}
