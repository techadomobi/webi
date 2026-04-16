import { Link } from 'wouter';
import { Twitter, Linkedin, Instagram, Facebook, Youtube, ArrowRight } from 'lucide-react';
const brandLogo = '/logo.png';

export default function Footer() {
  return (
    <footer className="border-t bg-foreground text-background">
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-5 group">
              <img
                src={brandLogo}
                alt="WeeoMedia"
                className="h-16 w-auto object-contain md:h-20"
              />
            </Link>
            <p className="text-gray-400 mb-2 text-sm leading-relaxed font-semibold italic">Nest. Nurture. Ascend.</p>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed max-w-sm">
              A premium digital marketing agency helping ambitious brands dominate the internet through data-driven strategy and creative excellence.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Twitter, label: 'Twitter' },
                { icon: Linkedin, label: 'LinkedIn' },
                { icon: Instagram, label: 'Instagram' },
                { icon: Facebook, label: 'Facebook' },
                { icon: Youtube, label: 'YouTube' },
              ].map(({ icon: Icon, label }) => (
                <a key={label} href="#" aria-label={label} className="h-9 w-9 flex items-center justify-center rounded-full bg-white/10 text-gray-300 hover:bg-gradient-brand hover:text-white transition-all duration-300">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display font-bold text-white mb-5">Services</h3>
            <ul className="space-y-3">
              {[
                'Search Engine Optimization',
                'Social Media Marketing',
                'PPC & Paid Ads',
                'Web Development',
                'Content Marketing',
                'Affiliate Marketing',
                'Email Marketing',
                'Influencer Marketing',
              ].map(s => (
                <li key={s}>
                  <Link href="/services" className="text-gray-400 hover:text-white transition-colors text-sm">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="font-display font-bold text-white mb-5">Solutions</h3>
            <ul className="space-y-3">
              {[
                'Online Reputation Management',
                'Brand Strategy',
                'Lead Generation',
                'Customer Retention',
                'Digital Transformation',
                'Market Research',
                'CRM',
                'Mobile Marketing',
              ].map(s => (
                <li key={s}>
                  <Link href="/services" className="text-gray-400 hover:text-white transition-colors text-sm">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company + Newsletter */}
          <div>
            <h3 className="font-display font-bold text-white mb-5">Company</h3>
            <ul className="space-y-3 mb-8">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Our Team', href: '/about' },
                { label: 'Blogs', href: '/blogs' },
                { label: 'Careers', href: '/contact' },
                { label: 'Contact Us', href: '/contact' },
                { label: 'Privacy Policy', href: '/' },
                { label: 'Terms of Service', href: '/' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <div>
              <h4 className="font-display font-bold text-white text-sm mb-3">Stay Updated</h4>
              <p className="text-gray-400 text-xs mb-3">Weekly strategies in your inbox.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="h-10 w-full rounded-l-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button className="h-10 px-4 rounded-r-full bg-gradient-brand text-white flex items-center justify-center hover:opacity-90 transition-opacity shrink-0">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} WeeoMedia. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            <p className="text-sm text-gray-500">All systems operational</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
