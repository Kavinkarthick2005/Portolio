import { useState, useCallback, useEffect } from 'react';
import TerminalBoot from './components/TerminalBoot';
import IntroPage from './components/IntroPage';
import RepositoriesPage from './components/RepositoriesPage';
import SkillsPage from './components/SkillsPage';
import './App.css';

export default function App() {
  const [phase, setPhase] = useState('boot'); // 'boot' | 'intro'
  const [activeOverlay, setActiveOverlay] = useState(null); // null | 'repos'
  const [highlightedCard, setHighlightedCard] = useState(null);

  useEffect(() => {
    if (activeOverlay) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [activeOverlay]);

  const handleBootComplete = useCallback(() => {
    setPhase('intro');
  }, []);

  const handleNavigate = useCallback((path) => {
    setActiveOverlay(path);
    setHighlightedCard(null); // Clear highlight when navigating away
  }, []);

  const handleReturnToHub = useCallback((cardId) => {
    setActiveOverlay(null);
    setHighlightedCard(cardId);
    
    // Clear the glow after it plays
    setTimeout(() => {
      setHighlightedCard((prev) => prev === cardId ? null : prev);
    }, 2000);
  }, []);

  return (
    <div className="app">
      {phase === 'boot' && <TerminalBoot onComplete={handleBootComplete} />}
      {phase === 'intro' && (
        <>
          <IntroPage onNavigate={handleNavigate} highlightedCard={highlightedCard} />
          {activeOverlay === 'repos' && (
            <RepositoriesPage onClose={() => handleReturnToHub('03')} />
          )}
          {activeOverlay === 'skills' && (
            <SkillsPage onClose={() => handleReturnToHub('04')} />
          )}
        </>
      )}
    </div>
  );
}
