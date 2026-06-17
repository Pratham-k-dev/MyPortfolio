import { useScroll } from "motion/react";

export function useScrollProgressMotion(containerRef) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return scrollYProgress;
}