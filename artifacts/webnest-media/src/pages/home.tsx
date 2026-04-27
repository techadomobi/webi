import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import {
  ArrowRight, BarChart3, Globe, PenTool, Rocket, Target, Users, Star,
  Award, Clock, TrendingUp, Search, Share2, Cpu, Shield, Megaphone,
  CheckCircle2, Quote, Zap, Sparkles
} from 'lucide-react';
import PageTransition from '@/components/layout/PageTransition';
import AnimatedWords from '@/components/ui/AnimatedWords';
import FloatingOrbs from '@/components/ui/FloatingOrbs';
import InfiniteMarquee from '@/components/ui/InfiniteMarquee';
import TiltCard from '@/components/ui/TiltCard';
import RevealSection from '@/components/ui/RevealSection';
import GlowButton from '@/components/ui/GlowButton';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

const services = [
  { icon: Search, title: 'Search Engine Optimization', desc: 'Dominate search rankings with precision keyword strategy, technical excellence, and high-authority link building.' },
  { icon: Users, title: 'Social Media Marketing', desc: 'Build engaged communities and turn followers into loyal brand advocates across every major platform.' },
  { icon: Rocket, title: 'PPC & Paid Advertising', desc: 'Maximize ROI with hyper-targeted campaigns across Google, Meta, LinkedIn and beyond.' },
  { icon: Globe, title: 'Web Design & Development', desc: 'High-converting, blazing-fast websites engineered for SEO and seamless user experience.' },
  { icon: PenTool, title: 'Content Marketing', desc: 'Compelling narratives that build industry authority and drive scalable organic growth.' },
  { icon: BarChart3, title: 'Analytics & Reporting', desc: 'Transparent, actionable insights that clearly show ROI and guide your next strategic move.' },
  { icon: Megaphone, title: 'Influencer Marketing', desc: 'Authentic voices and micro-influencers to expand reach and build genuine brand trust.' },
  { icon: Shield, title: 'Reputation Management', desc: 'Protect and build your brand image across the web with proactive ORM strategies.' },
  { icon: Cpu, title: 'Digital Transformation', desc: 'Modernize operations and leverage emerging technologies to future-proof your business.' },
];

const testimonials = [
  { quote: "WeeoMedia completely transformed our digital presence. Our inbound leads increased by 300% in just six months.", name: "Sarah Jenkins", company: "TechFlow Solutions", role: "CEO" },
  { quote: "The only agency I've worked with that actually drives measurable revenue, not vanity metrics.", name: "Marcus Thorne", company: "Elevate E-Commerce", role: "Founder" },
  { quote: "Their web design team is world-class. Our site converts at double our previous rate.", name: "Elena Rodriguez", company: "FinTech Innovations", role: "CMO" },
  { quote: "A true partner in growth. They help us shape overall business strategy, not just execute tactics.", name: "David Chen", company: "Lumiere Health", role: "Co-Founder" },
  { quote: "The paid ads ROI we've seen since switching to WeeoMedia has been spectacular.", name: "Amanda Wright", company: "Venture Capital Partners", role: "Director" },
  { quote: "Their content strategy established us as thought leaders. Pipeline grew by $2M in year one.", name: "James Okoye", company: "BuildStack Inc.", role: "Head of Growth" },
];

const industries = [
  { label: 'E-Commerce', icon: Target },
  { label: 'FinTech', icon: TrendingUp },
  { label: 'Healthcare', icon: Shield },
  { label: 'SaaS', icon: Cpu },
  { label: 'Real Estate', icon: Globe },
  { label: 'Education', icon: PenTool },
  { label: 'Hospitality', icon: Star },
  { label: 'Retail', icon: Rocket },
];

