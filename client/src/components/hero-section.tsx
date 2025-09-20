import { motion } from 'framer-motion';
import { useScrollAnimations } from '@/hooks/use-scroll-animations';
import heroImg from '@/assets/hero.jpg';

export default function HeroSection() {
  const { ref, isVisible } = useScrollAnimations();

  return (
    <section className="min-h-screen flex items-center pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Hero Text Content */}
          <motion.div
            ref={ref as any}
            className="glassmorphic rounded-3xl p-8 lg:p-12"
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="text-accent font-bold text-sm tracking-wider uppercase mb-4"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Industrials • Commercials • Customs
            </motion.div>

            <motion.h1
              className="font-display font-black text-5xl lg:text-7xl xl:text-8xl 2xl:text-9xl text-foreground mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <span className="block text-accent animate-pulse-glow">VS SIGNAGE</span>
              <span className="block">ENTERPRISE</span>
              <span className="block text-2xl lg:text-4xl xl:text-5xl 2xl:text-6xl text-muted-foreground font-semibold mt-4">
                PRECISION LASER CUTTING
              </span>
            </motion.h1>

            <motion.p
              className="text-muted-foreground text-lg lg:text-xl mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              We specialize in premium LED signage solutions, precision laser cutting, and complete fabrication services with installation — delivering professional results with fast turnaround and complete quality control.
            </motion.p>

            {/* Feature Chips */}
            <motion.div
              className="flex flex-wrap gap-3 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              {['High-Precision Laser', 'Custom LED Signage', 'Sheet Metal Fabrication', 'Prototype & Production','Installation'].map((chip, idx) => (
                <motion.span
                  key={chip}
                  className="glassmorphic px-4 py-2 rounded-xl text-sm font-semibold text-muted-foreground"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, delay: 1.2 + idx * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {chip}
                </motion.span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 items-start"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <motion.a
                href="https://wa.me/919000376792"
                className="bg-accent text-accent-foreground px-8 py-4 rounded-xl font-bold text-lg glow-accent flex items-center gap-3 animate-pulse-glow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-whatsapp text-xl"></i>
                WhatsApp Quote
              </motion.a>

              <motion.div
                className="metal-surface px-6 py-4 rounded-xl"
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-accent font-bold text-sm">Quick Estimate</div>
                <div className="text-foreground text-sm">Send drawings → Quote within 24hrs</div>
              </motion.div>
            </motion.div>

            {/* Materials Info */}
            <motion.div
              className="mt-8 p-4 glassmorphic rounded-xl"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 1.6 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-accent font-semibold text-sm mb-2">Supported Materials:</div>
              <div className="text-muted-foreground text-sm">Stainless Steel • Mild Steel • Aluminum • Acrylic • Composite Panels</div>
            </motion.div>
          </motion.div>

          {/* Visual Preview */}
          <motion.div
            className="glassmorphic rounded-3xl p-6 h-96 lg:h-[500px]"
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="h-full rounded-2xl overflow-hidden relative"
              style={{ background: `linear-gradient(45deg, rgba(0,0,0,0.4), rgba(0,0,0,0.2)), url(${heroImg}) center/cover` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <motion.div
                className="absolute bottom-6 left-6 right-6"
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-accent font-bold text-2xl">10+</div>
                    <div className="text-foreground text-sm">Projects Completed</div>
                  </div>
                  <div className="text-right">
                    <div className="text-muted-foreground text-sm">ISO-level Finish</div>
                    <div className="text-muted-foreground text-sm">Powder Coat • Assembly</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
