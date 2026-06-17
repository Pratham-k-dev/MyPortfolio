import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ScrollContainer } from '../animation/ScrollContainer';
import { SequenceManager } from '../animation/SequenceManager';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'CareerHex',
    description: 'A developer career readiness analyzer, generates AI based inisghts, Recommendations, Roadmap, by evaluating GitHub activity, LeetCode stats, and self-reported data.',
    techStack: ['Next.js', 'REST APIs', 'OpenAI', 'Supabase', 'Tailwind CSS','OAuth','LeetCode GraphQL' , 'GitHub Api' ,],
    color: 'from-cyan-500/15 to-blue-600/15',
    borderHover: 'rgba(34,211,238,0.35)',
    accent: '#22d3ee',
    image: '/career2.png',
    liveUrl: 'https://carrierhex.vercel.app/',
    sourceUrl: 'https://github.com/Pratham-k-dev/careerhex',
    tag: '01',
  },
  {
    id: 2,
    title: 'DevFlow — Task & PR Tracker',
    description: 'A developer-focused project management tool that syncs with GitHub PRs, auto-assigns tasks from commit messages, and visualises sprint velocity in real time.',
    techStack: ['React', 'Node.js', 'GitHub API', 'PostgreSQL', 'WebSockets'],
    color: 'from-violet-500/15 to-purple-600/15',
    borderHover: 'rgba(139,92,246,0.35)',
    accent: '#a78bfa',
    image: '/projects/devflow.png',
    liveUrl: '#',
    sourceUrl: '#',
    tag: '02',
  },
  {
    id: 3,
    title: 'Realtime Chat with E2E Encryption',
    description: 'End-to-end encrypted messaging app with rooms, file sharing, and read receipts. Built with WebSockets and AES-256 encryption handled entirely client-side.',
    techStack: ['React', 'Socket.io', 'Express', 'AES-256', 'MongoDB'],
    color: 'from-emerald-500/15 to-teal-600/15',
    borderHover: 'rgba(52,211,153,0.35)',
    accent: '#34d399',
    image: '/projects/chat.png',
    liveUrl: '#',
    sourceUrl: '#',
    tag: '03',
  },
  {
    id: 4,
    title: 'Portfolio OS — This Site',
    description: 'Scroll-driven 3D portfolio with frame-sequence animations, glassmorphic cards, and cinematic section transitions. Built entirely in React with Framer Motion.',
    techStack: ['React', 'Framer Motion', 'Tailwind CSS', 'Vite'],
    color: 'from-amber-500/15 to-orange-600/15',
    borderHover: 'rgba(251,191,36,0.35)',
    accent: '#fbbf24',
    image: '/projects/portfolio.png',
    liveUrl: '#',
    sourceUrl: '#',
    tag: '04',
  }
  
];

// ── Image placeholder with shimmer ──────────────────────────────────────────
function ProjectImage({ src, alt, accent }) {
  return (
    <div
      style={{
        width: '100%',
        aspectRatio: '16/9',
        borderRadius: '14px',
        overflow: 'hidden',
        position: 'relative',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        marginBottom: '28px',
        flexShrink: 0,
      }}
    >
      {/* shimmer overlay shown while image loads or if missing */}
      <div
        style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.03) 100%)`,
          backgroundSize: '200% 200%',
          animation: 'shimmer 2.4s ease-in-out infinite',
        }}
      />

      {/* decorative grid lines */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.06 }}
        viewBox="0 0 400 225" preserveAspectRatio="none"
      >
        {[50,100,150,200,250,300,350].map(x => (
          <line key={x} x1={x} y1="0" x2={x} y2="225" stroke="white" strokeWidth="0.5"/>
        ))}
        {[45,90,135,180].map(y => (
          <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="white" strokeWidth="0.5"/>
        ))}
      </svg>

      {/* accent corner glow */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: 120, height: 120,
        background: `radial-gradient(circle, ${accent}33 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      {/* actual image — renders on top if path resolves */}
      <img
        src={src}
        alt={alt}
        onError={e => { e.currentTarget.style.display = 'none'; }}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          borderRadius: '14px',
        }}
      />

      {/* "screenshot" label when image is missing */}
      <div style={{
        position: 'absolute', bottom: 10, left: 14,
        fontFamily: 'monospace', fontSize: '0.58rem',
        letterSpacing: '0.22em', textTransform: 'uppercase',
        color: 'rgba(148,163,184,0.28)',
      }}>
        project preview
      </div>
    </div>
  );
}

