import { useScroll } from 'motion/react';
import { useMotionValueEvent } from 'motion/react';
import { useState } from 'react';

export function useScrollProgress(containerRef) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [progress, setProgress] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setProgress(latest);
  });

  return progress;
}
