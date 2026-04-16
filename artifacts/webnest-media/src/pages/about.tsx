import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowRight, Award, Globe, Heart, Lightbulb, Shield, TrendingUp, Zap, CheckCircle2 } from 'lucide-react';
import PageTransition from '@/components/layout/PageTransition';
import RevealSection from '@/components/ui/RevealSection';
import AnimatedWords from '@/components/ui/AnimatedWords';
import GlowButton from '@/components/ui/GlowButton';
import FloatingOrbs from '@/components/ui/FloatingOrbs';
import TiltCard from '@/components/ui/TiltCard';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { Button } from '@/components/ui/button';

import teamImg from '@/assets/images/team.png';

const team = [
  { name: 'Alex Vance', title: 'Chief Executive Officer', bio: 'Former tech founder with 15 years scaling digital native brands. Alex brings ruthless focus and clear strategic vision to everything WebNest builds.', initials: 'AV' },
  { name: 'Sarah Jenkins', title: 'Head of Strategy', bio: 'Data obsessed and creatively driven. Sarah has orchestrated campaigns generating over $30M in direct revenue across e-commerce, SaaS, and fintech.', initials: 'SJ' },
  { name: 'Marcus Chen', title: 'Creative Director', bio: 'Award-winning designer who believes aesthetics must always serve function. Marcus makes brands unforgettable without ever sacrificing conversion.', initials: 'MC' },
  { name: 'Elena Rodriguez', title: 'Lead Developer', bio: 'Performance fanatic. Elena builds the lightning-fast digital infrastructure that powers all of our campaign landing pages and client web experiences.', initials: 'ER' },
  { name: 'James Okoye', title: 'Head of SEO', bio: 'Specialist in technical and content-led SEO with a track record of ranking competitive SaaS terms in under 6 months through precise execution.', initials: 'JO' },
  { name: 'Priya Nair', title: 'Social Media Lead', bio: 'Community builder and content strategist who has grown brand social presences from zero to over 500K engaged followers across multiple verticals.', initials: 'PN' },
  { name: 'Tom Wallace', title: 'PPC Director', bio: 'Google and Meta certified with 10+ years managing over $20M in ad spend. Tom\'s campaigns consistently deliver cost-per-acquisition 40% below benchmarks.', initials: 'TW' },
  { name: 'Aisha Mensah', title: 'Client Success Manager', bio: 'The glue that keeps our client relationships thriving. Aisha ensures every partner feels heard, informed, and genuinely excited about their results.', initials: 'AM' },
];

const values = [
  { icon: TrendingUp, title: 'Results Over Everything', desc: 'Every decision is measured against one question: does this move the needle? We tie every activity to real business outcomes and report on what actually matters to your bottom line.' },
  { icon: Shield, title: 'Radical Transparency', desc: 'No hidden fees, no surprise retainer bloat, no vanity metric reporting. We tell you exactly what we\'re doing, why we\'re doing it, and what it\'s producing.' },
  { icon: Lightbulb, title: 'Relentless Curiosity', desc: 'Digital marketing evolves daily. Our team invests 10% of work hours in learning, experimentation, and staying ahead of algorithm changes, platform shifts, and emerging channels.' },
  { icon: Heart, title: 'True Partnership', desc: 'We don\'t want clients — we want partners. Long-term relationships built on trust, clear communication, and shared ambition are how we do our best work.' },
  { icon: Globe, title: 'Global Thinking', desc: 'Our team is distributed across 8 time zones, giving us cultural fluency and global market context that shapes every strategy we build for internationally ambitious brands.' },
  { icon: Zap, title: 'Speed with Precision', desc: 'In digital, timing is everything. We move fast — but never at the expense of quality, brand safety, or strategic integrity. Fast and right, every time.' },
];

