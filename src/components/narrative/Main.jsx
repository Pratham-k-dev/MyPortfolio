import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ScrollContainer } from '../animation/ScrollContainer';
import { SequenceManager } from '../animation/SequenceManager';
import { useScrollProgress } from '../../hooks/useScrollProgress';

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
    <span className="text-cyan-400 font-mono min-h-[24px] inline-block">
      {displayText}
      <span className="animate-pulse text-white">|</span>
    </span>
  );
}

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
      
      {/* Overlay Content */}
      {/* <div className="absolute inset-0 z-10 px-6 md:px-20 w-full md:w-1/2 flex items-center pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{ opacity: scrollProgress > 0.8 ? 0 : 1, transition: 'opacity 0.5s' }}
        >
          <h2 className="text-cyan-500 font-mono mb-4 text-sm md:text-base tracking-widest uppercase">
            Initialize Sequence...
          </h2>
          <h1 className="text-6xl md:text-8xl font-bold mb-4 tracking-tight text-white leading-tight">
            Pratham K
          </h1>
          
          <div className="text-2xl md:text-3xl mb-6 font-light text-slate-200 h-10">
            &gt; <TypewriterEffect />
          </div>

          <p className="text-slate-300 mb-8 text-lg md:text-xl leading-relaxed max-w-lg">
            Building AI Applications, Full Stack Systems, and Scalable Software Solutions.
          </p>

          <ul className="space-y-3 text-slate-400 mb-10 text-sm md:text-base font-mono">
            <li className="flex items-center gap-3">
              <span className="text-cyan-500">▹</span> B.Tech Student
            </li>
            <li className="flex items-center gap-3">
              <span className="text-cyan-500">▹</span> 50+ LeetCode Problems Solved
            </li>
            <li className="flex items-center gap-3">
              <span className="text-cyan-500">▹</span> Strong DSA Foundation
            </li>
            <li className="flex items-center gap-3">
              <span className="text-cyan-500">▹</span> Building AI-Powered Applications
            </li>
            <li className="flex items-center gap-3">
              <span className="text-cyan-500">▹</span> Exploring System Design
            </li>
          </ul>

          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-3 text-void-black bg-cyan-400 hover:bg-cyan-300 font-semibold rounded-lg text-sm md:text-base tracking-wide transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)]">
              Explore Work
            </button>
            <button className="px-8 py-3 font-medium rounded-lg text-sm md:text-base tracking-wide border border-white/20 text-white/80 hover:bg-white/10 hover:text-white transition-all duration-300">
              Contact Me
            </button>
          </div>
        </motion.div>
      </div> */}
      {/* Cinematic Gradient Overlay */}
<div
  className="
    absolute inset-0 z-10
    bg-gradient-to-r
    from-black/75
    via-black/35
    to-transparent
    pointer-events-none
  "
/>

{/* Hero Content */}
<div className="absolute inset-0 z-20 pointer-events-none">
  <div
    className="
      h-screen
      flex
      items-center
      px-8
      md:px-20
    "
  >
    <motion.div
      className="
        max-w-xl
        pointer-events-auto
      "
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="mb-4">
        <span
          className="
            text-cyan-400
            uppercase
            tracking-[0.3em]
            text-xs
            md:text-sm
            font-mono
          "
        >
          Full Stack Developer
        </span>
      </div>

      <h1
        className="
          text-white
          font-bold
          leading-none
          mb-6
          text-5xl
          md:text-7xl
          lg:text-8xl
        "
      >
        Pratham K
      </h1>

      <div
        className="
          h-12
          mb-6
          text-xl
          md:text-2xl
          text-cyan-300
          font-mono
        "
      >
        <TypewriterEffect />
      </div>

      <p
        className="
          text-slate-300
          text-lg
          leading-relaxed
          mb-8
          max-w-lg
        "
      >
        Building AI applications, scalable systems,
        and modern web experiences.
      </p>

      <div
        className="
          flex
          flex-col
          gap-3
          mb-10
          text-sm
          md:text-base
        "
      >
        <div className="text-slate-300">
          ▹ 50+ LeetCode Problems Solved
        </div>

        <div className="text-slate-300">
          ▹ Strong DSA Foundation
        </div>

        <div className="text-slate-300">
          ▹ AI-Powered Applications
        </div>

        <div className="text-slate-300">
          ▹ Full Stack Development
        </div>

        <div className="text-slate-300">
          ▹ Exploring System Design
        </div>
      </div>

      <div className="flex gap-4">
        <button
          className="
            px-6 py-3
            rounded-lg
            bg-cyan-400
            text-black
            font-semibold
          "
        >
          Explore Work
        </button>

        <button
          className="
            px-6 py-3
            rounded-lg
            border
            border-white/20
            text-white
          "
        >
          Contact
        </button>
      </div>
    </motion.div>
  </div>
</div>
    </ScrollContainer>
  );
};
