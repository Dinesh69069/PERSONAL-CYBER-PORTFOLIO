import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const useAnimations = () => {
  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Performance optimization: Configure ScrollTrigger defaults
    ScrollTrigger.config({
      limitCallbacks: true,
      syncInterval: 150,
    });

    // Back to Top Button Animation with debouncing
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
      let scrollTimeout: NodeJS.Timeout;
      const handleScroll = () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          if (window.scrollY > 300) {
            backToTop.classList.remove('opacity-0', 'invisible');
            backToTop.classList.add('opacity-100', 'visible');
          } else {
            backToTop.classList.add('opacity-0', 'invisible');
            backToTop.classList.remove('opacity-100', 'visible');
          }
        }, 100);
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
    }
    
    // Animate sections on scroll with performance optimizations
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          force3D: true,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none',
            fastScrollEnd: true,
            preventOverlaps: true,
          },
        }
      );
    });

    // Animate skill bars with performance optimization
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
          force3D: true,
          scrollTrigger: {
            trigger: bar,
            start: 'top 90%',
            toggleActions: 'play none none none',
            fastScrollEnd: true,
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