const milestones = [
  { year: '2014', title: 'Founded in San Francisco', desc: 'Alex Vance and Sarah Jenkins launched WebNest Media with three clients and a mission to make enterprise-grade digital marketing accessible to ambitious growth brands.' },
  { year: '2016', title: 'First $1M Revenue Client', desc: 'Delivered $1M in attributed revenue for an e-commerce client through a combined SEO and email marketing program — proving our full-funnel methodology works.' },
  { year: '2018', title: 'Team Grows to 25', desc: 'Opened our London office and expanded into European markets. Added specialized teams for paid media, content, and technical SEO.' },
  { year: '2020', title: 'Served 200+ Brands', desc: 'Crossed the 200-client milestone during a challenging year for businesses everywhere. Our remote-first model proved resilient and our team thrived.' },
  { year: '2022', title: '$50M Revenue Milestone', desc: 'Collectively, our campaigns generated over $50M in trackable revenue for our clients — a milestone that reflects our commitment to measurable impact.' },
  { year: '2025', title: '500+ Clients, 30+ Countries', desc: 'Today we operate across 30+ countries with a team of 60+ specialists spanning every discipline of modern digital marketing.' },
];

const awards = [
  { title: 'Best Digital Agency', org: 'Marketing Week Awards', year: '2024' },
  { title: 'Top SEO Agency', org: 'Clutch Global', year: '2024' },
  { title: 'Agency of the Year', org: 'The Drum', year: '2023' },
  { title: 'Best PPC Campaign', org: 'Performance Marketing Awards', year: '2023' },
];

