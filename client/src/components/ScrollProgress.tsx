import React, { useState, useEffect } from 'react';

const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const calculateScrollProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      const totalScrollableDistance = documentHeight - windowHeight;
      const progress = (scrollTop / totalScrollableDistance) * 100;
      
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    // Calculate on mount
    calculateScrollProgress();

    // Add scroll listener with requestAnimationFrame for smoother updates
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          calculateScrollProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 w-full h-1 bg-transparent z-[9998]"
      role="progressbar"
      aria-valuenow={Math.round(scrollProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    >
      <div
        className="h-full bg-gradient-to-r from-accent via-[#FF3366] to-accent shadow-[0_0_10px_rgba(0,255,178,0.5)]"
        style={{ 
          width: `${scrollProgress}%`,
          transition: 'width 0.05s linear'
        }}
      />
    </div>
  );
};

export default ScrollProgress;