export const RocketSection = () => {
  const containerRef = useRef(null);
  const scrollProgress = useScrollProgress(containerRef);
  const opacity = scrollProgress < 0.1 ? scrollProgress * 10 : 1;

  return (
    <ScrollContainer
      ref={containerRef}
      height="600:vh md:750vh"
      className="-mt-[100vh]"
      background={
        <SequenceManager
          totalFrames={35}
          directory="/rocket"
          prefix="ezgif-frame-"
          extension="jpg"
          pad={3}
          scrollProgress={scrollProgress}
          opacity={opacity}
        />
      }
    >
      <style>{`
        @keyframes shimmer {
          0%   { background-position: -200% -200%; }
          100% { background-position: 200% 200%; }
        }
      `}</style>

      <div className="relative w-full pb-[50vh]">
        <div className="h-[150vh]" />

        <section id="projects">
          {/* heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.6 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-6xl font-bold mb-20 text-center text-white"
          >
            Things I've{' '}
            <span style={{ color: '#22d3ee' }}>Built</span>
          </motion.h2>

          {projects.map((project, index) => (
            <div
              key={project.id}
              className="min-h-screen flex items-center justify-center px-6 md:px-20 py-16 text-white"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 48 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: false, amount: 0.35 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="w-full max-w-2xl group"
              >
                <div
                  className={`relative rounded-3xl bg-gradient-to-br ${project.color} backdrop-blur-xl p-8 md:p-10 transition-all duration-300`}
                  style={{
                    border: '1px solid rgba(255,255,255,0.08)',
                    boxShadow: '0 8px 48px rgba(0,0,0,0.45)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = project.borderHover;
                    e.currentTarget.style.boxShadow = `0 16px 60px rgba(0,0,0,0.5), 0 0 0 1px ${project.borderHover}`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.boxShadow = '0 8px 48px rgba(0,0,0,0.45)';
                  }}
                >
                  {/* corner glows */}
                  <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-40 group-hover:opacity-70 transition-opacity duration-500"
                    style={{ background: `radial-gradient(circle, ${project.accent}22, transparent)` }} />
                  <div className="absolute bottom-0 left-0 w-36 h-36 rounded-full blur-3xl pointer-events-none opacity-25"
                    style={{ background: `radial-gradient(circle, ${project.accent}18, transparent)` }} />

                  <div className="relative z-10">
                    {/* tag */}
                    <p
                      className="text-xs uppercase tracking-[0.3em] font-mono mb-4"
                      style={{ color: project.accent + 'aa' }}
                    >
                      Project {project.tag}
                    </p>

                    {/* ── Screenshot area ── */}
                    <ProjectImage src={project.image} alt={project.title} accent={project.accent} />

                    {/* title */}
                    <h3 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                      {project.title}
                    </h3>

                    {/* description */}
                    <p className="text-slate-300 leading-relaxed mb-7 text-base max-w-xl" style={{ color: 'rgba(203,213,225,0.7)' }}>
                      {project.description}
                    </p>

                    {/* tech stack */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.techStack.map(tech => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full text-xs font-mono transition-colors duration-200"
                          style={{
                            border: `1px solid ${project.accent}44`,
                            background: `${project.accent}0d`,
                            color: project.accent + 'cc',
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* CTA buttons */}
                    <div className="flex gap-3">
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-colors duration-200"
                        style={{
                          background: `${project.accent}18`,
                          border: `1px solid ${project.accent}44`,
                          color: project.accent,
                          textDecoration: 'none',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = `${project.accent}28`; }}
                        onMouseLeave={e => { e.currentTarget.style.background = `${project.accent}18`; }}
                      >
                        <ExternalLink size={15} /> Live Demo
                      </motion.a>
                      <motion.a
                        href={project.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-colors duration-200"
                        style={{
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          color: 'rgba(203,213,225,0.65)',
                          textDecoration: 'none',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#e2e8f0'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'rgba(203,213,225,0.65)'; }}
                      >
                        <ExternalLink size={15} /> Source Code
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </section>

        {/* closing CTA */}
        {/* <div className="min-h-[50vh] flex items-center justify-center px-6 md:px-20 text-white pb-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.5 }}
            className="text-center max-w-2xl"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-5">
              Let's Build Something{' '}
              <span style={{ color: '#22d3ee' }}>Great</span>
            </h2>
            <p className="text-xl mb-10" style={{ color: 'rgba(148,163,184,0.65)' }}>
              Interested in collaborating? Let's connect and create something amazing together.
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'inline-block',
                padding: '14px 36px', borderRadius: '12px',
                background: '#22d3ee', color: '#070b14',
                fontWeight: 700, fontSize: '0.95rem',
                textDecoration: 'none',
                boxShadow: '0 0 36px rgba(34,211,238,0.3)',
              }}
            >
              Get In Touch
            </motion.a>
          </motion.div>
        </div> */}
      </div>
    </ScrollContainer>
  );
};