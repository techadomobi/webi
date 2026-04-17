import { motion } from 'framer-motion';
import { Link, useLocation } from 'wouter';
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Compass,
  Sparkles,
  Target,
} from 'lucide-react';
import PageTransition from '@/components/layout/PageTransition';
import GlowButton from '@/components/ui/GlowButton';

type ServiceDetail = {
  title: string;
  category: string;
  tagline: string;
  overview: string;
  outcomes: string[];
  deliverables: string[];
  process: string[];
  faqs: Array<{ q: string; a: string }>;
};

const roadmapPhases = [
  {
    phase: 'Days 1-15: Foundation',
    summary: 'Audit, baseline tracking, and strategic setup.',
    items: ['Measurement stack alignment', 'Channel and funnel diagnostics', 'Priority experiment backlog'],
  },
  {
    phase: 'Days 16-45: Launch & Learn',
    summary: 'Deploy initial campaigns and validate hypotheses quickly.',
    items: ['Creative and message variants live', 'Audience and intent testing', 'Weekly learning cycles'],
  },
  {
    phase: 'Days 46-75: Optimization',
    summary: 'Double down on winners and remove waste systematically.',
    items: ['Budget reallocation to high-yield segments', 'Conversion journey refinements', 'Performance velocity dashboard'],
  },
  {
    phase: 'Days 76-90: Scale',
    summary: 'Expand capacity while protecting efficiency and quality.',
    items: ['Scalable operating cadence', 'Cross-channel amplification', 'Next-quarter growth roadmap'],
  },
];

const kpiFramework = [
  {
    pillar: 'Visibility',
    metric: 'Qualified impressions and reach quality',
    whyItMatters: 'Ensures spend is creating attention in the right market segments.',
  },
  {
    pillar: 'Engagement',
    metric: 'High-intent actions and content depth',
    whyItMatters: 'Signals whether messaging resonates enough to move prospects forward.',
  },
  {
    pillar: 'Conversion',
    metric: 'Lead quality, win-rate contribution, and CPA',
    whyItMatters: 'Keeps the program tied to revenue, not vanity metrics.',
  },
  {
    pillar: 'Retention',
    metric: 'Repeat behavior and lifecycle value',
    whyItMatters: 'Builds compounding growth and protects long-term margin.',
  },
];

const scenarios = [
  {
    title: 'Growth-Stage Brands',
    detail:
      'Ideal for companies scaling from founder-led marketing to a repeatable acquisition engine with clear weekly reporting and tighter execution systems.',
  },
  {
    title: 'Established Teams Needing Lift',
    detail:
      'Best for in-house teams that want specialist execution support, strategic challenge, and faster experiment velocity across channels.',
  },
  {
    title: 'Multi-Market Expansion',
    detail:
      'Designed for brands entering new geographies or segments where message-market fit and channel prioritization must be validated fast.',
  },
];

const engagementTiers = [
  {
    tier: 'Sprint',
    fit: 'Focused, high-priority execution for one channel or one growth objective.',
    includes: ['Weekly strategy sync', 'Bi-weekly performance reviews', 'Experiment pipeline'],
  },
  {
    tier: 'Growth',
    fit: 'Multi-channel system for sustained demand generation and conversion growth.',
    includes: ['Cross-channel orchestration', 'Creative and messaging testing', 'Monthly executive dashboard'],
  },
  {
    tier: 'Scale',
    fit: 'Full-funnel operating model for larger brands with aggressive growth targets.',
    includes: ['Advanced attribution design', 'Quarterly strategic planning', 'Dedicated senior advisory'],
  },
];

