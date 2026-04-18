'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import emailjs from '@emailjs/browser';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { SiWhatsapp } from 'react-icons/si';
import { Send, Loader2 } from 'lucide-react';
import { DotBackground } from '@/components/ui/grid-background';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactSection() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true);
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? 'service_portfolio',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? 'template_contact',
        {
          from_name: data.name,
          from_email: data.email,
          message: data.message,
          to_email: 'rizqisarasajati1109@gmail.com',
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? ''
      );
      toast.success("Message sent! I'll get back to you soon.");
      reset();
    } catch {
      toast.error('Failed to send message. Please try WhatsApp instead.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DotBackground>
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Let&apos;s <span className="text-gradient">Collaborate</span> on Your Next
              Big Project or Event.
            </h2>
            <p className="text-muted-foreground">I&apos;m just a message away.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left panel */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Availability */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <div className="absolute inset-0 w-3 h-3 rounded-full bg-emerald-500 animate-ping opacity-75" />
                </div>
                <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                  Available Now
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  Open for Collaboration
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Currently open for freelance projects, speaking engagements, and
                  training sessions. Whether it&apos;s a product challenge, a technical
                  project, or an event — let&apos;s make something great together.
                </p>
              </div>

              {/* Quick Connect */}
              <a
                href="https://wa.me/6285882266490"
                target="_blank"
                rel="noopener noreferrer"
                id="contact-whatsapp"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold text-sm hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5"
              >
                <SiWhatsapp className="w-4 h-4" />
                Quick Connect via WhatsApp
              </a>

              {/* Info cards */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Response Time', value: '< 24 hours' },
                  { label: 'Timezone', value: 'WIB (UTC+7)' },
                  { label: 'Languages', value: 'EN / ID' },
                  { label: 'Location', value: 'Indonesia' },
                ].map((info) => (
                  <div
                    key={info.label}
                    className="bg-card border border-border rounded-xl p-4"
                  >
                    <p className="text-xs text-muted-foreground">{info.label}</p>
                    <p className="text-sm font-semibold text-foreground">{info.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right panel — Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
                <h3 className="text-xl font-bold text-foreground mb-6">
                  Send a Message
                </h3>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-5"
                  id="contact-form"
                >
                  {/* Name */}
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-foreground mb-1.5">
                      Your Name
                    </label>
                    <Input
                      id="contact-name"
                      placeholder="Rizqi Sarasajati"
                      {...register('name')}
                      className={errors.name ? 'border-destructive' : ''}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-foreground mb-1.5">
                      Email Address
                    </label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="hello@example.com"
                      {...register('email')}
                      className={errors.email ? 'border-destructive' : ''}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-medium text-foreground mb-1.5">
                      Message
                    </label>
                    <Textarea
                      id="contact-message"
                      placeholder="Tell me about your project or event..."
                      rows={5}
                      {...register('message')}
                      className={errors.message ? 'border-destructive' : ''}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    id="contact-submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white hover:from-indigo-600 hover:to-cyan-600 border-none shadow-lg shadow-indigo-500/25"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </DotBackground>
  );
}
