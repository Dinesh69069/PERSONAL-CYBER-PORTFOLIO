import { useEffect, useState } from 'react';

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    const toggleVisibility = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (window.scrollY > 300) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }, 100);
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => {
      clearTimeout(scrollTimeout);
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      id="backToTop"
      onClick={scrollToTop}
      className={`fixed bottom-28 sm:bottom-32 right-6 sm:right-8 bg-accent text-[#1A1A1A] w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-neon z-50 transition-all duration-300 ${
        visible ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
      aria-label="Back to top"
    >
      <i className="fas fa-arrow-up text-sm sm:text-base"></i>
    </button>
  );
};

export default BackToTop;
