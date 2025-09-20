import { motion } from 'framer-motion';
import { useScrollAnimations } from '@/hooks/use-scroll-animations';

export default function ServicesSection() {
  const { ref, isVisible } = useScrollAnimations();

  const services = [
    {
      icon: 'fas fa-cube',
      title: '3D Signage Lighting',
      description: 'Premium 3D illuminated signage with advanced lighting systems, dimensional letters, and architectural lighting solutions.',
      image: '/images/services/service_1.jpg',
      spec1: '3D Design',
      spec2: 'LED Lighting'
    },
    {
      icon: 'fas fa-cut',
      title: 'Laser Cutting',
      description: 'High-precision fiber & CO₂ laser cutting for steel, aluminum and non-metal materials up to 40mm thickness.',
      image: '/images/services/service_2.jpg',
      spec1: '±0.1mm Tolerance',
      spec2: 'Up to 40mm'
    },
    {
      icon: 'fas fa-lightbulb',
      title: 'LED Signage',
      description: 'Custom illuminated letters, channel letters, sign boxes, and architectural signage with energy-efficient LED modules.',
      image: '/images/services/service_3.jpg',
      spec1: 'Energy Efficient',
      spec2: 'Custom Design'
    },
    {
      icon: 'fas fa-hammer',
      title: 'Fabrication Works',
      description: 'Complete sheet metal fabrication including bending, welding, assembly and powder coating services.',
      image: '/images/services/service_4.jpg',
      spec1: 'TIG/MIG Welding',
      spec2: 'Powder Coating'
    },
    {
      icon: 'fas fa-cogs',
      title: 'Machine Works',
      description: 'Precision machining, CNC operations, drilling, tapping and custom mechanical components.',
      image: '/images/services/service_5.jpg',
      spec1: 'CNC Precision',
      spec2: 'Custom Parts'
    },
    {
      icon: 'fas fa-screwdriver-wrench',
      title: 'Assembly Services',
      description: 'Complete product assembly, installation support and on-site mounting for signage and fabricated products.',
      image: '/images/services/service_6.jpg',
      spec1: 'Full Assembly',
      spec2: 'Installation'
    },
    {
      icon: 'fas fa-certificate',
      title: 'Quality Control',
      description: 'ISO-standard quality control processes with precision measurement and comprehensive testing protocols.',
      image: '/images/services/service_7.jpg',
      spec1: 'ISO Standards',
      spec2: 'Full Inspection'
    }
  ];

  return (
    <section id="services" className="py-20" ref={ref}>
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display font-bold text-3xl lg:text-5xl text-foreground mb-6">Our Services</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">Comprehensive fabrication solutions from concept to completion</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="glassmorphic rounded-2xl p-8 hover:-translate-y-2 transition-all duration-300 group"
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                y: -12,
                rotateY: 5,
                boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
                scale: 1.02
              }}
              data-testid={`service-${service.title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className="flex items-start gap-4 mb-6">
                <motion.div 
                  className="metal-surface w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ 
                    rotate: 360,
                    scale: 1.1,
                    boxShadow: "0 0 20px rgba(255,212,64,0.4)"
                  }}
                  transition={{ duration: 0.6, type: "spring" }}
                >
                  <i className={`${service.icon} text-accent text-xl`}></i>
                </motion.div>
                <div>
                  <h3 className="font-display font-bold text-xl text-foreground mb-2">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>
              </div>
              
              <div 
                className="h-48 rounded-xl overflow-hidden mb-4 bg-cover bg-center"
                style={{ backgroundImage: `url('${service.image}')` }}
              />
              
              <div className="flex justify-between text-sm">
                <span className="text-accent font-semibold">{service.spec1}</span>
                <span className="text-muted-foreground">{service.spec2}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
