import { useState, useCallback } from 'react';
import TerminalBoot from './components/TerminalBoot';
import IntroPage from './components/IntroPage';
import './App.css';

export default function App() {
  const [phase, setPhase] = useState('boot'); // 'boot' | 'intro'

  const handleBootComplete = useCallback(() => {
    setPhase('intro');
  }, []);

  return (
    <div className="app">
      {phase === 'boot' && <TerminalBoot onComplete={handleBootComplete} />}
      {phase === 'intro' && <IntroPage />}
    </div>
  );
}
