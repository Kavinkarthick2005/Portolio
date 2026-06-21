import { useState, useEffect, useRef, useCallback } from 'react';
import './RepositoriesPage.css';

// Ripple Chronological Order (Center is newest/flagship, edges are origins)
const APPROVED_REPOS = [
  'US',                                       // 0: Center
  'CRM',                                      // 1: Right (1)
  'CareerPro2',                               // 2: Left (1)
  'riskloom',                                 // 3: Right (2)
  'Flow-State',                               // 4: Left (2)
  'Agentic-Company-Scout',                    // 5: Right (3)
  'Rehabilitation-game-for-stroke-patients',  // 6: Left (3)
  'Carbon-AQI'                                // 7: Right (4)
];

const REPO_METADATA = {
  'US': {
    description: 'AI-powered couple companion app — He/She/Us three-space architecture, Groq/Llama 3 chat, shared memory system, and a full custom design system.',
    categories: ['AI', 'MOBILE', 'SHIPPED'],
    impact: 'Play Store Launch Candidate',
    why: 'Built because most relationship apps feel transactional. I wanted to explore whether AI could preserve shared memories and conversations in a more human way.',
    screenshot: './us.png'
  },
  'CRM': {
    description: 'Turn natural language into customer segments, campaigns, and AI-powered marketing workflows in seconds.',
    categories: ['AI', 'CRM', 'FULL STACK'],
    impact: 'AI CRM Prototype',
    why: 'Built to reduce the friction between marketing intent and campaign execution using natural language.',
    screenshot: './whisperflow.png'
  },
  'CareerPro2': {
    description: 'Cloud-native career guidance platform built for Smart India Hackathon. Azure App Services, ML models, FastAPI backend supporting 1,000+ concurrent users.',
    categories: ['CLOUD', 'AI', 'BACKEND'],
    impact: 'Top 50 - Smart India Hackathon',
    why: 'Built to provide scalable career guidance to thousands of students simultaneously using cloud-native ML.',
    screenshot: './careerpro.png'
  },
  'Carbon-AQI': {
    description: 'Full-stack real-time air quality platform tracking 10 Indian cities. XGBoost prediction + PPO RL agent for mitigation recommendations.',
    categories: ['AI', 'RL', 'DATA'],
    impact: 'Real-time 10-City Platform',
    why: 'Built to move beyond just tracking pollution by using reinforcement learning to actually suggest active mitigation strategies.',
    screenshot: null
  },
  'riskloom': {
    description: 'TA fintech intelligence platform for portfolio risk analysis, performance optimization, and data-driven investment decisions.',
    categories: ['FINTECH', 'FULL STACK'],
    impact: 'Portfolio Risk Analyzer',
    why: 'Built to understand how portfolio risk can be visualized and analyzed without relying on institutional tools.',
    screenshot: null
  },
  'Rehabilitation-game-for-stroke-patients': {
    description: 'A therapeutic VR mini-game that transforms stroke assessment into an immersive fish-feeding experience.',
    categories: ['VR', 'HEALTHCARE', 'RESEARCH'],
    impact: 'Clinical Assessment Concept',
    why: 'Built to explore accessible stroke rehabilitation through gamified interaction and measurable patient outcomes.',
    screenshot: null
  },
  'Agentic-Company-Scout': {
    description: 'Agentic research tool using LangChain to automatically stream and process corporate data. Multi-agent pipeline for business intelligence.',
    categories: ['AI', 'RESEARCH', 'MULTI-AGENT'],
    impact: 'Business Intelligence Pipeline',
    why: 'Built to understand how autonomous agents can collaborate to synthesize complex corporate data without human intervention.',
    screenshot: null
  },
  'Flow-State': {
    description: 'PPO reinforcement learning agent for dynamic difficulty adjustment in a 2D space shooter. Adapts challenge in real time based on player performance metrics.',
    categories: ['RL', 'GAME DEV'],
    impact: 'Dynamic Difficulty Engine',
    why: 'Built to experiment with bridging reinforcement learning and game design to keep players perfectly engaged.',
    screenshot: null
  }
};

const SKILL_STRENGTHS = [
  { name: 'AI / ML', score: 10 },
  { name: 'Backend', score: 9 },
  { name: 'Frontend', score: 7 },
  { name: 'Cloud', score: 6 },
  { name: 'Game Dev', score: 4 },
];

function formatRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 30) return `${diffDays} d`;
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) return `${diffMonths} mo`;
  return `${Math.floor(diffMonths / 12)} yr`;
}

function useCountUp(end, duration = 800) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return count;
}

