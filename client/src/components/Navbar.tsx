import { useState, useEffect } from 'react';
import { Link } from 'wouter';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Toggle body scroll when menu is open
    document.body.style.overflow = mobileMenuOpen ? 'auto' : 'hidden';
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <nav className={`glassmorphism fixed w-full z-50 py-3 px-6 md:px-12 transition-all duration-300 ${scrolled ? 'bg-opacity-90' : ''}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a href="#home" className="text-2xl font-bold flex items-center space-x-2">
          <span className="text-accent animate-pulse">∆</span>
          <span className="tracking-wider">DINESH</span>
        </a>
        
        <div className="hidden md:flex space-x-8 font-mono">
          <a href="#home" className="nav-link relative py-2 group">
            <span className="opacity-70 group-hover:opacity-100 group-hover:text-accent transition-all duration-300">HOME</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#about" className="nav-link relative py-2 group">
            <span className="opacity-70 group-hover:opacity-100 group-hover:text-accent transition-all duration-300">ABOUT</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#education" className="nav-link relative py-2 group">
            <span className="opacity-70 group-hover:opacity-100 group-hover:text-accent transition-all duration-300">EDUCATION</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#projects" className="nav-link relative py-2 group">
            <span className="opacity-70 group-hover:opacity-100 group-hover:text-accent transition-all duration-300">PROJECTS</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#achievements" className="nav-link relative py-2 group">
            <span className="opacity-70 group-hover:opacity-100 group-hover:text-accent transition-all duration-300">CERTIFICATIONS</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#contact" className="nav-link relative py-2 group">
            <span className="opacity-70 group-hover:opacity-100 group-hover:text-accent transition-all duration-300">CONTACT</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
          </a>
        </div>
        
        <button 
          className="md:hidden text-2xl focus:outline-none" 
          onClick={toggleMenu} 
          aria-label="Toggle menu"
        >
          <i className="fa-solid fa-bars text-accent"></i>
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden fixed inset-0 bg-[#1A1A1A] bg-opacity-95 z-50 flex-col items-center justify-center ${mobileMenuOpen ? 'flex' : 'hidden'}`}>
        <div className="absolute top-6 right-6">
          <button className="text-2xl focus:outline-none" onClick={closeMenu} aria-label="Close menu">
            <i className="fa-solid fa-xmark text-accent"></i>
          </button>
        </div>
        <div className="flex flex-col items-center space-y-8 py-20 font-mono text-xl">
          <a href="#home" className="hover:text-accent transition-colors duration-300" onClick={closeMenu}>HOME</a>
          <a href="#about" className="hover:text-accent transition-colors duration-300" onClick={closeMenu}>ABOUT</a>
          <a href="#education" className="hover:text-accent transition-colors duration-300" onClick={closeMenu}>EDUCATION</a>
          <a href="#projects" className="hover:text-accent transition-colors duration-300" onClick={closeMenu}>PROJECTS</a>
          <a href="#achievements" className="hover:text-accent transition-colors duration-300" onClick={closeMenu}>CERTIFICATIONS</a>
          <a href="#contact" className="hover:text-accent transition-colors duration-300" onClick={closeMenu}>CONTACT</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
