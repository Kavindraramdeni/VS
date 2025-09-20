import { useEffect, useState } from 'react';

const backgrounds = [
  'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=2070&auto=format&fit=crop', // Hero
  'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070&auto=format&fit=crop', // About
  'https://images.unsplash.com/photo-1565728744382-61accd4aa148?q=80&w=2073&auto=format&fit=crop', // Services
  'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=2072&auto=format&fit=crop', // Projects
  'https://images.unsplash.com/photo-1600132806608-231446b2e7af?q=80&w=2069&auto=format&fit=crop'  // Contact
];

export default function ParallaxBackground() {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      const scrollPos = window.scrollY + window.innerHeight / 2;

      let found = false;

      sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          if (index !== currentBgIndex) setCurrentBgIndex(index);
          found = true;
        }
      });

      // If past last section, stay on the last background
      if (!found && sections.length > 0) setCurrentBgIndex(sections.length - 1);

      // Subtle parallax effect (max ~20px)
      setOffset(window.scrollY * 0.05);
    };

    const throttledScroll = () => requestAnimationFrame(handleScroll);
    window.addEventListener('scroll', throttledScroll);
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [currentBgIndex]);

  return (
    <div
      className="parallax-bg"
      style={{
        backgroundImage: `url('${backgrounds[currentBgIndex]}')`,
        transform: `translateY(${offset}px)`,
        transition: 'background-image 0.8s ease, transform 0.3s ease'
      }}
    />
  );
}
