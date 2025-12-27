import React from 'react';
import Magazine from './components/Magazine';
import BackgroundEffect from './components/BackgroundEffect';

function App() {
  return (
    <div className="relative w-full h-screen overflow-hidden text-stone-800 antialiased selection:bg-stone-300 selection:text-stone-900">
      <BackgroundEffect />
      <main className="w-full h-full z-10 relative">
        <Magazine />
      </main>
    </div>
  );
}

export default App;