import { useEffect, useRef, useState, useCallback } from 'react';
import { useScroll, useTransform, useMotionValueEvent, motion } from 'motion/react';

export function FrameScrubber({
  directory = '/rocket',
  totalFrames = 70,
  prefix = 'ezgif-frame-',
  extension = 'jpg',
  pad = 3,
  scrollHeight = '600vh',
  children,
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const currentIndexRef = useRef(0);

  const [loadProgress, setLoadProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const getFrameSrc = useCallback(
    (index) => {
      const frameStr = String(index + 1).padStart(pad, '0');
      return `${directory}/${prefix}${frameStr}.${extension}`;
    },
    [directory, prefix, extension, pad]
  );

  const drawFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete) return;

    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = width / height;

    let drawW, drawH, drawX, drawY;
    if (imgRatio > canvasRatio) {
      drawH = height;
      drawW = height * imgRatio;
      drawX = (width - drawW) / 2;
      drawY = 0;
    } else {
      drawW = width;
      drawH = width / imgRatio;
      drawX = 0;
      drawY = (height - drawH) / 2;
    }

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }, []);

  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(currentIndexRef.current);
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [drawFrame]);

  useEffect(() => {
    let loadedCount = 0;
    const images = [];
    setIsReady(false);
    setLoadProgress(0);

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      img.src = getFrameSrc(i);
      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / totalFrames) * 100));
        if (i === 0) drawFrame(0);
        if (loadedCount === totalFrames) {
          setIsReady(true);
          drawFrame(currentIndexRef.current);
        }
      };
      img.onerror = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / totalFrames) * 100));
        if (loadedCount === totalFrames) setIsReady(true);
      };
      images.push(img);
    }

    imagesRef.current = images;
    return () => { imagesRef.current = []; };
  }, [totalFrames, getFrameSrc, drawFrame]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const frameValue = useTransform(scrollYProgress, [0, 1], [0, totalFrames - 1]);

  useMotionValueEvent(frameValue, 'change', (latest) => {
    const index = Math.min(totalFrames - 1, Math.max(0, Math.round(latest)));
    if (index !== currentIndexRef.current) {
      currentIndexRef.current = index;
      drawFrame(index);
    }
  });

  return (
    <div ref={containerRef} style={{ position: 'relative', height: scrollHeight, width: '100%' }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          background: '#000',
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            opacity: isReady ? 1 : 0.3,
            transition: 'opacity 0.5s ease',
          }}
        />

        {/* Loading overlay */}
        {!isReady && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              color: '#fff',
            }}
          >
            <div
              style={{
                width: '160px',
                height: '1px',
                background: 'rgba(255,255,255,0.12)',
                borderRadius: '1px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  background: '#fff',
                  width: `${loadProgress}%`,
                  transition: 'width 0.15s ease',
                }}
              />
            </div>
            <span style={{ fontSize: '11px', opacity: 0.4, letterSpacing: '0.12em', fontFamily: 'monospace' }}>
              {loadProgress}%
            </span>
          </div>
        )}

        {/* Scroll progress line */}
        {isReady && (
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '1px',
              background: 'rgba(255,255,255,0.5)',
              scaleX: scrollYProgress,
              transformOrigin: 'left',
              width: '100%',
            }}
          />
        )}

        {/* Overlay children */}
        {isReady && (
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            {typeof children === 'function' ? children(scrollYProgress) : children}
          </div>
        )}
      </div>
    </div>
  );
}