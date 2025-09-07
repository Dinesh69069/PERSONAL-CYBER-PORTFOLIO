import React from 'react';
import './AnimatedBorder.css';

interface AnimatedBorderProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedBorder: React.FC<AnimatedBorderProps> = ({ children, className = "" }) => {
  return (
    <div className={`animated-border-container ${className}`}>
      {children}
    </div>
  );
};

export default AnimatedBorder;
