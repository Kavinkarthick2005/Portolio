import { useState, useEffect, useRef, useCallback } from 'react';
import './ProjectStoryOverlay.css';

/* ─── DATA ENGINE ─── */
export const PROJECT_DATA = {
  'whisperflow': {
    title: 'WHISPERFLOW CRM',
    subtitle: 'Turn natural language into customer segments,\ncampaigns and AI-powered workflows.',
    screenshot: './whisperflow.png',
    intelligence: { status: 'ACTIVE', role: 'SOLO DEVELOPER', domain: 'AI CRM', timeline: '2025', stack: 'FASTAPI · REACT · GROQ' },
    hotspots: [
      { top: '35%', left: '20%', title: 'CAMPAIGN BUILDER', desc: 'Turns natural language into executable campaigns.\nSupports segmentation, automation and workflow generation.' },
      { top: '50%', left: '75%', title: 'AGENT MEMORY', desc: 'Maintains deep context across all multi-agent client interactions.' }
    ],
    why: 'WHY I BUILT THIS\n\nTraditional CRMs force marketers\nto learn complex software.\n\nI wanted software\nto learn marketers.',
    architecture: {
      nodes: [
        { id: 'user', label: 'User Intent', x: 20, y: 50, purpose: 'Input', deps: 'None' },
        { id: 'agent', label: 'Agent Layer', x: 50, y: 25, purpose: 'NLP Parsing', deps: 'Groq/Llama3' },
        { id: 'engine', label: 'Campaign Engine', x: 50, y: 75, purpose: 'Execution', deps: 'PostgreSQL' },
        { id: 'analytics', label: 'Analytics', x: 80, y: 50, purpose: 'Reporting', deps: 'Engine' }
      ],
      edges: [
        { from: 'user', to: 'agent' },
        { from: 'agent', to: 'engine' },
        { from: 'engine', to: 'analytics' }
      ]
    },
    metrics: [
      { label: 'CORE MODULES', value: 5, suffix: '+' },
      { label: 'AI WORKFLOWS', value: 6, suffix: '' },
      { label: 'INTEGRATED SYSTEMS', value: 4, suffix: '' },
      { label: 'BUILT FROM SCRATCH', value: 100, suffix: '%' }
    ],
    techStack: ['FASTAPI', 'POSTGRESQL', 'REACT', 'GROQ', 'VERCEL'],
    lessons: [
      'Building AI isn\'t difficult.',
      'Making AI reliable is.',
      'Users trust consistency\nmore than intelligence.'
    ],
    links: { demo: 'https://crm-theta-ashen-29.vercel.app/login', github: '#' }
  },
  'careerpro': {
    title: 'CAREERPRO',
    subtitle: 'Cloud-native career guidance platform serving\n1,000+ concurrent users under pressure.',
    screenshot: './careerpro.png',
    intelligence: { status: 'COMPLETED', role: 'BACKEND LEAD', domain: 'ED-TECH', timeline: '2023', stack: 'AZURE · FASTAPI · ML' },
    hotspots: [
      { top: '40%', left: '30%', title: 'PREDICTION ENGINE', desc: 'Machine learning pipeline processing student metrics to generate personalized roadmaps.' },
      { top: '60%', left: '60%', title: 'AZURE LOAD BALANCER', desc: 'Auto-scaling infrastructure handling intense hackathon traffic spikes.' }
    ],
    why: 'WHY I BUILT THIS\n\nCareer guidance is a luxury\nfor most Indian students.\n\nWe built a system to democratize it\nat a national scale.',
    architecture: {
      nodes: [
        { id: 'client', label: 'React Client', x: 20, y: 50, purpose: 'UI', deps: 'None' },
        { id: 'api', label: 'FastAPI Gateway', x: 50, y: 50, purpose: 'Routing', deps: 'Client' },
        { id: 'ml', label: 'ML Models', x: 80, y: 30, purpose: 'Inference', deps: 'Azure ML' },
        { id: 'db', label: 'PostgreSQL', x: 80, y: 70, purpose: 'Storage', deps: 'API' }
      ],
      edges: [
        { from: 'client', to: 'api' },
        { from: 'api', to: 'ml' },
        { from: 'api', to: 'db' }
      ]
    },
    metrics: [
      { label: 'CONCURRENT USERS', value: 1000, suffix: '+' },
      { label: 'PREDICTIONS/SEC', value: 50, suffix: '+' },
      { label: 'SIH RANKING', value: 50, suffix: ' (TOP)' },
      { label: 'UPTIME', value: 99.9, suffix: '%' }
    ],
    techStack: ['AZURE', 'FASTAPI', 'ML MODELS', 'POSTGRESQL', 'REACT'],
    lessons: [
      'Scale breaks everything.',
      'A perfect model is useless\nif the API gateway chokes.',
      'Optimize for the worst-case scenario.'
    ],
    links: { demo: 'https://careerpro01.vercel.app/dashboard', github: '#' }
  },
  'us': {
    title: 'US: COMPANION',
    subtitle: 'He/She/Us architecture. Shared memory systems\nand deep emotional context preservation.',
    screenshot: './us.png',
    intelligence: { status: 'LAUNCH CANDIDATE', role: 'FULL STACK', domain: 'LIFESTYLE', timeline: '2024', stack: 'FLUTTER · SUPABASE · LLAMA 3' },
    hotspots: [
      { top: '25%', left: '30%', title: 'THE "US" SPACE', desc: 'A shared neutral ground where AI mediates and preserves joint memories.' },
      { top: '55%', left: '70%', title: 'EMOTIONAL MEMORY', desc: 'Vector database storing conversational context to remember important relationship nuances.' }
    ],
    why: 'WHY I BUILT THIS\n\nMost relationship apps\nfeel transactional.\n\nI wanted to explore if AI could\npreserve shared memories humanely.',
    architecture: {
      nodes: [
        { id: 'he', label: 'He Space', x: 20, y: 25, purpose: 'Personal', deps: 'Auth' },
        { id: 'she', label: 'She Space', x: 20, y: 75, purpose: 'Personal', deps: 'Auth' },
        { id: 'us', label: 'Us Engine (AI)', x: 50, y: 50, purpose: 'Mediation', deps: 'Llama3' },
        { id: 'vector', label: 'Memory DB', x: 80, y: 50, purpose: 'Context', deps: 'Supabase' }
      ],
      edges: [
        { from: 'he', to: 'us' },
        { from: 'she', to: 'us' },
        { from: 'us', to: 'vector' }
      ]
    },
    metrics: [
      { label: 'LATENCY', value: 400, suffix: 'ms' },
      { label: 'CUSTOM COMPONENTS', value: 45, suffix: '+' },
      { label: 'AI PERSONAS', value: 3, suffix: '' },
      { label: 'MEMORY RECALL', value: 95, suffix: '%' }
    ],
    techStack: ['FLUTTER', 'SUPABASE', 'GROQ', 'FIREBASE', 'RUST'],
    lessons: [
      'Design dictates emotion.',
      'Vector search is easy.\nCurating what to remember is hard.',
      'The UI must disappear.'
    ],
    links: { demo: 'https://us-nu-three.vercel.app/', github: 'https://github.com/Kavinkarthick2005/US' }
  },
  'carbon_aqi': {
    title: 'LIVE AIR QUALITY COMMAND CENTER',
    subtitle: 'Full-stack real-time platform tracking 10 Indian cities\nwith XGBoost prediction and RL mitigation.',
    screenshot: './carbon_aqi.png',
    intelligence: { status: 'SHIPPED', role: 'AI RESEARCH', domain: 'ENVIRONMENT', timeline: '2024', stack: 'PYTHON · RL · XGBOOST' },
    hotspots: [
      { top: '30%', left: '20%', title: 'XGBOOST PREDICTOR', desc: 'Real-time forecasting of PM2.5 and AQI levels across urban grids.' },
      { top: '65%', left: '75%', title: 'PPO MITIGATION AGENT', desc: 'Reinforcement learning model that actively suggests optimal policy changes to lower pollution.' }
    ],
    why: 'WHY I BUILT THIS\n\nTracking pollution is passive.\n\nI wanted to move beyond observation\nby using RL to actively suggest solutions.',
    architecture: {
      nodes: [
        { id: 'sensors', label: 'Data Stream', x: 20, y: 50, purpose: 'Ingestion', deps: 'APIs' },
        { id: 'xgb', label: 'XGBoost', x: 50, y: 25, purpose: 'Prediction', deps: 'Data Stream' },
        { id: 'rl', label: 'RL Agent', x: 50, y: 75, purpose: 'Mitigation', deps: 'XGBoost' },
        { id: 'dash', label: 'Command Center', x: 80, y: 50, purpose: 'Visualization', deps: 'React' }
      ],
      edges: [
        { from: 'sensors', to: 'xgb' },
        { from: 'xgb', to: 'rl' },
        { from: 'xgb', to: 'dash' },
        { from: 'rl', to: 'dash' }
      ]
    },
    metrics: [
      { label: 'CITIES TRACKED', value: 10, suffix: '' },
      { label: 'PREDICTION ACCURACY', value: 92, suffix: '%' },
      { label: 'RL ENVIRONMENTS', value: 4, suffix: '' },
      { label: 'DATA POINTS/DAY', value: 100, suffix: 'K+' }
    ],
    techStack: ['PYTHON', 'XGBOOST', 'PYTORCH', 'REACT', 'FASTAPI'],
    lessons: [
      'Data is noisy.',
      'RL agents exploit bad reward functions\nfaster than you can fix them.',
      'Simplicity scales.'
    ],
    links: { demo: '#', github: '#' }
  },
  'rehab_vr': {
    title: 'VR REHABILITATION SYSTEM',
    subtitle: 'Therapeutic VR mini-game transforming stroke assessment\ninto an immersive fish-feeding experience.',
    screenshot: './rehab_vr.png',
    intelligence: { status: 'CLINICAL CONCEPT', role: 'VR DEV', domain: 'HEALTHCARE', timeline: '2023', stack: 'UNITY · C# · VR' },
    hotspots: [
      { top: '40%', left: '25%', title: 'HAND TRACKING', desc: 'Precision kinematic tracking to measure patient motor control recovery.' },
      { top: '50%', left: '80%', title: 'DYNAMIC DIFFICULTY', desc: 'Adjusts fish speed and distance based on patient fatigue and capability.' }
    ],
    why: 'WHY I BUILT THIS\n\nClinical therapy is tedious.\n\nI wanted to explore accessible rehabilitation\nthrough gamified interaction and measurable outcomes.',
    architecture: {
      nodes: [
        { id: 'player', label: 'VR Headset', x: 20, y: 50, purpose: 'Input', deps: 'Sensors' },
        { id: 'physics', label: 'Physics Engine', x: 50, y: 30, purpose: 'Simulation', deps: 'Unity' },
        { id: 'logic', label: 'Game Logic', x: 50, y: 70, purpose: 'Mechanics', deps: 'C#' },
        { id: 'analytics', label: 'Therapy Metrics', x: 80, y: 50, purpose: 'Assessment', deps: 'Cloud' }
      ],
      edges: [
        { from: 'player', to: 'physics' },
        { from: 'player', to: 'logic' },
        { from: 'physics', to: 'logic' },
        { from: 'logic', to: 'analytics' }
      ]
    },
    metrics: [
      { label: 'TRACKING LATENCY', value: 12, suffix: 'ms' },
      { label: 'FRAMES PER SEC', value: 90, suffix: ' (LOCKED)' },
      { label: 'ASSESSMENT METRICS', value: 15, suffix: '' },
      { label: 'IMMERSION SCORE', value: 98, suffix: '%' }
    ],
    techStack: ['UNITY 3D', 'C#', 'OCULUS SDK', 'XR INTERACTION', 'FIREBASE'],
    lessons: [
      'Motion sickness ruins good mechanics.',
      'Patients need immediate visual feedback.',
      'Designing for accessibility\nchanges how you write code.'
    ],
    links: { demo: '#', github: '#' }
  }
};

