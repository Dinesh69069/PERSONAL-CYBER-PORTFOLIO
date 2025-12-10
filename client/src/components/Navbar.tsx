import { useState, useEffect } from 'react';
import { Link } from 'wouter';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Prevent scrolling when mobile menu is open
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [mobileMenuOpen]);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { href: '#home', label: 'HOME' },
    { href: '#about', label: 'ABOUT' },
    { href: '#education', label: 'EDUCATION' },
    { href: '#projects', label: 'PROJECTS' },
    { href: '#achievements', label: 'CERTIFICATIONS' },
    { href: '#contact', label: 'CONTACT' },
  ];

  return (
    <>
      <nav 
        className={`glassmorphism fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-2 md:py-3 bg-opacity-95 shadow-lg' : 'py-3 md:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <a 
              href="#home" 
              className="text-xl sm:text-2xl font-bold flex items-center space-x-2 z-50 relative"
              aria-label="Home"
            >
              <picture>
                <source srcSet={import.meta.env.BASE_URL + "transformers-logo-new.webp"} type="image/webp" />
                <img 
                  src={import.meta.env.BASE_URL + "transformers-logo-new.png"} 
                  alt="Dinesh Logo" 
                  className="w-8 h-8 sm:w-9 sm:h-9 object-cover rounded-full"
                  width={36}
                  height={36}
                  loading="lazy"
                  decoding="async"
                />
              </picture>
              <span className="tracking-wider text-white">DINESH</span>
            </a>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-8 font-mono">
              {navLinks.map((link) => (
                <a 
                  key={link.href}
                  href={link.href} 
                  className="nav-link relative py-2 px-3 xl:px-0 group"
                  aria-label={link.label}
                >
                  <span className="text-sm xl:text-base opacity-70 group-hover:opacity-100 group-hover:text-accent transition-all duration-300">
                    {link.label}
                  </span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </div>
            
            {/* Hamburger Button - Touch-friendly 44x44px minimum */}
            <button 
              className="lg:hidden relative z-50 w-11 h-11 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 rounded-md transition-all"
              onClick={toggleMenu}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {/* Animated Hamburger Icon */}
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span 
                  className={`w-full h-0.5 bg-accent transform transition-all duration-300 ease-in-out ${
                    mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                  }`}
                />
                <span 
                  className={`w-full h-0.5 bg-accent transition-all duration-300 ease-in-out ${
                    mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span 
                  className={`w-full h-0.5 bg-accent transform transition-all duration-300 ease-in-out ${
                    mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu Overlay */}
      <div 
        id="mobile-menu"
        className={`lg:hidden fixed inset-0 z-40 transform transition-all duration-300 ease-in-out ${
          mobileMenuOpen 
            ? 'translate-x-0 opacity-100' 
            : 'translate-x-full opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/90 backdrop-blur-sm"
          onClick={closeMenu}
          aria-hidden="true"
        />
        
        {/* Menu Content */}
        <div 
          className={`absolute top-0 right-0 w-full sm:w-80 h-full bg-gradient-to-br from-[#1A1A1A] via-[#0F0F12] to-[#1A1A1A] border-l border-accent/20 shadow-2xl transform transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Menu Header with animated pattern */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-accent/10 to-transparent" />
          
          {/* Navigation Links */}
          <nav className="relative h-full flex flex-col justify-center px-8 sm:px-12 space-y-1">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                className={`group relative py-4 px-6 text-lg sm:text-xl font-mono text-white/80 hover:text-accent transition-all duration-300 rounded-lg hover:bg-accent/5 transform hover:translate-x-2 ${
                  mobileMenuOpen ? 'animate-slide-in' : ''
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={closeMenu}
              >
                <span className="relative z-10 flex items-center">
                  <span className="w-2 h-2 mr-4 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {link.label}
                </span>
                <div className="absolute inset-0 border-l-2 border-transparent group-hover:border-accent transition-all duration-300" />
              </a>
            ))}
            
            {/* Decorative Element */}
            <div className="absolute bottom-8 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
          </nav>
          
          {/* Cyber pattern decoration */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-accent/5 to-transparent pointer-events-none" />
        </div>
      </div>
    </>
  );
};

export default Navbar;