const serviceDetails: Record<string, ServiceDetail> = {
  seo: {
    title: 'Search Engine Optimization',
    category: 'Digital Marketing',
    tagline: 'Rank for high-intent terms and convert organic traffic into pipeline.',
    overview:
      'Our SEO programs combine technical audits, search intent mapping, content clusters, and authority building. The objective is sustainable growth, not temporary spikes.',
    outcomes: ['Higher qualified organic traffic', 'Improved non-branded visibility', 'Lower blended acquisition cost'],
    deliverables: ['Technical SEO roadmap', 'Topic clusters and content briefs', 'Link acquisition strategy', 'Monthly ranking and traffic reports'],
    process: ['Site and SERP audit', 'Priority opportunity mapping', 'Implementation and optimization', 'Weekly sprint reviews'],
    faqs: [
      { q: 'When do SEO gains usually appear?', a: 'Most brands see movement in 6-10 weeks, with compounding growth over 3-6 months.' },
      { q: 'Do you handle content production?', a: 'Yes. We provide strategy, briefs, writing, optimization, and publishing support.' },
    ],
  },
  sem: {
    title: 'Search Engine Marketing',
    category: 'Digital Marketing',
    tagline: 'Capture demand at the exact moment customers are ready to buy.',
    overview:
      'We run performance-first paid search campaigns with clear budget controls, intent segmentation, and conversion-focused landing experiences.',
    outcomes: ['Faster lead velocity', 'Stronger ROAS stability', 'Scalable paid acquisition'],
    deliverables: ['Campaign architecture and keyword map', 'Ad copy variants and extensions', 'Bid and budget framework', 'Attribution and conversion dashboards'],
    process: ['Account audit and rebuild', 'Intent-based campaign launch', 'Search term and bid optimization', 'Performance scale cycles'],
    faqs: [
      { q: 'Do you optimize landing pages too?', a: 'Yes. We improve message match, friction points, and conversion pathways.' },
      { q: 'Can you work with existing accounts?', a: 'Absolutely. We can optimize current accounts or rebuild from scratch.' },
    ],
  },
  smm: {
    title: 'Social Media Marketing',
    category: 'Digital Marketing',
    tagline: 'Turn attention into community and community into revenue.',
    overview:
      'Our social strategy balances creative storytelling with growth mechanics so your brand consistently reaches, engages, and converts the right audience.',
    outcomes: ['Audience growth with quality engagement', 'Higher social-assisted conversions', 'Stronger brand recall'],
    deliverables: ['Platform-specific content plan', 'Creative production calendar', 'Community response playbooks', 'Monthly content performance reports'],
    process: ['Audience and channel analysis', 'Content system design', 'Publishing and engagement', 'Optimization by retention signals'],
    faqs: [
      { q: 'Do you produce short-form video?', a: 'Yes. We create Reels, Shorts, and social-first creative formats.' },
      { q: 'Can social tie into lead gen?', a: 'Yes. We connect campaigns with lead forms, landing pages, and CRM flows.' },
    ],
  },
  web: {
    title: 'Web Development',
    category: 'Digital Marketing',
    tagline: 'Build fast, conversion-ready websites that scale with your brand.',
    overview:
      'We design and develop high-performance websites focused on speed, UX clarity, and conversion architecture across devices.',
    outcomes: ['Higher conversion rates', 'Better Core Web Vitals', 'Stronger SEO and user retention'],
    deliverables: ['UX wireframes and UI system', 'Responsive front-end build', 'CMS setup and workflows', 'Performance and QA checklist'],
    process: ['Discovery and scope', 'UX and visual direction', 'Development and QA', 'Launch and post-launch optimization'],
    faqs: [
      { q: 'Can you redesign without downtime?', a: 'Yes. We stage and validate before production cutover.' },
      { q: 'Do you support ongoing updates?', a: 'Yes. We offer ongoing maintenance, feature sprints, and optimization.' },
    ],
  },
  content: {
    title: 'Content Marketing',
    category: 'Digital Marketing',
    tagline: 'Publish assets that educate buyers and compound organic demand.',
    overview:
      'From thought leadership to search-led educational content, we build systems that grow visibility and trust while supporting pipeline.',
    outcomes: ['More inbound opportunities', 'Higher topical authority', 'Improved assisted conversion value'],
    deliverables: ['Editorial strategy', 'Long-form and pillar content', 'Distribution and repurposing plan', 'Content ROI tracking'],
    process: ['Topic research and clustering', 'Production pipeline', 'SEO and editorial QA', 'Distribution and refresh cycles'],
    faqs: [
      { q: 'Do you write for technical niches?', a: 'Yes. We use SME interviews and editorial QA for depth and accuracy.' },
      { q: 'Can content support sales enablement?', a: 'Yes. We produce comparison pages, case studies, and nurture assets.' },
    ],
  },
  affiliate: {
    title: 'Affiliate Marketing',
    category: 'Digital Marketing',
    tagline: 'Scale sales through high-fit publisher partnerships.',
    overview:
      'We structure performance partnerships that align incentives, protect margin, and drive reliable revenue growth.',
    outcomes: ['Expanded partner channel revenue', 'Lower customer acquisition risk', 'Higher incremental sales'],
    deliverables: ['Partner recruitment plan', 'Commission model design', 'Tracking and attribution setup', 'Partner performance reviews'],
    process: ['Program design', 'Publisher onboarding', 'Offer testing and optimization', 'Quarterly scaling roadmap'],
    faqs: [
      { q: 'How do you prevent low-quality affiliates?', a: 'We vet each partner with quality thresholds and compliance controls.' },
      { q: 'Can affiliate work for B2B?', a: 'Yes. Especially with niche publishers and targeted partnerships.' },
    ],
  },
  mobile: {
    title: 'Mobile Marketing',
    category: 'Promotions',
    tagline: 'Reach users where attention is highest: on mobile screens.',
    overview:
      'We craft mobile-native experiences across SMS, push, in-app placements, and mobile-first landing funnels.',
    outcomes: ['Higher mobile engagement', 'Faster conversion response', 'Better lifecycle retention'],
    deliverables: ['Mobile campaign strategy', 'Push and SMS journeys', 'Creative and copy variants', 'Mobile conversion tracking'],
    process: ['Audience segmentation', 'Campaign build', 'Message timing optimization', 'Performance iteration'],
    faqs: [
      { q: 'Do you support app and non-app brands?', a: 'Yes. We support both in-app and mobile web conversion strategies.' },
      { q: 'How do you avoid over-messaging?', a: 'We use fatigue controls and behavioral triggers.' },
    ],
  },
  influencer: {
    title: 'Influencer Marketing',
    category: 'Promotions',
    tagline: 'Launch authentic creator partnerships with measurable outcomes.',
    overview:
      'We match your brand with creators who influence the right audience, then run structured campaigns tied to conversion signals.',
    outcomes: ['Higher trust and social proof', 'Improved campaign reach quality', 'Trackable creator-attributed revenue'],
    deliverables: ['Creator shortlist and vetting', 'Campaign briefs and approvals', 'Performance tracking links', 'Post-campaign analytics'],
    process: ['Creator discovery', 'Offer and brief alignment', 'Launch and monitoring', 'Scale top-performing creators'],
    faqs: [
      { q: 'Do you manage contracts?', a: 'Yes. We handle negotiation support, scopes, and compliance guardrails.' },
      { q: 'Can you run micro-influencer campaigns?', a: 'Yes. We often use micro-creators for stronger niche conversion rates.' },
    ],
  },
  sms: {
    title: 'SMS Marketing',
    category: 'Promotions',
    tagline: 'Drive immediate action with high-open-rate messaging.',
    overview:
      'Our SMS programs balance speed, personalization, and compliance to deliver meaningful response without list fatigue.',
    outcomes: ['Faster campaign response', 'Higher repeat purchase rate', 'Improved retention touchpoints'],
    deliverables: ['List growth workflows', 'Segmented campaign templates', 'Automated trigger journeys', 'Compliance and opt-out governance'],
    process: ['Consent and list setup', 'Segmentation and message design', 'Automations and sends', 'A/B testing cadence'],
    faqs: [
      { q: 'How do you keep messages compliant?', a: 'We follow opt-in standards, frequency controls, and clear opt-out handling.' },
      { q: 'Can SMS integrate with email?', a: 'Yes. We orchestrate cross-channel journeys for higher conversion lift.' },
    ],
  },
  email: {
    title: 'Email Marketing',
    category: 'Promotions',
    tagline: 'Build lifecycle communication that converts and retains.',
    overview:
      'We architect lifecycle email flows and campaign calendars to improve conversion, retention, and customer lifetime value.',
    outcomes: ['Higher revenue per subscriber', 'Better repeat purchase behavior', 'Improved deliverability health'],
    deliverables: ['Lifecycle flow architecture', 'Campaign calendar and creative', 'Segmentation model', 'Deliverability and performance reports'],
    process: ['Data audit and segmentation', 'Flow and campaign rollout', 'Testing by audience cohorts', 'Scale winning sequences'],
    faqs: [
      { q: 'Can you migrate from our current ESP?', a: 'Yes. We handle migrations with data hygiene and flow reconstruction.' },
      { q: 'How often do you send campaigns?', a: 'Frequency is customized by audience behavior and engagement signals.' },
    ],
  },
  crm: {
    title: 'CRM',
    category: 'Promotions',
    tagline: 'Transform scattered data into coordinated growth operations.',
    overview:
      'We design CRM systems that unify lead data, automate handoffs, and improve sales and retention performance.',
    outcomes: ['Cleaner lead qualification', 'Faster sales response time', 'Higher lifecycle conversion rates'],
    deliverables: ['CRM architecture blueprint', 'Automation workflows', 'Lead scoring model', 'Reporting dashboards'],
    process: ['Data model planning', 'Workflow implementation', 'Team onboarding', 'Optimization and governance'],
    faqs: [
      { q: 'Do you work with HubSpot/Salesforce?', a: 'Yes. We support major CRM platforms and custom workflows.' },
      { q: 'Can you fix an existing CRM setup?', a: 'Yes. We audit and optimize before recommending any migration.' },
    ],
  },
  orm: {
    title: 'Online Reputation Management',
    category: 'Solutions',
    tagline: 'Protect trust, strengthen brand perception, and reduce risk.',
    overview:
      'We monitor brand signals across search, reviews, and social to proactively defend and improve your online reputation.',
    outcomes: ['Improved sentiment trend', 'Faster issue containment', 'Stronger branded search trust'],
    deliverables: ['Reputation monitoring setup', 'Response frameworks', 'Suppression and recovery strategy', 'Monthly reputation report'],
    process: ['Brand risk audit', 'Monitoring and alerting', 'Response and escalation', 'Long-term authority building'],
    faqs: [
      { q: 'Can you handle urgent reputation issues?', a: 'Yes. We deploy accelerated response protocols for high-priority incidents.' },
      { q: 'Is ORM only for large brands?', a: 'No. Growth brands benefit early by establishing trust signals proactively.' },
    ],
  },
  brand: {
    title: 'Brand Strategy',
    category: 'Solutions',
    tagline: 'Clarify your market position and message for faster growth.',
    overview:
      'We define positioning, messaging, and narrative systems that make your brand distinct, relevant, and memorable.',
    outcomes: ['Clearer market differentiation', 'Better campaign consistency', 'Higher conversion from stronger messaging'],
    deliverables: ['Positioning framework', 'Messaging architecture', 'Audience personas', 'Brand playbook'],
    process: ['Research and interviews', 'Positioning workshop', 'Message testing', 'Playbook rollout'],
    faqs: [
      { q: 'Will this align with existing campaigns?', a: 'Yes. We map strategy to active channels and current GTM priorities.' },
      { q: 'Do you include visual direction?', a: 'Yes. We provide guidance to align brand voice with visual identity.' },
    ],
  },
  leads: {
    title: 'Lead Generation',
    category: 'Solutions',
    tagline: 'Build a predictable flow of qualified opportunities.',
    overview:
      'We combine inbound and outbound systems to generate consistent, high-intent lead pipelines.',
    outcomes: ['Higher MQL and SQL volume', 'Improved conversion from lead to meeting', 'More predictable pipeline'],
    deliverables: ['Lead funnel strategy', 'Offer and landing page system', 'Channel activation plan', 'Lead quality reporting'],
    process: ['ICP and offer mapping', 'Funnel build and launch', 'Qualification tuning', 'Scale and channel expansion'],
    faqs: [
      { q: 'Do you optimize for lead quality?', a: 'Yes. We optimize around downstream conversion, not form volume alone.' },
      { q: 'Can this work for high-ticket services?', a: 'Yes. We tailor the funnel depth and qualification path by deal size.' },
    ],
  },
  retention: {
    title: 'Customer Retention',
    category: 'Solutions',
    tagline: 'Increase lifetime value with smarter lifecycle programs.',
    overview:
      'We design retention systems that improve repeat behavior, reduce churn, and increase customer value over time.',
    outcomes: ['Lower churn rate', 'Higher repeat revenue', 'Improved customer satisfaction signals'],
    deliverables: ['Lifecycle retention map', 'Winback and loyalty campaigns', 'Segmentation strategy', 'LTV performance reporting'],
    process: ['Cohort and churn analysis', 'Retention flow design', 'Behavior-triggered campaigns', 'Continuous optimization'],
    faqs: [
      { q: 'Can retention improve quickly?', a: 'Yes. Winback and onboarding optimizations can produce near-term gains.' },
      { q: 'Do you support subscription businesses?', a: 'Yes. We build retention models for subscription and one-time purchase brands.' },
    ],
  },
  transformation: {
    title: 'Digital Transformation',
    category: 'Solutions',
    tagline: 'Modernize systems, automate workflows, and improve speed.',
    overview:
      'We help teams replace manual bottlenecks with connected digital workflows that improve execution quality and scale.',
    outcomes: ['Faster campaign operations', 'Lower process friction', 'Better cross-team visibility'],
    deliverables: ['Transformation roadmap', 'Automation opportunities map', 'Tooling architecture', 'Enablement and SOP documentation'],
    process: ['Current-state assessment', 'Priority workflow redesign', 'Implementation and QA', 'Team adoption and governance'],
    faqs: [
      { q: 'Will this disrupt current operations?', a: 'We phase rollouts to avoid disruption and maintain business continuity.' },
      { q: 'Do you train internal teams?', a: 'Yes. Training and adoption are part of every transformation engagement.' },
    ],
  },
  research: {
    title: 'Market Research & Insights',
    category: 'Solutions',
    tagline: 'Make high-confidence decisions with structured market intelligence.',
    overview:
      'We turn fragmented market data into clear strategic direction through research frameworks tied to growth decisions.',
    outcomes: ['Clearer strategic priorities', 'Reduced go-to-market uncertainty', 'Better channel and message fit'],
    deliverables: ['Competitive landscape report', 'Audience research summary', 'Opportunity sizing model', 'Strategic recommendations deck'],
    process: ['Research plan and hypotheses', 'Data collection and synthesis', 'Insight validation', 'Decision-ready reporting'],
    faqs: [
      { q: 'Can research support product launches?', a: 'Yes. We use pre-launch insight models to reduce launch risk.' },
      { q: 'Do you include competitor benchmarking?', a: 'Yes. Competitive benchmarking is a core part of every research package.' },
    ],
  },
};