const reasons = [
  { icon: Target, title: 'Results-First Culture', desc: 'We tie every strategy to measurable KPIs from day one. No guessing, no vanity metrics — only growth that matters to your bottom line.' },
  { icon: Award, title: 'Award-Winning Expertise', desc: 'Our team has won industry awards for creativity, technical execution, and campaign performance across 30+ countries.' },
  { icon: Clock, title: 'Always-On Partnership', desc: 'Dedicated account managers available 6 days a week. Your business doesn\'t take holidays, and neither do we.' },
  { icon: TrendingUp, title: 'Data-Driven Every Step', desc: 'Every decision backed by real data — from initial research to final reporting. Intelligence is the backbone of your strategy.' },
];

const logos = [
  'Stripe', 'Notion', 'Figma', 'Linear', 'Vercel', 'OpenAI', 'Shopify', 'Hubspot',
  'Salesforce', 'Atlassian', 'Twilio', 'Webflow', 'Airtable', 'Canva', 'Miro',
];

const blogPreviews = [
  { title: 'How AI is Reshaping SEO in 2025', category: 'SEO', date: 'Apr 10, 2025', read: '5 min', excerpt: 'Generative AI is rewriting how search engines index and rank content. Here\'s what you must do now.' },
  { title: 'The Rise of Zero-Click Searches', category: 'Digital Marketing', date: 'Apr 2, 2025', read: '4 min', excerpt: 'More than 65% of searches end without a click. Learn how to capture attention even when users never visit your site.' },
  { title: 'Building a $1M Email List', category: 'Email Marketing', date: 'Mar 24, 2025', read: '7 min', excerpt: 'A step-by-step breakdown of the email growth strategy we used to generate $1M in attributed revenue.' },
];

