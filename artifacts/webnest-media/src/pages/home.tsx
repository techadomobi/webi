import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
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
import { useRef, useEffect, useState } from 'react';

import heroImg from '@/assets/images/hero.png';

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

function Particle({ x, y, size, color, delay, dur }: { x: number, y: number, size: number, color: string, delay: number, dur: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, background: color }}
      animate={{
        x: [0, Math.random() * 30 - 15, 0],
        y: [0, Math.random() * 30 - 15, 0],
        opacity: [0.4, 0.9, 0.4],
        scale: [1, 1.4, 1],
      }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 6 + 2,
  color: ['rgba(99,102,241,0.4)', 'rgba(168,85,247,0.4)', 'rgba(236,72,153,0.3)'][i % 3],
  delay: Math.random() * 4,
  dur: Math.random() * 4 + 4,
}));

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
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  return (
    <PageTransition>

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative overflow-hidden pt-24 pb-36 lg:pt-36 lg:pb-52 min-h-screen flex items-center">
        <FloatingOrbs />
        {PARTICLES.map((p, i) => <Particle key={i} {...p} />)}

        {/* Animated mesh grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.04)_1px,transparent_1px)] bg-size-[60px_60px]" />

        {/* Animated morphing blob */}
        <motion.div
          className="absolute right-[5%] top-[10%] w-80 h-80 bg-gradient-brand opacity-15 animate-morphing blur-[60px]"
        />

        <div className="container relative z-10 mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left content */}
            <motion.div style={{ y: heroY, opacity: heroOpacity }}>
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 300 }}
                className="inline-flex items-center rounded-full border border-primary/30 bg-primary/8 px-4 py-1.5 text-sm font-semibold text-primary mb-8 gap-2"
              >
                <motion.span
                  className="h-2 w-2 rounded-full bg-primary"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                A 360° Digital Marketing Agency
                <Sparkles className="h-3.5 w-3.5" />
              </motion.div>

              {/* Animated word-by-word headline */}
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6 max-w-4xl">
                <span className="block">
                  <AnimatedWords text="We don’t just market." className="text-foreground" delay={0.2} />
                </span>
                <span className="text-gradient-animated block mt-2">
                  <AnimatedWords text="We scale brands." delay={0.55} />
                </span>
              </h1>

              <RevealSection variant="fadeUp" delay={0.7}>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl">
                  We drive real growth using Google Ads, Meta Ads, and SEO to increase traffic, leads, and revenue for your brand.                </p>
              </RevealSection>

              <RevealSection variant="fadeUp" delay={0.85}>
                <div className="flex flex-wrap items-center gap-4 mb-10">
                  <Link href="/contact">
                    <GlowButton variant="primary" size="lg">
                      Start Your Project <ArrowRight className="h-5 w-5" />
                    </GlowButton>
                  </Link>
                  <Link href="/services">
                    <GlowButton variant="outline" size="lg">
                      Explore Services
                    </GlowButton>
                  </Link>
                </div>
              </RevealSection>

              <RevealSection variant="fadeUp" delay={1}>
                <div className="flex items-center gap-6">
                  <div className="flex -space-x-3">
                    {['AV', 'SJ', 'MC', 'ER'].map((init, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 + idx * 0.1 }}
                        className="h-11 w-11 rounded-full bg-gradient-brand flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow"
                      >
                        {init}
                      </motion.div>
                    ))}
                  </div>
                  <div>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map(s => (
                        <motion.div
                          key={s}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1.1 + s * 0.06, type: 'spring', stiffness: 400 }}
                        >
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        </motion.div>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">Trusted by 500+ brands worldwide</p>
                  </div>
                </div>
              </RevealSection>
            </motion.div>

            {/* Right — hero image */}
            <motion.div
              style={{ scale: heroScale }}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Glow aura */}
              <motion.div
                className="absolute -inset-6 rounded-4xl bg-gradient-brand opacity-25 blur-3xl"
                animate={{ opacity: [0.2, 0.35, 0.2], scale: [1, 1.04, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className="relative z-10 overflow-hidden rounded-[1.7rem] bg-linear-to-br from-[#d9d4f2] via-[#dbe2f7] to-[#e3d8f1] p-0.5 shadow-2xl">
                <img
                  src={heroImg}
                  alt="Abstract digital growth"
                  className="block w-full rounded-2xl object-cover aspect-4/3 ring-1 ring-white/45"
                />
              </div>

              {/* Floating stat card 1 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, type: 'spring', stiffness: 200 }}
                className="absolute -bottom-6 -left-6 md:-left-14 bg-white p-5 rounded-2xl shadow-2xl border border-gray-100 flex items-center gap-4 z-20 animate-float"
              >
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Avg. ROI Increase</p>
                  <p className="font-display text-2xl font-bold text-foreground">+245%</p>
                </div>
              </motion.div>

              {/* Floating stat card 2 */}
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, type: 'spring', stiffness: 200 }}
                className="absolute -top-6 -right-6 md:-right-12 bg-white p-4 rounded-2xl shadow-2xl border border-gray-100 flex items-center gap-3 z-20"
                style={{ animation: 'float 7s ease-in-out 1s infinite' }}
              >
                <div className="h-10 w-10 rounded-xl bg-green-100 flex items-center justify-center text-green-600">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Active Campaigns</p>
                  <p className="font-display text-xl font-bold">1,247+</p>
                </div>
              </motion.div>

              {/* Floating stat card 3 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.3, type: 'spring', stiffness: 300 }}
                className="absolute top-1/2 -right-4 md:-right-10 bg-white p-4 rounded-2xl shadow-2xl border border-gray-100 z-20"
                style={{ animation: 'float-slow 6s ease-in-out 2.5s infinite' }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  <p className="text-xs font-bold text-foreground">Client Score</p>
                </div>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-lg font-display font-black mt-0.5">4.9 / 5.0</p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <span className="text-xs font-medium uppercase tracking-widest">Scroll</span>
          <motion.div
            className="w-5 h-8 rounded-full border-2 border-primary/30 flex items-start justify-center p-1"
            animate={{ borderColor: ['rgba(99,102,241,0.3)', 'rgba(99,102,241,0.8)', 'rgba(99,102,241,0.3)'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-primary"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ── MARQUEE LOGOS ── */}
      <section className="py-10 bg-white border-y overflow-hidden">
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
      <section className="py-20 bg-secondary/20">
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
      <section className="py-28 bg-foreground text-background relative overflow-hidden">
        <FloatingOrbs className="opacity-30" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[60px_60px]" />
        <div className="container relative z-10 mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <RevealSection variant="fadeLeft">
                <p className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Why WeeoMedia</p>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  We don't just run campaigns.<br />
                  <span className="text-gradient">We engineer growth.</span>
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-10">
                  Our model is built on a simple premise: every hour we work for you should generate measurable returns. Senior strategists, transparent reporting, and a relentless focus on your revenue.
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
      <section className="py-28 bg-secondary/20">
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
      <section className="py-24 bg-white border-y">
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
      <section className="py-28 bg-secondary/20">
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
      <section className="py-24 bg-white border-t">
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
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-foreground">
          <FloatingOrbs className="opacity-30" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[60px_60px]" />
          {/* Animated gradient rings */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-primary/20"
            animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-pink-500/20"
            animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 3.5, delay: 1, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
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
                <GlowButton variant="white" size="lg">
                  Book Free Consultation <ArrowRight className="h-5 w-5" />
                </GlowButton>
              </Link>
              <Link href="/services">
                <GlowButton variant="outline" size="lg" className="border-white/30 text-white hover:border-white">
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
