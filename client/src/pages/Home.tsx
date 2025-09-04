import React from 'react';
import { useEffect, useRef } from 'react';
import { HackerRankIcon, WhatsappIcon, GithubIcon, LinkedInIcon } from '../components/SocialIcons';

const Home: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Defer all animations to improve FCP/LCP performance
    const deferAnimations = () => {
      let hasAnimated = false;
      
      // Animate title text only when it becomes visible
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated && titleRef.current) {
            hasAnimated = true;
            import('gsap').then(({ gsap }) => {
              const tl = gsap.timeline();
              tl.from(titleRef.current!.children, {
                opacity: 0,
                y: 30,
                stagger: 0.2,
                duration: 0.8,
                ease: "power3.out"
              });
            }).catch(() => {
              // Fallback: show content immediately if animation fails
              if (titleRef.current) {
                titleRef.current.style.opacity = '1';
              }
            });
          }
        });
      }, { threshold: 0.1 });

      if (titleRef.current) {
        observer.observe(titleRef.current);
      }
      
      // Defer photo and social animations by 100ms to prioritize content
      setTimeout(() => {
        // Animate photo container
        if (containerRef.current) {
          import('gsap').then(({ gsap }) => {
          gsap.from(containerRef.current, {
            opacity: 0,
            scale: 0.8,
            duration: 1,
            delay: 0.2,
            ease: "back.out(1.7)"
            });
          }).catch(() => {
            // Fallback: ensure content is visible
            if (containerRef.current) {
              containerRef.current.style.opacity = '1';
            }
          });
        }

        // Animate social icons
        if (socialRef.current) {
          import('gsap').then(({ gsap }) => {
          gsap.from(socialRef.current, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            delay: 0.4,
            ease: "power3.out"
            });
          }).catch(() => {
            // Fallback: ensure content is visible
            if (socialRef.current) {
              socialRef.current.style.opacity = '1';
            }
          });
        }
      }, 100);
    };

    // Use requestIdleCallback to defer animations until browser is idle
    if ('requestIdleCallback' in window) {
      requestIdleCallback(deferAnimations);
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(deferAnimations, 50);
    }
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative py-12 sm:py-16 md:py-20 overflow-hidden cyber-gradient-bg">
      <div className="absolute inset-0 grid-overlay"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0">
        
        {/* Text content - desktop: left side, mobile: column layout */}
        <div className="w-full md:w-3/5 mb-8 md:mb-12 text-center md:text-left">
          <p className="text-accent font-mono mb-3 tracking-widest animate-pulse text-xs sm:text-sm">INITIALIZING INTERFACE</p>
          <h1 ref={titleRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-4">
            <span className="block">I'm <span className="text-accent animate-glow">Dinesh Kumar Sahoo</span></span>
            <span className="block">Web Developer</span>
          </h1>
          <div className="line-animation mb-6 sm:mb-8 w-32 sm:w-40 md:w-60 mx-auto md:mx-0"></div>
          
          {/* Profile image - mobile only: appears after title */}
          <div className="md:hidden mb-6 flex justify-center">
            <div ref={mobileContainerRef} className="w-64 h-80 sm:w-80 sm:h-[26rem] flex items-center justify-center animate-float">
              <div className="w-full h-full flex items-center justify-center">
                <div className="rounded-2xl overflow-hidden">
                  {/* Cyberpunk profile photo with responsive images and WebP support */}
                  <picture>
                    <source 
                      srcSet={import.meta.env.BASE_URL + "converted_image.webp"} 
                      type="image/webp"
                    />
                    <img 
                      src={import.meta.env.BASE_URL + "cyber-profile-rect.jpg"}
                      alt="Dinesh Kumar Sahoo"
                      className="w-56 h-80 sm:w-64 sm:h-96 object-cover profile-sharp cyber-rect"
                      width={288}
                      height={448}
                      loading="eager"
                      decoding="sync"
                      style={{
                        imageRendering: 'crisp-edges',
                        transform: 'translateZ(0)',
                        backfaceVisibility: 'hidden'
                      }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).onerror = null;
                        (e.target as HTMLImageElement).src = import.meta.env.BASE_URL + "cyber-profile.jpg";
                      }}
                    />
                  </picture>
                </div>
              </div>
            </div>
          </div>
          
          {/* Description, buttons, and social icons - mobile order: 3 (after image) */}
          <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-8 sm:mb-10 mt-6 md:mt-0 max-w-lg mx-auto md:mx-0 px-2 sm:px-0">
            Computer Science student passionate about creating innovative web solutions with clean code and modern design principles.
          </p>
          
          <div className="flex flex-col sm:flex-row flex-wrap justify-center md:justify-start gap-3 sm:gap-4 mb-6">
            <a href="#contact" className="neo-button bg-accent text-[#1A1A1A] px-6 sm:px-8 py-3 rounded-sm font-mono font-bold tracking-wider hover:bg-opacity-90 shadow-neon transition-all duration-300 text-sm sm:text-base">
              CONTACT ME
            </a>
            <a href="#projects" className="neo-button border border-accent text-accent px-6 sm:px-8 py-3 rounded-sm font-mono tracking-wider hover:bg-accent hover:bg-opacity-10 transition-all duration-300 text-sm sm:text-base">
              VIEW WORK
            </a>
          </div>
          
          {/* Social icons - aligned under buttons */}
          <div ref={socialRef} className="flex gap-4 sm:gap-5 justify-center md:justify-start mt-4">
            <a 
              href="https://github.com/Dinesh69069" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center text-gray-300 hover:text-accent transition-colors"
              title="GitHub"
              aria-label="GitHub"
            >
              <GithubIcon className="w-6 h-6" />
              <span className="sr-only">GitHub</span>
            </a>
            
            <a 
              href="https://www.linkedin.com/in/dinesh-kumar-sahoo-183533330/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center text-gray-300 hover:text-accent transition-colors"
              title="LinkedIn"
              aria-label="LinkedIn"
            >
              <LinkedInIcon className="w-6 h-6" />
              <span className="sr-only">LinkedIn</span>
            </a>
            
            <a 
              href="https://www.hackerrank.com/profile/dineshkumarcs001" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center text-gray-300 hover:text-accent transition-colors"
              title="HackerRank"
              aria-label="HackerRank"
            >
              <HackerRankIcon className="w-6 h-6" />
              <span className="sr-only">HackerRank</span>
            </a>
            
            <a 
              href="https://wa.me/918144252742" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center text-gray-300 hover:text-accent transition-colors"
              title="WhatsApp"
              aria-label="WhatsApp"
            >
              <WhatsappIcon className="w-6 h-6" />
              <span className="sr-only">WhatsApp</span>
            </a>
          </div>
        </div>
        
        {/* Profile image - desktop only (hidden on mobile) */}
        <div className="hidden md:flex w-full md:w-2/5 justify-center md:justify-center mt-4 md:mt-0">
          <div ref={containerRef} className="relative w-64 h-80 sm:w-80 sm:h-[26rem] md:w-96 md:h-[32rem] flex items-center justify-center animate-float">
            <div className="w-full h-full flex items-center justify-center">
              <div className="rounded-2xl overflow-hidden">
                {/* Cyberpunk profile photo with responsive images and WebP support */}
                <picture>
                  <source 
                    srcSet={import.meta.env.BASE_URL + "cyber-profile-rect.webp"} 
                    type="image/webp"
                  />
                  <img 
                    src={import.meta.env.BASE_URL + "cyber-profile-rect.jpg"}
                    alt="Dinesh Kumar Sahoo"
                    className="w-56 h-80 sm:w-64 sm:h-96 md:w-72 md:h-[28rem] object-cover profile-sharp cyber-rect"
                    width={288}
                    height={448}
                    loading="eager"
                    decoding="sync"
                    style={{
                      imageRendering: 'crisp-edges',
                      transform: 'translateZ(0)',
                      backfaceVisibility: 'hidden'
                    }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).onerror = null;
                      (e.target as HTMLImageElement).src = import.meta.env.BASE_URL + "cyber-profile.jpg";
                    }}
                  />
                </picture>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 flex justify-center">
        <a href="#about" className="animate-bounce text-accent" aria-label="Scroll to About section">
          <i className="fa-solid fa-chevron-down text-2xl"></i>
          <span className="sr-only">Scroll to About section</span>
        </a>
      </div>
    </section>
  );
};

export default Home;
