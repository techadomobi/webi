import { Link } from 'wouter';
import { AlertCircle, ArrowRight } from 'lucide-react';
import PageTransition from '@/components/layout/PageTransition';
import GlowButton from '@/components/ui/GlowButton';

export default function NotFound() {
  return (
    <PageTransition>
      <section className="relative min-h-[70vh] overflow-hidden bg-[#060b17] pt-32 pb-20 text-white">
        <img src="/decor/blog-orbit.svg" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="mx-auto max-w-3xl rounded-4xl border border-white/10 bg-white/5 p-8 md:p-12 backdrop-blur-md">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 text-primary">
              <AlertCircle className="h-8 w-8" />
            </div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.26em] text-primary">Error 404</p>
            <h1 className="font-display text-4xl md:text-6xl font-extrabold mb-4">Page Not Found</h1>
            <p className="mx-auto max-w-xl text-white/75 mb-8">
              The page you are looking for may have been moved, deleted, or never existed. Let's get you back on track.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/">
                <GlowButton variant="primary" size="lg">
                  Back to Home <ArrowRight className="h-5 w-5" />
                </GlowButton>
              </Link>
              <Link href="/contact">
                <GlowButton variant="outline" size="lg" className="border-white/35 text-white hover:border-white">
                  Contact Support
                </GlowButton>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
