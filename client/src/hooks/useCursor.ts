import { useEffect } from 'react';

export const useCursor = (ref: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const handleMouseEnter = () => {
      const cursor = document.querySelector('.cursor');
      if (cursor) cursor.classList.add('active');
    };
    
    const handleMouseLeave = () => {
      const cursor = document.querySelector('.cursor');
      if (cursor) cursor.classList.remove('active');
    };
    
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref]);
};
