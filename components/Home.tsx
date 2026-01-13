
import React from 'react';

interface HomeProps {
  onStartPause: () => void;
  onStartReset: () => void;
}

const Home: React.FC<HomeProps> = ({ onStartPause, onStartReset }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-12 fade-in">
      <div className="space-y-4">
        <h1 className="font-serif text-4xl md:text-5xl text-gray-800 italic font-light tracking-tight">
          Everything can wait.
        </h1>
        <p className="text-gray-400 font-light tracking-wide max-w-sm mx-auto leading-relaxed">
          Take a moment to simply exist without expectation.
        </p>
      </div>

      <div className="flex flex-col items-center gap-12">
        <button
          onClick={onStartPause}
          className="group relative flex items-center justify-center w-40 h-40 rounded-full border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all duration-700 active:scale-95"
        >
          <div className="absolute inset-0 rounded-full bg-blue-50/20 group-hover:scale-110 transition-transform duration-1000"></div>
          <span className="relative font-serif text-sm tracking-[0.3em] uppercase text-gray-500 group-hover:text-gray-800 transition-colors">
            Pause
          </span>
        </button>

        <button 
          onClick={onStartReset}
          className="text-[11px] uppercase tracking-[0.4em] text-gray-400 hover:text-gray-600 transition-colors border-b border-transparent hover:border-gray-200 pb-1"
        >
          Start Daily Reset
        </button>
      </div>
    </div>
  );
};

export default Home;
