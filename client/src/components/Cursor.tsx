import { useEffect, useState } from "react";

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Detect if device is mobile/tablet or has touch capability
    const isMobileOrTouch = () => {
      return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        window.matchMedia("(pointer: coarse)").matches
      );
    };

    // Only enable custom cursor on desktop devices
    if (isMobileOrTouch()) {
      // Keep default cursor for mobile devices
      document.body.style.cursor = "auto";
      return;
    }

    const cursor = document.createElement("div");
    cursor.classList.add("cursor");
    document.body.appendChild(cursor);
    
    const cursorDot = document.createElement("div");
    cursorDot.classList.add("cursor-dot");
    document.body.appendChild(cursorDot);
    
    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Use requestAnimationFrame for smoother cursor movement
      requestAnimationFrame(() => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;
      });
    };
    
    const handleMouseEnter = () => setIsActive(true);
    const handleMouseLeave = () => setIsActive(false);
    
    document.addEventListener("mousemove", updateCursorPosition);
    
    // Add event listeners for all clickable elements
    const clickableElements = document.querySelectorAll("a, button, input, textarea, select, .clickable");
    
    clickableElements.forEach(element => {
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);
    });
    
    return () => {
      document.removeEventListener("mousemove", updateCursorPosition);
      
      clickableElements.forEach(element => {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });
      
      if (document.body.contains(cursor)) {
        document.body.removeChild(cursor);
      }
      if (document.body.contains(cursorDot)) {
        document.body.removeChild(cursorDot);
      }
    };
  }, []);
  
  useEffect(() => {
    const cursor = document.querySelector(".cursor");
    if (cursor && isActive) {
      cursor.classList.add("active");
    } else if (cursor) {
      cursor.classList.remove("active");
    }
  }, [isActive]);

  return null; // Component doesn't render anything visible directly
};

export default Cursor;
