import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, CheckCircle2, CalendarDays, Clock3, ShieldCheck } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PageTransition from '@/components/layout/PageTransition';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  company: z.string().optional(),
  service: z.string({ required_error: "Please select a service." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

const processSteps = [
  {
    title: 'Discovery Call',
    description: 'A 30-minute call to understand your goals, current bottlenecks, and growth targets.',
    icon: CalendarDays,
  },
  {
    title: 'Growth Blueprint',
    description: 'We send a tailored strategy with channels, deliverables, KPIs, and timeline.',
    icon: CheckCircle2,
  },
  {
    title: 'Execution Sprint',
    description: 'Our team launches and optimizes campaigns while sharing weekly progress.',
    icon: Clock3,
  },
];

const faqs = [
  {
    q: 'How soon can we start?',
    a: 'Most projects start within 5-7 business days after onboarding and scope approval.',
  },
  {
    q: 'Do you work with early-stage brands?',
    a: 'Yes. We work with both growth-stage and established companies, with plans matched to budget and goals.',
  },
  {
    q: 'How do you report results?',
    a: 'You get transparent weekly updates and monthly performance reports tied to business KPIs.',
  },
  {
    q: 'Is there a long-term contract?',
    a: 'No lock-in required. We focus on retention through performance, not restrictive terms.',
  },
];

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log(values);
      setIsSubmitting(false);
      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
      });
      form.reset();
    }, 1500);
  }

  return (
    <PageTransition>
      <section className="relative overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-32 bg-secondary/30 text-foreground">
        <img src="/decor/contact-grid.svg" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.7),rgba(255,255,255,0.62),rgba(243,248,243,0.9))]" />
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative z-10"
            >
              <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
                Let's build something <span className="text-gradient">epic</span>.
              </h1>
              <p className="text-xl text-muted-foreground mb-12">
                Whether you need a complete digital overhaul or a targeted campaign, our team is ready to accelerate your growth.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-white/10 text-primary flex items-center justify-center shrink-0">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold mb-1">Email Us</h3>
                    <p className="text-muted-foreground">support@weeomedia.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-white/10 text-primary flex items-center justify-center shrink-0">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold mb-1">Headquarters</h3>
                    <p className="text-muted-foreground">5th Floor, DLF Two Horizon Centre, DLF Phase 5, Gurugram, 122002</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-white/10 text-primary flex items-center justify-center shrink-0">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold mb-1">Call Us</h3>
                    <p className="text-muted-foreground">+91 63666666760</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative z-10 bg-white p-8 md:p-10 rounded-4xl shadow-xl border border-gray-100"
            >
              <div className="absolute inset-0 bg-gradient-brand opacity-[0.03] rounded-4xl pointer-events-none" />
              
              <h3 className="font-display text-2xl font-bold mb-8">Send us a message</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" className="h-12 bg-secondary/50" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" className="h-12 bg-secondary/50" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Acme Corp" className="h-12 bg-secondary/50" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Service Interested In</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12 bg-secondary/50">
                                <SelectValue placeholder="Select a service" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="seo">SEO & Search Strategy</SelectItem>
                              <SelectItem value="social">Social Media Marketing</SelectItem>
                              <SelectItem value="ppc">PPC & Paid Ads</SelectItem>
                              <SelectItem value="web">Web Design & Dev</SelectItem>
                              <SelectItem value="content">Content Marketing</SelectItem>
                              <SelectItem value="full">Full Service Agency</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your project goals..." 
                            className="min-h-30 resize-none bg-secondary/50"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full h-14 bg-gradient-brand text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-lg rounded-xl group"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </motion.div>
            
          </div>
        </div>
      </section>

      <section className="pb-20 lg:pb-28 pt-2 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-6 mb-16">
            {processSteps.map((step, idx) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm"
              >
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <step.icon className="h-6 w-6" />
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Step {idx + 1}</p>
                <h3 className="font-display text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-foreground text-white p-8 md:p-12 mb-16"
          >
            <div className="grid md:grid-cols-2 gap-10 items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Why Partner With Us</p>
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-5 leading-tight">
                  A team that treats your growth
                  <span className="text-gradient block">like its own mission.</span>
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  From strategy to execution, every decision is guided by measurable impact. We balance performance marketing, creative direction, and technical precision to help you scale sustainably.
                </p>
              </div>
              <div className="space-y-4">
                {[
                  'Weekly strategy sync with actionable next steps',
                  'Senior specialists across SEO, paid ads, and web',
                  'Clear KPI tracking tied to leads and revenue',
                  'Transparent communication and rapid turnaround',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl bg-white/5 border border-white/10 p-4">
                    <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-200">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <div>
            <div className="text-center mb-10">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">FAQ</p>
              <h3 className="font-display text-3xl md:text-4xl font-bold">Common Questions</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {faqs.map((faq, idx) => (
                <motion.div
                  key={faq.q}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.45 }}
                  className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm"
                >
                  <h4 className="font-display text-lg font-bold mb-2">{faq.q}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}