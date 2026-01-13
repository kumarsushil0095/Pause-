
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { PauseAI } from '../services/gemini';

const PauseChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello. I'm glad you're here. How are you feeling in this moment?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const aiRef = useRef<PauseAI | null>(null);

  useEffect(() => {
    aiRef.current = new PauseAI();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !aiRef.current) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    const response = await aiRef.current.sendMessage(userMessage);
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsLoading(false);

    if (isVoiceEnabled && aiRef.current) {
      await aiRef.current.speak(response);
    }
  };

  return (
    <div className="w-full h-full flex flex-col fade-in">
      <div className="flex justify-end mb-4 px-4">
        <button 
          onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
          className={`text-[10px] uppercase tracking-widest transition-colors flex items-center gap-2 ${isVoiceEnabled ? 'text-gray-800' : 'text-gray-300'}`}
        >
          <span>{isVoiceEnabled ? 'Voice On' : 'Voice Off'}</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        </button>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-8 px-4 pb-4 scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
              <p className={`font-serif text-lg leading-relaxed ${msg.role === 'user' ? 'text-gray-600' : 'text-gray-800'}`}>
                {msg.content}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-1 items-center py-2">
              <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSend} className="mt-8 border-t border-gray-100 pt-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type whatever is on your mind..."
          className="w-full bg-transparent border-none focus:ring-0 text-lg font-light text-gray-700 placeholder-gray-300 italic"
          autoFocus
        />
        <div className="flex justify-end mt-2">
           <button 
             type="submit" 
             disabled={!input.trim() || isLoading}
             className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-0"
           >
             Send
           </button>
        </div>
      </form>
    </div>
  );
};

export default PauseChat;
