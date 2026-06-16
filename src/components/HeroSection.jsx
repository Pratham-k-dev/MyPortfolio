import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

const roles = [
  "Full Stack Engineer",
  "UI/UX Designer",
  "Space Enthusiast",
  "Creative Developer"
];

function TypewriterEffect() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
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
      }, isDeleting ? 50 : 100);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRoleIndex]);

  return (
    <span className="text-lunar-gold font-mono min-h-[24px] inline-block">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
}

export function HeroSection() {
  return (
    <section className="relative h-screen w-full flex overflow-hidden bg-void-black z-3">

      {/* ── Background Video — right half, desktop ── */}
      <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block">
        {/* left-edge fade so the video bleeds into the card area naturally */}
        <div className="absolute inset-0 bg-gradient-to-r from-void-black via-void-black/60 to-transparent z-10 pointer-events-none" />
        <video
          autoPlay loop muted playsInline
          className="w-full h-full object-cover"
        >
          <source src="/space_station.mp4" type="video/mp4" />
        </video>
      </div>

      {/* ── Mobile full-screen video ── */}
      <div className="absolute inset-0 lg:hidden">
        <div className="absolute inset-0 bg-void-black/70 z-10" />
        <video
          autoPlay loop muted playsInline
          className="w-full h-full object-cover"
        >
          <source src="/space_station.mp4" type="video/mp4" />
        </video>
      </div>

      {/* ── Content Layer ── */}
      <div className="relative z-20 container mx-auto px-6 -ml-2 h-full flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{
            /* Frosted glass — a real backdrop-blur with a very thin luminous border */
            background: 'rgba(8, 12, 24, 0.45)',
            backdropFilter: 'blur(24px) saturate(160%)',
            WebkitBackdropFilter: 'blur(24px) saturate(160%)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: `
              0 0 0 1px rgba(14,165,233,0.07),
              0 8px 40px rgba(0,0,0,0.55),
              inset 0 1px 0 rgba(255,255,255,0.06)
            `,
          }}
          className="p-10 md:p-14 rounded-2xl max-w-2xl w-full lg:w-auto"
        >
          {/* Label */}
          <p className="text-nebula-blue font-mono mb-4 text-sm md:text-base tracking-widest uppercase">
            Initialize Sequence...
          </p>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white">
            Hello, I'm <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-nebula-blue to-aurora-teal">
              Pratham Kulkarni
            </span>
          </h1>

          {/* Typewriter */}
          <div className="text-xl md:text-2xl mb-8 font-light text-slate-300">
            &gt; <TypewriterEffect />
          </div>

          {/* Body copy */}
          <p className="text-slate-400 mb-10 text-lg leading-relaxed max-w-lg">
            Crafting stellar digital experiences across the universe. I build
            beautiful, high-performance web applications with modern technologies.
          </p>

          {/* ── Buttons ── */}
          <div className="flex flex-wrap gap-4">

            {/* PRIMARY — glowing neon CTA */}
            <button
              style={{
                background: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
                boxShadow: '0 0 18px rgba(14,165,233,0.55), 0 0 40px rgba(14,165,233,0.25)',
                transition: 'box-shadow 0.25s ease, transform 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 0 28px rgba(14,165,233,0.8), 0 0 60px rgba(14,165,233,0.4)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = '0 0 18px rgba(14,165,233,0.55), 0 0 40px rgba(14,165,233,0.25)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              className="px-8 py-3 text-white font-semibold rounded-lg text-sm md:text-base tracking-wide"
            >
              Launch Projects
            </button>

            {/* SECONDARY — ghost outline */}
            <button
              style={{
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.22)',
                color: 'rgba(255,255,255,0.80)',
                transition: 'border-color 0.25s ease, background 0.25s ease, color 0.25s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(14,165,233,0.6)';
                e.currentTarget.style.background = 'rgba(14,165,233,0.08)';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)';
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'rgba(255,255,255,0.80)';
              }}
              className="px-8 py-3 font-medium rounded-lg text-sm md:text-base tracking-wide"
            >
              Contact Command
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}