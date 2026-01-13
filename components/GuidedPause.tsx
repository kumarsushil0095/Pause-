
import React, { useState, useEffect } from 'react';

interface GuidedPauseProps {
  onComplete: () => void;
}

const STEPS = [
  { text: "Let the world wait for a moment.", duration: 4000 },
  { text: "Take a long, slow breath in.", duration: 4500 },
  { text: "And let it all out.", duration: 4500 },
  { text: "Drop your shoulders away from your ears.", duration: 4000 },
  { text: "Unclench your jaw.", duration: 4000 },
  { text: "There is nothing you need to fix right now.", duration: 5000 },
  { text: "Notice the weight of your body in the chair.", duration: 5000 },
  { text: "One more slow breath...", duration: 4500 },
  { text: "You are doing enough.", duration: 4500 },
  { text: "You are okay.", duration: 4000 },
  { text: "Whenever you're ready, come back.", duration: 4500 },
];

const GuidedPause: React.FC<GuidedPauseProps> = ({ onComplete }) => {
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
        // Wait for fade out animation before moving to next step
        timeout = setTimeout(() => {
          runStep(index + 1);
        }, 1500);
      }, STEPS[index].duration);
    };

    runStep(0);

    return () => {
      active = false;
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6 fade-in">
      <div 
        className={`transition-opacity duration-[1500ms] ease-in-out ${visible ? 'opacity-100' : 'opacity-0'}`}
      >
        <p className="font-serif text-2xl md:text-3xl text-gray-700 italic leading-relaxed font-light select-none">
          {STEPS[stepIndex]?.text || ""}
        </p>
      </div>
      
      {/* Progress indicator */}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gray-100 overflow-hidden">
        <div 
          className="h-full bg-gray-300 transition-all duration-1000 ease-linear"
          style={{ width: `${((stepIndex + 1) / STEPS.length) * 100}%` }}
        ></div>
      </div>

      <button 
        onClick={onComplete}
        className="fixed top-8 right-8 text-[10px] uppercase tracking-widest text-gray-300 hover:text-gray-500 transition-colors"
      >
        End
      </button>
    </div>
  );
};

export default GuidedPause;
