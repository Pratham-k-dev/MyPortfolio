// import React, { useEffect, useRef, useState } from 'react';
// import { useScrollAnimation } from '../hooks/useScrollAnimation';

// export function ScrollSequenceCanvas({
//   totalFrames,
//   directory,
//   prefix = 'ezgif-frame-',
//   extension = 'png',
//   pad = 3,
//   containerRef,
//   z = 0
// }) {
//   const canvasRef = useRef(null);
//   const imagesRef = useRef([]);
//   const [isLoaded, setIsLoaded] = useState(false);
  
//   const { currentFrameRef, targetFrameRef, animationFrameRef } = useScrollAnimation({
//     totalFrames,
//     containerRef,
//   });

//   const getFrameSrc = (index) => {
//     const frameStr = String(index + 1).padStart(pad, '0');
//     return `${directory}/${prefix}${frameStr}.${extension}`;
//   };

//   useEffect(() => {
//     let loadedCount = 0;
//     const images = [];

//     // Immediately show first frame if available
//     const firstImg = new Image();
//     firstImg.src = getFrameSrc(0);
//     firstImg.onload = () => {
//       if (!isLoaded) {
//         imagesRef.current[0] = firstImg;
//       }
//     };

//     for (let i = 0; i < totalFrames; i++) {
//       const img = new Image();
//       img.src = getFrameSrc(i);
//       img.onload = () => {
//         loadedCount++;
//         if (loadedCount === totalFrames) {
//           setIsLoaded(true);
//         }
//       };
//       img.onerror = () => {
//         loadedCount++;
//         if (loadedCount === totalFrames) {
//           setIsLoaded(true);
//         }
//       };
//       images.push(img);
//     }
    
//     imagesRef.current = images;
    
//     return () => {
//       imagesRef.current = [];
//     };
//   }, [totalFrames, directory, prefix, extension, pad]);

//   useEffect(() => {
//     if (!canvasRef.current) return;
    
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d', { alpha: false }); // Optimize
    
//     const resizeCanvas = () => {
//       const dpr = window.devicePixelRatio || 1;
//       canvas.width = window.innerWidth * dpr;
//       canvas.height = window.innerHeight * dpr;
//       ctx.scale(dpr, dpr);
//       canvas.style.width = `${window.innerWidth}px`;
//       canvas.style.height = `${window.innerHeight}px`;
//     };
    
//     resizeCanvas();
//     window.addEventListener('resize', resizeCanvas, { passive: true });
    
//     const render = () => {
//       // Lerp smoothing (0.1 means 10% interpolation per frame)
//       currentFrameRef.current += (targetFrameRef.current - currentFrameRef.current) * 0.1;
      
//       const frameIndex = Math.min(
//         totalFrames - 1, 
//         Math.max(0, Math.floor(currentFrameRef.current))
//       );
      
//       const img = imagesRef.current[frameIndex] || imagesRef.current[0];
      
//       if (img && img.complete) {
//         const imgRatio = img.width / img.height;
//         const canvasRatio = window.innerWidth / window.innerHeight;
        
//         let drawW, drawH, drawX, drawY;
        
//         if (imgRatio > canvasRatio) {
//           drawH = window.innerHeight;
//           drawW = window.innerHeight * imgRatio;
//           drawX = (window.innerWidth - drawW) / 2;
//           drawY = 0;
//         } else {
//           drawW = window.innerWidth;
//           drawH = window.innerWidth / imgRatio;
//           drawX = 0;
//           drawY = (window.innerHeight - drawH) / 2;
//         }
        
//         ctx.fillStyle = '#000';
//         ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
//         ctx.drawImage(img, drawX, drawY, drawW, drawH);
//       } else {
//         // Fallback drawing if image not ready
//         ctx.fillStyle = '#000';
//         ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
//       }
      
//       animationFrameRef.current = requestAnimationFrame(render);
//     };
    
//     render();
    
//     return () => {
//       window.removeEventListener('resize', resizeCanvas);
//       if (animationFrameRef.current) {
//         cancelAnimationFrame(animationFrameRef.current);
//       }
//     };
//   }, [totalFrames, currentFrameRef, targetFrameRef, animationFrameRef, isLoaded]);

//   return (
//     <div 
//       className={`fixed inset-0 w-full h-full pointer-events-none transition-opacity duration-1000 ${
//         isLoaded ? 'opacity-100' : 'opacity-0'
//       }`}
//       style={{ zIndex: z }}
//     >
//       <canvas ref={canvasRef} className="block w-full h-full" />
//       {/* Cinematic dark overlay gradient */}
//       <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/80 via-transparent to-[#0a0a0a]/80" />
//     </div>
//   );
// }
import React, { useEffect, useRef, useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export function ScrollSequenceCanvas({
  totalFrames,
  directory,
  prefix = 'ezgif-frame-',
  extension = 'png',
  pad = 3,
  containerRef,
  z = 0
}) {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const { currentFrameRef, targetFrameRef, animationFrameRef } = useScrollAnimation({
    totalFrames,
    containerRef,
  });

  const getFrameSrc = (index) => {
    const frameStr = String(index + 1).padStart(pad, '0');
    return `${directory}/${prefix}${frameStr}.${extension}`;
  };

  useEffect(() => {
    let loadedCount = 0;
    const images = [];

    // Immediately show first frame if available
    const firstImg = new Image();
    firstImg.src = getFrameSrc(0);
    firstImg.onload = () => {
      if (!isLoaded) {
        imagesRef.current[0] = firstImg;
      }
    };

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      img.src = getFrameSrc(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalFrames) {
          setIsLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === totalFrames) {
          setIsLoaded(true);
        }
      };
      images.push(img);
    }
    
    imagesRef.current = images;
    
    return () => {
      imagesRef.current = [];
    };
  }, [totalFrames, directory, prefix, extension, pad]);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false }); // Optimize
    
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });
    
    const render = () => {
      // Lerp smoothing (0.1 means 10% interpolation per frame)
      currentFrameRef.current += (targetFrameRef.current - currentFrameRef.current) * 0.1;
      
      const frameIndex = Math.min(
        totalFrames - 1, 
        Math.max(0, Math.floor(currentFrameRef.current))
      );
      
      const img = imagesRef.current[frameIndex] || imagesRef.current[0];
      
      if (img && img.complete) {
        const imgRatio = img.width / img.height;
        const canvasRatio = window.innerWidth / window.innerHeight;
        
        let drawW, drawH, drawX, drawY;
        
        if (imgRatio > canvasRatio) {
          drawH = window.innerHeight;
          drawW = window.innerHeight * imgRatio;
          drawX = (window.innerWidth - drawW) / 2;
          drawY = 0;
        } else {
          drawW = window.innerWidth;
          drawH = window.innerWidth / imgRatio;
          drawX = 0;
          drawY = (window.innerHeight - drawH) / 2;
        }
        
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        ctx.drawImage(img, drawX, drawY, drawW, drawH);
      } else {
        // Fallback drawing if image not ready
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      }
      
      animationFrameRef.current = requestAnimationFrame(render);
    };
    
    render();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [totalFrames, currentFrameRef, targetFrameRef, animationFrameRef, isLoaded]);

return (
  <div
    className={`fixed inset-0 w-full h-full pointer-events-none transition-opacity duration-1000 ${
      isLoaded ? 'opacity-100' : 'opacity-0'
    }`}
    style={{ zIndex: z }}
  >
    <canvas ref={canvasRef} className="block w-full h-full" />

    <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/80 via-transparent to-[#0a0a0a]/80" />
  </div>
);
}
