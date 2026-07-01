import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ScrollContainer } from '../animation/ScrollContainer';
import { SequenceManager } from '../animation/SequenceManager';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { Code, Database, Globe, Cpu } from 'lucide-react';

const skillSections = [
  {
    id: 1,
    title: "Full Stack Development",
    subtitle: "Frontend + Backend engineering",
    points: [
      "React, Vue, Tailwind CSS",
      "Node.js, Express, PostgreSQL",
      "REST APIs, Authentication, JWT",
      "Component-driven architecture",
    ],
    icon: <Code size={26} />,
    accent: "from-cyan-500/10 to-blue-500/10",
    iconColor: "text-cyan-400",
    iconBg: "bg-cyan-500/10 border-cyan-500/20",
  },
  {
    id: 2,
    title: "AI / RAG / Agentic Systems",
    subtitle: "LLMs, reasoning pipelines, intelligent agents",
    points: [
      "RAG pipelines (retrieval + generation)",
      "Vector DBs (Pinecone, FAISS)",
      "Prompt engineering & chaining",
      "Agentic workflows (tool use, memory, planning)",
    ],
    icon: <Cpu size={26} />,
    accent: "from-violet-500/10 to-purple-500/10",
    iconColor: "text-violet-400",
    iconBg: "bg-violet-500/10 border-violet-500/20",
  },
  {
    id: 3,
    title: "Cloud & DevOps",
    subtitle: "Scalable deployment & infrastructure",
    points: [
      "AWS / basic cloud architecture",
      "Docker containerization",
      "CI/CD pipelines",
      "Kubernetes basics",
    ],
    icon: <Globe size={26} />,
    accent: "from-emerald-500/10 to-teal-500/10",
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    id: 4,
    title: "System Design",
    subtitle: "Large-scale architecture thinking",
    points: [
      "Scalability patterns",
      "Microservices vs monolith tradeoffs",
      "Caching strategies (Redis, CDN)",
      "Database design & sharding basics",
    ],
    icon: <Database size={26} />,
    accent: "from-amber-500/10 to-orange-500/10",
    iconColor: "text-amber-400",
    iconBg: "bg-amber-500/10 border-amber-500/20",
  },
];

const achievements = [
  
  {
    id: 2,
    platform: "LeetCode",
    value: 250,
    decimals: 0,
    unit: "+ solved",
    points: [ "Data Structures & Algorithms","Arrays,DP, Graphs,Trees", "Consistent problem streak"],
    link: "https://leetcode.com/u/pratham_coder/",
    color: "yellow",
  },
  {
    id: 3,
    platform: "Codeforces",
    value: 1265,
    decimals: 0,
    unit: "max rating",
    badge: "Pupil",
    badgeColor: "text-blue-400",
    points: ["Active contest participation", "Steady rating growth"],
    link: "https://codeforces.com/profile/Pratham_k314",
    color: "blue",
  },
  {
    id: 4,
    platform: "CodeChef",
    value: 1610,
    decimals: 0,
    unit: "max rating",
    badge: "★★★ 3-Star",
    badgeColor: "text-amber-400",
    points: ["Improved problem-solving under time pressure", " greedy, implementation and constructive problems"],
    link: "https://www.codechef.com/users/cry_map_60",
    color: "amber",
  },
  {
    id: 5,
    platform: "Projects",
    value: 5,
    decimals: 0,
    unit: "+ built",
    points: ["Full-stack applications", "AI / RAG pipelines", "Open-source contributions"],
    link: null,
    color: "emerald",
  },
  {
    id: 1,
    platform: "JEE Main",
    value: 99.28,
    decimals: 2,
    unit: "percentile",
    desc: "Consistent prep and strong analytical problem-solving across Maths, Physics & Chemistry.",
    link: null,
    color: "cyan",
  },
];

// ─── Blinking cursor ────────────────────────────────────────────────────────
function TerminalCursor() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setVisible(v => !v), 530);
    return () => clearInterval(t);
  }, []);
  return (
    <span
      style={{
        display: 'inline-block',
        width: '0.55em',
        height: '1.1em',
        background: visible ? '#e2e8f0' : 'transparent',
        verticalAlign: 'text-bottom',
        marginLeft: '3px',
        borderRadius: '1px',
        transition: 'background 0.08s',
      }}
    />
  );
}

const roles = [
  "Full Stack Developer",
  "Problem Solver",
  "GenAI Engineer",
  "Software Engineer",
  "Building Scalable Systems",
];

