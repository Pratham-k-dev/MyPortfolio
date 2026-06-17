import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ScrollContainer } from '../animation/ScrollContainer';
import { SequenceManager } from '../animation/SequenceManager';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { Code, Database, Globe, Cpu, ExternalLink } from 'lucide-react';
const skills = [
  { id: 1, title: 'Frontend Development', description: 'React, Vue, Tailwind CSS', icon: <Code size={24} /> },
  { id: 2, title: 'Backend Systems', description: 'Node.js, Python, PostgreSQL', icon: <Database size={24} /> },
  { id: 3, title: 'Cloud & DevOps', description: 'AWS, Docker, Kubernetes', icon: <Globe size={24} /> },
  { id: 4, title: 'System Architecture', description: 'Scalable design, microservices', icon: <Cpu size={24} /> },
];
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
  "AI Enthusiast",
  "Software Engineer",
  "Building Scalable Systems"
];

function TypewriterEffect() {
  const [currentRoleIndex, setCurrentRoleIndex] = React.useState(0);
  const [displayText, setDisplayText] = React.useState("");
  const [isDeleting, setIsDeleting] = React.useState(false);

  React.useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    let timeout;

    if (!isDeleting && displayText === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      timeout = setTimeout(() => {
        setDisplayText(prev => {
          if (isDeleting) return prev.slice(0, -1);
          return currentRole.slice(0, prev.length + 1);
        });
      }, isDeleting ? 40 : 80);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRoleIndex]);

  return (
    <span className="text-cyan-400 font-mono min-h-[24px] text-3xl inline-block">
      {displayText}
      <span className="animate-pulse text-white">|</span>
    </span>
  );
}

// ─── Scroll-fade wrapper ─────────────────────────────────────────────────────
// Wraps a section so it dissolves upward as it exits the viewport.
function ShadeAway({ children, style = {}, className = '' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // 0 → fully scrolled past (top), 1 → section below viewport
  // We want: enter from bottom (progress ~0) → visible (0.15–0.75) → fade out top (progress → 1)
  const rawOpacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.65, 0.88, 1],
    [0,  1,    1,    0,    0]
  );
  const rawY = useTransform(
    scrollYProgress,
    [0, 0.12, 0.65, 0.88, 1],
    [40,  0,   0,  -30, -50]
  );
  const opacity = useSpring(rawOpacity, { stiffness: 60, damping: 22 });
  const y       = useSpring(rawY,       { stiffness: 60, damping: 22 });

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, ...style }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Glassmorphism Achievement Card ─────────────────────────────────────────
function AchievementCard({ delay = 0, children }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const rawOp = useTransform(scrollYProgress, [0, 0.18, 0.7, 0.9, 1], [0, 1, 1, 0, 0]);
  const rawY  = useTransform(scrollYProgress, [0, 0.18, 0.7, 0.9, 1], [32, 0, 0, -20, -30]);
  const opacity = useSpring(rawOp, { stiffness: 55, damping: 20 });
  const y       = useSpring(rawY,  { stiffness: 55, damping: 20 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: false, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        y: -6,
        boxShadow: '0 8px 48px rgba(148,163,184,0.13), 0 0 0 1px rgba(255,255,255,0.12)',
        transition: { duration: 0.3 },
      }}
      style={{
        opacity,
        y,
        background: 'rgba(15, 23, 42, 0.45)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        border: '1px solid rgba(255,255,255,0.09)',
        borderRadius: '16px',
        padding: '28px 28px 24px',
        boxShadow: '0 4px 32px rgba(0,0,0,0.35)',
        cursor: 'default',
      }}
    >
      {children}
    </motion.div>
  );
}

// ─── Timeline entry ──────────────────────────────────────────────────────────
function TimelineEntry({ year, text }) {
  return (
    <div className="flex items-start gap-4 group">
      <div
        style={{
          fontFamily: 'monospace',
          color: 'rgba(148,163,184,0.5)',
          fontSize: '0.7rem',
          letterSpacing: '0.12em',
          minWidth: 38,
          paddingTop: 2,
        }}
      >
        {year}
      </div>
      <div
        style={{
          width: 1,
          minHeight: 44,
          background: 'rgba(148,163,184,0.15)',
          margin: '4px 0 0 0',
        }}
      />
      <p
        style={{
          color: 'rgba(203,213,225,0.75)',
          fontSize: '0.92rem',
          lineHeight: 1.65,
        }}
      >
        {text}
      </p>
    </div>
  );
}

// ─── Floating label ──────────────────────────────────────────────────────────
function SectionLabel({ text }) {
  return (
    <p
      style={{
        fontFamily: 'monospace',
        fontSize: '0.65rem',
        letterSpacing: '0.35em',
        textTransform: 'uppercase',
        color: 'rgba(148,163,184,0.45)',
        marginBottom: '1.1rem',
      }}
    >
      {text}
    </p>
  );
}

