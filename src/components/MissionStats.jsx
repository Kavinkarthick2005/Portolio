import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './MissionComplete.css';

const STATS = [
  { label: 'PROJECTS COMPLETED', value: 7, prefix: '0' },
  { label: 'SYSTEMS BUILT', value: 14, prefix: '' },
  { label: 'YEARS LEARNING', value: 3, prefix: '0' },
  { label: 'COFFEE CONSUMED', value: '∞', isInfinity: true }
];

export default function MissionStats() {
  const containerRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          const targets = containerRef.current.querySelectorAll('.mc-stat-num:not(.is-infinity)');
          
          targets.forEach(target => {
            const endValue = parseInt(target.getAttribute('data-value'), 10);
            gsap.fromTo(target, 
              { innerHTML: 0 },
              { 
                innerHTML: endValue,
                duration: 2,
                ease: 'power2.out',
                snap: { innerHTML: 1 },
                onUpdate: function() {
                  const val = Math.round(this.targets()[0].innerHTML);
                  const prefix = target.getAttribute('data-prefix') || '';
                  target.innerHTML = val < 10 && prefix ? `0${val}` : val;
                }
              }
            );
          });
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <div className="mc-stats-container" ref={containerRef}>
      {STATS.map((stat, i) => (
        <div key={i} className="mc-stat-item">
          <span className="mc-stat-label">{stat.label}</span>
          <span 
            className={`mc-stat-num ${stat.isInfinity ? 'is-infinity' : ''}`}
            data-value={stat.value}
            data-prefix={stat.prefix}
          >
            {stat.isInfinity ? stat.value : '00'}
          </span>
        </div>
      ))}
    </div>
  );
}
