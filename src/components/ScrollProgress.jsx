import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const animation = gsap.to(barRef.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      }
    });

    return () => {
      if (animation.scrollTrigger) {
        animation.scrollTrigger.kill();
      }
      animation.kill();
    };
  }, []);

  return (
    <div 
      className="scroll-progress-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '4px',
        backgroundColor: 'transparent',
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    >
      <div 
        ref={barRef}
        className="scroll-progress-bar"
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'var(--color-phosphor, #7CFF8C)',
          transformOrigin: 'left center',
          transform: 'scaleX(0)',
          boxShadow: '0 0 8px rgba(124, 255, 140, 0.6)'
        }}
      />
    </div>
  );
}
