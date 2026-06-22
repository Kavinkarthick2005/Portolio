import React, { useState } from 'react';
import './MissionComplete.css';

export default function MemoryFragmentEasterEgg() {
  const [isLocked, setIsLocked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const showDigital = isLocked || isHovered;

  return (
    <div className="is-memory-fragment">
      <span className="mf-tag">MEMORY_FRAGMENT_01</span>
      Some systems are built with code.<br/>Some are built with people.
      
      <div 
        className={`mf-sketch-container ${showDigital ? 'show-digital' : ''}`}
        onClick={() => setIsLocked(!isLocked)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={`${import.meta.env.BASE_URL}diagram.jpeg`} alt="Personal Log Sketch Base" className="mf-sketch-base" />
        <img src={`${import.meta.env.BASE_URL}diagram.jpeg`} alt="Personal Log Sketch Scanned" className="mf-sketch-scanned" />
        <div className="mf-scan-line"></div>
        <div className="mf-heartbeat"></div>
      </div>
    </div>
  );
}