export default function ServiceDetail() {
  const [location] = useLocation();
  const slug = location.split('/')[2] ?? '';
  const service = serviceDetails[slug];

  if (!service) {
    return (
      <PageTransition>
        <section className="pt-28 pb-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl font-bold mb-4">Service Not Found</h1>
            <p className="text-muted-foreground mb-8">The service you requested does not exist.</p>
            <Link href="/services">
              <GlowButton variant="primary">Back to Services</GlowButton>
            </Link>
          </div>
        </section>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <section className="pt-24 pb-18 lg:pt-32 lg:pb-24 bg-secondary/30 text-foreground relative overflow-hidden">
        <img src="/decor/service-wave.svg" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-42" />
        <div className="absolute inset-0 bg-linear-to-b from-white/72 via-white/62 to-secondary/22" />
        <div className="container relative z-10 mx-auto px-4">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
            {service.category}
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="font-display text-5xl md:text-6xl font-extrabold mb-4 max-w-4xl leading-tight">
            {service.title}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl text-muted-foreground max-w-3xl">
            {service.tagline}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact">
              <GlowButton variant="primary" size="lg">
                Book Strategy Call <ArrowRight className="h-5 w-5" />
              </GlowButton>
            </Link>
            <Link href="/services">
              <GlowButton variant="outline" size="lg">All Services</GlowButton>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white/90 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-7 mb-14">
            {service.outcomes.map((outcome, idx) => (
              <motion.div
                key={outcome}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-lg transition-shadow"
              >
                <BarChart3 className="h-6 w-6 text-primary mb-3" />
                <p className="font-semibold text-foreground">{outcome}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Overview</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">{service.overview}</p>
              <div className="mt-8 rounded-2xl bg-secondary/30 border border-gray-100 p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Best For</p>
                <p className="text-foreground/85">
                  Brands looking for a scalable growth system with measurable KPIs, transparent reporting, and continuous optimization.
                </p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-3xl bg-foreground text-white p-8 shadow-xl">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Deliverables</p>
              <ul className="space-y-3">
                {service.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-gray-200">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-22 bg-secondary/25 border-y">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Execution Model</p>
            <h2 className="font-display text-4xl font-bold">How We Execute</h2>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
            {service.process.map((step, idx) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="rounded-2xl bg-white border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">
                  {idx === 0 ? <Compass className="h-5 w-5" /> : idx === 1 ? <Target className="h-5 w-5" /> : idx === 2 ? <CalendarDays className="h-5 w-5" /> : <Clock3 className="h-5 w-5" />}
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Phase {idx + 1}</p>
                <p className="font-semibold text-foreground">{step}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-22 bg-white/90 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">FAQ</p>
            <h2 className="font-display text-4xl font-bold">Common Questions</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {service.faqs.map((faq, idx) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="rounded-2xl border border-gray-100 p-6 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <p className="font-display text-xl font-bold mb-2">{faq.q}</p>
                <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-secondary/20 border-y">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">90-Day Plan</p>
            <h2 className="font-display text-4xl font-bold">Execution Roadmap</h2>
            <p className="text-muted-foreground mt-4">
              Every engagement follows a structured cadence built for rapid learning, controlled scaling, and measurable business outcomes.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {roadmapPhases.map((phase, idx) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.07 }}
                className="rounded-2xl bg-white border border-gray-100 p-6 shadow-sm"
              >
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Phase {idx + 1}</p>
                <h3 className="font-display text-2xl font-bold mb-2">{phase.phase}</h3>
                <p className="text-muted-foreground mb-4">{phase.summary}</p>
                <ul className="space-y-2">
                  {phase.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-foreground/85">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
            <motion.div initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Measurement</p>
              <h2 className="font-display text-4xl font-bold mb-4">KPI Framework</h2>
              <p className="text-muted-foreground leading-relaxed">
                For {service.title}, we report at multiple layers so you can see early indicators and business-level outcomes in one coherent narrative.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-3xl bg-foreground text-white p-7">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Reporting Cadence</p>
              <p className="text-gray-300 leading-relaxed">
                Weekly execution updates, monthly performance reviews, and quarterly strategic realignment sessions to keep growth compounding.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {kpiFramework.map((kpi, idx) => (
              <motion.div
                key={kpi.pillar}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06 }}
                className="rounded-2xl border border-gray-100 p-6 bg-white shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <p className="font-display text-xl font-bold">{kpi.pillar}</p>
                </div>
                <p className="text-sm font-semibold text-foreground mb-2">{kpi.metric}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{kpi.whyItMatters}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-secondary/20 border-y">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Fit Scenarios</p>
            <h2 className="font-display text-4xl font-bold">Where This Service Performs Best</h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            {scenarios.map((scenario, idx) => (
              <motion.div
                key={scenario.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="rounded-2xl bg-white border border-gray-100 p-7 shadow-sm"
              >
                <p className="font-display text-2xl font-bold mb-3">{scenario.title}</p>
                <p className="text-muted-foreground leading-relaxed">{scenario.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Engagement Models</p>
            <h2 className="font-display text-4xl font-bold">Choose Your Growth Pace</h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            {engagementTiers.map((tier, idx) => (
              <motion.div
                key={tier.tier}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="rounded-3xl border border-gray-100 p-7 bg-white shadow-sm"
              >
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">{tier.tier}</p>
                <p className="font-display text-3xl font-bold mb-3">{tier.tier} Plan</p>
                <p className="text-muted-foreground mb-5 leading-relaxed">{tier.fit}</p>
                <ul className="space-y-2 mb-6">
                  {tier.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-foreground/85">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/contact">
                  <GlowButton variant="outline" size="sm" className="w-full justify-center">
                    Talk to Strategy Team <ArrowRight className="h-4 w-4" />
                  </GlowButton>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-secondary/25 text-foreground relative overflow-hidden border-y border-primary/20">
        <div className="absolute inset-0 bg-gradient-brand opacity-[0.06]" />
        <div className="container relative z-10 mx-auto px-4 text-center max-w-3xl">
          <Sparkles className="h-8 w-8 text-primary mx-auto mb-4" />
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-5">Ready to Launch This Service?</h2>
          <p className="text-muted-foreground text-lg mb-9">
            Tell us your business goals and we will prepare a focused execution roadmap tailored to your market and growth stage.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <GlowButton variant="primary" size="lg">
                Get Free Consultation <ArrowRight className="h-5 w-5" />
              </GlowButton>
            </Link>
            <Link href="/services">
              <GlowButton variant="outline" size="lg" className="border-primary/35 text-primary hover:border-primary">
                Back to Services
              </GlowButton>
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
