import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

const T = {
  slate100: '#f1f5f9',
  slate200: '#e2e8f0',
  slate400a: (a) => `rgba(148,163,184,${a})`,
  mono: "'SF Mono', 'Fira Code', 'Fira Mono', monospace",
};

export function GhostLink({ href, children }) {
  return (
    <a
      href={href} target="_blank" rel="noopener noreferrer"
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 4,
        padding: '5px 12px', borderRadius: 6,
        border: '1px solid rgba(255,255,255,0.1)',
        color: T.slate400a(0.55), fontSize: '0.72rem',
        letterSpacing: '0.06em', textDecoration: 'none',
        fontFamily: T.mono, transition: 'all 0.22s',
        marginTop: 12,
        pointerEvents: 'auto', // Re-enable pointer events for links
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = T.slate200; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = T.slate400a(0.55); }}
    >
      {children} <ArrowUpRight size={11} />
    </a>
  );
}

export function FadeIn({ children, style = {}, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: false, margin: '-80px' }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export function CountUp({ to, decimals = 0, suffix = '', duration = 1.8 }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          const start = performance.now();
          const tick = (now) => {
            const elapsed = (now - start) / 1000;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(parseFloat((eased * to).toFixed(decimals)));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [to, decimals, duration]);

  return (
    <span ref={ref}>
      {decimals > 0 ? value.toFixed(decimals) : Math.floor(value)}{suffix}
    </span>
  );
}

export function MetricCard({ m, delay }) {
  return (
    <FadeIn delay={delay}>
      <motion.div
        whileHover={{ y: -3, transition: { duration: 0.25 } }}
        style={{
          background: 'rgba(15,23,42,0.50)',
          backdropFilter: 'blur(12px)', // Adjusted per plan
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 14,
          padding: '22px 22px 18px',
          width: '200px', // Small width approx 200px
          pointerEvents: 'auto', // Allow hover
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <p style={{ fontFamily: T.mono, fontSize: '0.55rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: T.slate400a(0.38), margin: 0 }}>{m.label}</p>
          {m.icon && <div style={{ opacity: 0.5 }}>{m.icon}</div>}
        </div>
        <p style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 700, color: T.slate100, lineHeight: 1, letterSpacing: '-0.025em', margin: '0 0 4px 0' }}>
          <CountUp to={m.metric} suffix={m.suffix} decimals={m.decimals} />
          <span style={{ fontSize: '0.75rem', fontWeight: 400, color: T.slate400a(0.45), marginLeft: 5, letterSpacing: '0.04em' }}>{m.unit}</span>
        </p>
        <p style={{ fontSize: '0.78rem', color: T.slate400a(0.5), margin: '6px 0 0 0', lineHeight: 1.5 }}>{m.sub}</p>
        {m.href && <GhostLink href={m.href}>View profile</GhostLink>}
      </motion.div>
    </FadeIn>
  );
}
