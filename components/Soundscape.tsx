
import React, { useState, useRef, useEffect } from 'react';
import { SOUNDSCAPES } from '../constants';

const Soundscape: React.FC = () => {
  const [activeSound, setActiveSound] = useState<string | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const activeSoundIdRef = useRef<string | null>(null);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (sourceNodeRef.current) {
        sourceNodeRef.current.stop();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const createNoiseBuffer = (ctx: AudioContext, type: 'brown' | 'white') => {
    const bufferSize = ctx.sampleRate * 2; // 2 seconds
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      if (type === 'brown') {
        data[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = data[i];
        data[i] *= 3.5; 
      } else {
        data[i] = white * 0.5;
      }
    }
    return buffer;
  };

  const stopSound = () => {
    if (gainNodeRef.current && audioContextRef.current) {
      const now = audioContextRef.current.currentTime;
      const currentGain = gainNodeRef.current;
      const currentSource = sourceNodeRef.current;
      
      currentGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);
      
      setTimeout(() => {
        currentSource?.stop();
        currentSource?.disconnect();
      }, 1600);
    }
    setActiveSound(null);
    activeSoundIdRef.current = null;
  };

  const playSound = (id: string) => {
    if (activeSoundIdRef.current === id) {
      stopSound();
      return;
    }

    // Stop current if playing
    if (activeSoundIdRef.current) {
      stopSound();
    }

    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    const ctx = audioContextRef.current;
    if (ctx.state === 'suspended') ctx.resume();

    const buffer = createNoiseBuffer(ctx, id === 'white-noise' ? 'white' : 'brown');
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    
    const gain = ctx.createGain();
    gain.gain.value = 0.0001;

    switch (id) {
      case 'rain': filter.frequency.value = 800; break;
      case 'forest': filter.frequency.value = 350; break;
      case 'waves': 
        filter.frequency.value = 1000;
        const lfo = ctx.createOscillator();
        lfo.frequency.value = 0.12;
        const lfoGain = ctx.createGain();
        lfoGain.gain.value = 400;
        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);
        lfo.start();
        break;
      case 'white-noise': filter.frequency.value = 2500; break;
    }

    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    source.start();
    gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 2);

    sourceNodeRef.current = source;
    gainNodeRef.current = gain;
    setActiveSound(id);
    activeSoundIdRef.current = id;
  };

  return (
    <div className="w-full max-w-lg fade-in px-4">
      <div className="text-center mb-12">
        <h2 className="font-serif text-2xl italic text-gray-800 mb-2">Ambient Focus</h2>
        <p className="text-sm text-gray-400 font-light italic">Soft sounds to ground your mind.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {SOUNDSCAPES.map((sound) => (
          <button
            key={sound.id}
            onClick={() => playSound(sound.id)}
            className={`flex flex-col items-center justify-center p-8 rounded-2xl transition-all duration-700 border ${
              activeSound === sound.id 
                ? 'bg-white shadow-md border-gray-200 scale-105' 
                : 'bg-transparent border-transparent hover:border-gray-100 opacity-60 hover:opacity-100'
            }`}
          >
            <span className="text-3xl mb-4 grayscale-[0.5]">{sound.icon}</span>
            <span className={`text-[10px] uppercase tracking-widest font-light ${
              activeSound === sound.id ? 'text-gray-900 font-medium' : 'text-gray-400'
            }`}>
              {sound.name}
            </span>
            {activeSound === sound.id && (
              <div className="mt-4 flex gap-1">
                <div className="w-1 h-1 bg-gray-300 rounded-full animate-pulse"></div>
                <div className="w-1 h-1 bg-gray-300 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                <div className="w-1 h-1 bg-gray-300 rounded-full animate-pulse [animation-delay:0.4s]"></div>
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="text-[9px] uppercase tracking-[0.3em] text-gray-300">
          Best with headphones &middot; {activeSound ? 'Playing' : 'Choose a sound'}
        </p>
      </div>
    </div>
  );
};

export default Soundscape;
