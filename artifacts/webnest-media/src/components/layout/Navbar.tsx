import React from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ChevronDown,
  Search,
  LineChart,
  Users,
  Globe,
  FileText,
  Handshake,
  Smartphone,
  Send,
  Mail,
  Youtube,
  Shield,
  Palette,
  Target,
  Repeat,
  Cpu,
  Lightbulb,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
const brandLogo = '/logo.png';

type ServiceMenuItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  iconClass: string;
};

const serviceMenuColumns: Array<{ title: string; items: ServiceMenuItem[] }> = [
  {
    title: 'Digital Marketing',
    items: [
      { label: 'Search Engine Optimization', href: '/services/seo', icon: Search, iconClass: 'text-orange-500' },
      { label: 'Search Engine Marketing', href: '/services/sem', icon: LineChart, iconClass: 'text-blue-500' },
      { label: 'Social Media Marketing', href: '/services/smm', icon: Users, iconClass: 'text-sky-500' },
      { label: 'Web Development', href: '/services/web', icon: Globe, iconClass: 'text-emerald-500' },
      { label: 'CTV Ads Agency', href: '/services/ctv-ads-agency', icon: FileText, iconClass: 'text-indigo-500' },
      { label: 'Affiliate Marketing', href: '/services/affiliate', icon: Handshake, iconClass: 'text-pink-500' },
    ],
  },
  {
    title: 'Promotions',
    items: [
      { label: 'Mobile Marketing', href: '/services/mobile', icon: Smartphone, iconClass: 'text-cyan-500' },
      { label: 'Influencer Marketing', href: '/services/influencer', icon: Send, iconClass: 'text-fuchsia-500' },
      { label: 'Email Marketing', href: '/services/email', icon: Mail, iconClass: 'text-slate-500' },
      { label: 'Google Ads', href: '/services/google-ads', icon: Search, iconClass: 'text-blue-500' },
      { label: 'Meta Ads', href: '/services/meta-ads', icon: Users, iconClass: 'text-sky-500' },
      { label: 'YouTube Ads & SEO', href: '/services/youtube-ads-seo', icon: Youtube, iconClass: 'text-red-500' },
    ],
  },
  {
    title: 'Solutions',
    items: [
      { label: 'Online Reputation Management', href: '/services/orm', icon: Shield, iconClass: 'text-cyan-500' },
      { label: 'Brand Strategy', href: '/services/brand', icon: Palette, iconClass: 'text-violet-500' },
      { label: 'Lead Generation Marketing', href: '/services/lead-generation-marketing', icon: Target, iconClass: 'text-rose-500' },
      { label: 'Customer Retention', href: '/services/retention', icon: Repeat, iconClass: 'text-lime-500' },
      { label: 'Digital Transformation', href: '/services/transformation', icon: Cpu, iconClass: 'text-slate-500' },
      { label: 'Market Research & Insights', href: '/services/research', icon: Lightbulb, iconClass: 'text-amber-500' },
    ],
  },
];

