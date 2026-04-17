import React from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Search, Share2, Globe, PenTool, Users, TrendingUp, Megaphone, MessageSquare, Mail, Database, Shield, Target, Repeat, Cpu, BarChart2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
const brandLogo = '/logo.png';

const digitalMarketing = [
  { label: 'Search Engine Optimization', href: '/services/seo', icon: Search, desc: 'Rank higher, get found faster' },
  { label: 'Search Engine Marketing', href: '/services/sem', icon: TrendingUp, desc: 'Paid search that delivers ROI' },
  { label: 'Social Media Marketing', href: '/services/smm', icon: Share2, desc: 'Build and engage your audience' },
  { label: 'Web Development', href: '/services/web', icon: Globe, desc: 'Fast, converting websites' },
  { label: 'Content Marketing', href: '/services/content', icon: PenTool, desc: 'Stories that build authority' },
  { label: 'Affiliate Marketing', href: '/services/affiliate', icon: Users, desc: 'Scale through partnerships' },
];

const promotions = [
  { label: 'Mobile Marketing', href: '/services/mobile', icon: Megaphone, desc: 'Reach users on every device' },
  { label: 'Influencer Marketing', href: '/services/influencer', icon: Users, desc: 'Leverage authentic voices' },
  { label: 'SMS Marketing', href: '/services/sms', icon: MessageSquare, desc: 'Direct, high-open-rate channel' },
  { label: 'Email Marketing', href: '/services/email', icon: Mail, desc: 'Nurture leads at every stage' },
  { label: 'CRM', href: '/services/crm', icon: Database, desc: 'Manage and grow relationships' },
];

const solutions = [
  { label: 'Online Reputation Management', href: '/services/orm', icon: Shield, desc: 'Protect your brand image' },
  { label: 'Brand Strategy', href: '/services/brand', icon: Target, desc: 'Define your market position' },
  { label: 'Lead Generation', href: '/services/leads', icon: ArrowRight, desc: 'Fill your pipeline constantly' },
  { label: 'Customer Retention', href: '/services/retention', icon: Repeat, desc: 'Turn buyers into loyalists' },
  { label: 'Digital Transformation', href: '/services/transformation', icon: Cpu, desc: 'Modernize your business' },
  { label: 'Market Research & Insights', href: '/services/research', icon: BarChart2, desc: 'Data-driven decisions' },
];

export default function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);
  const [servicesOpen, setServicesOpen] = React.useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = React.useState(false);
  const servicesRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-background/90 backdrop-blur-xl supports-backdrop-filter:bg-background/70">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 group shrink-0 overflow-hidden">
          <img
            src={brandLogo}
            alt="WeeoMedia"
            className="block h-16 w-75 max-w-none object-cover object-center transition-transform duration-300 group-hover:scale-[1.02] md:h-20 md:w-90"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          <Link href="/about" className="relative py-2 text-sm font-medium transition-colors hover:text-primary">
            About Us
            {location === '/about' && (
              <motion.div layoutId="navbar-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-brand" transition={{ type: 'spring', stiffness: 300, damping: 30 }} />
            )}
          </Link>

          {/* Services Mega Menu */}
          <div ref={servicesRef} className="relative">
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className={`relative flex items-center gap-1 py-2 text-sm font-medium transition-colors hover:text-primary ${location === '/services' ? 'text-primary' : ''}`}
            >
              Services
              <motion.div animate={{ rotate: servicesOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="h-4 w-4" />
              </motion.div>
              {location === '/services' && (
                <motion.div layoutId="navbar-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-brand" transition={{ type: 'spring', stiffness: 300, damping: 30 }} />
              )}
            </button>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-205 rounded-2xl bg-white shadow-2xl border border-gray-100 overflow-hidden"
                  style={{ left: '-200px', transform: 'none' }}
                >
                  <div className="grid grid-cols-3 gap-0 divide-x divide-gray-100">
                    {/* Digital Marketing */}
                    <div className="p-6">
                      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 px-2">Digital Marketing</p>
                      <ul className="space-y-1">
                        {digitalMarketing.map((item) => (
                          <li key={item.label}>
                            <Link
                              href={item.href}
                              onClick={() => setServicesOpen(false)}
                              className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-primary/5 group transition-colors"
                            >
                              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                                <item.icon className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-foreground leading-tight">{item.label}</p>
                                <p className="text-xs text-muted-foreground">{item.desc}</p>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* Promotions */}
                    <div className="p-6">
                      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 px-2">Promotions</p>
                      <ul className="space-y-1">
                        {promotions.map((item) => (
                          <li key={item.label}>
                            <Link
                              href={item.href}
                              onClick={() => setServicesOpen(false)}
                              className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-primary/5 group transition-colors"
                            >
                              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                                <item.icon className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-foreground leading-tight">{item.label}</p>
                                <p className="text-xs text-muted-foreground">{item.desc}</p>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* Solutions */}
                    <div className="p-6">
                      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 px-2">Solutions</p>
                      <ul className="space-y-1">
                        {solutions.map((item) => (
                          <li key={item.label}>
                            <Link
                              href={item.href}
                              onClick={() => setServicesOpen(false)}
                              className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-primary/5 group transition-colors"
                            >
                              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                                <item.icon className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-foreground leading-tight">{item.label}</p>
                                <p className="text-xs text-muted-foreground">{item.desc}</p>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="bg-secondary/30 px-6 py-4 flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Not sure what you need?</p>
                    <Link href="/contact" onClick={() => setServicesOpen(false)}>
                      <Button size="sm" className="bg-gradient-brand text-white border-0 rounded-full text-xs h-8 px-4">
                        Get Free Consultation
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/blogs" className="relative py-2 text-sm font-medium transition-colors hover:text-primary">
            Blogs
            {location === '/blogs' && (
              <motion.div layoutId="navbar-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-brand" transition={{ type: 'spring', stiffness: 300, damping: 30 }} />
            )}
          </Link>

          <Link href="/contact">
            <Button className="bg-gradient-brand text-white border-0 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium px-6 rounded-full">
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
            className="lg:hidden border-b bg-background shadow-xl overflow-hidden"
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
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground px-3 py-1">Digital Marketing</p>
                    {digitalMarketing.map(item => (
                      <Link key={item.label} href={item.href} className="block text-sm text-muted-foreground p-2 hover:text-primary" onClick={() => setIsOpen(false)}>
                        {item.label}
                      </Link>
                    ))}
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground px-3 py-1 mt-2">Promotions</p>
                    {promotions.map(item => (
                      <Link key={item.label} href={item.href} className="block text-sm text-muted-foreground p-2 hover:text-primary" onClick={() => setIsOpen(false)}>
                        {item.label}
                      </Link>
                    ))}
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground px-3 py-1 mt-2">Solutions</p>
                    {solutions.map(item => (
                      <Link key={item.label} href={item.href} className="block text-sm text-muted-foreground p-2 hover:text-primary" onClick={() => setIsOpen(false)}>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/blogs" className={`text-base font-medium p-3 rounded-md ${location === '/blogs' ? 'text-primary bg-primary/10' : 'text-foreground'}`} onClick={() => setIsOpen(false)}>
                Blogs
              </Link>

              <Link href="/contact" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-gradient-brand text-white border-0 rounded-full">
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
