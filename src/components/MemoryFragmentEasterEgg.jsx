import React, { useState, useRef } from 'react';
import './MissionComplete.css';

export default function MemoryFragmentEasterEgg() {
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });

  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCursorPos({ x, y });
  };

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  // Construct the radial mask for the flashlight effect
  const maskStyle = {
    WebkitMaskImage: `radial-gradient(circle 120px at ${cursorPos.x}% ${cursorPos.y}%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0) 100%)`,
    maskImage: `radial-gradient(circle 120px at ${cursorPos.x}% ${cursorPos.y}%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0) 100%)`,
    opacity: isHovered ? 1 : 0,
    transition: 'opacity 0.3s ease'
  };

  return (
    <div className="memory-fragment-raw">
      <div className="mf-raw-header">
        <span className="mf-title">ARCHIVE_01</span>
      </div>

      <div className="mf-hint-text">[ HOVER TO SCAN ]</div>

      <div
        ref={cardRef}
        className={`mf-flip-container ${isFlipped ? 'is-flipped' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
      >
        <div className="mf-flipper">

          {/* FRONT FACE */}
          <div className="mf-face mf-front">
            {/* Base Sketch */}
            <img
              src={`${import.meta.env.BASE_URL}digital_c.png`}
              alt="Archive Sketch"
              className="mf-sketch-img"
            />

            {/* Digital Reveal Mask */}
            <img
              src={`${import.meta.env.BASE_URL}digital_g.png`}
              alt="Digital Reconstruct"
              className="mf-digital-reconstruct"
              style={maskStyle}
            />
          </div>

          {/* BACK FACE */}
          <div className="mf-face mf-back">
            <img src={`${import.meta.env.BASE_URL}digital_g.png`} alt="Digital Recovered" className="mf-recovered-img" />
          </div>

        </div>
      </div>

      <div className="mf-hint-text">[ CLICK TO TOGGLE VIEW ]</div>
    </div>
  );
}
