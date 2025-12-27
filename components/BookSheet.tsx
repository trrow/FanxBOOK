import React from 'react';
import { motion } from 'framer-motion';
import { MagazinePageProps } from '../types';
import PageContentRenderer from './PageContentRenderer';

// We use CSS 3D transforms for the page flip
// The pivot is on the left edge.
const BookSheet: React.FC<MagazinePageProps> = ({ 
  pageIndex, 
  frontContent, 
  backContent, 
  flipped, 
  zIndex,
  onFlip 
}) => {
  
  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-full origin-left cursor-pointer"
      style={{ 
        zIndex,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      animate={{ 
        rotateY: flipped ? -180 : 0,
      }}
      transition={{ 
        duration: 1.2, 
        ease: [0.645, 0.045, 0.355, 1.000], // Cubic bezier for smooth paper feel
      }}
      onClick={onFlip}
    >
      {/* Front Face */}
      <div 
        className="absolute inset-0 w-full h-full backface-hidden"
        style={{ backfaceVisibility: 'hidden' }}
      >
        <div className="w-full h-full relative bg-white shadow-[-2px_0_10px_rgba(0,0,0,0.1)] rounded-r-sm overflow-hidden border-l border-stone-200">
          <PageContentRenderer content={frontContent} isActive={!flipped} />
          {/* Shadow gradient for depth near spine */}
          <div className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-stone-400/20 to-transparent pointer-events-none mix-blend-multiply" />
        </div>
      </div>

      {/* Back Face */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{ 
          backfaceVisibility: 'hidden', 
          transform: 'rotateY(180deg)' 
        }}
      >
        <div className="w-full h-full relative bg-white shadow-[2px_0_10px_rgba(0,0,0,0.1)] rounded-l-sm overflow-hidden border-r border-stone-200">
           <PageContentRenderer content={backContent} isActive={flipped} />
           {/* Shadow gradient for depth near spine */}
           <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-stone-400/20 to-transparent pointer-events-none mix-blend-multiply" />
        </div>
      </div>
    </motion.div>
  );
};

export default BookSheet;