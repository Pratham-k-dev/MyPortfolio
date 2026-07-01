import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { FaGithub } from 'react-icons/fa';
import { ExternalLink } from 'lucide-react';
import { ScrollContainer } from '../animation/ScrollContainer';
import { SequenceManager } from '../animation/SequenceManager';
import { useScrollProgress } from '../../hooks/useScrollProgress';

import { Sparkles, Layers, Brain, Users2, Gamepad2, Rocket } from 'lucide-react';


const projects = [
  {
    id: 1,
    title: 'RecruitIQ',
    subtitle: 'AI-Powered ATS Platform',
    icon: Brain,
    description:
      'An AI-driven applicant tracking system that ranks candidates using embedding-based semantic search instead of simple keyword matching.',
    points: [
      'Built an AI-powered ATS for recruiters that ranks candidates using embedding-based semantic search.',
      'Implemented semantic retrieval with pgvector and cosine similarity for resume matching.',
      'Used Gemini API to parse resumes into structured candidate profiles.',
      'Developed a hybrid reranking algorithm combining semantic similarity with recruiter-defined criteria.',
    ],
    techStack: ['FastAPI', 'React', 'PostgreSQL', 'pgvector', 'Gemini API', 'Docker', 'NumPy'],
    color: 'from-cyan-500/10 to-blue-600/10',
    borderHover: 'rgba(34,211,238,0.32)',
    accent: '#22d3ee',
    liveUrl: '',
    sourceUrl: 'https://github.com/Pratham-k-dev/recruitiq',
    tag: '01',
  },
  {
    id: 2,
    title: 'CareerHex',
    subtitle: 'AI-Powered Career Intelligence Engine',
    icon: Rocket,
    description:
      'A career analytics platform that quantifies developer readiness by analyzing real GitHub activity and LeetCode performance, then generates a personalized growth roadmap.',
    points: [
      'Developed a career analytics engine parsing real-time developer metrics to quantify technical role readiness.',
      'Created an automated LLM gap-analysis engine that scans codebases and surfaces targeted algorithmic weaknesses.',
      'Designed an interactive, stateful roadmap generation framework built on Supabase-backed persistence layers.',
      'Authenticated users securely via multi-provider OAuth protocols linked directly to third-party tracking states.',
    ],
    techStack: ['Next.js', 'Supabase', 'Auth.js', 'OpenAI API', 'GitHub API', 'LeetCode GraphQL'],
    color: 'from-amber-500/10 to-orange-600/10',
    borderHover: 'rgba(251,191,36,0.32)',
    accent: ' #fbbf24',
    liveUrl: 'https://carrierhex.vercel.app/',
    sourceUrl: 'https://github.com/Pratham-k-dev/careerhex',
    tag: '02',
  },
  {
    id: 3,
    title: 'PlayerArea',
    subtitle: 'Real-time Multi-User Game Engine',
    icon: Gamepad2,
    description:
      'A real-time collaborative drawing platform where multiple users draw together in synchronized rooms with instant, low-latency state updates.',
    points: [
      'Built a real-time collaborative drawing platform supporting multi-user rooms with synchronized canvas updates.',
      'Implemented bidirectional communication using WebSockets (Socket.io) for instant state synchronization across connected clients.',
      'Developed backend room management and session isolation to support multiple independent collaboration spaces.',
      'Deployed the full-stack application on Render, enabling public access and real-time collaboration.',
    ],
    techStack: ['React', 'Node.js', 'Express.js', 'Socket.io', 'WebSockets', 'TailwindCSS', 'Render'],
    color: 'from-emerald-500/10 to-teal-600/10',
    borderHover: 'rgba(52,211,153,0.32)',
    accent: '#34d399',
    liveUrl: 'https://playerarea.onrender.com/',
    sourceUrl: 'https://github.com/Pratham-k-dev/playerarea',
    tag: '03',
  },
  {
    id: 4,
    title: 'Portfolio OS',
    subtitle: 'This Site',
    icon: Users2,
    description:
      'A scroll-driven, cinematic portfolio experience built to showcase my work through smooth motion design and interactive UI details.',
    points: [
      'Scroll-driven 3D portfolio with frame-sequence animations and cinematic section transitions.',
      'Built glassmorphic project cards with dynamic per-project accent theming.',
      'Implemented smooth viewport-based reveal animations using Framer Motion.',
      'Fully responsive layout built entirely in React with Tailwind CSS.',
    ],
    techStack: ['React', 'Framer Motion', 'Tailwind CSS', 'Vite'],  
    color: 'from-violet-500/10 to-purple-600/10',
    borderHover: 'rgba(139,92,246,0.32)',
    accent: '#a78bfa',
    liveUrl: 'https://my-portfolio-rust-tau-55.vercel.app/',
    sourceUrl: 'https://github.com/Pratham-k-dev/MyPortfolio',
    tag: '04',
  },
];
// ── Full-height image panel ───────────────────────────────────────────────────
function ProjectImage({ src, alt, accent }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: `${accent}0a`,
        overflow: 'hidden',
      }}
    >
      {/* subtle grid */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.06 }}
        viewBox="0 0 400 300"
        preserveAspectRatio="none"
      >
        {[100, 200, 300].map(x => (
          <line key={x} x1={x} y1="0" x2={x} y2="300" stroke="white" strokeWidth="0.8" />
        ))}
        {[75, 150, 225].map(y => (
          <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="white" strokeWidth="0.8" />
        ))}
      </svg>

      {/* corner glow */}
      <div style={{
        position: 'absolute', top: -30, right: -30,
        width: 180, height: 180,
        background: `radial-gradient(circle, ${accent}28 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      {/* actual screenshot */}
      <img
        src={src}
        alt={alt}
        onError={e => { e.currentTarget.style.display = 'none'; }}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          objectPosition: '10% center'
        }}
      />

      {/* label */}
      <span style={{
        position: 'absolute', bottom: 10, left: 12,
        fontFamily: 'monospace', fontSize: '0.58rem',
        letterSpacing: '0.22em', textTransform: 'uppercase',
        color: 'rgba(148,163,184,0.28)',
      }}>
        project preview
      </span>
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
      height="600vh md:750vh"
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
        {projects.map((project, index) => {
  const alignLeft = index % 2 === 0;
  const Icon = project.icon;
  const hasLiveDemo = Boolean(project.liveUrl);

  return (
    <div
      key={project.id}
      className={`min-h-screen flex items-center px-6 md:px-16 py-16 text-white justify-center ${
        alignLeft ? 'lg:justify-start' : 'lg:justify-end'
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: false, amount: 0.3 }}
        className="w-full max-w-3xl group"
        style={{ '--accent': project.accent, '--accent-border': project.borderHover }}
      >
        <div
          className={`relative rounded-2xl bg-gradient-to-br ${project.color} backdrop-blur-xl overflow-hidden
            border border-white/[0.08] transition-all duration-300
            hover:border-[var(--accent-border)]
            hover:shadow-[0_16px_56px_rgba(0,0,0,0.5),0_0_0_1px_var(--accent-border)]`}
          style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.4)' }}
        >
          <div className="flex flex-col p-8 md:p-12">
            {/* tag */}
            <p
              className="font-mono text-[0.65rem] tracking-[0.28em] uppercase mb-3"
              style={{ color: `${project.accent}99` }}
            >
              Project {project.tag}
            </p>

            {/* title row with icon */}
            <div className="flex items-center gap-3 mb-1">
              <div
                className="flex items-center justify-center h-9 w-9 rounded-lg flex-shrink-0"
                style={{
                  background: `${project.accent}14`,
                  border: `1px solid ${project.accent}33`,
                }}
              >
                <Icon size={18} style={{ color: project.accent }} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold leading-tight text-white">
                {project.title}
              </h3>
            </div>

            {/* subtitle */}
            <p
              className="text-[0.8rem] font-medium mb-4 ml-[3rem]"
              style={{ color: `${project.accent}bb` }}
            >
              {project.subtitle}
            </p>

            {/* description summary */}
            <p className="text-[0.87rem] leading-relaxed text-slate-300/80 mb-7">
              {project.description}
            </p>

            {/* Key Features heading */}
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={14} style={{ color: project.accent }} />
              <h4
                className="text-[0.7rem] font-semibold tracking-[0.18em] uppercase"
                style={{ color: `${project.accent}cc` }}
              >
                Key Features
              </h4>
            </div>

            {/* bullet points */}
            <ul className="space-y-2.5 mb-8">
              {project.points.map((point, i) => (
                <li
                  key={i}
                  className="group/item flex items-start gap-2.5 cursor-default transition-transform duration-300 ease-out hover:translate-x-2"
                >
                  <span className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-500 transition-colors duration-300 group-hover/item:bg-[var(--accent)]" />
                  <span className="text-[0.83rem] leading-relaxed text-slate-400 transition-colors duration-300 group-hover/item:text-slate-200">
                    {point}
                  </span>
                </li>
              ))}
            </ul>

            {/* Tech Stack heading */}
            <div className="flex items-center gap-2 mb-3">
              <Layers size={14} style={{ color: project.accent }} />
              <h4
                className="text-[0.7rem] font-semibold tracking-[0.18em] uppercase"
                style={{ color: `${project.accent}cc` }}
              >
                Tech Stack
              </h4>
            </div>

            {/* tech stack pills */}
            <div className="flex flex-wrap gap-1.5 mb-8">
              {project.techStack.map(tech => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-full text-[0.65rem] font-mono transition-colors duration-300 cursor-default"
                  style={{
                    border: `1px solid ${project.accent}33`,
                    background: `${project.accent}0d`,
                    color: `${project.accent}bb`,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = `${project.accent}2e`;
                    e.currentTarget.style.color = '#fff';
                    e.currentTarget.style.borderColor = `${project.accent}77`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = `${project.accent}0d`;
                    e.currentTarget.style.color = `${project.accent}bb`;
                    e.currentTarget.style.borderColor = `${project.accent}33`;
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-2.5">
              {hasLiveDemo && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-[10px] text-[0.78rem] font-medium no-underline whitespace-nowrap transition-shadow duration-300"
                  style={{
                    background: `${project.accent}18`,
                    border: `1px solid ${project.accent}44`,
                    color: project.accent,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = `0 0 20px ${project.accent}44`;
                    e.currentTarget.style.background = `${project.accent}28`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.background = `${project.accent}18`;
                  }}
                >
                  <ExternalLink size={13} />
                  Live Demo
                </motion.a>
              )}

              <motion.a
                href={project.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-[10px] text-[0.78rem] font-medium no-underline whitespace-nowrap transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(203,213,225,0.6)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.9)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.color = 'rgba(203,213,225,0.6)';
                }}
              >
                <FaGithub size={14} />
                Source Code
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
})}
        </section>
      </div>
    </ScrollContainer>
  );
};