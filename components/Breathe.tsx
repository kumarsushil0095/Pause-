
import React, { useState, useEffect } from 'react';

const Breathe: React.FC = () => {
  const [phase, setPhase] = useState<'in' | 'hold' | 'out'>('in');
  const [seconds, setSeconds] = useState(4);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          if (phase === 'in') { setPhase('hold'); return 4; }
          if (phase === 'hold') { setPhase('out'); return 6; }
          if (phase === 'out') { setPhase('in'); return 4; }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase]);

  const getPhaseText = () => {
    switch (phase) {
      case 'in': return 'Breathe In';
      case 'hold': return 'Hold';
      case 'out': return 'Breathe Out';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center fade-in">
      <div className="relative flex items-center justify-center">
        {/* Animated circle */}
        <div 
          className={`w-48 h-48 rounded-full transition-all duration-[4000ms] ease-in-out border border-gray-100 flex items-center justify-center
            ${phase === 'in' ? 'scale-125 bg-blue-50/30' : ''}
            ${phase === 'hold' ? 'scale-125 bg-blue-50/50' : ''}
            ${phase === 'out' ? 'scale-100 bg-transparent' : ''}
          `}
        >
          <div className="w-32 h-32 rounded-full bg-white shadow-sm flex flex-col items-center justify-center">
             <span className="text-2xl font-serif text-gray-400">{seconds}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <h2 className="text-xl font-light tracking-widest text-gray-600 uppercase mb-2">
          {getPhaseText()}
        </h2>
        <p className="text-sm text-gray-400 font-light italic">
          Follow the rhythm of the circle.
        </p>
      </div>
    </div>
  );
};

export default Breathe;
