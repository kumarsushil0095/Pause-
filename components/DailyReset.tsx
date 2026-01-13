
import React, { useState, useEffect } from 'react';

interface DailyResetProps {
  onComplete: () => void;
}

const STEPS = [
  { text: "Welcome to your reset.", duration: 5000 },
  { text: "Let's start by grounding your body.", duration: 6000 },
  { text: "Notice your feet on the floor.", duration: 7000 },
  { text: "Feel the support of the ground beneath you.", duration: 7000 },
  { text: "Breathe in deeply.", duration: 5000 },
  { text: "Exhale even more slowly.", duration: 7000 },
  { text: "Release the tension in your forehead.", duration: 6000 },
  { text: "Let your hands rest naturally.", duration: 6000 },
  { text: "There is nothing to achieve in this moment.", duration: 8000 },
  { text: "Observe the quiet around you.", duration: 8000 },
  { text: "You are here. You are present.", duration: 7000 },
  { text: "Carry this stillness with you as you move forward.", duration: 8000 },
  { text: "Whenever you are ready.", duration: 6000 },
];

const DailyReset: React.FC<DailyResetProps> = ({ onComplete }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let active = true;
    let timeout: ReturnType<typeof setTimeout>;

    const runStep = (index: number) => {
      if (!active) return;
      if (index >= STEPS.length) {
        onComplete();
        return;
      }

      setStepIndex(index);
      setVisible(true);

      timeout = setTimeout(() => {
        if (!active) return;
        setVisible(false);
        // Soft pause between fades
        timeout = setTimeout(() => {
          runStep(index + 1);
        }, 2000);
      }, STEPS[index].duration);
    };

    runStep(0);

    return () => {
      active = false;
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-10 fade-in">
      <div 
        className={`transition-opacity duration-[2000ms] ease-in-out ${visible ? 'opacity-100' : 'opacity-0'}`}
      >
        <p className="font-serif text-2xl md:text-3xl text-gray-700 italic leading-relaxed font-light select-none max-w-lg">
          {STEPS[stepIndex]?.text || ""}
        </p>
      </div>
      
      {/* Subtle progress bar */}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 w-64 h-[1px] bg-gray-100 overflow-hidden">
        <div 
          className="h-full bg-gray-200 transition-all duration-[2000ms] ease-linear"
          style={{ width: `${((stepIndex + 1) / STEPS.length) * 100}%` }}
        ></div>
      </div>

      <button 
        onClick={onComplete}
        className="fixed top-8 right-8 text-[10px] uppercase tracking-widest text-gray-300 hover:text-gray-400 transition-colors"
      >
        Close
      </button>
    </div>
  );
};

export default DailyReset;
