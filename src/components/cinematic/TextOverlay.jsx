import React, { useState, useEffect } from 'react';
import { motion, useTransform, useSpring } from 'motion/react';

// Design tokens for TextOverlay
const T = {
  slate100: '#f1f5f9',
  slate300: '#cbd5e1',
  slate300a: (a) => `rgba(203,213,225,${a})`,
  slate400a: (a) => `rgba(148,163,184,${a})`,
  mono: "'SF Mono', 'Fira Code', 'Fira Mono', monospace",
};

const HERO_PHRASES = [
  {
    id: 'name',
    scrollIn: [0, 0.07],
    scrollOut: [0.17, 0.23],
    variant: 'depth',
    content: (
      <>
        <p style={{ fontFamily: T.mono, fontSize: '0.58rem', letterSpacing: '0.42em', textTransform: 'uppercase', color: T.slate400a(0.4), marginBottom: '1.2rem' }}>
          Pratham Kulkarni
        </p>
        <h1 style={{ fontSize: 'clamp(3.8rem, 10vw, 8rem)', fontWeight: 600, color: T.slate100, lineHeight: 0.92, letterSpacing: '-0.03em', margin: 0 }}>
          Engineer.<br />Builder.<br />Explorer.
        </h1>
      </>
    ),
  },
  {
    id: 'identity',
    scrollIn: [0.18, 0.26],
    scrollOut: [0.34, 0.41],
    variant: 'glass',
    content: (
      <>
        <p style={{ fontFamily: T.mono, fontSize: '0.58rem', letterSpacing: '0.42em', textTransform: 'uppercase', color: T.slate400a(0.4), marginBottom: '1.4rem' }}>
          Full Stack Developer
        </p>
        <h2 style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)', fontWeight: 600, color: T.slate100, lineHeight: 1.02, letterSpacing: '-0.025em', margin: 0 }}>
          Building systems<br />
          <span style={{ color: T.slate400a(0.5) }}>that endure.</span>
        </h2>
      </>
    ),
  },
  {
    id: 'problems',
    scrollIn: [0.34, 0.42],
    scrollOut: [0.50, 0.57],
    variant: 'drift',
    content: (
      <>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 600, color: T.slate400a(0.45), lineHeight: 1.05, letterSpacing: '-0.025em', margin: '0 0 0.4rem 0' }}>
          Every complex problem
        </h2>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 600, color: T.slate100, lineHeight: 1.05, letterSpacing: '-0.025em', margin: 0 }}>
          has an elegant solution.
        </h2>
      </>
    ),
  },
  {
    id: 'stack',
    scrollIn: [0.50, 0.57],
    scrollOut: [0.64, 0.70],
    variant: 'depth',
    content: (
      <>
        <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 3rem)', fontWeight: 500, color: T.slate300a(0.65), lineHeight: 1.2, letterSpacing: '-0.02em', margin: '0 0 1rem 0' }}>
          React. Node.js. PostgreSQL.
        </h2>
        <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 3rem)', fontWeight: 500, color: T.slate300a(0.65), lineHeight: 1.2, letterSpacing: '-0.02em', margin: 0 }}>
          The full stack. End to end.
        </h2>
      </>
    ),
  },
  {
    id: 'ai',
    scrollIn: [0.63, 0.70],
    scrollOut: [0.78, 0.84],
    variant: 'transmission',
    content: (
      <>
        <p style={{ fontFamily: T.mono, fontSize: '0.58rem', letterSpacing: '0.42em', textTransform: 'uppercase', color: 'rgba(103,232,249,0.45)', marginBottom: '1.2rem' }}>
          Intelligent systems
        </p>
        <h2 style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4.5rem)', fontWeight: 600, color: T.slate100, lineHeight: 1.02, letterSpacing: '-0.025em', margin: 0 }}>
          RAG pipelines.<br />Agentic workflows.<br />
          <span style={{ color: T.slate400a(0.4) }}>AI that reasons.</span>
        </h2>
      </>
    ),
  },
  {
    id: 'scale',
    scrollIn: [0.77, 0.83],
    scrollOut: [0.91, 0.97],
    variant: 'exhale',
    content: (
      <>
        <h2 style={{ fontSize: 'clamp(2.8rem, 7vw, 6rem)', fontWeight: 600, color: T.slate100, lineHeight: 0.98, letterSpacing: '-0.03em', margin: 0 }}>
          Architecting<br />
          <span style={{ color: T.slate400a(0.45) }}>for scale.</span>
        </h2>
      </>
    ),
  },
];