function StatItem({ label, value, delay, isNumber = true }) {
  const [start, setStart] = useState(false);
  
  useEffect(() => {
    const t = setTimeout(() => setStart(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  const displayValue = isNumber ? useCountUp(start ? value : 0) : (start ? value : '-');

  return (
    <div className={`repo-stat-card ${start ? 'active' : ''}`}>
      <span className="repo-stat-value">{displayValue}</span>
      <span className="repo-stat-label">{label}</span>
    </div>
  );
}

export default function RepositoriesPage({ onClose }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [returningPhase, setReturningPhase] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [hoveredRepo, setHoveredRepo] = useState(null);
  
  const scrollRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [reposRes, contribRes] = await Promise.all([
          fetch('https://api.github.com/users/Kavinkarthick2005/repos?per_page=100'),
          fetch('https://github-contributions-api.jogruber.de/v4/Kavinkarthick2005?y=last').catch(() => null)
        ]);

        if (!reposRes.ok) throw new Error('Failed to fetch from GitHub API');
        
        const allRepos = await reposRes.json();
        const contribs = contribRes && contribRes.ok ? await contribRes.json() : null;

        const orderedRepos = [];
        APPROVED_REPOS.forEach(name => {
          const match = allRepos.find(r => r.name.toLowerCase() === name.toLowerCase());
          if (match) {
            const meta = REPO_METADATA[name];
            match.description = meta.description;
            match.categories = meta.categories;
            match.impact = meta.impact;
            match.why = meta.why;
            match.screenshot = meta.screenshot;
            orderedRepos.push(match);
          }
        });

        let heatmapDays = [];
        if (contribs && contribs.contributions) {
          heatmapDays = contribs.contributions.slice(-364);
        }

        setData({
          repos: orderedRepos,
          heatmapDays
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    
    const handleScroll = () => {
      const startTrigger = 100;
      const endTrigger = 600;
      
      let progress = 0;
      if (el.scrollTop > startTrigger) {
        progress = Math.min(1, (el.scrollTop - startTrigger) / (endTrigger - startTrigger));
      }
      setScrollProgress(progress);
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [loading]);

  const handleMouseMove = useCallback((e) => {
    if (returningPhase || window.innerWidth < 768) return;
    
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    const xPos = (clientX / innerWidth) * 2 - 1;
    const yPos = (clientY / innerHeight) * 2 - 1;
    
    setParallax({ x: xPos * 8, y: -yPos * 4 });
  }, [returningPhase]);

  const handleMouseLeave = useCallback(() => {
    setParallax({ x: 0, y: 0 });
  }, []);

  const handleReturnClick = () => {
    if (returningPhase) return;
    setReturningPhase('collapse');
    setTimeout(() => setReturningPhase('glitch'), 400); 
    setTimeout(() => setReturningPhase('black'), 700); 
    setTimeout(() => {
      if (onClose) onClose();
    }, 850);
  };

  const getFanStyles = (index, total) => {
    if (returningPhase) {
      return {
        transform: `rotate(0deg) translate(0px, 0px)`,
        zIndex: total - index
      };
    }
    
    if (window.innerWidth < 768) {
      return { zIndex: total - index };
    }
    
    // Center card (Flagship) gets special permanent scale if fully fanned out
    if (index === 0) {
      const scale = 1 + (0.08 * scrollProgress);
      const translateY = -20 * scrollProgress;
      return { 
        transform: `rotate(0deg) translate(0px, ${translateY}px) scale(${scale})`, 
        zIndex: 20 
      };
    }
    
    const isRight = index % 2 === 1;
    const pair = Math.ceil(index / 2); 
    
    // Decompressed fan math
    const angleBase = 8; // reduced from 12
    const yOffsetBase = -15; // Concave-up arc
    const xOffsetBase = 180; // Increased spread from 140
    
    const targetAngle = pair * angleBase * (isRight ? 1 : -1);
    const targetYOffset = pair * yOffsetBase * pair; 
    const targetXOffset = pair * xOffsetBase * (isRight ? 1 : -1);
    
    const angle = targetAngle * scrollProgress;
    const yOffset = targetYOffset * scrollProgress;
    const xOffset = targetXOffset * scrollProgress;
    
    return {
      transform: `rotate(${angle}deg) translate(${xOffset}px, ${yOffset}px)`,
      zIndex: 10 - pair
    };
  };

  const renderHeatmap = () => {
    if (!data.heatmapDays || data.heatmapDays.length === 0) return null;
    
    const weeks = [];
    for (let i = 0; i < data.heatmapDays.length; i += 7) {
      weeks.push(data.heatmapDays.slice(i, i + 7));
    }

    return (
      <div className="repo-heatmap-grid">
        {weeks.map((week, wIndex) => (
          <div key={wIndex} className="repo-heatmap-col" style={{ animationDelay: `${wIndex * 0.01}s` }}>
            {week.map(day => {
              let opacity = 0;
              if (day.count >= 15) opacity = 1;
              else if (day.count >= 5) opacity = 0.6;
              else if (day.count >= 1) opacity = 0.2;
              
              return (
                <div 
                  key={day.date} 
                  className={`repo-heatmap-cell ${day.count > 0 ? 'active' : ''}`}
                  style={{ '--cell-opacity': opacity }}
                  title={`${day.count} contributions on ${day.date}`}
                />
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  const [skillsAnimated, setSkillsAnimated] = useState(false);
  useEffect(() => {
    if (!loading) {
      setTimeout(() => setSkillsAnimated(true), 1200);
    }
  }, [loading]);

  return (
    <div 
      className={`repo-page ${returningPhase ? `repo-page--${returningPhase}` : ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={scrollRef}
    >
      <div className="repo-page-inner">
        {loading && (
          <div className="repo-fan-loading">
            <span className="repo-loading-text">CONNECTING TO GITHUB...</span>
          </div>
        )}

        {!loading && !error && data && (
          <>
            <section className="repo-commits-section">
              <span className="repo-eyebrow">// MISSION ARCHIVE</span>
              
              <div className="repo-stats-row">
                <StatItem label="PROJECTS SHIPPED" value={12} delay={100} />
                <StatItem label="DOMAINS EXPLORED" value="5+" delay={300} isNumber={false} />
                <StatItem label="PRIMARY FOCUS" value="AI / FULL STACK" delay={500} isNumber={false} />
                <StatItem label="STARTED BUILDING" value="2023" delay={700} isNumber={false} />
              </div>

              <div className="repo-heatmap-wrapper">
                <div className="repo-heatmap-labels-y">
                  <span>Mon</span>
                  <span>Wed</span>
                  <span>Fri</span>
                </div>
                {renderHeatmap()}
              </div>

              <div className="repo-split-layout">
                <div className="repo-skills-section">
                  <span className="repo-eyebrow">// TECHNICAL STRENGTHS</span>
                  <div className="repo-skills-list">
                    {SKILL_STRENGTHS.map((skill, i) => (
                      <div key={skill.name} className="repo-skill-item">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-bar">
                          {Array.from({ length: 10 }).map((_, blockIdx) => (
                            <span 
                              key={blockIdx} 
                              className={`skill-block ${blockIdx < skill.score && skillsAnimated ? 'filled' : ''}`}
                              style={{ transitionDelay: `${i * 100 + blockIdx * 30}ms` }}
                            >
                              █
                            </span>
                          ))}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="repo-exploring-section">
                  <span className="repo-eyebrow">// CURRENTLY EXPLORING</span>
                  <ul className="repo-exploring-list">
                    <li>Agentic AI Systems</li>
                    <li>Reinforcement Learning</li>
                    <li>Multi-Agent Workflows</li>
                    <li>Immersive Interfaces</li>
                  </ul>
                </div>
              </div>

              <div className="repo-scroll-cue">
                &darr; SCROLL TO EXPLORE ARCHIVE
              </div>
            </section>

            <section className="repo-fan-section">
              <div 
                className="repo-fan-container" 
                style={{ 
                  transform: `perspective(1200px) rotateX(${parallax.x}deg) rotateY(${parallax.y}deg)` 
                }}
              >
                {/* Large Floating Preview inside sticky container */}
                <div className={`repo-floating-preview ${hoveredRepo && REPO_METADATA[hoveredRepo]?.screenshot ? 'visible' : ''}`}>
                  {hoveredRepo && REPO_METADATA[hoveredRepo]?.screenshot && (
                    <img src={REPO_METADATA[hoveredRepo].screenshot} alt="Project Preview" className="repo-preview-img" />
                  )}
                </div>

                {data.repos.map((repo, i) => (
                  <a 
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`repo-card repo-card--${i} ${returningPhase === 'glitch' ? 'glitch-anim' : ''} ${i === 0 ? 'repo-card--flagship' : ''}`}
                    style={getFanStyles(i, data.repos.length)}
                    onMouseEnter={() => setHoveredRepo(repo.name)}
                    onMouseLeave={() => setHoveredRepo(null)}
                  >
                    <div className="repo-card-inner">
                      <div className="repo-card-header">
                        <h3 className="repo-name">{repo.name}</h3>
                        <div className="repo-categories">
                          {repo.categories.map(cat => (
                            <span key={cat} className="repo-cat-badge">[{cat}]</span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="repo-impact">{repo.impact}</div>
                      
                      <p className="repo-desc">{repo.description}</p>
                      
                      <div className="repo-why">
                        <strong>The Why:</strong> {repo.why}
                      </div>
                      
                      <div className="repo-card-bottom">
                        <span className="repo-stars">★ {repo.stargazers_count}</span>
                        <span className="repo-updated">{formatRelativeTime(repo.updated_at)}</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </section>

            <section className="repo-footer">
              <span className="repo-footer-eyebrow">// MISSION COMPLETE</span>
              <h2 className="repo-footer-title">RETURN TO BASE</h2>
              <button className="repo-return-btn" onClick={handleReturnClick}>
                &larr; BACK TO HUB
              </button>
            </section>
          </>
        )}
      </div>
      
      <div className="repo-black-overlay" />
    </div>
  );
}
