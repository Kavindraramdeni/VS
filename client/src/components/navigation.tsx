import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 p-4"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className={`glassmorphic rounded-2xl px-6 py-4 transition-all duration-300 ${scrolled ? 'backdrop-blur-xl' : ''}`}>
            <div className="flex items-center justify-between">
              {/* Brand */}
              <motion.a 
                href="#" 
                className="flex items-center gap-4 group"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                data-testid="brand-logo"
              >
                <div className="metal-surface w-16 h-16 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <span className="text-accent font-display font-black text-xl">VS</span>
                </div>
                <div className="hidden md:block">
                  <h1 className="font-display font-bold text-lg text-foreground m-0">SV Signage Enterprise</h1>
                  <p className="text-muted-foreground text-xs m-0">LED Signage • Precision Cutting • Custom Fabrication</p>
                </div>
              </motion.a>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-2">
                {[
                  { href: "about", label: "About" },
                  { href: "services", label: "Services" },
                  { href: "projects", label: "Projects" },
                  { href: "contact", label: "Contact" }
                ].map((item) => (
                  <motion.button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className="px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all duration-300 relative overflow-hidden"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 4px 20px rgba(255,212,64,0.1)",
                      backgroundColor: "rgba(255,212,64,0.05)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + parseInt(item.href) * 0.1 }}
                    data-testid={`nav-${item.href}`}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/20 to-accent/0 -translate-x-full"
                      whileHover={{ translateX: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                    <span className="relative z-10">{item.label}</span>
                  </motion.button>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex items-center gap-3">
                <motion.button
                  onClick={() => scrollToSection('contact')}
                  className="bg-accent text-accent-foreground px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform duration-200 glow-accent hidden sm:flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  data-testid="nav-get-quote"
                >
                  <i className="fas fa-envelope"></i>
                  Get Quote
                </motion.button>
                <motion.a
                  href="https://wa.me/919000376792"
                  className="glassmorphic border-accent/20 text-accent px-4 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-200 flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  data-testid="nav-whatsapp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-whatsapp"></i>
                  <span className="hidden sm:inline">WhatsApp</span>
                </motion.a>
                
                {/* Mobile menu toggle */}
                <motion.button
                  className="lg:hidden glassmorphic p-3 rounded-xl text-muted-foreground"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  whileTap={{ scale: 0.95 }}
                  data-testid="mobile-menu-toggle"
                >
                  <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div 
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              className="glassmorphic h-full w-64 ml-auto p-6 pt-24"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, type: "spring", damping: 25 }}
            >
              <div className="flex flex-col gap-4">
                {[
                  { href: "about", label: "About" },
                  { href: "services", label: "Services" },
                  { href: "projects", label: "Projects" },
                  { href: "contact", label: "Contact" }
                ].map((item) => (
                  <motion.button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className="px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all duration-200 text-left"
                    whileHover={{ x: 8 }}
                    data-testid={`mobile-nav-${item.href}`}
                  >
                    {item.label}
                  </motion.button>
                ))}
                <motion.button
                  onClick={() => scrollToSection('contact')}
                  className="bg-accent text-accent-foreground px-6 py-3 rounded-xl font-bold mt-4 text-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  data-testid="mobile-nav-get-quote"
                >
                  Get Quote
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
