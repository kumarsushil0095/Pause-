
import React, { useState } from 'react';
import { AppMode } from '../types';
import Resources from './Resources';

interface LayoutProps {
  children: React.ReactNode;
  mode: AppMode;
  setMode: (mode: AppMode) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, mode, setMode }) => {
  const [showResources, setShowResources] = useState(false);
  const isImmersive = mode === 'guided-pause' || mode === 'daily-reset';

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-6 transition-colors duration-1000 bg-[#fdfbf7]">
      <header className={`w-full max-w-2xl flex justify-between items-center z-10 transition-opacity duration-1000 ${isImmersive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <button 
          onClick={() => setMode('home')}
          className="text-2xl font-serif italic text-gray-800 tracking-widest uppercase opacity-80 hover:opacity-100 transition-opacity"
        >
          Pause
        </button>
        
        <nav className="flex gap-6 text-sm font-light text-gray-500">
          <button 
            onClick={() => setMode('chat')} 
            className={`hover:text-gray-800 transition-colors ${mode === 'chat' ? 'text-gray-900 border-b border-gray-400' : ''}`}
          >
            Talk
          </button>
          <button 
            onClick={() => setMode('breathe')} 
            className={`hover:text-gray-800 transition-colors ${mode === 'breathe' ? 'text-gray-900 border-b border-gray-400' : ''}`}
          >
            Breathe
          </button>
          <button 
            onClick={() => setMode('listen')} 
            className={`hover:text-gray-800 transition-colors ${mode === 'listen' ? 'text-gray-900 border-b border-gray-400' : ''}`}
          >
            Listen
          </button>
        </nav>
      </header>

      <main className="flex-1 w-full max-w-2xl flex flex-col justify-center items-center py-12">
        {children}
      </main>

      <footer className={`w-full max-w-2xl text-center pb-4 transition-opacity duration-1000 ${isImmersive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="flex flex-col items-center gap-2">
          <p className="text-[10px] uppercase tracking-widest text-gray-400">
            A moment for yourself. No pressure.
          </p>
          <button 
            onClick={() => setShowResources(true)}
            className="text-[9px] uppercase tracking-widest text-gray-300 hover:text-gray-500 transition-colors"
          >
            Resources & Support
          </button>
        </div>
      </footer>

      {showResources && <Resources onClose={() => setShowResources(false)} />}
    </div>
  );
};

export default Layout;
