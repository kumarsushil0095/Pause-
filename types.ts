
export type AppMode = 'home' | 'chat' | 'breathe' | 'listen' | 'guided-pause' | 'daily-reset';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface Soundscape {
  id: string;
  name: string;
  icon: string;
  color: string;
}
