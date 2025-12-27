export function renderPageContent(content) {
  if (!content) return '<div class="w-full h-full bg-stone-50"></div>';

  // Increased padding for grander, airy feel
  const wrapperClass = "w-full h-full px-8 md:px-20 py-16 md:py-24 flex flex-col relative overflow-hidden bg-stone-50 text-stone-800";

  switch (content.type) {
    case 'cover':
      return `
        <div class="${wrapperClass}">
          <div class="flex-1 flex flex-col justify-center items-center text-center z-10">
            <h2 class="animate-item delay-100 font-sans text-xs md:text-sm tracking-[0.5em] mb-8 text-stone-500 uppercase">${content.subtitle || ''}</h2>
            <h1 class="animate-item delay-200 font-serif text-7xl md:text-9xl tracking-widest mb-6 text-stone-900 leading-none">${content.title}</h1>
            <div class="animate-item delay-300 w-24 h-[1px] bg-stone-400 my-12"></div>
            <p class="animate-item delay-400 font-serif italic text-xl md:text-2xl text-stone-600">${content.text || ''}</p>
          </div>
          ${content.imageUrl ? `<div class="absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none transition-transform duration-[10s] scale-110 ease-linear"><img src="${content.imageUrl}" class="w-full h-full object-cover grayscale"></div>` : ''}
          <div class="absolute inset-0 opacity-30 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        </div>
      `;

    case 'intro':
    case 'article':
      const alignClass = content.align === 'center' ? 'items-center text-center' : 'items-start text-left';
      return `
        <div class="${wrapperClass}">
           <div class="flex-1 flex flex-col justify-center ${alignClass} max-w-2xl mx-auto z-10">
             ${content.subtitle ? `<span class="animate-item delay-100 font-sans text-xs tracking-[0.3em] text-stone-400 mb-6 block border-b border-stone-200 pb-2">${content.subtitle}</span>` : ''}
             <h2 class="animate-item delay-200 font-serif text-4xl md:text-6xl mb-10 text-stone-800 leading-tight">${content.title || ''}</h2>
             <div class="animate-item delay-300 font-serif text-xl md:text-2xl leading-relaxed text-stone-600 space-y-6">
                ${content.text ? `<p>${content.text}</p>` : ''}
             </div>
             ${content.type === 'intro' ? `<div class="animate-item delay-400 mt-16 text-5xl text-stone-300 font-serif">❧</div>` : ''}
           </div>
           <div class="absolute bottom-10 left-1/2 -translate-x-1/2 font-sans text-xs text-stone-400 tracking-widest">${content.id}</div>
           <div class="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        </div>
      `;

    case 'quote':
      return `
        <div class="${wrapperClass} bg-[#fdfdfc]">
          <div class="flex-1 flex flex-col justify-center items-center text-center px-4 md:px-20 z-10">
            <div class="animate-item delay-100 w-12 h-12 border border-stone-300 rounded-full mb-8 flex items-center justify-center text-stone-400 font-serif italic text-xl">"</div>
            <p class="animate-item delay-200 font-serif text-3xl md:text-5xl leading-tight italic text-stone-800 max-w-3xl">${content.text}</p>
            <div class="animate-item delay-400 mt-12 font-sans text-xs tracking-[0.3em] text-stone-400 uppercase border-t border-stone-200 pt-4">${content.subtitle || ''}</div>
          </div>
          <div class="absolute bottom-10 left-1/2 -translate-x-1/2 font-sans text-xs text-stone-400 tracking-widest">${content.id}</div>
        </div>
      `;

    case 'image':
      return `
        <div class="w-full h-full relative overflow-hidden bg-stone-200 group">
          <img src="${content.imageUrl}" class="w-full h-full object-cover grayscale brightness-110 contrast-[0.9] scale-100 transition-transform duration-[30s] ease-linear group-hover:scale-110">
          <div class="absolute inset-0 bg-stone-900/10 mix-blend-multiply"></div>
          ${content.text ? `
            <div class="absolute bottom-20 left-0 w-full text-center px-8 z-20 animate-item delay-500">
              <p class="font-serif italic text-white/90 text-2xl md:text-3xl drop-shadow-lg tracking-wide max-w-xl mx-auto border-l-2 border-white/50 pl-6 text-left">${content.text}</p>
            </div>
          ` : ''}
          <div class="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        </div>
      `;

    case 'back':
      return `
        <div class="${wrapperClass} bg-stone-900 text-stone-100">
          <div class="flex-1 flex flex-col justify-center items-center text-center z-10">
            <h3 class="animate-item delay-100 font-sans text-sm tracking-[0.4em] mb-6 text-stone-500">FIN</h3>
            <h1 class="animate-item delay-200 font-serif text-5xl md:text-7xl tracking-widest mb-10 text-stone-100">${content.title}</h1>
            <p class="animate-item delay-300 font-sans text-xs tracking-[0.3em] text-stone-400 uppercase">${content.text}</p>
          </div>
           <div class="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        </div>
      `;

    default:
      return `<div class="${wrapperClass}"></div>`;
  }
}