// ─── Ghost button ────────────────────────────────────────────────────────────
function GhostButton({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-block',
        marginTop: 16,
        padding: '7px 16px',
        borderRadius: 8,
        border: '1px solid rgba(255,255,255,0.12)',
        color: 'rgba(203,213,225,0.65)',
        fontSize: '0.75rem',
        letterSpacing: '0.08em',
        textDecoration: 'none',
        fontFamily: 'monospace',
        transition: 'border-color 0.25s, color 0.25s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.28)';
        e.currentTarget.style.color = 'rgba(226,232,240,0.95)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
        e.currentTarget.style.color = 'rgba(203,213,225,0.65)';
      }}
    >
      {children} ↗
    </a>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────
export const Main = () => {
  const containerRef = useRef(null);
  const scrollProgress = useScrollProgress(containerRef);

  return (
    <ScrollContainer
      ref={containerRef}
      height="600vh"
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
      {/* ── Atmospheric vignette — never removed ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 10,
          background:
            'linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.28) 55%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* ══════════════════════════════════════════
          SECTION 1 — HERO
      ══════════════════════════════════════════ */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 20,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            padding: '0 clamp(2rem, 8vw, 7rem)',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ maxWidth: 540, pointerEvents: 'auto' }}
          >
            {/* Name */}
            <h1
              style={{
                fontSize: 'clamp(3.2rem, 9vw, 7.5rem)',
                fontWeight: 600,
                color: '#f1f5f9',
                lineHeight: 0.95,
                letterSpacing: '-0.025em',
                marginBottom: '1.1rem',
              }}
            >
              Pratham Kulkarni
            </h1>
              <TypewriterEffect />

            {/* Subtitle */}
            <p
              style={{
                color: 'rgba(148,163,184,0.7)',
                fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                lineHeight: 1.65,
                // maxWidth: 400,
                marginTop: '1.5rem',
                fontWeight: 400,
              }}
            >
              I'm a passionate developer who loves crafting elegant solutions to complex problems. I specialize in building high-performance applications with clean, maintainable code.
            </p>
          </motion.div>
        </div>
      </div>

      

      {/* ══════════════════════════════════════════
          SECTION 2 — EDUCATION
      ══════════════════════════════════════════ */}
      {/* <div
        style={{
          position: 'absolute',
          top: '100vh',
          left: 0,
          right: 0,
          zIndex: 20,
          padding: '0 clamp(2rem, 8vw, 7rem)',
          display: 'flex',
          alignItems: 'center',
          minHeight: '100vh',
          pointerEvents: 'none',
          
        }}
        className='mt-20'
      >
        <ShadeAway style={{ maxWidth: 580, pointerEvents: 'auto' }}>
          <SectionLabel text="Education" />

          <h2
            style={{
              fontSize: 'clamp(2rem, 5.5vw, 3.8rem)',
              fontWeight: 700,
              color: '#e2e8f0',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: '1.6rem',
            }}
          >
            Building the foundation.
          </h2>

          <p
            style={{
              color: 'rgba(203,213,225,0.65)',
              fontSize: 'clamp(0.9rem, 1.8vw, 1.05rem)',
              lineHeight: 1.78,
              marginBottom: '2.8rem',
              maxWidth: 500,
            }}
          >
            Started my B.Tech journey with a strong interest in problem
            solving, mathematics, and software development. Over time,
            that curiosity evolved into a deeper focus on data structures,
            algorithms, system design, and AI-powered applications.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <TimelineEntry
              year="2024"
              text="Started B.Tech — first line of code became the first step of a longer journey."
            />
            <TimelineEntry
              year="2025"
              text="Competitive Programming & DSA — sharpening problem-solving through consistency."
            />
            <TimelineEntry
              year="2026"
              text="AI Systems, Full Stack Development, Retrieval Pipelines — building things that matter."
            />
          </div>
        </ShadeAway>
      </div> */}

      {/* ══════════════════════════════════════════
          SECTION 3 — ACHIEVEMENTS
      ══════════════════════════════════════════ */}
      <div
        style={{
          position: 'absolute',
          top: '100vh',
          left: 0,
          right: 0,
          zIndex: 20,
          padding: 'clamp(4rem, 10vh, 7rem) clamp(2rem, 8vw, 7rem)',
          minHeight: '120vh',
          pointerEvents: 'none',
        }}
      >
        {/* Section heading */}
        <ShadeAway
          style={{ marginBottom: '3.5rem', pointerEvents: 'auto', maxWidth: 540 }}
        >
          <SectionLabel text="Achievements" />
          <h2
            style={{
              fontSize: 'clamp(2rem, 5.5vw, 3.8rem)',
              fontWeight: 700,
              color: '#e2e8f0',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            Proof through consistency.
          </h2>
        </ShadeAway>

        {/* Cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px',
            maxWidth: 960,
            pointerEvents: 'auto',
          }}
        >
          {/* Card 1 — JEE Main */}
          <AchievementCard delay={0}>
            <p
              style={{
                fontFamily: 'monospace',
                fontSize: '0.6rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'rgba(148,163,184,0.45)',
                marginBottom: 10,
              }}
            >
              JEE Main
            </p>
            <p
              style={{
                fontSize: '2.4rem',
                fontWeight: 800,
                color: '#f1f5f9',
                lineHeight: 1,
                letterSpacing: '-0.02em',
                marginBottom: 10,
              }}
            >
              99.28
              <span style={{ fontSize: '0.9rem', fontWeight: 400, color: 'rgba(148,163,184,0.55)', marginLeft: 4 }}>
                percentile
              </span>
            </p>
            <p
              style={{
                color: 'rgba(203,213,225,0.55)',
                fontSize: '0.85rem',
                lineHeight: 1.65,
              }}
            >
              Achieved through consistent preparation and strong
              analytical problem-solving across Mathematics, Physics,
              and Chemistry.
            </p>
          </AchievementCard>

          {/* Card 2 — LeetCode */}
          <AchievementCard delay={0.12}>
            <p
              style={{
                fontFamily: 'monospace',
                fontSize: '0.6rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'rgba(148,163,184,0.45)',
                marginBottom: 10,
              }}
            >
              LeetCode
            </p>
            <p
              style={{
                fontSize: '1.4rem',
                fontWeight: 700,
                color: '#f1f5f9',
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
                marginBottom: 10,
              }}
            >
              Problem Solving Journey
            </p>
            <ul
              style={{
                color: 'rgba(203,213,225,0.55)',
                fontSize: '0.85rem',
                lineHeight: 2,
                listStyle: 'none',
                padding: 0,
                margin: 0,
              }}
            >
              <li>▸ 50+ problems solved</li>
              <li>▸ Medium-difficulty focus</li>
              <li>▸ Data Structures & Algorithms</li>
            </ul>
            <GhostButton href="https://leetcode.com">View Profile</GhostButton>
          </AchievementCard>

          {/* Card 3 — Codeforces */}
          <AchievementCard delay={0.24}>
            <p
              style={{
                fontFamily: 'monospace',
                fontSize: '0.6rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'rgba(148,163,184,0.45)',
                marginBottom: 10,
              }}
            >
              Codeforces
            </p>
            <p
              style={{
                fontSize: '1.4rem',
                fontWeight: 700,
                color: '#f1f5f9',
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
                marginBottom: 10,
              }}
            >
              Competitive Programming
            </p>
            <ul
              style={{
                color: 'rgba(203,213,225,0.55)',
                fontSize: '0.85rem',
                lineHeight: 2,
                listStyle: 'none',
                padding: 0,
                margin: 0,
              }}
            >
              <li>▸ Active contest participation</li>
              <li>▸ Rating growth track</li>
              <li>▸ Current rank: Newbie → Pupil</li>
            </ul>
            <GhostButton href="https://codeforces.com">View Profile</GhostButton>
          </AchievementCard>

          {/* Card 4 — CodeChef */}
          <AchievementCard delay={0.36}>
            <p
              style={{
                fontFamily: 'monospace',
                fontSize: '0.6rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'rgba(148,163,184,0.45)',
                marginBottom: 10,
              }}
            >
              CodeChef
            </p>
            <p
              style={{
                fontSize: '1.4rem',
                fontWeight: 700,
                color: '#f1f5f9',
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
                marginBottom: 10,
              }}
            >
              Algorithmic Challenges
            </p>
            <ul
              style={{
                color: 'rgba(203,213,225,0.55)',
                fontSize: '0.85rem',
                lineHeight: 2,
                listStyle: 'none',
                padding: 0,
                margin: 0,
              }}
            >
              <li>▸ Ongoing contest activity</li>
              <li>▸ Problem-solving progress</li>
              <li>▸ Rating building steadily</li>
            </ul>
            <GhostButton href="https://codechef.com">View Profile</GhostButton>
          </AchievementCard>
        </div>

        <ShadeAway
          style={{ marginBottom: '3.5rem', pointerEvents: 'auto', maxWidth: 540 }}
        >
          <SectionLabel text="Skills" />
          <h2
            style={{
              fontSize: 'clamp(2rem, 5.5vw, 3.8rem)',
              fontWeight: 700,
              color: '#e2e8f0',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
               
            }}
            className=''
          >
            Skills & Expertize
          </h2>
        </ShadeAway>
         <div className="space-y-10">
  {skillSections.map((section, index) => (
    <motion.div
      key={section.id}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, amount: 0.4 }}
      className="relative group"
    >
      <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-10 text-white overflow-hidden">

        {/* subtle glow background */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-cyan-500/10 to-blue-500/10" />

        {/* header */}
        <div className="relative flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-cyan-400">
            {section.icon}
          </div>

          <div>
            <h2 className="text-2xl font-bold group-hover:text-cyan-200 transition">
              {section.title}
            </h2>
            <p className="text-slate-400 text-sm">
              {section.subtitle}
            </p>
          </div>
        </div>

        {/* points */}
        <ul className="space-y-3 relative">
          {section.points.map((point, i) => (
            <li
              key={i}
              className="text-slate-300 text-sm flex gap-3 items-start"
            >
              <span className="text-cyan-400 mt-1">▹</span>
              {point}
            </li>
          ))}
        </ul>

        {/* bottom accent line */}
        <div className="mt-8 h-[2px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-cyan-400 to-blue-500" />
      </div>
    </motion.div>
  ))}
</div>

        
      </div>

     
    </ScrollContainer>
  );
};