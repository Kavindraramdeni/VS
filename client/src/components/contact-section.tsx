import { motion } from 'framer-motion';
import { useScrollAnimations } from '@/hooks/use-scroll-animations';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { insertQuoteSchema } from '@shared/schema';
import type { InsertQuote } from '@shared/schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

export default function ContactSection() {
  const { ref, isVisible } = useScrollAnimations();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<InsertQuote>({
    resolver: zodResolver(insertQuoteSchema.extend({
      name: insertQuoteSchema.shape.name.min(2, 'Name must be at least 2 characters'),
      email: insertQuoteSchema.shape.email.email('Invalid email address'),
      phone: insertQuoteSchema.shape.phone.min(10, 'Phone number must be at least 10 digits'),
      message: insertQuoteSchema.shape.message.min(10, 'Please provide more details about your project')
    })),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      service: '',
      message: ''
    }
  });

  const submitQuoteMutation = useMutation({
    mutationFn: async (data: InsertQuote) => {
      return await apiRequest('POST', '/api/quotes', data);
    },
    onSuccess: () => {
      toast({
        title: "Quote Request Sent!",
        description: "We'll get back to you within 24 hours with a detailed quote.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['/api/quotes'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send quote request. Please try again.",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsSubmitting(false);
    }
  });

  const onSubmit = async (data: InsertQuote) => {
    setIsSubmitting(true);
    submitQuoteMutation.mutate(data);
  };

  const businessHours = [
    { day: 'Monday - Friday', hours: '9:00 AM - 7:00 PM' },
    { day: 'Saturday', hours: '9:00 AM - 5:00 PM' },
    { day: 'Sunday', hours: 'Emergency Only' }
  ];

  const contactInfo = [
    {
      icon: 'fas fa-phone',
      title: 'Phone',
      value: '+91 9000376792',
      href: 'tel:+919000376792'
    },
    {
      icon: 'fas fa-envelope',
      title: 'Email',
      value: 'Srikrishna609@gmail.com',
      href: 'mailto:Srikrishna609@gmail.com'
    },
    {
      icon: 'fab fa-whatsapp',
      title: 'WhatsApp',
      value: 'Quick quotes & support',
      href: 'https://wa.me/919000376792'
    }
  ];

  return (
    <section id="contact" className="py-20" ref={ref}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Contact Strip */}
        <motion.div 
          className="glassmorphic rounded-3xl p-8 mb-16"
          style={{ background: 'linear-gradient(90deg, rgba(255,212,64,0.08), rgba(255,212,64,0.03))' }}
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <motion.div 
                className="bg-accent text-accent-foreground px-6 py-3 rounded-xl font-bold text-lg animate-pulse-glow"
                whileHover={{ scale: 1.05 }}
                data-testid="contact-phone-display"
              >
                <i className="fas fa-phone mr-2"></i>
                +91 9000376792
              </motion.div>
              <div>
                <div className="text-foreground font-semibold">Ready to start your project?</div>
                <div className="text-muted-foreground text-sm">Get instant quote via WhatsApp or email</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <motion.a
                href="https://wa.me/919000376792"
                className="glassmorphic border-accent/30 text-accent px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-200 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-testid="contact-whatsapp-strip"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-whatsapp"></i>
                WhatsApp
              </motion.a>
              <motion.a
                href="mailto:Srikrishna609@gmail.com"
                className="glassmorphic border-accent/30 text-accent px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-200 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-testid="contact-email-strip"
              >
                <i className="fas fa-envelope"></i>
                Email
              </motion.a>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div 
            className="glassmorphic rounded-3xl p-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="font-display font-bold text-2xl text-foreground mb-6">Request a Quote</h3>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-muted-foreground mb-2">Name *</label>
                  <input
                    {...form.register('name')}
                    type="text"
                    className="w-full glassmorphic border-border rounded-xl px-4 py-3 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                    placeholder="Your full name"
                    data-testid="input-name"
                  />
                  {form.formState.errors.name && (
                    <p className="text-destructive text-sm mt-1">{form.formState.errors.name.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-muted-foreground mb-2">Phone *</label>
                  <input
                    {...form.register('phone')}
                    type="tel"
                    className="w-full glassmorphic border-border rounded-xl px-4 py-3 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                    placeholder="Your phone number"
                    data-testid="input-phone"
                  />
                  {form.formState.errors.phone && (
                    <p className="text-destructive text-sm mt-1">{form.formState.errors.phone.message}</p>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-muted-foreground mb-2">Email *</label>
                <input
                  {...form.register('email')}
                  type="email"
                  className="w-full glassmorphic border-border rounded-xl px-4 py-3 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                  placeholder="your.email@example.com"
                  data-testid="input-email"
                />
                {form.formState.errors.email && (
                  <p className="text-destructive text-sm mt-1">{form.formState.errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-muted-foreground mb-2">Service Required</label>
                <select
                  {...form.register('service')}
                  className="w-full glassmorphic border-border rounded-xl px-4 py-3 text-foreground focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                  data-testid="select-service"
                >
                  <option value="">Select a service</option>
                  <option value="laser-cutting">Laser Cutting</option>
                  <option value="led-signage">LED Signage</option>
                  <option value="fabrication">Fabrication Works</option>
                  <option value="machine-works">Machine Works</option>
                  <option value="assembly">Assembly Services</option>
                  <option value="other">Other / Custom</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-muted-foreground mb-2">Project Details *</label>
                <textarea
                  {...form.register('message')}
                  rows={4}
                  className="w-full glassmorphic border-border rounded-xl px-4 py-3 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Describe your project requirements, materials, dimensions, quantity, etc."
                  data-testid="textarea-message"
                />
                {form.formState.errors.message && (
                  <p className="text-destructive text-sm mt-1">{form.formState.errors.message.message}</p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent text-accent-foreground py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform duration-200 glow-accent disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                data-testid="button-submit-quote"
              >
                <i className={`fas ${isSubmitting ? 'fa-spinner fa-spin' : 'fa-paper-plane'} mr-2`}></i>
                {isSubmitting ? 'Sending...' : 'Send Quote Request'}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <motion.div 
              className="glassmorphic rounded-3xl p-8"
              initial={{ opacity: 0, x: 50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="font-display font-bold text-2xl text-foreground mb-6">Get in Touch</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  >
                    <div className="metal-surface w-12 h-12 rounded-lg flex items-center justify-center">
                      <i className={`${info.icon} text-accent`}></i>
                    </div>
                    <div>
                      <div className="text-foreground font-semibold">{info.title}</div>
                      <a 
                        href={info.href}
                        className="text-muted-foreground hover:text-accent transition-colors duration-200"
                        data-testid={`contact-${info.title.toLowerCase()}`}
                        {...(info.href.startsWith('https://') ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {info.value}
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Business Hours */}
            <motion.div 
              className="glassmorphic rounded-3xl p-8"
              initial={{ opacity: 0, x: 50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="font-display font-bold text-xl text-foreground mb-4">Business Hours</h3>
              <div className="space-y-3">
                {businessHours.map((schedule, index) => (
                  <motion.div
                    key={schedule.day}
                    className="flex justify-between"
                    initial={{ opacity: 0 }}
                    animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  >
                    <span className="text-muted-foreground">{schedule.day}</span>
                    <span className="text-foreground font-semibold">{schedule.hours}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Response Promise */}
            <motion.div 
              className="metal-surface rounded-3xl p-8"
              initial={{ opacity: 0, x: 50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-center">
                <motion.i 
                  className="fas fa-clock text-accent text-3xl mb-4"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <h3 className="font-display font-bold text-xl text-foreground mb-2">24-Hour Quote Promise</h3>
                <p className="text-muted-foreground text-sm">Send us your drawings and specifications, get a detailed quote within 24 hours guaranteed.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
