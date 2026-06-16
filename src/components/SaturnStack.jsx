import { motion } from 'motion/react';
import { 
  Code2, 
  Database, 
  Layout, 
  Server, 
  Smartphone, 
  Terminal 
} from 'lucide-react';

function OrbitingTechIcon({ icon, label, delay }) {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 border border-white/10 shadow-lg text-white font-mono flex items-center gap-2 backdrop-blur-sm"
      animate={{
        x: [ -250, 0, 250, 0, -250 ],
        y: [ -80,  40, -80, -200, -80 ],
        scale: [ 0.7, 1.1, 0.7, 0.5, 0.7 ],
        zIndex: [ 30, 30, 10, 10, 30 ],
        opacity: [ 0.8, 1, 0.8, 0.4, 0.8 ]
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "linear",
        delay: delay
      }}
    >
      {icon}
      <span className="text-xs hidden sm:block">{label}</span>
    </motion.div>
  );
}

export function SaturnStack() {
  const technologies = [
    { label: "React", icon: <Layout size={18} className="text-sky-400" />, delay: 0 },
    { label: "Node.js", icon: <Server size={18} className="text-green-500" />, delay: 2 },
    { label: "TypeScript", icon: <Code2 size={18} className="text-blue-500" />, delay: 4 },
    { label: "PostgreSQL", icon: <Database size={18} className="text-indigo-400" />, delay: 6 },
    { label: "Mobile", icon: <Smartphone size={18} className="text-pink-400" />, delay: 8 },
    { label: "DevOps", icon: <Terminal size={18} className="text-orange-400" />, delay: 10 },
  ];

  return (
    <section className="relative h-screen w-full bg-void-black flex flex-col items-center justify-center overflow-hidden">
      {/* Background stars / grid could go here */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/40 via-void-black to-void-black"></div>

      <div className="relative z-20 text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Tech <span className="text-aurora-teal">Ecosystem</span>
        </h2>
        <p className="text-slate-400 font-mono text-sm tracking-widest uppercase">
          Orbital parameters stabilized
        </p>
      </div>

      <div className="relative w-full max-w-3xl aspect-square md:aspect-video flex items-center justify-center">
        {/* Saturn Planet */}
        <div className="relative z-20 w-64 md:w-96 drop-shadow-[0_0_50px_rgba(251,191,36,0.15)]">
          <img 
            src="/src/assets/Saturn.png" 
            alt="Saturn Core" 
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Orbiting Icons */}
        <div className="absolute inset-0">
          {technologies.map((tech, index) => (
            <OrbitingTechIcon 
              key={index}
              icon={tech.icon}
              label={tech.label}
              delay={tech.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
