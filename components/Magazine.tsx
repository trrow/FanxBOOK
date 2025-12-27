import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import BookSheet from './BookSheet';
import { MAGAZINE_CONTENT } from '../constants';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Magazine: React.FC = () => {
  // We process content in pairs.
  // 0: Cover (Front), 1: Intro (Back of Cover)
  // 2: Image (Front), 3: Article (Back) ...
  // The 'sheet' index determines which physical paper we are manipulating.
  
  const totalSheets = Math.ceil(MAGAZINE_CONTENT.length / 2);
  const [currentSheetIndex, setCurrentSheetIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const goNext = () => {
    if (currentSheetIndex < totalSheets) {
      setCurrentSheetIndex(prev => prev + 1);
    }
  };

  const goPrev = () => {
    if (currentSheetIndex > 0) {
      setCurrentSheetIndex(prev => prev - 1);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: goNext,
    onSwipedRight: goPrev,
    trackMouse: true,
    preventScrollOnSwipe: true
  });

  // Sheets need to be rendered in a specific Z-order.
  // Sheets that haven't been flipped need to stack normally (0, 1, 2)
  // Sheets that HAVE been flipped need to reverse stack so the last flipped is on top.
  
  return (
    <div 
      {...handlers}
      className="relative w-full h-full flex flex-col justify-center items-center perspective-container overflow-hidden"
    >
      {/* Mobile Hint or Desktop Layout */}
      <div className="absolute top-6 font-serif text-stone-500 text-sm tracking-widest z-50">
        SOUL MAGAZINE
      </div>

      {/* The 3D Space */}
      <div 
        className={`relative transition-all duration-700 ease-in-out ${isMobile ? 'w-[85vw] h-[75vh]' : 'w-[450px] h-[650px]'}`}
        style={{ perspective: '1500px' }}
      >
        {/* Book Container - shift it slightly left on desktop to center the open book */}
        <div 
          className={`relative w-full h-full transition-transform duration-700 ${currentSheetIndex > 0 && currentSheetIndex < totalSheets && !isMobile ? 'translate-x-[50%]' : ''}`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {Array.from({ length: totalSheets }).map((_, index) => {
            // Calculate z-index dynamically
            // Before flip: higher index = lower z-index (stacked behind)
            // After flip: higher index = higher z-index (stacked on top on the left side)
            let zIndex = totalSheets - index;
            if (index < currentSheetIndex) {
              zIndex = index;
            }

            const frontContent = MAGAZINE_CONTENT[index * 2];
            const backContent = MAGAZINE_CONTENT[index * 2 + 1] || { id: -1, type: 'article' }; // Fallback

            return (
              <BookSheet
                key={index}
                pageIndex={index}
                frontContent={frontContent}
                backContent={backContent}
                flipped={index < currentSheetIndex}
                zIndex={zIndex}
                onFlip={() => {
                  if (index < currentSheetIndex) {
                    goPrev();
                  } else {
                    goNext();
                  }
                }}
              />
            );
          })}
          
          {/* Back Cover Static Base (Optional for depth) */}
          <div 
            className="absolute top-0 left-0 w-full h-full bg-stone-100 rounded-r-sm border border-stone-300 shadow-xl"
            style={{ transform: 'translateZ(-2px)', zIndex: -1 }}
          ></div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-8 flex gap-12 z-50 items-center">
        <button 
          onClick={goPrev} 
          disabled={currentSheetIndex === 0}
          className={`p-3 rounded-full border border-stone-300 transition-all duration-300 ${currentSheetIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-stone-200 hover:scale-110 active:scale-95'}`}
        >
          <ChevronLeft className="text-stone-600" size={24} />
        </button>
        
        <div className="font-serif text-stone-400 text-xs tracking-[0.2em]">
          {currentSheetIndex} / {totalSheets}
        </div>

        <button 
          onClick={goNext} 
          disabled={currentSheetIndex === totalSheets}
          className={`p-3 rounded-full border border-stone-300 transition-all duration-300 ${currentSheetIndex === totalSheets ? 'opacity-30 cursor-not-allowed' : 'hover:bg-stone-200 hover:scale-110 active:scale-95'}`}
        >
          <ChevronRight className="text-stone-600" size={24} />
        </button>
      </div>
      
      <div className="absolute bottom-2 font-sans text-[10px] text-stone-400 opacity-60">
        Swipe or Click to Flip
      </div>
    </div>
  );
};

export default Magazine;