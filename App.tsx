
import React, { useState } from 'react';
import Layout from './components/Layout';
import Home from './components/Home';
import PauseChat from './components/PauseChat';
import Breathe from './components/Breathe';
import Soundscape from './components/Soundscape';
import GuidedPause from './components/GuidedPause';
import DailyReset from './components/DailyReset';
import { AppMode } from './types';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>('home');

  const renderContent = () => {
    switch (mode) {
      case 'home':
        return <Home 
          onStartPause={() => setMode('guided-pause')} 
          onStartReset={() => setMode('daily-reset')}
        />;
      case 'guided-pause':
        return <GuidedPause onComplete={() => setMode('home')} />;
      case 'daily-reset':
        return <DailyReset onComplete={() => setMode('home')} />;
      case 'chat':
        return <PauseChat />;
      case 'breathe':
        return <Breathe />;
      case 'listen':
        return <Soundscape />;
      default:
        return <Home 
          onStartPause={() => setMode('guided-pause')} 
          onStartReset={() => setMode('daily-reset')}
        />;
    }
  };

  return (
    <Layout mode={mode} setMode={setMode}>
      {renderContent()}
    </Layout>
  );
};

export default App;
