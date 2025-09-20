import { motion } from 'framer-motion';
import { useScrollAnimations } from '@/hooks/use-scroll-animations';
import { useState } from 'react';

export default function ProjectsSection() {
  const { ref, isVisible } = useScrollAnimations();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const projects = [
    {
      src: '/images/projects/project_1.jpg',
      alt: 'Custom stainless steel architectural metalwork with intricate patterns'
    },
    {
      src: '/images/projects/project_2.jpg',
      alt: 'Illuminated business signage with LED lighting at night'
    },
    {
      src: '/images/projects/project_3.jpg',
      alt: 'Precision-cut metal components with complex geometric patterns'
    },
    {
      src: '/images/projects/project_4.jpg',
      alt: 'Industrial fabricated metal structure with powder coating finish'
    },
    {
      src: '/images/projects/project_5.jpg',
      alt: 'Modern LED channel letter signage installation'
    },
    {
      src: '/images/projects/project_6.jpg',
      alt: 'Precision-welded stainless steel industrial equipment'
    },
    {
      src: '/images/projects/project_7.jpg',
      alt: 'Custom metal architectural feature with geometric design'
    },
    {
      src: '/images/projects/project_8.jpg',
      alt: 'Industrial CNC machined aluminum components'
    }
  ];

  return (
    <section id="projects" className="py-20" ref={ref}>
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display font-bold text-3xl lg:text-5xl text-foreground mb-6">Recent Projects</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">Showcasing our precision and craftsmanship across various industrial applications</p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="glassmorphic rounded-2xl overflow-hidden cursor-pointer group relative"
              initial={{ opacity: 0, y: 40, rotateY: -15 }}
              animate={isVisible ? { opacity: 1, y: 0, rotateY: 0 } : { opacity: 0, y: 40, rotateY: -15 }}
              transition={{ 
                duration: 0.8,
                delay: index * 0.1,
                type: "spring",
                stiffness: 80
              }}
              whileHover={{ 
                scale: 1.08,
                y: -15,
                rotateY: 5,
                boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
                transition: { duration: 0.4, type: "spring", stiffness: 200 }
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedImage(project.src)}
              data-testid={`project-image-${index}`}
            >
              <div 
                className="h-64 bg-cover bg-center relative overflow-hidden"
                style={{ backgroundImage: `url('${project.src}')` }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
                  initial={{ opacity: 0.3 }}
                  whileHover={{ opacity: 0.1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div 
                  className="absolute inset-0 bg-accent/10"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                />
                <motion.div 
                  className="absolute top-4 right-4 glassmorphic w-12 h-12 rounded-full flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  whileHover={{ 
                    opacity: 1, 
                    scale: 1, 
                    rotate: 0,
                    boxShadow: "0 10px 30px rgba(255,212,64,0.3)"
                  }}
                  transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
                >
                  <i className="fas fa-expand text-accent"></i>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