function usePhraseMotion(scrollProgress, scrollIn, scrollOut, variant) {
  const opacity = useTransform(
    scrollProgress,
    [scrollIn[0], scrollIn[1], scrollOut[0], scrollOut[1]],
    [0, 1, 1, 0]
  );

  const variantProps = (() => {
    switch (variant) {
      case 'depth':
        return {
          scale: useTransform(scrollProgress, [scrollIn[0], scrollIn[1], scrollOut[0], scrollOut[1]], [0.87, 1, 1, 1.05]),
          filter: useTransform(scrollProgress, [scrollIn[0], scrollIn[1], scrollOut[0], scrollOut[1]], ['blur(14px)', 'blur(0px)', 'blur(0px)', 'blur(5px)']),
          y: useTransform(scrollProgress, [scrollIn[0], scrollIn[1], scrollOut[0], scrollOut[1]], [0, 0, 0, 0]),
        };
      case 'glass':
        return {
          scale: useTransform(scrollProgress, [scrollIn[0], scrollIn[1], scrollOut[0], scrollOut[1]], [0.96, 1, 1, 0.96]),
          filter: useTransform(scrollProgress, [scrollIn[0], scrollIn[1], scrollOut[0], scrollOut[1]], ['blur(8px)', 'blur(0px)', 'blur(0px)', 'blur(8px)']),
          y: useTransform(scrollProgress, [scrollIn[0], scrollIn[1], scrollOut[0], scrollOut[1]], [6, 0, 0, -8]),
        };
      case 'drift':
        return {
          scale: useTransform(scrollProgress, [scrollIn[0], scrollIn[1], scrollOut[0], scrollOut[1]], [1, 1, 1, 1]),
          filter: useTransform(scrollProgress, [scrollIn[0], scrollIn[1], scrollOut[0], scrollOut[1]], ['blur(3px)', 'blur(0px)', 'blur(0px)', 'blur(3px)']),
          y: useTransform(scrollProgress, [scrollIn[0], scrollIn[1], scrollOut[0], scrollOut[1]], [10, 0, 0, -14]),
        };
      case 'transmission':
        return {
          scale: useTransform(scrollProgress, [scrollIn[0], scrollIn[1], scrollOut[0], scrollOut[1]], [1.02, 1, 1, 0.98]),
          filter: useTransform(scrollProgress, [scrollIn[0], scrollIn[1], scrollOut[0], scrollOut[1]], ['blur(2px)', 'blur(0px)', 'blur(0px)', 'blur(10px)']),
          y: useTransform(scrollProgress, [scrollIn[0], scrollIn[1], scrollOut[0], scrollOut[1]], [0, 0, 0, 0]),
        };
      case 'exhale':
      default:
        return {
          scale: useTransform(scrollProgress, [scrollIn[0], scrollIn[1], scrollOut[0], scrollOut[1]], [0.95, 1, 1, 1.08]),
          filter: useTransform(scrollProgress, [scrollIn[0], scrollIn[1], scrollOut[0], scrollOut[1]], ['blur(10px)', 'blur(0px)', 'blur(0px)', 'blur(12px)']),
          y: useTransform(scrollProgress, [scrollIn[0], scrollIn[1], scrollOut[0], scrollOut[1]], [0, 0, 0, 0]),
        };
    }
  })();

  const springOp = useSpring(opacity, { stiffness: 38, damping: 18 });
  const springScale = useSpring(variantProps.scale, { stiffness: 38, damping: 18 });
  const springY = useSpring(variantProps.y, { stiffness: 38, damping: 18 });

  return { opacity: springOp, scale: springScale, y: springY, filter: variantProps.filter };
}

function HeroPhrase({ phrase, scrollProgress, mounted }) {
  const { opacity, scale, y, filter } = usePhraseMotion(
    scrollProgress, phrase.scrollIn, phrase.scrollOut, phrase.variant
  );

  return (
    <motion.div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        padding: '0 clamp(2rem, 8vw, 7rem)',
        pointerEvents: 'none',
        opacity: mounted ? opacity : 0,
        scale,
        y,
        filter,
        transformOrigin: 'left center',
      }}
    >
      <div style={{ maxWidth: 640 }}>
        {phrase.content}
      </div>
    </motion.div>
  );
}

export function TextOverlay({ scrollProgress }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 500ms initial delay before triggering
    const t = setTimeout(() => setMounted(true), 500);
    return () => clearTimeout(t);
  }, []);

  // Scroll hint fades out after first phrase
  const hintOpacity = useTransform(scrollProgress, [0, 0.09], [1, 0]);
  const smoothHint = useSpring(hintOpacity, { stiffness: 40, damping: 18 });

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 10, // Level 1 Z-Index
      pointerEvents: 'none',
    }}>
      {/* Left atmospheric vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.30) 55%, transparent 100%)',
        pointerEvents: 'none',
      }} />
      {/* Bottom fade */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 20%)',
        pointerEvents: 'none',
      }} />

      {/* All 6 phrases rendered simultaneously */}
      {HERO_PHRASES.map(phrase => (
        <HeroPhrase key={phrase.id} phrase={phrase} scrollProgress={scrollProgress} mounted={mounted} />
      ))}

      {/* Scroll indicator */}
      <motion.div style={{
        position: 'absolute', bottom: '2.4rem', left: '50%',
        x: '-50%', opacity: smoothHint,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
      }}>
        <p style={{ fontFamily: T.mono, fontSize: '0.55rem', letterSpacing: '0.35em', color: T.slate400a(0.28), textTransform: 'uppercase', margin: 0 }}>scroll</p>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
          style={{ width: 1, height: 28, background: T.slate400a(0.18) }}
        />
      </motion.div>
    </div>
  );
}
