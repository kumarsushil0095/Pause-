
import React from 'react';

interface ResourcesProps {
  onClose: () => void;
}

const Resources: React.FC<ResourcesProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-white/90 backdrop-blur-sm fade-in">
      <div className="max-w-md w-full space-y-10 text-center">
        <div className="space-y-4">
          <h2 className="font-serif text-3xl text-gray-800 italic font-light">
            You don't have to face this alone.
          </h2>
          <p className="text-gray-500 font-light leading-relaxed">
            I’m really glad you reached out. If you're feeling overwhelmed, please consider talking to someone you trust or a professional support service.
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <h3 className="text-[10px] uppercase tracking-[0.3em] text-gray-400">Global Helplines</h3>
            <ul className="space-y-2 text-sm text-gray-600 font-light">
              <li>
                <a href="https://www.befrienders.org/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 underline underline-offset-4 decoration-gray-200">
                  Befrienders Worldwide
                </a>
              </li>
              <li>
                <a href="https://www.crisistextline.org/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 underline underline-offset-4 decoration-gray-200">
                  Crisis Text Line
                </a>
              </li>
              <li>
                <a href="https://findahelpline.com/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 underline underline-offset-4 decoration-gray-200">
                  Find A Helpline
                </a>
              </li>
            </ul>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="mt-8 text-[11px] uppercase tracking-[0.4em] text-gray-400 hover:text-gray-800 transition-colors border-b border-transparent hover:border-gray-200 pb-1"
        >
          Back to Pause
        </button>
      </div>
    </div>
  );
};

export default Resources;
