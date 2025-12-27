import React from 'react';
import { PageContent } from '../types';
import { motion } from 'framer-motion';

interface Props {
  content: PageContent;
  isActive: boolean;
}

const PageContentRenderer: React.FC<Props> = ({ content, isActive }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  // Common wrapper styles
  const wrapperClass = "w-full h-full px-8 py-12 flex flex-col relative overflow-hidden bg-stone-50 text-stone-800 shadow-[inset_0_0_40px_rgba(0,0,0,0.02)]";

  switch (content.type) {
    case 'cover':
      return (
        <div className={wrapperClass}>
          <motion.div 
            className="flex-1 flex flex-col justify-center items-center text-center z-10"
            variants={containerVariants}
            initial="hidden"
            animate={isActive ? "visible" : "hidden"}
          >
            <motion.h2 variants={itemVariants} className="font-sans text-xs tracking-[0.4em] mb-6 text-stone-500 uppercase">
              {content.subtitle}
            </motion.h2>
            <motion.h1 variants={itemVariants} className="font-serif text-6xl md:text-8xl tracking-widest mb-4 text-stone-900">
              {content.title}
            </motion.h1>
            <motion.div variants={itemVariants} className="w-16 h-[1px] bg-stone-400 my-8"></motion.div>
            <motion.p variants={itemVariants} className="font-serif italic text-lg text-stone-600">
              {content.text}
            </motion.p>
          </motion.div>
          {content.imageUrl && (
            <div className="absolute inset-0 opacity-10 mix-blend-multiply pointer-events-none">
              <img src={content.imageUrl} alt="cover bg" className="w-full h-full object-cover grayscale" />
            </div>
          )}
          {/* Decorative grain */}
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        </div>
      );

    case 'intro':
    case 'article':
      return (
        <div className={wrapperClass}>
           <motion.div 
            className={`flex-1 flex flex-col justify-center ${content.align === 'center' ? 'items-center text-center' : 'items-start text-left'}`}
            variants={containerVariants}
            initial="hidden"
            animate={isActive ? "visible" : "hidden"}
           >
             {content.subtitle && (
               <motion.span variants={itemVariants} className="font-sans text-xs tracking-[0.2em] text-stone-400 mb-4 block">
                 {content.subtitle}
               </motion.span>
             )}
             <motion.h2 variants={itemVariants} className="font-serif text-3xl md:text-4xl mb-8 text-stone-800 leading-tight">
               {content.title}
             </motion.h2>
             <motion.p variants={itemVariants} className="font-serif text-lg md:text-xl leading-relaxed text-stone-600 max-w-prose">
               {content.text}
             </motion.p>
             {content.type === 'intro' && (
                <motion.div variants={itemVariants} className="mt-12 text-4xl text-stone-300 font-serif">❧</motion.div>
             )}
           </motion.div>
           <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-sans text-xs text-stone-400">{content.id}</div>
        </div>
      );

    case 'quote':
      return (
        <div className={`${wrapperClass} bg-stone-100`}>
          <motion.div 
            className="flex-1 flex flex-col justify-center items-center text-center px-4"
            variants={containerVariants}
            initial="hidden"
            animate={isActive ? "visible" : "hidden"}
          >
            <motion.p variants={itemVariants} className="font-serif text-2xl md:text-3xl leading-relaxed italic text-stone-700">
              {content.text}
            </motion.p>
            <motion.div variants={itemVariants} className="mt-8 font-sans text-xs tracking-widest text-stone-500 uppercase">
              {content.subtitle}
            </motion.div>
          </motion.div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-sans text-xs text-stone-400">{content.id}</div>
        </div>
      );

    case 'image':
      return (
        <div className="w-full h-full relative overflow-hidden bg-stone-200">
          <img src={content.imageUrl} alt="Visual" className="w-full h-full object-cover grayscale brightness-110 contrast-[0.9]" />
          <div className="absolute inset-0 bg-stone-900/10 mix-blend-multiply"></div>
          {content.text && (
            <motion.div 
              className="absolute bottom-12 left-0 w-full text-center px-6"
              initial={{ opacity: 0, y: 10 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <p className="font-serif italic text-white text-xl drop-shadow-md tracking-wide">{content.text}</p>
            </motion.div>
          )}
        </div>
      );

    case 'back':
      return (
        <div className={`${wrapperClass} bg-stone-800 text-stone-100`}>
          <motion.div 
             className="flex-1 flex flex-col justify-center items-center text-center"
             variants={containerVariants}
             initial="hidden"
             animate={isActive ? "visible" : "hidden"}
          >
            <motion.h3 variants={itemVariants} className="font-sans text-sm tracking-[0.3em] mb-4 text-stone-400">
              FIN
            </motion.h3>
            <motion.h1 variants={itemVariants} className="font-serif text-4xl tracking-widest mb-8">
              {content.title}
            </motion.h1>
            <motion.p variants={itemVariants} className="font-sans text-xs tracking-widest text-stone-500">
              {content.text}
            </motion.p>
          </motion.div>
           {/* Decorative grain */}
           <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        </div>
      );

    default:
      return <div className={wrapperClass}></div>;
  }
};

export default PageContentRenderer;