function TypewriterEffect() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    let timeout;
    if (!isDeleting && displayText === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentRoleIndex(prev => (prev + 1) % roles.length);
    } else {
      timeout = setTimeout(() => {
        setDisplayText(prev =>
          isDeleting ? prev.slice(0, -1) : currentRole.slice(0, prev.length + 1)
        );
      }, isDeleting ? 40 : 80);
    }
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRoleIndex]);

  return (
    <span className="font-mono min-h-[24px] text-2xl inline-block" style={{ color: '#22d3ee' }}>
      {displayText}
      <span className="animate-pulse" style={{ color: '#22d3ee' }}>|</span>
    </span>
  );
}

// ─── Scroll-fade wrapper ─────────────────────────────────────────────────────
function ShadeAway({ children, style = {}, className = '' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const rawOpacity = useTransform(scrollYProgress, [0, 0.12, 0.65, 0.88, 1], [0, 1, 1, 0, 0]);
  const rawY = useTransform(scrollYProgress, [0, 0.12, 0.65, 0.88, 1], [40, 0, 0, -30, -50]);
  const opacity = useSpring(rawOpacity, { stiffness: 60, damping: 22 });
  const y = useSpring(rawY, { stiffness: 60, damping: 22 });

  return (
    <motion.div ref={ref} style={{ opacity, y, ...style }} className={className}>
      {children}
    </motion.div>
  );
}

// ─── Count-up hook ───────────────────────────────────────────────────────────
function useCountUp(target, decimals = 0, duration = 1600) {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const startTime = performance.now();
    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = target * ease;
      setValue(decimals > 0 ? parseFloat(current.toFixed(decimals)) : Math.floor(current));
      if (progress < 1) requestAnimationFrame(step);
      else setValue(target);
    };
    requestAnimationFrame(step);
  }, [started, target, decimals, duration]);

  return { value, ref };
}

// ─── Achievement Card ────────────────────────────────────────────────────────
function AchievementCard({ ach, index }) {
  const { value, ref } = useCountUp(ach.value, ach.decimals);

  const accentMap = {
    cyan:    { border: 'rgba(34,211,238,0.2)',   glow: 'rgba(34,211,238,0.08)',  num: '#22d3ee' },
    yellow:  { border: 'rgba(250,204,21,0.2)',   glow: 'rgba(250,204,21,0.06)',  num: '#fbbf24' },
    blue:    { border: 'rgba(99,102,241,0.2)',   glow: 'rgba(99,102,241,0.07)',  num: '#818cf8' },
    amber:   { border: 'rgba(245,158,11,0.2)',   glow: 'rgba(245,158,11,0.07)', num: '#f59e0b' },
    emerald: { border: 'rgba(16,185,129,0.2)',   glow: 'rgba(16,185,129,0.07)', num: '#34d399' },
  };
  const accent = accentMap[ach.color] || accentMap.cyan;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: false, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5, transition: { duration: 0.25 } }}
      style={{
        background: `rgba(10, 15, 30, 0.55)`,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${accent.border}`,
        borderRadius: '20px',
        padding: '28px 26px 22px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: `0 4px 32px rgba(0,0,0,0.4), inset 0 0 60px ${accent.glow}`,
        cursor: 'default',
      }}
    >
      {/* top-left glow */}
      <div style={{
        position: 'absolute', top: 0, left: 0,
        width: 120, height: 120,
        background: `radial-gradient(circle, ${accent.glow} 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      <p style={{
        fontFamily: 'monospace', fontSize: '0.58rem', letterSpacing: '0.32em',
        textTransform: 'uppercase', color: 'rgba(148,163,184,0.38)', marginBottom: 10,
      }}>
        {ach.platform}
      </p>

      <div style={{ marginBottom: 10 }}>
        <span style={{
          fontSize: '2.8rem', fontWeight: 800, color: accent.num,
          lineHeight: 1, letterSpacing: '-0.03em',
        }}>
          {ach.decimals > 0 ? value.toFixed(ach.decimals) : value}
        </span>
        <span style={{ fontSize: '0.9rem', color: 'rgba(148,163,184,0.45)', marginLeft: 5 }}>
          {ach.unit}
        </span>
      </div>

      {ach.badge && (
        <p style={{ fontSize: '0.82rem', marginBottom: 10 }} className={ach.badgeColor}>
          {ach.badge}
        </p>
      )}

      {ach.desc && (
        <p style={{ color: 'rgba(203,213,225,0.5)', fontSize: '0.83rem', lineHeight: 1.7, marginBottom: 14 }}>
          {ach.desc}
        </p>
      )}

      {ach.points && (
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 14px' }}>
          {ach.points.map((pt, i) => (
            <li key={i} style={{ color: 'rgba(203,213,225,0.5)', fontSize: '0.82rem', lineHeight: 2, display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ color: accent.num, fontSize: '0.7rem' }}>▸</span> {pt}
            </li>
          ))}
        </ul>
      )}

      {ach.link && (
        <a
          href={ach.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            padding: '5px 14px', borderRadius: 8,
            border: `1px solid ${accent.border}`,
            color: 'rgba(203,213,225,0.55)', fontSize: '0.72rem',
            fontFamily: 'monospace', letterSpacing: '0.06em',
            textDecoration: 'none', transition: 'all 0.22s',
            cursor: 'pointer',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = accent.num; e.currentTarget.style.borderColor = accent.border.replace('0.2', '0.5'); }}
          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(203,213,225,0.55)'; e.currentTarget.style.borderColor = accent.border; }}
        >
          View Profile ↗
        </a>
      )}
    </motion.div>
  );
}