export default function About() {
  return (
    <PageTransition>
      {/* Abstract Background Blobs */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 50, 0, -50, 0], y: [0, 30, -30, 0], scale: [1, 1.1, 0.9, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/8 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, -50, 0, 50, 0], y: [0, -30, 30, 0], scale: [1, 0.9, 1.1, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-pink-500/8 rounded-full blur-[120px]"
        />
      </div>

      {/* Hero */}
      <section className="pt-24 pb-20 lg:pt-32 lg:pb-28 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm font-bold uppercase tracking-widest text-primary mb-4"
            >
              Our Story
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 leading-[1.1]"
            >
              We are the <span className="text-gradient">catalyst</span> for digital brands.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-10"
            >
              Founded in 2014 on the belief that traditional marketing is broken. We are a collective of developers, designers, strategists, and data scientists building the future of digital commerce — one growth story at a time.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Link href="/contact">
                <Button size="lg" className="bg-gradient-brand text-white border-0 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 h-12 px-8 rounded-full">
                  Work With Us <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" size="lg" className="h-12 px-8 rounded-full border-2 border-primary/20 hover:border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300">
                  Our Services
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Office/Team Image */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative rounded-[2.5rem] overflow-hidden shadow-2xl"
          >
            <img
              src={teamImg}
              alt="WebNest Media Team Workspace"
              className="w-full h-full object-cover aspect-[21/9]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">Our San Francisco Headquarters</h2>
              <p className="text-white/80 text-lg">Where data meets creativity, and strategy becomes reality.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-white border-y">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-border">
            {[
              { end: 2014, suffix: '', label: 'Founded' },
              { end: 60, suffix: '+', label: 'Team Members' },
              { end: 30, suffix: '+', label: 'Countries Served' },
              { end: 8, suffix: '', label: 'Global Offices' },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 180 }}
                className="px-4"
              >
                <p className="font-display text-4xl md:text-5xl font-black text-gradient mb-2">
                  <AnimatedCounter end={s.end} suffix={s.suffix} duration={s.end > 1000 ? 2500 : 2000} />
                </p>
                <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-28 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Our Mission</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">
                To give every ambitious brand access to <span className="text-gradient">enterprise-grade growth.</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                When we started, the best marketing expertise was locked inside expensive retainers and inaccessible to everyone except Fortune 500 companies. We built WebNest to change that.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-10">
                Today, we bring the same caliber of strategic thinking, creative execution, and technical precision to scaling startups, ambitious SMBs, and established brands alike — with full transparency and a singular focus on measurable results.
              </p>
              <ul className="space-y-4">
                {[
                  'No retainer padding — every hour is justified',
                  'Full-funnel accountability from day one',
                  'Senior talent on every account, no junior handoffs',
                ].map((pt, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                    <span className="font-medium">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative rounded-3xl bg-white border border-gray-100 p-10 shadow-sm overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[60px]" />
              <p className="font-display text-2xl font-bold italic text-foreground mb-8 relative z-10 leading-relaxed">
                "The greatest marketing strategy is one that makes your customer feel like the hero of their own story — not a target to be converted."
              </p>
              <div className="flex items-center gap-4 relative z-10">
                <div className="h-14 w-14 rounded-full bg-gradient-brand flex items-center justify-center text-white font-bold text-lg">AV</div>
                <div>
                  <p className="font-bold text-foreground">Alex Vance</p>
                  <p className="text-sm text-muted-foreground">Founder & CEO, WebNest Media</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-sm font-bold uppercase tracking-widest text-primary mb-3">What We Stand For</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Our Core Values</h2>
            <p className="text-muted-foreground text-lg">The principles that guide every client engagement, every hire, and every strategic decision we make.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {values.map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="group bg-secondary/30 p-8 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <div className="h-14 w-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-gradient-brand group-hover:text-white transition-all duration-300">
                  <value.icon className="h-7 w-7" />
                </div>
                <h3 className="font-display text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-28 bg-secondary/20 border-y relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/8 rounded-full blur-[100px]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-sm font-bold uppercase tracking-widest text-primary mb-3">Our Journey</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">11 Years of Growth</h2>
            <p className="text-muted-foreground text-lg">The key milestones that shaped who we are and how we work.</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-pink-500/30 to-transparent" />
              {milestones.map((m, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`relative flex items-start gap-8 mb-12 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} pl-20 md:pl-0`}
                >
                  <div className={`hidden md:block w-1/2 ${idx % 2 === 0 ? 'text-right pr-12' : 'pl-12'}`}>
                    <span className="font-display text-4xl font-black text-gradient">{m.year}</span>
                  </div>
                  <div className="absolute left-6 md:left-1/2 top-2 -translate-x-1/2 h-4 w-4 rounded-full bg-gradient-brand border-4 border-white shadow-md" />
                  <div className={`w-full md:w-1/2 ${idx % 2 === 0 ? 'pl-0 md:pl-12' : 'pr-0 md:pr-12'}`}>
                    <span className="font-display text-2xl font-black text-gradient md:hidden">{m.year}</span>
                    <h3 className="font-display text-xl font-bold mb-2 mt-1 md:mt-0">{m.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{m.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-20 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sm font-bold uppercase tracking-widest text-primary mb-3">Recognition</p>
            <h2 className="font-display text-4xl font-bold">Award-Winning Work</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {awards.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-secondary/30 border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="h-10 w-10 rounded-xl bg-gradient-brand flex items-center justify-center text-white shrink-0">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold text-foreground text-sm leading-tight">{a.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{a.org} · {a.year}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-28 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-sm font-bold uppercase tracking-widest text-primary mb-3">The People</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Meet the Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">60 specialists across 8 disciplines. Here are the leaders who set the standard for everyone else.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {team.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.07 }}
                className="bg-white rounded-2xl p-7 border border-gray-100 text-center hover:shadow-xl transition-all duration-300 group"
              >
                <div className="mx-auto w-24 h-24 rounded-full mb-5 p-0.5 bg-gradient-brand group-hover:scale-105 transition-transform duration-300">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    <span className="text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-brand">
                      {member.initials}
                    </span>
                  </div>
                </div>
                <h3 className="font-display text-lg font-bold mb-1">{member.name}</h3>
                <p className="text-xs text-primary font-bold uppercase tracking-wider mb-3">{member.title}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-foreground">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-brand rounded-full blur-[120px] opacity-20" />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center max-w-2xl">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">Ready to build something remarkable?</h2>
          <p className="text-gray-300 text-lg mb-10">Join 500+ brands that trust WebNest Media to drive their digital growth.</p>
          <Link href="/contact">
            <Button size="lg" className="bg-white text-foreground hover:bg-gray-100 shadow-xl hover:scale-105 transition-all duration-300 text-lg h-14 px-10 rounded-full">
              Start the Conversation <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </PageTransition>
  );
}
