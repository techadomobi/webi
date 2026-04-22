import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
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
  Zap,
} from 'lucide-react';
import PageTransition from '@/components/layout/PageTransition';
import GlowButton from '@/components/ui/GlowButton';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CMS_WEBSITE_NAME, fetchCmsEntry, type CmsContentBlock } from '@/lib/cms-api';

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

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

type ServiceVisualVariant = {
  heroBackground: string;
  heroOverlay: string;
  marquee: string[];
  highlights: Array<{ title: string; copy: string }>;
  kpis: Array<{ pillar: string; metric: string; whyItMatters: string }>;
  ctaLabel: string;
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

const strategyPillars = [
  {
    title: 'Acquisition System',
    text: 'Channel and campaign architecture focused on reliable lead flow and controlled budget scaling.',
  },
  {
    title: 'Conversion System',
    text: 'Landing experience, offers, and messaging tuned to increase qualified actions and reduce friction.',
  },
  {
    title: 'Retention System',
    text: 'Lifecycle automation and customer communication loops that build compounding value after first conversion.',
  },
];

const serviceDifferentiators = [
  'Senior-led strategy and implementation',
  'Weekly optimization loops with transparent reporting',
  'Cross-functional execution across content, paid, and lifecycle channels',
  'Scalable process with documentation and team handoff readiness',
  'Business KPI alignment instead of vanity metric reporting',
  'Rapid experimentation with measured risk controls',
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
  ctvAdsAgency: {
    title: 'CTV Ads Agency',
    category: 'Digital Marketing',
    tagline: 'Reach premium streaming audiences with precision-targeted TV campaigns.',
    overview:
      'Our CTV programs combine audience intelligence, creative sequencing, and conversion attribution so connected-TV spend drives measurable business outcomes, not just impressions.',
    outcomes: ['Higher incremental reach among high-value audiences', 'Stronger brand recall across devices', 'Trackable lift in assisted conversions'],
    deliverables: ['CTV audience and publisher strategy', 'Creative rotation and frequency framework', 'Cross-device attribution setup', 'Weekly delivery and lift reporting'],
    process: ['Audience and inventory planning', 'Creative and placement launch', 'Incrementality measurement', 'Budget and frequency optimization'],
    faqs: [
      { q: 'Can CTV work for performance goals?', a: 'Yes. We pair CTV with retargeting and conversion pathways to improve attributable outcomes.' },
      { q: 'Do you buy on specific streaming platforms?', a: 'Yes. We can execute on curated publisher lists and major CTV inventory sources.' },
    ],
  },
  googleAds: {
    title: 'Google Ads',
    category: 'Promotions',
    tagline: 'Scale profitable demand across Search, Display, YouTube, and Performance Max.',
    overview:
      'We build Google Ads systems around intent, conversion quality, and margin control. Campaigns are continuously tuned through search terms, audience signals, creative tests, and landing page performance.',
    outcomes: ['Lower cost per qualified lead', 'Improved conversion rate from paid traffic', 'More stable month-over-month ROAS'],
    deliverables: ['Account structure and intent map', 'Ad and asset testing framework', 'Bid strategy and budget guardrails', 'Attribution and search-term governance'],
    process: ['Audit and opportunity scoring', 'Campaign build and launch', 'Search term and asset optimization', 'Scale high-performing segments'],
    faqs: [
      { q: 'Do you run Performance Max with controls?', a: 'Yes. We set exclusions, asset groups, and reporting checks to keep quality high.' },
      { q: 'Can you improve poor historical accounts?', a: 'Yes. We can restructure legacy accounts and recover performance efficiently.' },
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
  metaAds: {
    title: 'Meta Ads',
    category: 'Promotions',
    tagline: 'Drive full-funnel growth on Facebook and Instagram with creative-led testing.',
    overview:
      'Our Meta Ads service blends audience architecture, offer design, and rapid creative iteration to increase conversion efficiency while preserving scale potential.',
    outcomes: ['Improved paid social CPA', 'Higher CTR through creative testing loops', 'Greater lead and purchase volume at target margins'],
    deliverables: ['Campaign and audience architecture', 'Creative test matrix and ad variants', 'Pixel, CAPI, and event mapping', 'Weekly optimization and insights summaries'],
    process: ['Tracking and funnel audit', 'Campaign and creative launch', 'Audience and placement optimization', 'Scale winners with budget controls'],
    faqs: [
      { q: 'Do you handle creative direction?', a: 'Yes. We define hooks, angles, and visual test plans for continuous performance gains.' },
      { q: 'Can you support lead-gen and ecommerce?', a: 'Yes. We run tailored frameworks for both models with separate KPI controls.' },
    ],
  },
  youtubeAdsSeo: {
    title: 'YouTube Ads & SEO',
    category: 'Promotions',
    tagline: 'Combine video discovery and search visibility to compound audience growth.',
    overview:
      'We connect YouTube paid campaigns with channel SEO strategy so your video ecosystem drives both immediate demand and long-term discoverability.',
    outcomes: ['Lower cost per engaged view', 'Higher qualified traffic from YouTube search and recommendations', 'Better assisted conversion impact from video journeys'],
    deliverables: ['YouTube campaign and channel strategy', 'Video SEO metadata and structure', 'Audience retargeting sequence', 'Performance and watch-time reporting'],
    process: ['Channel and audience audit', 'Campaign and SEO implementation', 'Retention and engagement optimization', 'Scale content and media mix'],
    faqs: [
      { q: 'Do you optimize existing YouTube channels?', a: 'Yes. We optimize structure, metadata, thumbnails, and publishing cadence.' },
      { q: 'Can paid and organic YouTube run together?', a: 'Yes. We design both tracks to reinforce each other and improve efficiency.' },
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
  leadGenerationMarketing: {
    title: 'Lead Generation Marketing',
    category: 'Solutions',
    tagline: 'Build an always-on engine for qualified pipeline growth.',
    overview:
      'This service unifies channel strategy, conversion architecture, and qualification logic so lead generation becomes predictable, scalable, and sales-aligned.',
    outcomes: ['Consistent SQL pipeline creation', 'Improved lead-to-opportunity conversion', 'Faster feedback loops between marketing and sales'],
    deliverables: ['Channel and offer mix strategy', 'High-intent funnel architecture', 'Lead scoring and routing model', 'Pipeline quality dashboard and reporting'],
    process: ['ICP and demand mapping', 'Offer and funnel deployment', 'Qualification optimization', 'Scale by segment and channel'],
    faqs: [
      { q: 'Can this include outbound + inbound together?', a: 'Yes. We can orchestrate both to stabilize pipeline and reduce channel dependency.' },
      { q: 'Do you align with sales teams?', a: 'Yes. We define qualification criteria and reporting loops with your revenue team.' },
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

const serviceVisualVariants: Partial<Record<keyof typeof serviceDetails, ServiceVisualVariant>> = {
  ctvAdsAgency: {
    heroBackground: 'linear-gradient(to bottom, #edf6ff, #ffffff, #f4f8ff)',
    heroOverlay: 'linear-gradient(to bottom, rgba(255,255,255,0.76), rgba(255,255,255,0.7), rgba(235,245,255,0.35))',
    marquee: [
      'Premium streaming inventory',
      'Cross-device attribution',
      'Audience-first TV planning',
      'Incrementality measurement',
      'Frequency and reach controls',
      'Brand + performance alignment',
    ],
    highlights: [
      { title: 'Household-Level Precision', copy: 'Target high-value audience clusters with geo, interest, and behavioral signals.' },
      { title: 'Screen-First Creative', copy: 'Deliver creative sequences designed for connected-TV attention and recall.' },
      { title: 'Measured Lift', copy: 'Track view-through and assisted conversion impact across the full funnel.' },
    ],
    kpis: [
      { pillar: 'Reach Quality', metric: 'Qualified CTV reach and frequency balance', whyItMatters: 'Ensures media spend expands awareness in the right audience segments.' },
      { pillar: 'Attention', metric: 'Completion and watch-depth by creative variation', whyItMatters: 'Validates whether creative sequencing sustains attention long enough to influence action.' },
      { pillar: 'Incremental Lift', metric: 'Branded search and site-lift in exposed cohorts', whyItMatters: 'Confirms CTV contributes measurable downstream business impact.' },
      { pillar: 'Efficiency', metric: 'Blended cost per qualified session', whyItMatters: 'Keeps CTV contribution tied to overall acquisition economics.' },
    ],
    ctaLabel: 'Launch CTV Strategy',
  },
  googleAds: {
    heroBackground: 'linear-gradient(to bottom, #f4f7ff, #ffffff, #f7f4ff)',
    heroOverlay: 'linear-gradient(to bottom, rgba(255,255,255,0.78), rgba(255,255,255,0.68), rgba(245,242,255,0.36))',
    marquee: [
      'Intent-led search structure',
      'Performance Max governance',
      'Search-term hygiene',
      'Auction-aware bidding',
      'Landing page alignment',
      'ROAS and pipeline clarity',
    ],
    highlights: [
      { title: 'Intent Mapping', copy: 'Separate high-intent queries from exploratory traffic for cleaner conversion economics.' },
      { title: 'Asset Testing Engine', copy: 'Run systematic ad variant testing across copy, offers, and extensions.' },
      { title: 'Budget Intelligence', copy: 'Reallocate spend weekly to winning campaigns without volatility spikes.' },
    ],
    kpis: [
      { pillar: 'Intent Coverage', metric: 'Impression share on high-value query clusters', whyItMatters: 'Protects market share where buyers show strongest purchase intent.' },
      { pillar: 'Traffic Quality', metric: 'Qualified click and engagement depth', whyItMatters: 'Filters low-value visits and improves landing experience relevance.' },
      { pillar: 'Conversion Yield', metric: 'Cost per qualified lead and lead-to-opportunity rate', whyItMatters: 'Optimizes for revenue contribution, not superficial lead volume.' },
      { pillar: 'Profitability', metric: 'ROAS stability and marginal return by segment', whyItMatters: 'Keeps scaling decisions tied to sustainable business return.' },
    ],
    ctaLabel: 'Scale Google Ads',
  },
  metaAds: {
    heroBackground: 'linear-gradient(to bottom, #fff3fa, #ffffff, #f6f6ff)',
    heroOverlay: 'linear-gradient(to bottom, rgba(255,255,255,0.72), rgba(255,255,255,0.64), rgba(246,241,255,0.34))',
    marquee: [
      'Creative testing velocity',
      'Audience architecture',
      'Offer-angle experiments',
      'Funnel stage sequencing',
      'Pixel and CAPI quality',
      'CPA stability at scale',
    ],
    highlights: [
      { title: 'Creative Flywheel', copy: 'Run high-frequency hook, angle, and format tests to sustain ad performance.' },
      { title: 'Audience Laddering', copy: 'Move from broad discovery to high-intent retargeting with controlled overlap.' },
      { title: 'Offer Match', copy: 'Align message and landing experience by funnel stage for stronger conversion rates.' },
    ],
    kpis: [
      { pillar: 'Creative Signal', metric: 'Thumb-stop rate and CTR by concept family', whyItMatters: 'Shows which angles capture attention before spend scales.' },
      { pillar: 'Audience Health', metric: 'Frequency, overlap, and segment saturation', whyItMatters: 'Prevents fatigue and protects efficiency over time.' },
      { pillar: 'Acquisition', metric: 'CPA and qualified lead volume by campaign objective', whyItMatters: 'Keeps tactical optimization tied to conversion quality.' },
      { pillar: 'Revenue Impact', metric: 'Attributed and assisted conversion contribution', whyItMatters: 'Connects paid social outcomes to real business growth.' },
    ],
    ctaLabel: 'Activate Meta Ads',
  },
  youtubeAdsSeo: {
    heroBackground: 'linear-gradient(to bottom, #fff5f5, #ffffff, #f7f8ff)',
    heroOverlay: 'linear-gradient(to bottom, rgba(255,255,255,0.72), rgba(255,255,255,0.65), rgba(245,247,255,0.34))',
    marquee: [
      'Video-first discovery loops',
      'YouTube SEO architecture',
      'Watch-time optimization',
      'Audience retargeting paths',
      'Paid + organic synergy',
      'Evergreen content systems',
    ],
    highlights: [
      { title: 'Discoverability Stack', copy: 'Align titles, metadata, and structure to maximize recommendation visibility.' },
      { title: 'View-to-Visit Journeys', copy: 'Design clear pathways from video engagement to qualified website actions.' },
      { title: 'Retention Engineering', copy: 'Improve watch-depth signals that feed both paid and organic distribution.' },
    ],
    kpis: [
      { pillar: 'Visibility', metric: 'Search and recommendation surface share', whyItMatters: 'Measures how often content is discovered by relevant audiences.' },
      { pillar: 'Engagement', metric: 'Watch-time, completion, and interaction depth', whyItMatters: 'Validates message resonance and algorithmic momentum.' },
      { pillar: 'Conversion Flow', metric: 'Click-through to site and on-site action rate', whyItMatters: 'Connects video activity to demand generation impact.' },
      { pillar: 'Compounding Value', metric: 'Evergreen traffic and lead contribution over time', whyItMatters: 'Shows whether the content library creates durable growth.' },
    ],
    ctaLabel: 'Grow YouTube Engine',
  },
  leadGenerationMarketing: {
    heroBackground: 'linear-gradient(to bottom, #f2f9ff, #ffffff, #f7f4ff)',
    heroOverlay: 'linear-gradient(to bottom, rgba(255,255,255,0.74), rgba(255,255,255,0.68), rgba(245,242,255,0.36))',
    marquee: [
      'Pipeline-focused demand model',
      'Offer and funnel design',
      'Lead quality governance',
      'Sales feedback loops',
      'Qualification automation',
      'Forecastable growth systems',
    ],
    highlights: [
      { title: 'Pipeline Architecture', copy: 'Design demand pathways from first touch to sales-qualified handoff.' },
      { title: 'Quality-First Scoring', copy: 'Prioritize high-fit accounts through intent and qualification signals.' },
      { title: 'Revenue Alignment', copy: 'Unify marketing and sales metrics around opportunity creation quality.' },
    ],
    kpis: [
      { pillar: 'Demand Capture', metric: 'High-intent lead inflow by channel and segment', whyItMatters: 'Shows whether strategy is attracting the right prospect profile.' },
      { pillar: 'Qualification', metric: 'MQL-to-SQL conversion velocity', whyItMatters: 'Measures handoff quality and operational fit with sales.' },
      { pillar: 'Pipeline Value', metric: 'Opportunity volume and weighted pipeline', whyItMatters: 'Connects campaign activity directly to revenue potential.' },
      { pillar: 'Predictability', metric: 'Weekly variance across lead and opportunity targets', whyItMatters: 'Enables confident planning and budget allocation decisions.' },
    ],
    ctaLabel: 'Build Lead Engine',
  },
};

const serviceSlugAliases: Record<string, keyof typeof serviceDetails> = {
  seo: 'seo',
  'search-engine-optimization': 'seo',
  'seo-services': 'seo',
  'search-optimization': 'seo',
  sem: 'sem',
  ppc: 'sem',
  'search-engine-marketing': 'sem',
  'paid-search': 'sem',
  'pay-per-click': 'sem',
  'google-ads': 'googleAds',
  smm: 'smm',
  'social-media-marketing': 'smm',
  'social-media-management': 'smm',
  'social-media': 'smm',
  web: 'web',
  'web-development': 'web',
  'website-development': 'web',
  'website-design-development': 'web',
  'ctv-ads-agency': 'ctvAdsAgency',
  content: 'content',
  'content-marketing': 'content',
  'content-strategy': 'content',
  'content-writing': 'content',
  affiliate: 'affiliate',
  'affiliate-marketing': 'affiliate',
  mobile: 'mobile',
  'mobile-marketing': 'mobile',
  influencer: 'influencer',
  'influencer-marketing': 'influencer',
  sms: 'sms',
  'sms-marketing': 'sms',
  email: 'email',
  'email-marketing': 'email',
  'meta-ads': 'metaAds',
  'youtube-ads-seo': 'youtubeAdsSeo',
  crm: 'crm',
  'crm-services': 'crm',
  orm: 'orm',
  'online-reputation-management': 'orm',
  'reputation-management': 'orm',
  brand: 'brand',
  'brand-strategy': 'brand',
  leads: 'leads',
  'lead-generation': 'leads',
  'lead-generation-marketing': 'leadGenerationMarketing',
  retention: 'retention',
  'customer-retention': 'retention',
  transformation: 'transformation',
  'digital-transformation': 'transformation',
  research: 'research',
  'market-research': 'research',
  'market-research-insights': 'research',
};

function normalizeSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function resolveServiceKeyFromSlug(rawSlug: string): keyof typeof serviceDetails | null {
  const normalized = normalizeSlug(rawSlug);
  if (!normalized) return null;

  const byAlias = serviceSlugAliases[normalized];
  if (byAlias) return byAlias;

  if (normalized in serviceDetails) {
    return normalized as keyof typeof serviceDetails;
  }

  return null;
}

function resolveServiceFromSlug(rawSlug: string): ServiceDetail | null {
  const key = resolveServiceKeyFromSlug(rawSlug);
  return key ? serviceDetails[key] ?? null : null;
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

function CmsContentBlockView({ block, image, index }: { block: CmsContentBlock; image?: string; index: number }) {
  if (block.type === 'image') {
    return (
      <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
        {image ? (
          <img src={image} alt="CMS content block" className="h-72 w-full object-cover" />
        ) : (
          <div className="flex h-72 items-center justify-center bg-secondary/40 text-muted-foreground">
            <div className="text-center">
              <p className="text-sm font-medium">Image block {index + 1}</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  const html = typeof block.text === 'string' ? block.text : '';
  if (!stripHtml(html)) {
    return null;
  }

  return (
    <div
      className="prose prose-slate max-w-none rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:p-8 prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function CmsServiceView({ service, onBack }: { service: NonNullable<Awaited<ReturnType<typeof fetchCmsEntry>>>; onBack: string }) {
  const images = service.images?.length ? service.images : service.coverImage ? [service.coverImage] : [];
  const blocks = service.content ?? [];
  const [heroImageFailed, setHeroImageFailed] = useState(false);
  const generatedBlocks = [
    {
      title: 'Business Context',
      text: `${service.excerpt || service.focusKeyphrase || 'This service is designed for practical business growth.'} The objective is to create measurable movement, not just activity.`,
    },
    {
      title: 'Execution Focus',
      text: 'We combine planning, implementation, and weekly optimization cycles so campaigns improve with each sprint.',
    },
    {
      title: 'Expected Outcomes',
      text: 'You can expect clearer funnel visibility, stronger conversion quality, and more predictable growth decisions.',
    },
  ];

  useEffect(() => {
    setHeroImageFailed(false);
  }, [service.coverImage]);

  return (
    <PageTransition>
      <section className="relative overflow-hidden border-b border-primary/20 bg-linear-to-b from-[#f7f5ff] via-white to-[#fff4f8] pt-24 pb-16 lg:pt-32 lg:pb-20">
        <img src="/decor/service-wave.svg" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-linear-to-b from-white/78 via-white/72 to-secondary/18" />
        <motion.div animate={{ y: [0, -16, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} className="pointer-events-none absolute -left-20 top-20 h-56 w-56 rounded-full bg-primary/15 blur-3xl" />
        <motion.div animate={{ y: [0, 14, 0] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} className="pointer-events-none absolute right-0 top-32 h-72 w-72 rounded-full bg-pink-400/15 blur-3xl" />
        <div className="container relative z-10 mx-auto px-4">
          <Link href={onBack} className="mb-6 inline-flex">
            <GlowButton variant="outline" size="lg">Back to Services</GlowButton>
          </Link>

          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
                {service.category || 'CMS Service'}
              </motion.p>
              <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="font-display text-5xl md:text-7xl font-black mb-4 max-w-5xl leading-[1.04]">
                {service.title}
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.45 }} className="text-xl text-muted-foreground max-w-3xl">
                {service.excerpt || service.focusKeyphrase || 'CMS-backed service content.'}
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.45 }} className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact">
                  <GlowButton variant="primary" size="lg">
                    Book Strategy Call <ArrowRight className="h-5 w-5" />
                  </GlowButton>
                </Link>
                <Link href="/services">
                  <GlowButton variant="outline" size="lg">All Services</GlowButton>
                </Link>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24, duration: 0.4 }} className="mt-8 flex flex-wrap gap-2">
                {service.tags?.slice(0, 8).map(tag => (
                  <Badge key={tag} variant="secondary" className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-foreground shadow-sm">
                    {tag}
                  </Badge>
                ))}
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="overflow-hidden rounded-4xl border border-white/60 bg-white shadow-2xl">
              {service.coverImage && !heroImageFailed ? (
                <motion.img src={service.coverImage} alt={service.title} className="h-full min-h-90 w-full object-cover" onError={() => setHeroImageFailed(true)} whileHover={{ scale: 1.03 }} transition={{ duration: 0.45 }} />
              ) : (
                <div className="min-h-90 bg-linear-to-br from-[#081526] via-[#10243f] to-[#183a63] p-10 text-white">
                  <p className="text-sm font-bold uppercase tracking-[0.24em] text-white/70">Service Snapshot</p>
                  <h2 className="mt-4 font-display text-3xl font-bold leading-tight">{service.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/80">
                    {service.excerpt || service.focusKeyphrase || 'A strategy-led service page with clear execution structure and measurable outcomes.'}
                  </p>
                  <div className="mt-6 space-y-2">
                    {[
                      'Structured execution model',
                      'Weekly optimization rhythm',
                      'Business KPI alignment',
                    ].map(item => (
                      <div key={item} className="flex items-center gap-2 text-sm text-white/90">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-b border-primary/15 bg-white/85 py-4 backdrop-blur">
        <div className="container mx-auto px-4">
          <div className="overflow-hidden">
            <div className="animate-marquee flex min-w-max items-center gap-8 whitespace-nowrap">
              {[
                'Strategy-led execution',
                'Transparent delivery cadence',
                'Channel and conversion optimization',
                'Measurable business outcomes',
                'CMS-backed service pages',
                'Weekly learning loops',
              ].concat([
                'Strategy-led execution',
                'Transparent delivery cadence',
                'Channel and conversion optimization',
                'Measurable business outcomes',
                'CMS-backed service pages',
                'Weekly learning loops',
              ]).map((item, idx) => (
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
          <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(280px,0.9fr)] lg:items-start">
            <div className="space-y-6">
              {blocks.length > 0 ? (
                blocks.map((block, index) => (
                  <CmsContentBlockView key={block._id || `${block.type}-${index}`} block={block} image={images[index]} index={index} />
                ))
              ) : (
                <div className="space-y-5">
                  {generatedBlocks.map((entry, index) => (
                    <motion.div
                      key={entry.title}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ delay: Math.min(index * 0.06, 0.2) }}
                      className="rounded-3xl border border-primary/12 bg-linear-to-br from-white to-primary/5 p-7 shadow-sm"
                    >
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Service Brief</p>
                      <h3 className="mt-2 font-display text-3xl font-bold text-foreground">{entry.title}</h3>
                      <p className="mt-4 text-base leading-relaxed text-muted-foreground">{entry.text}</p>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            <aside className="space-y-6 lg:sticky lg:top-28">
              <div className="rounded-3xl border border-gray-100 bg-secondary/30 p-6 shadow-sm">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Article Details</p>
                <div className="mt-5 space-y-4 text-sm text-muted-foreground">
                  <div>
                    <p className="font-semibold text-foreground">Website</p>
                    <p>{service.websiteName || CMS_WEBSITE_NAME}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Focus Keyphrase</p>
                    <p>{service.focusKeyphrase || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">SEO Title</p>
                    <p>{service.seoTitle || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Meta Description</p>
                    <p>{service.metaDescription || 'Not provided'}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">SEO Keywords</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {(service.seoKeywords || []).slice(0, 12).map(keyword => (
                    <span key={keyword} className="rounded-full bg-secondary/60 px-3 py-1 text-xs font-medium text-foreground">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-primary/15 bg-[#081526] p-6 text-white shadow-xl">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/70">Want this on your site?</p>
                <p className="mt-4 text-lg leading-relaxed text-white/80">
                  The CMS service content can be edited in one place and rendered across the public site automatically.
                </p>
                <Link href="/contact">
                  <GlowButton variant="primary" size="lg" className="mt-6 w-full justify-center">
                    Request Implementation
                  </GlowButton>
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-y border-primary/20 bg-linear-to-b from-[#fff8fb] via-white to-[#f7fbff] py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">Operating Blueprint</p>
            <h2 className="font-display text-4xl font-black md:text-6xl">How This Service Scales Growth</h2>
            <p className="mt-4 text-muted-foreground">
              This service page is redesigned as a long-form experience so buyers can understand the full execution model before they book a call.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {strategyPillars.map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="rounded-3xl border border-primary/15 bg-white p-6 shadow-lg shadow-primary/5"
              >
                <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/12 text-primary">
                  {idx === 0 ? <Compass className="h-4 w-4" /> : idx === 1 ? <Target className="h-4 w-4" /> : <Clock3 className="h-4 w-4" />}
                </div>
                <p className="text-lg font-semibold text-foreground">{pillar.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pillar.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-primary/15 bg-white p-7 shadow-lg shadow-primary/5"
            >
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">What Makes It Different</p>
              <div className="grid gap-3 md:grid-cols-2">
                {serviceDifferentiators.map((item, idx) => (
                  <div key={item} className="rounded-2xl border border-primary/10 bg-linear-to-br from-white to-primary/5 p-4">
                    <div className="mb-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/14 text-xs font-bold text-primary">
                      {idx + 1}
                    </div>
                    <p className="text-sm leading-relaxed text-foreground/90">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-primary/30 bg-linear-to-br from-[#071124] via-[#0c1f3a] to-[#102b4d] p-7 text-white shadow-2xl"
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">Delivery Rhythm</p>
              <h3 className="mt-3 font-display text-3xl font-bold">90-Day Momentum Plan</h3>
              <p className="mt-4 text-sm leading-relaxed text-white/80">
                The first quarter of work is built to create early proof, remove inefficiencies, and establish a compounding system.
              </p>
              <ul className="mt-5 space-y-3">
                {roadmapPhases.slice(0, 4).map((phase, idx) => (
                  <li key={phase.phase} className="flex items-start gap-2 text-sm text-white/90">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>
                      <span className="font-semibold">Phase {idx + 1}:</span> {phase.summary}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-primary/20 bg-[#081526] py-20 text-white md:py-24">
        <div className="absolute inset-0 bg-gradient-brand opacity-[0.12]" />
        <div className="pointer-events-none absolute -left-10 top-10 h-64 w-64 rounded-full bg-primary/20 blur-[100px]" />
        <div className="pointer-events-none absolute -right-10 bottom-10 h-64 w-64 rounded-full bg-pink-400/20 blur-[100px]" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-3xl">
            <Sparkles className="mx-auto mb-4 h-8 w-8 text-primary" />
            <h2 className="font-display text-4xl font-black md:text-6xl">Ready to Launch {service.title}?</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-white/80">
              If you want this same long-form, high-conversion service experience across your site, we can implement the complete system.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/contact">
                <GlowButton variant="primary" size="lg">
                  Start Consultation <ArrowRight className="h-5 w-5" />
                </GlowButton>
              </Link>
              <Link href="/services">
                <GlowButton variant="outline" size="lg" className="border-white/35 text-white hover:border-white hover:bg-white hover:text-foreground">
                  Back to Services
                </GlowButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}

export default function ServiceDetail() {
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

  const serviceKey = resolveServiceKeyFromSlug(slug);
  const service = resolveServiceFromSlug(slug);
  const visualVariant = serviceKey ? serviceVisualVariants[serviceKey] : undefined;
  const marqueeItems = visualVariant?.marquee ?? [
    'Strategy-led execution',
    'Transparent delivery cadence',
    'Channel and conversion optimization',
    'Measurable business outcomes',
    'High-velocity iteration loops',
    'Cross-channel growth systems',
  ];
  const kpiCards = visualVariant?.kpis ?? kpiFramework;

  const { data: cmsService, isLoading: cmsLoading } = useQuery({
    queryKey: ['cms', 'service', slug],
    queryFn: () => fetchCmsEntry('services', slug),
    enabled: Boolean(slug),
    staleTime: 5 * 60 * 1000,
  });

  if (cmsService) {
    return <CmsServiceView service={cmsService} onBack="/services" />;
  }

  if (!service && cmsLoading) {
    return (
      <PageTransition>
        <section className="pt-28 pb-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl font-bold mb-4">Loading Service</h1>
            <p className="text-muted-foreground mb-8">Fetching the CMS entry for this service.</p>
          </div>
        </section>
      </PageTransition>
    );
  }

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
      <section
        className="pt-24 pb-18 lg:pt-32 lg:pb-24 text-foreground relative overflow-hidden"
        style={{ background: visualVariant?.heroBackground ?? 'linear-gradient(to bottom, #f7f5ff, #ffffff, #fff4f8)' }}
      >
        <img src="/decor/service-wave.svg" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-42" />
        <div className="absolute inset-0" style={{ background: visualVariant?.heroOverlay ?? 'linear-gradient(to bottom, rgba(255,255,255,0.72), rgba(255,255,255,0.62), rgba(238,242,255,0.22))' }} />
        <div className="container relative z-10 mx-auto px-4">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
            {service.category}
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="font-display text-5xl md:text-7xl font-black mb-4 max-w-5xl leading-[1.04]">
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

      <section className="border-b border-primary/15 bg-white/85 py-4 backdrop-blur">
        <div className="container mx-auto px-4">
          <div className="overflow-hidden">
            <div className="animate-marquee flex min-w-max items-center gap-8 whitespace-nowrap">
              {marqueeItems.concat(marqueeItems).map((item, idx) => (
                <div key={`${item}-${idx}`} className="inline-flex items-center gap-2 text-sm font-medium text-foreground/80">
                  <Zap className="h-3.5 w-3.5 text-primary" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {visualVariant ? (
        <section className="py-14 bg-white/90 border-b border-primary/10">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-5">
              {visualVariant.highlights.map((highlight, idx) => (
                <motion.div
                  key={highlight.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.07 }}
                  className="rounded-2xl border border-primary/15 bg-linear-to-br from-white to-primary/5 p-6 shadow-sm"
                >
                  <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Highlight</p>
                  <h3 className="font-display text-2xl font-bold text-foreground">{highlight.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{highlight.copy}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="py-20 bg-white/90 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-7 mb-14">
            {service.outcomes.map((outcome, idx) => (
              <motion.div
                key={outcome}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="h-full"
              >
                  <Card className="gradient-border-animated h-full rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-lg">
                  <CardContent className="p-6">
                    <BarChart3 className="mb-3 h-6 w-6 text-primary" />
                    <p className="font-semibold text-foreground">{outcome}</p>
                  </CardContent>
                </Card>
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
      </motion.section>

      <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="py-22 bg-secondary/25 border-y">
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
      </motion.section>

      <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="py-22 bg-white/90 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">FAQ</p>
            <h2 className="font-display text-4xl font-bold">Common Questions</h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-4xl rounded-3xl border border-gray-100 bg-white p-3 shadow-sm md:p-5"
          >
            <Accordion type="single" collapsible className="w-full">
              {service.faqs.map((faq, idx) => (
                <AccordionItem key={faq.q} value={`faq-${idx}`} className="border-b border-gray-100 last:border-none">
                  <AccordionTrigger className="px-3 py-5 text-left font-display text-lg font-bold text-foreground hover:no-underline md:px-4">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="px-3 pb-5 text-base leading-relaxed text-muted-foreground md:px-4">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </motion.section>

      <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="py-24 bg-secondary/20 border-y">
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
      </motion.section>

      <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="py-24 bg-white">
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
            {kpiCards.map((kpi, idx) => (
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
      </motion.section>

      <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="py-24 bg-secondary/20 border-y">
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
      </motion.section>

      <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="py-24 bg-white">
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
      </motion.section>

      <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="py-24 bg-secondary/25 text-foreground relative overflow-hidden border-y border-primary/20">
        <div className="absolute inset-0 bg-gradient-brand opacity-[0.06]" />
        <div className="container relative z-10 mx-auto px-4 text-center max-w-3xl">
          <Sparkles className="h-8 w-8 text-primary mx-auto mb-4" />
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-5">{visualVariant?.ctaLabel ?? 'Ready to Launch This Service?'}</h2>
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
      </motion.section>
    </PageTransition>
  );
}