// ─── Skill Card (stacked, full-width) ───────────────────────────────────────
function SkillCard({ section, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, margin: '-80px' }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="relative group"
      style={{ marginBottom: '16px', pointerEvents: 'auto' }}
    >
      <div
        style={{
          background: 'rgba(10, 15, 30, 0.5)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '18px',
          padding: '28px 32px',
          position: 'relative',
          overflow: 'hidden',
          transition: 'border-color 0.3s, box-shadow 0.3s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)';
          e.currentTarget.style.boxShadow = '0 8px 40px rgba(0,0,0,0.35)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        {/* hover glow bg */}
        <div
          className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r ${section.accent}`}
          style={{ pointerEvents: 'none' }}
        />

        {/* bottom accent line */}
        <div
          className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
          style={{ background: 'linear-gradient(90deg, #22d3ee, #6366f1)' }}
        />

        <div className="relative flex items-start gap-5">
          {/* icon */}
          <div
            className={`flex-shrink-0 w-12 h-12 rounded-xl border flex items-center justify-center ${section.iconBg} ${section.iconColor}`}
          >
            {section.icon}
          </div>

          {/* content */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h3
                className={`text-lg font-semibold transition-colors duration-300 group-hover:${section.iconColor}`}
                style={{ color: '#e2e8f0' }}
              >
                {section.title}
              </h3>
            </div>
            <p style={{ color: 'rgba(148,163,184,0.45)', fontSize: '0.78rem', fontFamily: 'monospace', marginBottom: '14px' }}>
              {section.subtitle}
            </p>

            <ul className="flex flex-wrap gap-x-6 gap-y-1">
              {section.points.map((pt, i) => (
                <li
                  key={i}
                  style={{ color: 'rgba(203,213,225,0.6)', fontSize: '0.84rem', display: 'flex', alignItems: 'center', gap: 6 }}
                >
                  <span className={section.iconColor} style={{ fontSize: '0.65rem' }}>▹</span>
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Section Label ───────────────────────────────────────────────────────────
function SectionLabel({ text }) {
  return (
    <p style={{
      fontFamily: 'monospace', fontSize: '0.65rem', letterSpacing: '0.35em',
      textTransform: 'uppercase', color: 'rgba(148,163,184,0.38)', marginBottom: '1rem',
    }}>
      {text}
    </p>
  );
}

// ─── Ghost Button ────────────────────────────────────────────────────────────
function HeroButton({ href, children, variant = 'ghost', onClick, style = {}, whileHover = {} }) {
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: 7,
    padding: '10px 22px', borderRadius: '10px',
    fontSize: '0.83rem', fontWeight: 500, letterSpacing: '0.04em',
    textDecoration: 'none', cursor: 'pointer', fontFamily: 'inherit',
    border: 'none',
  };
  const variants = {
    primary: {
      background: '#22d3ee', color: '#070b14',
      boxShadow: '0 0 28px rgba(34,211,238,0.25)',
    },
    cyan: {
      background: 'rgba(34,211,238,0.08)', color: '#22d3ee',
      border: '1px solid rgba(34,211,238,0.25)',
    },
    ghost: {
      background: 'transparent', color: 'rgba(203,213,225,0.65)',
      border: '1px solid rgba(255,255,255,0.1)',
    },
  };

  return (
    <motion.a
      href={href || '#'}
      onClick={onClick}
      style={{ ...base, ...variants[variant], ...style }}
      whileHover={{ y: -2, ...whileHover }}
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.a>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────
export const Main = () => {
  const containerRef = useRef(null);
  const scrollProgress = useScrollProgress(containerRef);

  return (
    <ScrollContainer
      ref={containerRef}
      height="700vh"
      background={
        <SequenceManager
          totalFrames={35}
          directory="/cubola"
          prefix="frame-"
          extension="png"
          pad={3}
          scrollProgress={scrollProgress}
        />
      }
    >
      {/* ── Atmospheric vignette ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none',
        background: 'linear-gradient(to right, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.3) 55%, transparent 100%)',
      }} />

    <section id="home">
  <div style={{ position: 'absolute', inset: 0, zIndex: 20, pointerEvents: 'none' }}>
    <div style={{
      height: '100vh', display: 'flex', alignItems: 'center',
      padding: '0 clamp(2rem, 8vw, 7rem)',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        style={{ maxWidth: 580, pointerEvents: 'auto' }}
      >
        {/* eyebrow — amber dot for contrast */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          style={{
            fontFamily: 'monospace', fontSize: '0.7rem', letterSpacing: '0.25em',
            textTransform: 'uppercase', color: '#94a3b8', marginBottom: '0.8rem',
            display: 'flex', alignItems: 'center', gap: '0.5rem',
          }}
        >
          <span style={{
            width: 6, height: 6, borderRadius: '50%', background: '#fbbf24',
            boxShadow: '0 0 8px #fbbf24', display: 'inline-block',
          }} />
          Available for opportunities
        </motion.p>

        {/* name — gradient instead of flat blue */}
        <h1 style={{
          fontSize: 'clamp(2.2rem, 5.5vw, 4.2rem)',
          fontWeight: 700, color: '#f8fafc',
          lineHeight: 1.2, letterSpacing: '-0.02em',
          marginBottom: '1rem',
        }}>
          Hi, I am <br />
          <span style={{
            background: 'linear-gradient(90deg, #38bdf8 0%, #818cf8 55%, #c084fc 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 24px rgba(56,189,248,0.25))',
          }}>
            Pratham Kulkarni
          </span>
        </h1>

        {/* typewriter — swap cursor/accent to violet for variety */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          style={{ marginBottom: '1.4rem' }}
        >
          <TypewriterEffect accentColor="#a78bfa" />
        </motion.div>

        {/* bio — amber highlight instead of repeating blue */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.8 }}
          style={{
            color: '#94a3b8', fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
            lineHeight: 1.7, maxWidth: 500, marginBottom: '2.2rem',
          }}
        >
          Passionate developer crafting elegant solutions to complex problems.
          I specialise in high-performance full-stack apps, AI-powered pipelines,
          and scalable systems — with{' '}
          <span style={{ color: '#fbbf24', fontWeight: 600 }}>2+ years</span> of building things that matter.
        </motion.p>

        {/* CTA buttons — gradient primary + glow, glass secondary, outline ghost */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.8 }}
          style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}
        >
          <HeroButton
            href="#projects"
            style={{
              background: 'linear-gradient(90deg, #38bdf8, #818cf8)',
              color: '#0f172a',
              fontWeight: 600,
              boxShadow: '0 4px 24px rgba(56,189,248,0.35)',
              border: 'none',
            }}
            whileHover={{
              boxShadow: '0 8px 32px rgba(56,189,248,0.6)',
              filter: 'brightness(1.1)',
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
            View Projects
          </HeroButton>

          <HeroButton
            href="#contact"
            style={{
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(148,163,184,0.25)',
              color: '#e2e8f0',
            }}
            whileHover={{
              background: 'rgba(255,255,255,0.1)',
              boxShadow: '0 0 20px rgba(255,255,255,0.15)',
              color: '#ffffff'
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            Contact Me
          </HeroButton>

          <HeroButton
            href="/myResume.pdf"
            style={{
              background: 'transparent',
              border: '1px solid rgba(251,191,36,0.4)',
              color: '#fbbf24',
            }}
            whileHover={{
              background: 'rgba(251,191,36,0.1)',
              boxShadow: '0 0 20px rgba(251,191,36,0.3)',
              color: '#fcd34d'
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            Resume
          </HeroButton>
        </motion.div>
      </motion.div>
    </div>
  </div>
</section>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        style={{
          position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)',
          zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          pointerEvents: 'none',
        }}
      >
        <div style={{
          width: 1, height: 48,
          background: 'linear-gradient(to bottom, rgba(34,211,238,0.6), transparent)',
          animation: 'pulse 2s ease-in-out infinite',
        }} />
        <p style={{
          fontFamily: 'monospace', fontSize: '0.57rem', letterSpacing: '0.3em',
          textTransform: 'uppercase', color: 'rgba(148,163,184,0.28)',
        }}>scroll</p>
      </motion.div>
      {/* 
      Section - About =======================================
      */}

      {/* <div className='h-screen'></div> */}
      <section
  id="about"
  style={{
    marginTop: '20rem',
    maxWidth: '760px',
    pointerEvents: 'auto',
  }}

  className='absolute top-[100vh] ml-[15vh]'
>
  <SectionLabel text="About" />

  <h2
    style={{
      fontSize: 'clamp(1.9rem, 5vw, 3.4rem)',
      fontWeight: 700,
      color: '#e2e8f0',
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      marginBottom: '2rem',
    }}
  >
    A developer who
    <br />
    <span style={{ color: '#22d3ee' }}>
      loves the craft.
    </span>
  </h2>

  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
    }}
  >
    <p
      style={{
        color: 'rgba(203,213,225,0.65)',
        lineHeight: 1.9,
        fontSize: '1rem',
      }}
    >
      I'm a B.Tech student at IIIT Pune passionate about
      building software that is fast, scalable, and enjoyable
      to use. My interests span full-stack development,
      AI-powered applications, and competitive programming.
    </p>

    <p
      style={{
        color: 'rgba(203,213,225,0.65)',
        lineHeight: 1.9,
        fontSize: '1rem',
      }}
    >
      I enjoy turning ideas into polished products, whether
      it's a web application, an intelligent system, or a
      tool that solves a real problem. Clean architecture,
      maintainable code, and thoughtful user experiences are
      things I care deeply about.
    </p>

    <p
      style={{
        color: 'rgba(203,213,225,0.65)',
        lineHeight: 1.9,
        fontSize: '1rem',
      }}
    >
      Outside development, I spend much of my time solving
      algorithmic problems, participating in programming
      contests, and exploring system design, distributed
      systems, and scalable software architecture.
    </p>
  </div>
</section>

      {/* ══════════════════════════════════════
          SECTION 2 — ACHIEVEMENTS
      ══════════════════════════════════════ */}
      <div style={{
        position: 'absolute', top: '300vh', left: 0, right: 0, zIndex: 20,
        padding: 'clamp(4rem, 10vh, 7rem) clamp(2rem, 8vw, 7rem)',
        pointerEvents: 'none',
      }}
      className=''
      >
        <ShadeAway style={{ marginBottom: '3rem', pointerEvents: 'auto', maxWidth: 560 }}>
          <SectionLabel text="Recognition" />
          <h2 style={{
            fontSize: 'clamp(1.9rem, 5vw, 3.4rem)', fontWeight: 700,
            color: '#e2e8f0', lineHeight: 1.1, letterSpacing: '-0.02em',
          }}>
            Proof through{' '}
            <span style={{ color: '#22d3ee' }}>consistency.</span>
          </h2>
        </ShadeAway>

        {/* achievements grid — 3 cols then 2 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
          gap: '16px',
          maxWidth: 920,
          pointerEvents: 'auto',
        }}>
          {achievements.map((ach, i) => (
            <AchievementCard key={ach.id} ach={ach} index={i} />
          ))}
        </div>

        {/* ══════════════════════════════════════
            SECTION 3 — SKILLS (stacked)
        ══════════════════════════════════════ */}
        <section id="skills">
        <ShadeAway style={{ marginTop: '20rem', marginBottom: '2.5rem', pointerEvents: 'auto', maxWidth: 560 }}>
          <SectionLabel text="Capabilities" />
          <h2 style={{
            fontSize: 'clamp(1.9rem, 5vw, 3.4rem)', fontWeight: 700,
            color: '#e2e8f0', lineHeight: 1.1, letterSpacing: '-0.02em',
          }}>
            Skills &{' '}
            <span style={{ color: '#22d3ee' }}>Expertise</span>
          </h2>
        </ShadeAway>

        <div style={{ maxWidth: 860, pointerEvents: 'auto' }}>
          {skillSections.map((section, index) => (
            <SkillCard key={section.id} section={section} index={index} />
          ))}
        </div>
          </section>
      </div>
    </ScrollContainer>
  );
};