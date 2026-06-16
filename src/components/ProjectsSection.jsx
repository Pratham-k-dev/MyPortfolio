import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { Code, ExternalLink } from 'lucide-react';
import { ScrollSequenceCanvas } from './ScrollSequenceCanvas';

const projects = [
  {
    id: 1,
    subtitle: 'Lunar Base Alpha',
    title: 'Project Nebula',
    description:
      'A highly interactive 3D web application allowing users to navigate through procedurally generated star systems. Built with React, Three.js, and WebGL for maximum performance.',
    tech: ['React', 'Three.js', 'WebGL'],
  },
  {
    id: 2,
    subtitle: 'Orbital Research Lab',
    title: 'Cosmic Engine',
    description:
      'A cinematic simulation platform focused on rendering realistic planetary systems with GPU accelerated animations and dynamic lighting.',
    tech: ['React', 'GSAP', 'WebGPU'],
  },
  {
    id: 3,
    subtitle: 'Deep Space Node',
    title: 'Stellar Grid',
    description:
      'An immersive data visualization experience that maps large-scale galactic structures using interactive shaders and smooth scroll physics.',
    tech: ['Three.js', 'Shaders', 'Framer Motion'],
  },
  {
    id: 4,
    subtitle: 'Deep Space Node',
    title: 'Stellar Grid',
    description:
      'An immersive data visualization experience that maps large-scale galactic structures using interactive shaders and smooth scroll physics.',
    tech: ['Three.js', 'Shaders', 'Framer Motion'],
  },
  {
    id: 5,
    subtitle: 'Deep Space Node',
    title: 'Stellar Grid',
    description:
      'An immersive data visualization experience that maps large-scale galactic structures using interactive shaders and smooth scroll physics.',
    tech: ['Three.js', 'Shaders', 'Framer Motion'],
  },
];

export function ProjectsSection() {
  const containerRef = useRef(null);

  return (
    <section
      ref={containerRef}
      className="relative w-full text-white"
      style={{ height: `${projects.length * 150}vh` }}
    >
      {/* Background Canvas */}
      <ScrollSequenceCanvas
        totalFrames={51}
        directory="/moon"
        prefix="ezgif-frame-"
        extension="png"
        pad={3}
        containerRef={containerRef}
        z = {0}
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 z-10">
        <div className="relative w-full">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="sticky top-0 h-screen flex justify-end items-end p-10 md:p-24 pb-40"
            >
              <motion.div
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                }}
                viewport={{ once: false, amount: 0.4 }}
                className="glass-card p-8 rounded-xl max-w-lg pointer-events-auto border-t-4 border-t-lunar-gold bg-black/40 backdrop-blur-md"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-lunar-gold font-mono text-sm tracking-widest uppercase mb-1">
                      {project.subtitle}
                    </p>

                    <h3 className="text-3xl font-bold">
                      {project.title}
                    </h3>
                  </div>

                  <div className="flex gap-3 text-slate-400">
                    <a
                      href="#"
                      className="hover:text-white transition-colors"
                    >
                      <Code size={20} />
                    </a>

                    <a
                      href="#"
                      className="hover:text-white transition-colors"
                    >
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>

                <p className="text-slate-300 leading-relaxed mb-6">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 bg-white/5 rounded-full text-xs font-mono border border-white/10"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}