function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % testimonials.length), 4000);
    return () => clearInterval(t);
  }, []);
  const t = testimonials[current];
  return (
    <div className="relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 60, filter: 'blur(6px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, x: -60, filter: 'blur(6px)' }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white rounded-3xl p-10 shadow-lg border border-gray-100"
        >
          <Quote className="h-8 w-8 text-primary/30 mb-6" />
          <p className="text-xl text-foreground leading-relaxed italic mb-8 font-medium">"{t.quote}"</p>
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-gradient-brand flex items-center justify-center text-white font-bold text-sm">
              {t.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <p className="font-bold">{t.name}</p>
              <p className="text-sm text-muted-foreground">{t.role}, {t.company}</p>
            </div>
            <div className="ml-auto flex gap-0.5">
              {[1, 2, 3, 4, 5].map(s => <Star key={s} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="flex gap-2 justify-center mt-6">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'w-8 bg-primary' : 'w-2 bg-gray-200'}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <PageTransition>

      {/* ── HERO ── */}
      <section className="relative w-full flex min-h-[92vh] items-center pt-16 pb-20 lg:pt-24 bg-gradient-brand overflow-hidden">
        {/* Subtle blue-magenta gradient background for vibrancy */}

        {/* Grid overlay to match logo background style */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            backgroundPosition: 'center',
          }}
        />
        {/* Floating dots for extra branding */}
        <FloatingOrbs className="absolute inset-0 z-0 opacity-40" />

        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-5xl text-center">
            <div className="mb-9 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/90 px-5 py-2 text-sm font-semibold text-primary shadow-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              A 360° Digital Marketing Agency
            </div>

            <h1 className="font-display text-[3rem] font-black leading-[0.98] tracking-tight text-white drop-shadow sm:text-[4.25rem] lg:text-[6.25rem]">
              <span className="block overflow-hidden">
                <span className="block">
                  Advertising is Agency.
                </span>
              </span>
              <span className="mt-3 block overflow-hidden">
                <span className="block text-gradient">
                  So are we.
                </span>
              </span>
            </h1>

            <div className="mx-auto mt-10">
              <Link href="/services">
                <Button className="h-16 rounded-full border-0 bg-gradient-brand px-11 text-xl font-bold text-white shadow hover:opacity-90">
                  Data for the AI Era
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="/services">
                <Button variant="outline" className="h-14 rounded-2xl border border-primary/30 bg-white/90 px-9 text-2xl font-bold text-primary shadow-sm hover:border-primary hover:bg-primary/10">
                  Start Advertising
                  <ArrowRight className="ml-3 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="h-14 rounded-2xl border border-primary/30 bg-white/90 px-9 text-2xl font-bold text-primary shadow-sm hover:border-primary hover:bg-primary/10">
                  Start Monetizing
                  <ArrowRight className="ml-3 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <p className="mx-auto mt-12 max-w-3xl text-2xl text-white/90 drop-shadow">
              We drive real growth using Google Ads, Meta Ads, and SEO to increase traffic, leads, and revenue for your brand.
            </p>

            <div className="mt-9 flex items-center justify-center gap-6">
              <div className="flex -space-x-3">
                {['AV', 'SJ', 'MC', 'ER'].map((init, idx) => (
                  <div
                    key={idx}
                    className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-gradient-brand text-xs font-bold text-white shadow"
                  >
                    {init}
                  </div>
                ))}
              </div>
              <div className="text-left">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-sm text-white/80">Trusted by 500+ brands worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE LOGOS ── */}
      <section className="py-10 bg-white border-y border-gray-100 overflow-hidden">
        <div className="mb-3 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Trusted by industry leaders</p>
        </div>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-linear-to-r from-white to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-linear-to-l from-white to-transparent pointer-events-none" />
          <InfiniteMarquee items={logos} speed={25} direction="left" itemClassName="text-gray-400 hover:text-primary transition-colors" />
        </div>
        <div className="relative mt-3">
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-linear-to-r from-white to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-linear-to-l from-white to-transparent pointer-events-none" />
          <InfiniteMarquee items={[...logos].reverse()} speed={32} direction="right" itemClassName="text-gray-300 hover:text-primary transition-colors" />
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { end: 500, suffix: '+', label: 'Clients Worldwide' },
              { end: 245, suffix: '%', label: 'Average ROI Boost' },
              { end: 50, prefix: '$', suffix: 'M+', label: 'Revenue Generated' },
              { end: 30, suffix: '+', label: 'Countries Served' },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, type: 'spring', stiffness: 180 }}
                className="relative group"
              >
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-brand opacity-0 blur-xl transition-opacity duration-500"
                  whileHover={{ opacity: 0.1 }}
                />
                <p className="font-display text-5xl md:text-6xl font-black text-gradient mb-1">
                  <AnimatedCounter end={s.end} suffix={s.suffix} prefix={s.prefix || ''} />
                </p>
                <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wider">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <RevealSection variant="fadeUp">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">What We Do</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
                <AnimatedWords text="Services Built to Scale Your Business" />
              </h2>
              <p className="text-muted-foreground text-lg">17 specialized disciplines, one integrated growth engine — engineered for your unique market.</p>
            </RevealSection>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, idx) => (
              <TiltCard key={idx} className="rounded-2xl">
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ delay: idx * 0.06, type: 'spring', stiffness: 240, damping: 22 }}
                  className="group gradient-border-animated bg-white p-7 rounded-2xl border border-gray-100 h-full flex flex-col"
                >
                  <motion.div
                    className="h-14 w-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5"
                    whileHover={{ rotate: [0, -8, 8, 0], scale: 1.15, backgroundColor: '#8b5cf6', color: '#fff' }}
                    transition={{ duration: 0.4 }}
                  >
                    <svc.icon className="h-7 w-7" />
                  </motion.div>
                  <h3 className="font-display text-lg font-bold mb-3 group-hover:text-primary transition-colors">{svc.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">{svc.desc}</p>
                  <Link href="/services">
                    <motion.div
                      className="flex items-center gap-1 text-primary text-sm font-semibold mt-5 opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={false}
                    >
                      Learn more <ArrowRight className="h-4 w-4" />
                    </motion.div>
                  </Link>
                </motion.div>
              </TiltCard>
            ))}
          </div>

          <RevealSection variant="fadeUp" delay={0.2} className="text-center mt-14">
            <Link href="/services">
              <GlowButton variant="primary" size="lg">
                View All 17 Services <ArrowRight className="h-5 w-5" />
              </GlowButton>
            </Link>
          </RevealSection>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-28 bg-white text-gray-900 relative overflow-hidden">
        {/* <FloatingOrbs className="opacity-30" /> */}
        {/* Remove background gradients for a cleaner look */}
        <div className="container relative z-10 mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <RevealSection variant="fadeLeft">
                <p className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Why WeeoMedia</p>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  Advertising is agency.<br />
                  <span className="text-gradient">So are we.</span>
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-10">
                  We blend strategy, creative, and performance execution to build measurable growth systems. Every sprint is designed to improve traffic quality, conversion strength, and long-term revenue outcomes.
                </p>
                <ul className="space-y-4 mb-10">
                  {['No junior account handoffs', 'Weekly performance reporting', 'Cancel any time — no lock-in', 'First-page ranking guarantees for SEO'].map((pt, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3 text-gray-200"
                    >
                      <motion.div
                        whileHover={{ scale: 1.3, rotate: 360 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      >
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                      </motion.div>
                      {pt}
                    </motion.li>
                  ))}
                </ul>
                <Link href="/about">
                  <GlowButton variant="white" size="lg">
                    About Us <ArrowRight className="h-5 w-5" />
                  </GlowButton>
                </Link>
              </RevealSection>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {reasons.map((r, idx) => (
                <TiltCard key={idx}>
                  <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, type: 'spring', stiffness: 200 }}
                    className="bg-white/5 backdrop-blur p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors h-full"
                  >
                    <motion.div
                      className="h-12 w-12 rounded-xl bg-primary/20 text-primary flex items-center justify-center mb-4"
                      animate={{ boxShadow: ['0 0 0 0 rgba(99,102,241,0)', '0 0 0 8px rgba(99,102,241,0)', '0 0 0 0 rgba(99,102,241,0)'] }}
                      transition={{ duration: 2.5, delay: idx * 0.5, repeat: Infinity }}
                    >
                      <r.icon className="h-6 w-6" />
                    </motion.div>
                    <h3 className="font-display font-bold text-white mb-2 text-base">{r.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{r.desc}</p>
                  </motion.div>
                </TiltCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <RevealSection variant="scale">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Our Approach</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
                <AnimatedWords text="A Proven 4-Step Growth System" />
              </h2>
              <p className="text-muted-foreground text-lg">Repeatable. Reliable. Results-driven.</p>
            </RevealSection>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Animated connecting line */}
            <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-linear-to-r from-primary via-purple-500 to-pink-500 opacity-30" />
            {[
              { num: '01', title: 'Discover', icon: Search, desc: 'Deep audit of your current state, competitors, and untapped opportunities.' },
              { num: '02', title: 'Strategize', icon: Target, desc: 'Custom growth roadmap with clear KPIs, timelines, and budget allocation.' },
              { num: '03', title: 'Execute', icon: Rocket, desc: 'Multi-channel deployment with rapid A/B testing built in from the start.' },
              { num: '04', title: 'Scale', icon: TrendingUp, desc: 'Weekly reviews to double down on winners and continuously raise the ceiling.' },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, type: 'spring', stiffness: 180 }}
                className="relative text-center group"
              >
                <motion.div
                  className="mx-auto w-20 h-20 rounded-2xl bg-gradient-brand flex items-center justify-center text-white shadow-lg mb-6"
                  whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.4 }}
                  animate={{ boxShadow: ['0 0 0 0 rgba(99,102,241,0.3)', '0 0 0 12px rgba(99,102,241,0)', '0 0 0 0 rgba(99,102,241,0)'] }}
                  style={{ animationDelay: `${idx * 0.7}s`, animationDuration: '3s', animationIterationCount: 'infinite' }}
                >
                  <step.icon className="h-9 w-9" />
                </motion.div>
                <p className="font-display text-xs font-black text-primary uppercase tracking-widest mb-2">{step.num}</p>
                <h3 className="font-display text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="py-24 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4">
          <RevealSection variant="fadeUp" className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Industries</p>
            <h2 className="font-display text-4xl font-bold">We've Mastered Your Market</h2>
          </RevealSection>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {industries.map((ind, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.07, type: 'spring', stiffness: 300 }}
                whileHover={{ scale: 1.06, y: -4 }}
                className="flex flex-col items-center justify-center py-8 rounded-2xl bg-secondary/40 border border-transparent hover:border-primary/20 hover:bg-white hover:shadow-lg transition-all duration-300 cursor-default group"
              >
                <motion.div
                  className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:bg-gradient-brand group-hover:text-white transition-all duration-300"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <ind.icon className="h-6 w-6" />
                </motion.div>
                <p className="font-display font-bold text-sm text-center group-hover:text-primary transition-colors">{ind.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <RevealSection variant="fadeLeft">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Client Stories</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Real results from <span className="text-gradient">real brands.</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
                Don't take our word for it. Here's what the brands we work with have to say about working with WeeoMedia.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { val: '98%', label: 'Client Retention Rate' },
                  { val: '4.9', label: 'Average Star Rating' },
                ].map((s, i) => (
                  <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 text-center shadow-sm">
                    <p className="font-display text-3xl font-black text-gradient mb-1">{s.val}</p>
                    <p className="text-sm text-muted-foreground font-medium">{s.label}</p>
                  </div>
                ))}
              </div>
            </RevealSection>
            <RevealSection variant="fadeRight" delay={0.1}>
              <TestimonialsCarousel />
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ── BLOG PREVIEWS ── */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <RevealSection variant="fadeLeft">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Knowledge Hub</p>
              <h2 className="font-display text-4xl font-bold">Fresh Insights</h2>
            </RevealSection>
            <RevealSection variant="fadeRight">
              <Link href="/blogs">
                <GlowButton variant="outline" size="sm">
                  All Articles <ArrowRight className="h-4 w-4" />
                </GlowButton>
              </Link>
            </RevealSection>
          </div>

          <div className="grid md:grid-cols-3 gap-7">
            {blogPreviews.map((post, idx) => (
              <TiltCard key={idx} intensity={6}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, type: 'spring', stiffness: 220 }}
                  className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col"
                >
                  {/* Top color bar */}
                  <motion.div
                    className="h-1.5 bg-gradient-brand"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 + 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transformOrigin: 'left' }}
                  />
                  <div className="p-7 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-bold uppercase tracking-widest text-primary">{post.category}</span>
                      <span className="text-xs text-muted-foreground">{post.date} · {post.read}</span>
                    </div>
                    <h3 className="font-display text-lg font-bold mb-3 group-hover:text-primary transition-colors">{post.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed flex-1">{post.excerpt}</p>
                    <Link href="/blogs">
                      <motion.div
                        className="flex items-center gap-2 text-primary text-sm font-semibold mt-5"
                        whileHover={{ x: 6 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      >
                        Read More <ArrowRight className="h-4 w-4" />
                      </motion.div>
                    </Link>
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="py-32 relative overflow-hidden bg-white text-gray-900">
        <div className="container relative z-10 mx-auto px-4 text-center max-w-3xl">
          <RevealSection variant="scale">
            <motion.p
              className="text-sm font-bold uppercase tracking-widest text-primary mb-4"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Ready to Grow?
            </motion.p>
            <h2 className="font-display text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              <AnimatedWords text="Let's build something remarkable together." />
            </h2>
            <p className="text-gray-300 text-xl mb-12 leading-relaxed">
              Join 500+ brands that trust WeeoMedia to dominate their markets. Start with a free strategy consultation.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact">
                <GlowButton variant="white" size="lg" className="text-blue-600">
                  Book Free Consultation <ArrowRight className="h-5 w-5" />
                </GlowButton>
              </Link>
              <Link href="/services">
                <GlowButton variant="outline" size="lg" className="border-blue-600 text-blue-600 hover:border-blue-700 hover:text-blue-700">
                  View Services
                </GlowButton>
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>

    </PageTransition>
  );
}