export default function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);
  const [servicesOpen, setServicesOpen] = React.useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = React.useState(false);
  const servicesRef = React.useRef<HTMLDivElement>(null);
  const hoverCloseTimeout = React.useRef<number | null>(null);

  const isServicesRoute = location.startsWith('/services');
  const isHomeRoute = location === '/';

  const cancelServicesClose = React.useCallback(() => {
    if (hoverCloseTimeout.current !== null) {
      window.clearTimeout(hoverCloseTimeout.current);
      hoverCloseTimeout.current = null;
    }
  }, []);

  const scheduleServicesClose = React.useCallback(() => {
    cancelServicesClose();
    hoverCloseTimeout.current = window.setTimeout(() => {
      setServicesOpen(false);
    }, 160);
  }, [cancelServicesClose]);

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  React.useEffect(() => {
    return () => {
      if (hoverCloseTimeout.current !== null) {
        window.clearTimeout(hoverCloseTimeout.current);
      }
    };
  }, []);

  return (
    <header
      className="sticky top-0 z-50 w-full transition-all duration-300 bg-gradient-brand border-b border-transparent"
      style={{boxShadow: '0 2px 16px 0 rgba(44, 62, 80, 0.04)'}}
    >
      <div
        className={`container mx-auto flex h-20 items-center justify-between px-4 transition-all duration-300 ${
          isHomeRoute
            ? 'px-6 lg:px-8'
            : ''
        }`}
      >
        <Link href="/" className="flex items-center gap-2 group shrink-0 overflow-hidden">
          <img
            src={brandLogo}
            alt="WeeoMedia"
            fetchPriority="high"
            loading="eager"
            decoding="async"
            className="block h-16 w-auto object-contain object-left transition-transform duration-300 hover:scale-105 sm:h-30 md:h-30 lg:h-40"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 text-white drop-shadow">
          <Link href="/about" className="relative py-2 text-sm font-medium transition-colors hover:text-cyan-200">
            About Us
            {location === '/about' && (
              {/* Removed gradient indicator for pure white background */}
            )}
          </Link>

          {/* Services Mega Menu */}
          <div
            ref={servicesRef}
            className="relative"
            onMouseEnter={() => {
              cancelServicesClose();
              setServicesOpen(true);
            }}
            onMouseLeave={scheduleServicesClose}
          >
            <button
              onMouseEnter={() => {
                cancelServicesClose();
                setServicesOpen(true);
              }}
              onClick={() => setServicesOpen(!servicesOpen)}
              aria-expanded={servicesOpen}
              className={`relative flex items-center gap-1 py-2 text-sm font-medium transition-colors hover:text-cyan-200 ${isServicesRoute ? 'text-cyan-100' : ''}`}
            >
              Services
              <motion.div animate={{ rotate: servicesOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="h-4 w-4" />
              </motion.div>
              {isServicesRoute && (
                {/* Removed gradient indicator for pure white background */}
              )}
            </button>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-0 mt-3 w-[min(72rem,calc(100vw-1.5rem))] max-w-[calc(100vw-1rem)] origin-top-right overflow-hidden rounded-2xl border border-transparent bg-gradient-brand shadow-2xl text-white"
                >
                  <div className="grid grid-cols-1 gap-0 divide-y divide-gray-100 xl:grid-cols-3 xl:divide-x xl:divide-y-0">
                    {serviceMenuColumns.map(column => (
                      <div key={column.title} className="p-6 xl:p-7">
                        <p className="mb-4 border-b border-cyan-200 pb-3 text-[1.75rem] font-bold leading-none tracking-tight text-white">
                          {column.title}
                        </p>
                        <ul className="space-y-1">
                          {column.items.map(item => (
                            <li key={item.label}>
                              <Link
                                href={item.href}
                                onClick={() => setServicesOpen(false)}
                                className="group flex items-center gap-3 rounded-lg px-3 py-2 text-lg text-white transition-colors hover:bg-cyan-600/20 hover:text-cyan-100"
                              >
                                <item.icon className={`h-4 w-4 shrink-0 ${item.iconClass}`} />
                                <span>{item.label}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between bg-gradient-to-r from-cyan-400/60 to-purple-400/60 px-6 py-4">
                    <p className="text-sm text-white/90">Browse all growth services</p>
                    <Link href="/services" onClick={() => setServicesOpen(false)}>
                      <Button size="sm" className="h-9 rounded-full border-0 bg-white/90 text-xs text-cyan-700 shadow-md hover:bg-cyan-100">
                        View Services
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/blogs" className="relative py-2 text-sm font-medium transition-colors hover:text-cyan-200">
            Blogs
            {location === '/blogs' && (
              {/* Removed gradient indicator for pure white background */}
            )}
          </Link>

          <Link href="/contact">
            <Button className="bg-white/90 text-cyan-700 border-0 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium px-6 rounded-full">
              Contact Us
            </Button>
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden flex items-center justify-center h-10 w-10 rounded-md text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`lg:hidden overflow-hidden border-b shadow-xl ${
              isHomeRoute
                ? 'bg-white/88 backdrop-blur-2xl'
                : 'bg-white'
            }`}
          >
            <div className="flex flex-col p-4 space-y-2">
              <Link href="/about" className={`text-base font-medium p-3 rounded-md ${location === '/about' ? 'text-primary bg-primary/10' : 'text-foreground'}`} onClick={() => setIsOpen(false)}>
                About Us
              </Link>

              <div>
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="w-full flex items-center justify-between text-base font-medium p-3 rounded-md text-foreground"
                >
                  Services
                  <ChevronDown className={`h-4 w-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileServicesOpen && (
                  <div className="pl-4 py-2 space-y-1">
                    {serviceMenuColumns.map(column => (
                      <div key={column.title} className="space-y-1">
                        <p className="mt-2 px-3 py-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">{column.title}</p>
                        {column.items.map(item => (
                          <Link key={item.label} href={item.href} className="flex items-center gap-2 p-2 text-sm text-muted-foreground hover:text-primary" onClick={() => setIsOpen(false)}>
                            <item.icon className={`h-3.5 w-3.5 ${item.iconClass}`} />
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/blogs" className={`text-base font-medium p-3 rounded-md ${location === '/blogs' ? 'text-primary bg-primary/10' : 'text-foreground'}`} onClick={() => setIsOpen(false)}>
                Blogs
              </Link>

              <Link href="/contact" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-primary text-white border-0 rounded-full">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
