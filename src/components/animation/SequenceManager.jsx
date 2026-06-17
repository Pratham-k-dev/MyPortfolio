import React, { useEffect, useState, useRef } from 'react';
import { useImagePreloader } from '../../hooks/useImagePreloader';
import { CanvasStage } from './CanvasStage';

export const SequenceManager = ({
  totalFrames,
  directory,
  prefix = 'frame-',
  extension = 'png',
  pad = 3,
  scrollProgress,
  opacity = 1,
  zIndex = 0
}) => {
  const { isLoaded, images, percentLoaded } = useImagePreloader({
    totalFrames,
    directory,
    prefix,
    extension,
    pad
  });

  const [currentFrame, setCurrentFrame] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!isLoaded) return;

    const targetFrame = Math.min(
      totalFrames - 1,
      Math.max(0, Math.floor(scrollProgress * (totalFrames - 1)))
    );

    // Using rAF to throttle updates
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    
    rafRef.current = requestAnimationFrame(() => {
      setCurrentFrame(targetFrame);
    });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [scrollProgress, isLoaded, totalFrames]);

  return (
    <div
      className="absolute inset-0 w-full h-full transition-opacity duration-100 pointer-events-none"
      style={{ opacity, zIndex }}
    >
      {isLoaded && images[currentFrame] ? (
        <CanvasStage image={images[currentFrame]} />
      ) : (
        <div className="absolute inset-0 bg-void-black flex items-center justify-center text-slate-500 font-mono text-sm">
          Loading... {percentLoaded}%
        </div>
      )}
      {/* Dark gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent w-full md:w-3/4 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/10 to-[#0a0a0a]/80 pointer-events-none" />
    </div>
  );
};
