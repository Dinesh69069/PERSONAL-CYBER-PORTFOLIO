import React from 'react';
import SectionDivider from './SectionDivider';

interface SectionHeaderProps {
  title: string;
  highlightedWord?: string;
  description?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  highlightedWord, 
  description 
}) => {
  // Split the title to highlight the specified word
  const titleParts = highlightedWord 
    ? title.split(highlightedWord) 
    : [title];
  
  return (
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold mb-3">
        {titleParts[0]}
        {highlightedWord && <span className="text-accent">{highlightedWord}</span>}
        {titleParts[1]}
      </h2>
      <SectionDivider />
      {description && (
        <p className="text-gray-400 max-w-2xl mx-auto mt-4">{description}</p>
      )}
    </div>
  );
};

export default SectionHeader;
