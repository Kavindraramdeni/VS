import { motion } from 'framer-motion';
import { useScrollAnimations } from '@/hooks/use-scroll-animations';

export default function AboutSection() {
  const { ref, isVisible } = useScrollAnimations();

  const stats = [
    { value: "2+", label: "Years Experience" },
    { value: "25+", label: "Projects Delivered" },
    { value: "24hr", label: "Quote Turnaround" },
    { value: "ISO", label: "Quality Standards" }
  ];

  return (
    <section id="about" className="py-20" ref={ref}>
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display font-bold text-3xl lg:text-5xl text-foreground mb-6">About VS Signage</h2>
          <p className="text-muted-foreground text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed">
            VS Signage Enterprise is a specialized signage and fabrication company focusing on premium LED signage solutions, precision laser cutting, and custom fabrication services & installation. From individual signage projects to large commercial installations — we deliver professional-grade design, cutting, assembly and finishing to meet the highest industry standards.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="glassmorphic rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.8 }}
              transition={{ 
                duration: 0.8,
                delay: 0.2 + index * 0.15,
                type: "spring",
                stiffness: 100,
                damping: 10
              }}
              whileHover={{ 
                scale: 1.08,
                y: -10,
                boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
                backgroundColor: "rgba(255,212,64,0.02)",
                rotate: [0, 2, -2, 0]
              }}
              whileTap={{ scale: 0.95 }}
              data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className="text-accent font-display font-bold text-3xl mb-2">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
