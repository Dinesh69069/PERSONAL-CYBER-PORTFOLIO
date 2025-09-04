import { useEffect, useState } from 'react';

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
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
