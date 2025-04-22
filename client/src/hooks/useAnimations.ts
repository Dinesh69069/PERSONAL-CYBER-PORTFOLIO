import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const useAnimations = () => {
  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Back to Top Button Animation
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
          backToTop.classList.remove('opacity-0', 'invisible');
          backToTop.classList.add('opacity-100', 'visible');
        } else {
          backToTop.classList.add('opacity-0', 'invisible');
          backToTop.classList.remove('opacity-100', 'visible');
        }
      });
    }
    
    // Animate sections on scroll
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // Animate skill bars
    const skillBars = document.querySelectorAll('.progress-fill');
    skillBars.forEach((bar) => {
      const width = bar.getAttribute('data-width') || '0%';
      
      gsap.fromTo(
        bar,
        { width: '0%' },
        {
          width: width,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: bar,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
    
    // Clean up all scroll triggers on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
};
