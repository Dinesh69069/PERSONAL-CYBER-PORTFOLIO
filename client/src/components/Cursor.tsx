import { useEffect, useState } from "react";

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const cursor = document.createElement("div");
    cursor.classList.add("cursor");
    document.body.appendChild(cursor);
    
    const cursorDot = document.createElement("div");
    cursorDot.classList.add("cursor-dot");
    document.body.appendChild(cursorDot);
    
    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Update cursor and dot position directly for smoother movement
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      cursorDot.style.left = `${e.clientX}px`;
      cursorDot.style.top = `${e.clientY}px`;
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
      
      document.body.removeChild(cursor);
      document.body.removeChild(cursorDot);
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
