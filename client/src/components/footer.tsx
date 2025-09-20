import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const services = [
    'Laser Cutting',
    'LED Signage',
    'Fabrication Works',
    'Machine Works',
    'Assembly Services'
  ];

  const quickActions = [
    { href: '#contact', label: 'Request Quote' },
    { href: 'https://wa.me/919000376792', label: 'WhatsApp Support', external: true },
    { href: '#projects', label: 'View Projects' },
    { href: '#about', label: 'About Us' }
  ];

  const socialLinks = [
    { href: 'https://wa.me/919000376792', icon: 'fab fa-whatsapp', label: 'WhatsApp' },
    { href: 'mailto:Srikrishna609@gmail.com', icon: 'fas fa-envelope', label: 'Email' },
    { href: 'tel:+919000376792', icon: 'fas fa-phone', label: 'Phone' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="py-12 border-t border-border/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <motion.div 
            className="md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="metal-surface w-12 h-12 rounded-lg flex items-center justify-center">
                <span className="text-accent font-display font-black text-sm">VS</span>
              </div>
              <div>
                <h3 className="font-display font-bold text-foreground">VS Signage Enterprise</h3>
                <p className="text-muted-foreground text-sm">Premium Signage Solutions</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm mb-4 max-w-md">
              Delivering premium LED signage solutions, precision laser cutting, and complete fabrication services with professional quality standards and fast turnaround times.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="glassmorphic w-10 h-10 rounded-lg flex items-center justify-center text-accent hover:scale-110 transition-transform duration-200"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  data-testid={`footer-social-${social.label.toLowerCase()}`}
                  {...(social.href.startsWith('https://') || social.href.startsWith('mailto:') ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  aria-label={social.label}
                >
                  <i className={social.icon}></i>
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          {/* Services Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-display font-bold text-foreground mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              {services.map((service, index) => (
                <motion.li
                  key={service}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <button
                    onClick={() => scrollToSection('services')}
                    className="text-muted-foreground hover:text-accent transition-colors duration-200"
                    data-testid={`footer-service-${service.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {service}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* Quick Actions Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="font-display font-bold text-foreground mb-4">Quick Actions</h4>
            <ul className="space-y-2 text-sm">
              {quickActions.map((action, index) => (
                <motion.li
                  key={action.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                  viewport={{ once: true }}
                >
                  {action.external ? (
                    <a
                      href={action.href}
                      className="text-muted-foreground hover:text-accent transition-colors duration-200"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={`footer-action-${action.label.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {action.label}
                    </a>
                  ) : (
                    <button
                      onClick={() => scrollToSection(action.href.substring(1))}
                      className="text-muted-foreground hover:text-accent transition-colors duration-200"
                      data-testid={`footer-action-${action.label.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {action.label}
                    </button>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
        
        <motion.div 
          className="border-t border-border/30 pt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground text-sm">
            © {currentYear} VS Signage Enterprise. All rights reserved. | 
            <span className="text-accent"> Precision • Quality • Reliability</span>
          </p>
     <div className="flex flex-col md:flex-row items-center justify-center gap-6 bg-black px-6 py-5 rounded-3xl shadow-[0_0_30px_rgba(255,255,0,0.3)]">
  <a
    href="https://your-portfolio-url.com"
    target="_blank"
    rel="noopener noreferrer"
    className="font-bold text-2xl text-yellow-400 text-center md:text-left tracking-wide transition-all duration-300 hover:text-yellow-300 hover:drop-shadow-[0_0_20px_rgba(255,255,0,0.9)]"
  >
    Looking for a Web Designer?
  </a>

  <motion.a
    href="mailto:webdesigner@example.com"
    className="bg-black border-2 border-yellow-400 text-yellow-400 px-7 py-3 rounded-2xl font-semibold hover:bg-yellow-400 hover:text-black hover:shadow-[0_0_25px_rgba(255,255,0,0.8)] transition-all duration-300 flex items-center gap-3 animate-neonPulse"
    whileHover={{ scale: 1.07 }}
    whileTap={{ scale: 0.95 }}
    target="_blank"
    rel="noopener noreferrer"
  >
    <i className="fas fa-user-tie"></i>
    Contact Me
  </motion.a>
</div>

        </motion.div>
      </div>
    </footer>
  );
}
