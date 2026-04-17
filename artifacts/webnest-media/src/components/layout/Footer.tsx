import { Link } from 'wouter';
import { Twitter, Linkedin, Instagram, Facebook, MessageCircle, PhoneCall } from 'lucide-react';
const brandLogo = '/logo_white.png';

export default function Footer() {
  const serviceColumns = [
    {
      title: 'Digital Marketing',
      links: [
        'Search Engine Marketing',
        'Search Engine Optimization',
        'SEO Company in Gurgaon',
        'SEO Company in Delhi-NCR',
        'SEO Company in Mumbai',
        'Social Media Marketing',
        'Content Marketing',
        'Affiliate Marketing',
      ],
    },
    {
      title: 'Branding',
      links: ['Brochure Designing', 'Logo Designing', 'Packaging Designing'],
    },
    {
      title: 'Software Development',
      links: [
        'Web Development',
        'Website Design & Development Company in Gurgaon',
        'Website Design & Development Company in Delhi (NCR)',
        'Custom CRM',
        'Mobile App',
        'CMS Dashboard',
      ],
    },
    {
      title: 'Solutions',
      links: [
        'Brand Strategy',
        'Lead Generation',
        'Customer Retention',
        'Digital Transformation',
        'Market Research & Insights',
        'Online Reputation Marketing',
      ],
    },
    {
      title: 'Promotions',
      links: ['Email Marketing', 'Mobile Marketing', 'Influencer Marketing', 'SMS Marketing'],
    },
  ];

  return (
    <>
      <footer className="relative overflow-hidden border-t border-primary/30 bg-[#f3f2ff] text-foreground">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_0%,rgba(79,70,229,0.2),transparent_34%),radial-gradient(circle_at_92%_18%,rgba(236,72,153,0.18),transparent_38%)]" />

        <div className="relative mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-16">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            <div className="space-y-6">
              <Link href="/" className="inline-flex items-center">
                <img src={brandLogo} alt="WebNest Media" className="h-14 w-auto object-contain" />
              </Link>
              <p className="text-[18px] font-semibold text-foreground">Connect on Social Media</p>
              <div className="flex items-center gap-4 text-muted-foreground">
                {[
                  { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/share/18KaT7U8mu/' },
                  { icon: Twitter, label: 'X', href: 'https://x.com/weeomedia' },
                  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/company/weeomedia/' },
                  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/weeomedia/' },
                ].map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="transition-colors duration-200 hover:text-primary"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-3xl font-semibold leading-none text-foreground">Our Address</h3>
              <p className="max-w-xs text-base leading-7 text-muted-foreground">
                1st Floor Orchid Business Park Near Subhash Chowk, Sector 48, Gurugram, Haryana 122004
              </p>
            </div>

            <div className="flex items-end">
              <p className="max-w-xs text-base leading-7 text-muted-foreground">
                Office No :- 12A, 1st Floor Kataria Market, Sector 37 C, Gurgaon - 122001
              </p>
            </div>

            <div className="rounded-md border border-primary/25 bg-white/70 p-4 shadow-sm">
              <p className="text-xs font-semibold tracking-[0.25em] text-muted-foreground">UDYAM REGISTRATION</p>
              <p className="mt-2 text-3xl font-extrabold tracking-tight text-foreground">MSME</p>
              <p className="mt-1 text-xs font-medium text-muted-foreground">Ministry of MSME, Govt. of India</p>
              <p className="mt-4 text-sm text-foreground/80">GST No:- 06DKNPK2512K2Z1</p>
            </div>

            <div>
              <h3 className="mb-3 text-3xl font-semibold leading-none text-foreground">Contact US</h3>
              <a href="mailto:info@webnestmedia.in" className="block text-lg text-primary hover:text-foreground">
                info@webnestmedia.in
              </a>
              <a href="tel:+919696964606" className="mt-1 block text-lg text-primary hover:text-foreground">
                +91-9696964606
              </a>
              <Link href="/" className="mt-6 inline-block text-base text-muted-foreground hover:text-primary">
                Privacy Policy
              </Link>
            </div>
          </div>

          <div className="my-10 border-t border-dashed border-primary/35" />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {serviceColumns.map((column) => (
              <div key={column.title}>
                <h4 className="mb-4 text-2xl font-semibold leading-[1.05] text-primary md:text-3xl">{column.title}</h4>
                <ul className="space-y-3 text-foreground/80">
                  {column.links.map((label) => (
                    <li key={label}>
                      <Link
                        href="/services"
                        className="text-base leading-tight transition-colors duration-200 hover:text-primary md:text-[17px]"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 border-t border-primary/25 pt-6 text-sm text-muted-foreground">
            © {new Date().getFullYear()} WebNest Media. All rights reserved.
          </div>
        </div>
      </footer>

      <div className="fixed bottom-5 right-4 z-50 flex flex-col gap-3">
        <a
          href="https://wa.me/919696964606"
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          className="flex h-13 w-13 items-center justify-center rounded-full bg-primary text-white shadow-[0_10px_20px_rgba(124,58,237,0.35)] transition-transform duration-200 hover:scale-105"
        >
          <MessageCircle className="h-6 w-6" />
        </a>
        <a
          href="tel:+919696964606"
          aria-label="Call now"
          className="flex h-13 w-13 items-center justify-center rounded-full bg-[#ec4899] text-white shadow-[0_10px_20px_rgba(236,72,153,0.35)] transition-transform duration-200 hover:scale-105"
        >
          <PhoneCall className="h-6 w-6" />
        </a>
      </div>
    </>
  );
}
