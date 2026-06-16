import { motion, useTransform } from 'motion/react';
import { BookOpen } from 'lucide-react';

export function CourseCard({ course, scrollYProgress, start, end, index }) {
  // We want the card to fade in just before 'start' and fade out just after 'end'
  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, start - 0.05), start + 0.05, end - 0.05, Math.min(1, end + 0.05)],
    [0, 1, 1, 0]
  );

  // The card floats upwards as we scroll
  // The rocket goes from bottom-left to top-right. 
  // Let's make the cards start lower and drift slightly up and right.
  const yOffset = 100 + (index % 2) * 50; // Stagger vertical positions slightly
  const y = useTransform(
    scrollYProgress,
    [start, end],
    [yOffset, -yOffset]
  );
  
  // Parallax horizontal drift
  const xOffset = (index % 2 === 0 ? -1 : 1) * 30;
  const x = useTransform(
    scrollYProgress,
    [start, end],
    [xOffset, xOffset * -1]
  );

  const scale = useTransform(
    scrollYProgress,
    [start - 0.05, start + 0.05, end - 0.05, end + 0.05],
    [0.9, 1, 1, 0.9]
  );

  // Position cards generally around the screen center, alternating sides
  const alignClass = index % 2 === 0 ? 'left-10 md:left-24 top-1/3' : 'right-10 md:right-24 top-1/2';

  return (
    <motion.div
      style={{ opacity, y, x, scale }}
      className={`absolute ${alignClass} z-20 w-[90%] max-w-sm`}
    >
      <div className="glass-card p-6 md:p-8 rounded-2xl border-t-4 border-t-aurora-teal shadow-[0_0_40px_rgba(20,184,166,0.15)] backdrop-blur-md bg-void-black/60">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-aurora-teal/10 rounded-lg border border-aurora-teal/20 text-aurora-teal">
            {course.icon || <BookOpen size={20} />}
          </div>
          <div>
            <p className="text-aurora-teal font-mono text-xs tracking-widest uppercase">
              Phase {index + 1}
            </p>
            <h3 className="text-xl font-bold text-white">{course.title}</h3>
          </div>
        </div>
        
        <p className="text-slate-300 text-sm leading-relaxed mb-6">
          {course.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {course.tags.map((tag, i) => (
            <span 
              key={i} 
              className="px-2 py-1 bg-white/5 rounded-md text-xs font-mono text-slate-300 border border-white/10"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