/* ─── SCROLL RIG & UTILS ─── */
const TOTAL_VH = 500; // 500vh scroll space

function useCountUp(end, active, duration = 1200) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) {
      setCount(0);
      return;
    }
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
  }, [end, active, duration]);

  return count;
}

/* ─── COMPONENT ─── */
export default function ProjectStoryOverlay({ projectId, onClose }) {
  const data = PROJECT_DATA[projectId];
  
  const scrollRef = useRef(null);
  const [progress, setProgress] = useState(0); // 0.0 to 1.0 mapping across 500vh
  const [returning, setReturning] = useState(false);
  const [hotspotHover, setHotspotHover] = useState(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      // 100vh is the viewport. Scrollable area is TOTAL_VH - 100vh.
      const scrollableHeight = (TOTAL_VH - 100) * (window.innerHeight / 100);
      const scrolled = el.scrollTop;
      const rawProgress = Math.min(1, Math.max(0, scrolled / scrollableHeight));
      setProgress(rawProgress);
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  // Custom Radar Cursor
  const cursorRef = useRef(null);
  useEffect(() => {
    const handleMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  const handleReturnClick = () => {
    if (returning) return;
    setReturning('collapse');
    setTimeout(() => setReturning('glitch'), 400);
    setTimeout(() => setReturning('black'), 700);
    setTimeout(() => {
      if (onClose) onClose();
    }, 850);
  };

  if (!data) return null;

  /* 
    SCENE MATH (0.0 to 1.0 total progress over 500vh):
    0.00 - 0.12 : Scene 1 (Hero)
    0.12 - 0.25 : Scene 2 (Intelligence)
    0.25 - 0.37 : Scene 3 (Hotspots)
    0.37 - 0.50 : Scene 4 (Why)
    0.50 - 0.62 : Scene 5 (Architecture AR)
    0.62 - 0.75 : Scene 6 (Metrics)
    0.75 - 0.88 : Scene 7 (Tech Stack)
    0.88 - 1.00 : Scene 8 (Lessons & Exit)
  */

  const getSceneState = (start, end) => {
    if (progress < start) return 0; // Pre
    if (progress > end) return 1;   // Post
    return (progress - start) / (end - start); // Active
  };

  // Scene 1: Hero (Scale up, Blur out)
  const heroProgress = getSceneState(0, 0.12);
  const titleOpacity = heroProgress > 0.2 ? Math.min(1, (heroProgress - 0.2) / 0.8) : 0;
  
  // Scene 2: Intelligence
  const intellProgress = getSceneState(0.12, 0.25);
  // Hide intelligence during later scenes
  const intellOpacity = intellProgress > 0 ? (getSceneState(0.25, 0.3) > 0 ? 1 - getSceneState(0.25, 0.3) : intellProgress) : 0;

  // Scene 3: Hotspots
  const hsProgress = getSceneState(0.25, 0.37);
  const hsOpacity = hsProgress > 0 ? (getSceneState(0.37, 0.45) > 0 ? 1 - getSceneState(0.37, 0.45) : hsProgress) : 0;
  const isHotspotActive = hsOpacity > 0.5;

  // Scene 4: Why
  const whyProgress = getSceneState(0.37, 0.50);
  const whyOpacity = whyProgress > 0 ? (getSceneState(0.50, 0.6) > 0 ? 1 - getSceneState(0.50, 0.6) : whyProgress) : 0;
  const whyY = 40 * (1 - whyProgress);

  // Scene 5: Architecture
  const arProgress = getSceneState(0.50, 0.62);
  const arOpacity = arProgress > 0 ? (getSceneState(0.62, 0.7) > 0 ? 1 - getSceneState(0.62, 0.7) : arProgress) : 0;

  // Scene 6: Metrics
  const metProgress = getSceneState(0.62, 0.75);
  const metOpacity = metProgress > 0 ? (getSceneState(0.75, 0.85) > 0 ? 1 - getSceneState(0.75, 0.85) : metProgress) : 0;

  // Scene 7: Tech Stack
  const stackProgress = getSceneState(0.75, 0.88);
  const stackOpacity = stackProgress > 0 ? (getSceneState(0.88, 0.95) > 0 ? 1 - getSceneState(0.88, 0.95) : stackProgress) : 0;

  // Scene 8: Lessons & Exit
  const exitProgress = getSceneState(0.88, 1.0);
  const lessonOpacity = exitProgress;
  
  // Master Screenshot Styling
  // Fades into background ONLY in Scene 8.
  let screenshotScale = 0.95 + (0.05 * heroProgress);
  let screenshotBlur = 20 * (1 - heroProgress);
  let screenshotDim = 0;

  if (isHotspotActive) screenshotDim = 0.3;
  if (whyOpacity > 0) screenshotDim = 0.4;
  if (arOpacity > 0) screenshotDim = 0.6; // AR needs dark background
  if (metOpacity > 0) screenshotDim = 0.2;
  if (exitProgress > 0) {
    screenshotDim = 0.85 * exitProgress;
    screenshotScale = 1 - (0.05 * exitProgress);
    screenshotBlur = 10 * exitProgress;
  }

  return (
    <div 
      className={`ps-overlay ${returning ? `ps-overlay--${returning}` : ''} ${isHotspotActive ? 'ps-cursor-radar' : ''}`}
      ref={scrollRef}
    >
      <div className="ps-custom-cursor" ref={cursorRef} />
      
      {/* 500vh scroll track */}
      <div className="ps-scroll-track" style={{ height: `${TOTAL_VH}vh` }}>
        
        {/* Sticky Viewport Stage */}
        <div className="ps-sticky-stage">
          
          {/* Main Product Hero (The Stage) */}
          <div className="ps-hero-container" style={{ transform: `scale(${screenshotScale})` }}>
            <img 
              src={data.screenshot} 
              alt={data.title} 
              className="ps-hero-img" 
              style={{ 
                filter: `blur(${screenshotBlur}px)`,
                opacity: 1 - screenshotDim 
              }} 
            />

            {/* Scene 3: Hotspots Layer */}
            <div className="ps-layer ps-layer-hotspots" style={{ opacity: hsOpacity, pointerEvents: hsOpacity > 0.5 ? 'auto' : 'none' }}>
              {data.hotspots.map((hs, i) => (
                <div 
                  key={i} 
                  className="ps-hotspot-ring" 
                  style={{ top: hs.top, left: hs.left }}
                  onMouseEnter={() => setHotspotHover(hs)}
                  onMouseLeave={() => setHotspotHover(null)}
                >
                  <div className="ps-hotspot-core" />
                  <div className="ps-hotspot-pulse" />
                </div>
              ))}
              
              {/* Hotspot Floating Card */}
              <div className={`ps-hotspot-card ${hotspotHover ? 'visible' : ''}`}>
                {hotspotHover && (
                  <>
                    <h4 className="ps-hc-title">{hotspotHover.title}</h4>
                    <p className="ps-hc-desc">{hotspotHover.desc}</p>
                  </>
                )}
              </div>
            </div>

            {/* Scene 5: Architecture AR Layer */}
            <div className="ps-layer ps-layer-ar" style={{ opacity: arOpacity }}>
              <svg className="ps-ar-svg" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                {data.architecture.edges.map((e, i) => {
                  const fromNode = data.architecture.nodes.find(n => n.id === e.from);
                  const toNode = data.architecture.nodes.find(n => n.id === e.to);
                  return (
                    <line 
                      key={i} 
                      x1={`${fromNode.x}%`} 
                      y1={`${fromNode.y}%`} 
                      x2={`${toNode.x}%`} 
                      y2={`${toNode.y}%`} 
                      className="ps-ar-edge" 
                      style={{ strokeDashoffset: arOpacity > 0.5 ? 0 : 1000 }}
                    />
                  );
                })}
              </svg>
              {data.architecture.nodes.map(n => (
                <div className="ps-ar-node" key={n.id} style={{ left: `${n.x}%`, top: `${n.y}%` }}>
                  <div className="ps-ar-node-dot" />
                  <div className="ps-ar-node-card">
                    <span className="ps-ar-node-label">{n.label}</span>
                    <div className="ps-ar-node-meta">
                      <span><strong>USE:</strong> {n.purpose}</span>
                      <span><strong>DEP:</strong> {n.deps}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Scene 6: Metrics Layer */}
            <div className="ps-layer ps-layer-metrics" style={{ opacity: metOpacity }}>
              {data.metrics.map((m, i) => {
                const positions = [
                  { top: '-10%', left: '10%' },
                  { top: '40%', right: '-15%' },
                  { bottom: '-10%', right: '20%' },
                  { bottom: '20%', left: '-10%' }
                ];
                const pos = positions[i % 4];
                return (
                  <div key={i} className="ps-metric-card" style={pos}>
                    <span className="ps-mc-value">
                      {m.prefix}<MetricCounter value={m.value} active={metOpacity > 0.3} />{m.suffix}
                    </span>
                    <span className="ps-mc-label">{m.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Scene 7: Tech Stack Layer */}
            <div className="ps-layer ps-layer-stack" style={{ opacity: stackOpacity }}>
              {data.techStack.map((tech, i) => {
                const angle = (i / data.techStack.length) * Math.PI * 2;
                const radius = 45; // 45% radius from center
                const top = 50 + radius * Math.sin(angle) + '%';
                const left = 50 + radius * Math.cos(angle) + '%';
                
                return (
                  <div key={tech} className="ps-stack-chip" style={{ top, left, transitionDelay: `${i * 100}ms` }}>
                    {tech}
                  </div>
                );
              })}
            </div>

          </div>

          {/* Non-Product Overlay Typography Elements */}
          
          {/* Scene 1: Title */}
          <div className="ps-hero-text" style={{ opacity: titleOpacity, display: titleOpacity > 0 && heroProgress < 0.25 ? 'flex' : 'none' }}>
            <h1 className="ps-title">{data.title}</h1>
            <p className="ps-subtitle">{data.subtitle}</p>
          </div>

          {/* Scene 2: Intelligence */}
          <div className="ps-intelligence" style={{ opacity: intellOpacity, display: intellOpacity > 0 ? 'flex' : 'none' }}>
            <div className="ps-intel-item"><span>STATUS</span><strong>{data.intelligence.status}</strong></div>
            <div className="ps-intel-item"><span>ROLE</span><strong>{data.intelligence.role}</strong></div>
            <div className="ps-intel-item"><span>DOMAIN</span><strong>{data.intelligence.domain}</strong></div>
            <div className="ps-intel-item"><span>TIMELINE</span><strong>{data.intelligence.timeline}</strong></div>
            <div className="ps-intel-item"><span>STACK</span><strong>{data.intelligence.stack}</strong></div>
          </div>

          {/* Scene 4: Why Typography */}
          <div className="ps-why-text" style={{ opacity: whyOpacity, transform: `translateY(${whyY}px)`, display: whyOpacity > 0 ? 'block' : 'none' }}>
            {data.why.split('\n').map((line, i) => (
              <p key={i} className={i === 0 ? 'ps-why-header' : 'ps-why-body'}>{line}</p>
            ))}
          </div>

          {/* Scene 8: Lessons & Exit */}
          <div className="ps-exit-section" style={{ opacity: lessonOpacity, pointerEvents: lessonOpacity > 0.8 ? 'auto' : 'none' }}>
            <h2 className="ps-lessons-header">LESSONS LEARNED</h2>
            <div className="ps-lessons-list">
              {data.lessons.map((lesson, i) => (
                <p key={i} className="ps-lesson-item" style={{ transitionDelay: `${i * 300}ms` }}>{lesson}</p>
              ))}
            </div>

            <div className="ps-exit-actions">
              <a href={data.links.demo} target="_blank" rel="noopener noreferrer" className="ps-btn ps-btn-primary">LIVE DEMO</a>
              <a href={data.links.github} target="_blank" rel="noopener noreferrer" className="ps-btn ps-btn-secondary">GITHUB</a>
              <button onClick={handleReturnClick} className="ps-btn ps-btn-return">RETURN TO HUB</button>
            </div>
          </div>

        </div>
      </div>
      
      {/* Glitch Overlay Elements */}
      <div className="ps-black-overlay" />
    </div>
  );
}

// Sub-component for animated metrics
function MetricCounter({ value, active }) {
  const count = useCountUp(value, active, 1500);
  return <span>{count}</span>;
}
