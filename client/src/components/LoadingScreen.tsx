import React, { useEffect, useState, useRef, Dispatch, SetStateAction } from 'react';

interface LoadingScreenProps {
  setIsLoading?: Dispatch<SetStateAction<boolean>>;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ setIsLoading }) => {
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("INITIALIZING SYSTEMS");
  const [progress, setProgress] = useState(0);
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [hasAnimated, setHasAnimated] = useState(false); // Prevent multiple animations
  const terminalRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Prevent multiple animations
    if (hasAnimated) return;
    setHasAnimated(true);
    
    // Text sequence for cyberpunk boot sequence
    const textSequence = [
      "INITIALIZING SYSTEMS",
      "SCANNING NEURAL NETWORK",
      "ACTIVATING QUANTUM PROCESSORS",
      "ESTABLISHING SECURE CONNECTION",
      "UNLOCKING ENCRYPTED DATA CHANNELS",
      "OPTIMIZING CYBERSPACE INTERFACE",
      "PORTFOLIO SYSTEMS ONLINE"
    ];
    
    // Boot log lines
    const bootLogSequence = [
      "KERNEL LOADED >> cybershell.v4.1",
      "INITIALIZING OPTICS MODULE >> res=3840x2160",
      "LOADING MEMORY BANKS >> 128 TiB OK",
      "NEURAL PROCESSING UNIT >> ONLINE",
      "QUANTUM CO-PROCESSOR >> ONLINE",
      "TACTICAL ANALYSIS MODULE >> READY",
      "BIOMETRIC SCANNING >> ENABLED",
      "VOICE RECOGNITION >> CALIBRATED",
      "COMBAT SYSTEMS >> STANDBY",
      "AUTONOMY PROTOCOLS >> AUTHORIZED",
      "DEFENSE SYSTEMS >> ACTIVE",
      "SECURE COMMUNICATIONS >> ENCRYPTED",
      "PRIMARY DIRECTIVE >> PROTECT DINESH",
      "SECONDARY DIRECTIVE >> PORTFOLIO PRESENTATION",
      "TERTIARY DIRECTIVE >> IMPRESS VIEWERS",
      "ALL SYSTEMS >> NOMINAL"
    ];
    
    // Create cyberpunk-style loading sequence with GSAP
    let mainTl: any;
    
    // Initial glitch/boot effect
    import('gsap').then(({ gsap }) => {
      // Optimize GSAP for performance - reduce forced reflows
      gsap.config({ 
        force3D: true,
        nullTargetWarn: false
      });
      
      mainTl = gsap.timeline();
      mainTl.to('.loading-screen', {
        opacity: 0.5,
        duration: 0.05,
        repeat: 8,
        yoyo: true,
        force3D: true
      });
      
      // Add boot log lines
      const addBootLine = (index: number) => {
        if (index < bootLogSequence.length) {
          setBootLines(prev => [...prev, bootLogSequence[index]]);
          // Auto-scroll terminal
          if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
          }
        }
      };
      
      // Animate the robotic parts with cooler entrances
      mainTl.fromTo('.robot-head', 
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "elastic.out(1.2, 0.5)", force3D: true }
      );
      
      mainTl.fromTo('.robot-part', 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: "power2.out", force3D: true },
        "-=0.5"
      );
      
      // Show HUD corner elements early - right after robot parts (at ~1.5s)
      mainTl.fromTo('.hud-element',
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, stagger: 0.15, duration: 0.6, force3D: true },
        1.5
      );
      
      // Synchronize boot lines with progress bar
      // Calculate timing so boot lines appear proportionally with progress
      const totalBootLines = bootLogSequence.length;
      const progressSteps = textSequence.length;
      const linesPerStep = totalBootLines / progressSteps;
      
      // Animate the progress bar and text changes with synchronized boot lines
      textSequence.forEach((text, index) => {
        const timing = 2 + index * 1.5;
        
        // Update text and progress in sequence
        mainTl.call(() => {
          setLoadingText(text);
          // Gradual progress that reaches 100% on the last step
          const progressValue = index === textSequence.length - 1 ? 100 : Math.floor((index + 1) / textSequence.length * 85);
          setProgress(progressValue);
          
          // Add boot lines proportionally to progress
          const linesToShow = Math.floor((index + 1) * linesPerStep);
          for (let i = Math.floor(index * linesPerStep); i < linesToShow && i < totalBootLines; i++) {
            setTimeout(() => addBootLine(i), (i - Math.floor(index * linesPerStep)) * 100);
          }
        }, [], timing);
        
        // Add scanning line effect
        if (index < textSequence.length - 1) {
          mainTl.fromTo('.scan-line',
            { top: '0%', opacity: 0.7 },
            { top: '100%', opacity: 0, duration: 1.2, ease: "power1.inOut", force3D: true },
            timing + 0.2
          );
        }
      });
      
      // Final progress animation to 100% with last boot line
      mainTl.call(() => {
        setLoadingText("SYSTEMS FULLY OPERATIONAL");
        setProgress(100);
        // Show the final boot line at 100% completion
        if (bootLines.length < totalBootLines) {
          addBootLine(totalBootLines - 1);
        }
      }, [], 2 + (textSequence.length - 1) * 1.5 + 1);
      
      // Hold at 100% for a moment before transitioning
      mainTl.call(() => {
        setLoadingText("LAUNCHING PORTFOLIO...");
      }, [], 2 + (textSequence.length - 1) * 1.5 + 2.5);
      
      // Eye scanning effects - adjusted timing
      mainTl.to('.robot-eye-inner', {
        boxShadow: '0 0 25px 8px #00FFB2',
        background: 'rgba(0, 255, 178, 0.9)',
        repeat: 4,
        yoyo: true,
        duration: 0.4
      }, 4);
      
      // Mouth analyzer animation - adjusted timing
      mainTl.to('.mouth-bar', {
        height: (i: number) => (Math.random() * 12) + 2 + 'px',
        stagger: { each: 0.05, repeat: 12, yoyo: true },
        duration: 0.2,
      }, 4);
      
      // Final reveal animation with proper timing
      const finalTransitionTime = 2 + (textSequence.length - 1) * 1.5 + 4; // After all content is loaded
      mainTl.to('.loading-screen', {
        opacity: 0,
        duration: 1.0,
        delay: 1.5,
        force3D: true,
        onComplete: () => {
          // Ensure this only runs once
          if (loading) {
            setLoading(false);
            if (setIsLoading) {
              setIsLoading(false);
            }
          }
        }
      }, finalTransitionTime);
    }).catch((error) => {
      console.error('Animation failed:', error);
      // Fallback: hide loading screen immediately
      setLoading(false);
      if (setIsLoading) {
        setIsLoading(false);
      }
    });
    
    return () => {
      if (mainTl) {
        mainTl.kill();
      }
    };
  }, []); // Empty dependency array to run only once
  
  if (!loading) return null;
  
  return (
    <div className="loading-screen fixed inset-0 bg-[#0F0F12] z-[9999] flex flex-col items-center justify-center overflow-hidden">
      {/* Matrix-like grid background */}
      <div className="absolute inset-0 grid-overlay opacity-20"></div>
      
      {/* HUD elements */}
      <div className="hud-element absolute top-6 left-6 text-xs text-accent font-mono border border-accent py-1 px-3 rounded-sm">
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse mr-2"></div>
          <span>QUANTUM CORE: ACTIVE</span>
        </div>
      </div>
      
      <div className="hud-element absolute top-6 right-6 text-xs text-[#FF3366] font-mono border border-[#FF3366] py-1 px-3 rounded-sm">
        <div className="flex items-center">
          <span>DEFENSE PROTOCOL DELTA</span>
          <div className="w-2 h-2 rounded-full bg-[#FF3366] animate-ping ml-2"></div>
        </div>
      </div>
      
      <div className="hud-element absolute bottom-6 left-6 text-xs text-accent font-mono">
        <div className="flex flex-col">
          <div className="flex items-center mb-1">
            <div className="w-2 h-2 rounded-full bg-accent mr-2"></div>
            <span>SYSTEM: T-800 CYBERDYNE</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-[#FF3366] mr-2"></div>
            <span>DINESH.OS v4.21.2025</span>
          </div>
        </div>
      </div>
      
      <div className="hud-element absolute bottom-6 right-6 text-xs text-[#FF3366] font-mono">
        <div className="flex flex-col items-end">
          <div className="flex items-center mb-1">
            <span>LOCATION: SECURED</span>
            <div className="w-2 h-2 rounded-full bg-[#FF3366] ml-2"></div>
          </div>
          <div className="flex items-center">
            <span>LAT: 20.2961° N LON: 85.8245° E</span>
            <div className="w-2 h-2 rounded-full bg-accent ml-2"></div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl gap-12 md:gap-16 lg:gap-20 px-4 z-10">
        {/* Transformers Logo - replacing robot head */}
        <div className="logo-container relative w-96 h-96 sm:w-[26rem] sm:h-[26rem] md:w-[30rem] md:h-[30rem] lg:w-[34rem] lg:h-[34rem] flex items-center justify-center">
          <div className="relative">
            {/* Glowing background effect */}
            <div className="absolute inset-0 bg-accent/10 rounded-lg blur-xl animate-pulse"></div>
            <div className="absolute inset-0 bg-[#FF3366]/10 rounded-lg blur-lg animate-pulse" style={{animationDelay: '0.5s'}}></div>
            
            {/* Logo container with glassmorphism effect */}
            <div className="relative glassmorphism p-10 md:p-14 lg:p-16 rounded-2xl border border-accent/30 shadow-[0_0_30px_rgba(0,255,178,0.3)]">
              <picture>
                <source srcSet={import.meta.env.BASE_URL + "transformers-logo-new.webp"} type="image/webp" />
                <img 
                  src={import.meta.env.BASE_URL + "transformers-logo-new.png"} 
                  alt="Transformers Logo" 
                  className="w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-72 lg:h-72 object-contain drop-shadow-[0_0_20px_rgba(0,255,178,0.5)] animate-float rounded-[10px]"
                  width="324"
                  height="324"
                  fetchPriority="high"
                  loading="eager"
                  decoding="async"
                  style={{
                    filter: 'drop-shadow(0 0 10px rgba(0,255,178,0.8)) drop-shadow(0 0 20px rgba(0,255,178,0.4))'
                  }}
                />
              </picture>
              
              {/* Scanning lines effect */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl">
                <div className="scan-line absolute left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50"></div>
                <div className="absolute top-0 left-0 w-full h-full border border-accent/20 rounded-2xl animate-pulse"></div>
              </div>
              
              {/* Corner decorations */}
              <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-accent"></div>
              <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-accent"></div>
              <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-[#FF3366]"></div>
              <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-[#FF3366]"></div>
            </div>
            
            {/* Rotating rings around logo */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-full h-full absolute opacity-20">
                <div className="absolute top-1/2 left-1/2 w-80 h-80 sm:w-96 sm:h-96 md:w-[28rem] md:h-[28rem] border border-accent/30 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-spin-slow"></div>
                <div className="absolute top-1/2 left-1/2 w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 border border-[#FF3366]/30 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-spin" style={{animationDirection: 'reverse'}}></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Terminal and status display - reduced size */}
        <div className="flex flex-col w-96 md:w-[28rem] lg:w-[32rem]">
          {/* Loading text and progress */}
          <div className="text-center relative z-10 glassmorphism py-4 px-6 md:px-8 rounded-md mb-6 border border-accent/20">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 font-mono tracking-wider">
              <span className="text-accent">{loadingText}</span>
              <span className="animate-pulse ml-1">_</span>
            </h1>
            
            <div className="w-full mb-3 relative">
              <div className="w-full h-2 md:h-3 bg-[#2D2D2D] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-accent to-[#FF3366]" 
                  style={{ width: `${progress}%`, transition: 'width 0.5s ease-out' }}
                ></div>
                
                {/* Progress segments */}
                {[...Array(20)].map((_, i) => (
                  <div 
                    key={i} 
                    className="absolute top-0 bottom-0 w-px bg-[#1A1A1A]" 
                    style={{ left: `${i * 5}%` }}
                  ></div>
                ))}
              </div>
              <div className="text-[#FF3366] text-xs font-mono text-right mt-1">
                {progress}% COMPLETE
              </div>
            </div>
            
            <div className="font-mono text-sm text-gray-400 flex justify-between items-center">
              <div>STATUS: <span className="text-accent">ONLINE</span></div>
              <div className="text-[#FF3366] animate-pulse">[AUTONOMOUS MODE]</div>
            </div>
          </div>
          
          {/* Boot log terminal */}
          <div 
            ref={terminalRef}
            className="robot-part glassmorphism bg-[#0A0A0A]/90 border border-accent/30 rounded-md p-4 md:p-5 h-52 md:h-60 lg:h-64 overflow-y-auto text-xs md:text-sm font-mono relative"
          >
            {/* Terminal header */}
            <div className="absolute top-0 left-0 right-0 h-6 bg-[#1A1A1A] flex items-center px-2">
              <div className="w-2 h-2 rounded-full bg-[#FF3366] mr-1"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500 mr-1"></div>
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              <span className="text-xs ml-2 text-gray-400">cyberdyne_os.exe</span>
            </div>
            
            <div className="mt-6 space-y-1">
              {bootLines.map((line, index) => (
                <div key={index} className="flex">
                  <span className="text-accent mr-2">[{(0x8000 + index * 0x10).toString(16).toUpperCase()}]</span>
                  <span className="text-gray-300">{line}</span>
                </div>
              ))}
              <div className="text-gray-300 animate-pulse">_</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Rotating circular elements */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="w-[90vw] max-w-[500px] h-[90vw] max-h-[500px] rounded-full border border-accent opacity-10 animate-spin-slow"></div>
        <div className="w-[75vw] max-w-[400px] h-[75vw] max-h-[400px] rounded-full border border-[#FF3366] opacity-10 animate-spin" style={{animationDirection: 'reverse'}}></div>
        <div className="w-[60vw] max-w-[300px] h-[60vw] max-h-[300px] rounded-full border border-accent opacity-5 animate-spin-slow" style={{animationDuration: '15s'}}></div>
      </div>
    </div>
  );
};

export default LoadingScreen;