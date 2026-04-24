import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import { Suspense, lazy, useEffect, useRef } from "react";
import { useLocation } from "wouter";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/home";
const Services = lazy(() => import("@/pages/services"));
const ServiceDetail = lazy(() => import("@/pages/service-detail"));
const BlogDetail = lazy(() => import("@/pages/blog-detail"));
const About = lazy(() => import("@/pages/about"));
const Contact = lazy(() => import("@/pages/contact"));
const Blogs = lazy(() => import("@/pages/blogs"));
const NotFound = lazy(() => import("@/pages/not-found"));

const queryClient = new QueryClient();

function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const pendingRef = useRef({ x: -400, y: -400 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      pendingRef.current = { x: e.clientX, y: e.clientY };

      if (rafRef.current !== null) {
        return;
      }

      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        if (!glowRef.current) return;

        const { x, y } = pendingRef.current;
        glowRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    };

    window.addEventListener("mousemove", move, { passive: true });

    return () => {
      window.removeEventListener("mousemove", move);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="cursor-glow"
      style={{ transform: "translate3d(-400px, -400px, 0)" }}
    />
  );
}

function RouteFallback() {
  return <div className="min-h-[35vh]" aria-hidden="true" />;
}

function Router() {
  return (
    <AnimatePresence mode="wait">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/services/:slug" component={ServiceDetail} />
        <Route path="/services/:slug/" component={ServiceDetail} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/blogs" component={Blogs} />
        <Route path="/blog/:slug" component={BlogDetail} />
        <Route path="/blogs/:slug" component={BlogDetail} />
        <Route path="/blogs/:slug/" component={BlogDetail} />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  const [location] = useLocation();
  const isHomeRoute = location === '/';

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <CursorGlow />
          <div className={`flex min-h-screen flex-col font-sans text-foreground selection:bg-primary/20 relative overflow-x-hidden ${isHomeRoute ? 'hero-surface-match' : 'bg-background'}`}>
            <Navbar />
            <main className={isHomeRoute ? 'flex-1' : 'page-atmosphere flex-1'}>
              <Suspense fallback={<RouteFallback />}>
                <Router />
              </Suspense>
            </main>
            <Footer />
          </div>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
