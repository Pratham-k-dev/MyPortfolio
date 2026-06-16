import { useEffect, useRef } from 'react';

export function useScrollAnimation({ totalFrames, containerRef }) {
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const top = rect.top;
      const height = rect.height - windowHeight;
      
      let progress = 0;
      if (height > 0) {
        // Progress goes from 0 when top is at window top, to 1 when bottom is at window bottom
        progress = Math.max(0, Math.min(1, -top / height));
      }
      
      targetFrameRef.current = progress * (totalFrames - 1);
    };

    // Passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [totalFrames, containerRef]);

  return { currentFrameRef, targetFrameRef, animationFrameRef };
}
