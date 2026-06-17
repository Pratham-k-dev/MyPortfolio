import React, { useRef, useEffect } from 'react';
import { useWindowSize } from '../../hooks/useWindowSize';

export const CanvasStage = ({ image, zIndex = 0 }) => {
  const canvasRef = useRef(null);
  const { width, height, dpr } = useWindowSize();

  useEffect(() => {
    if (!canvasRef.current || !image) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false });
    
    // Set actual size in memory (scaled to account for extra pixel density)
    canvas.width = width * dpr;
    canvas.height = height * dpr;

    // Normalize coordinate system to use css pixels
    ctx.scale(dpr, dpr);

    // clear the canvas
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, width, height);

    if (image.complete && image.naturalWidth) {
      // Object-fit: cover implementation
      const imgRatio = image.width / image.height;
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
      
      ctx.drawImage(image, drawX, drawY, drawW, drawH);
    }
  }, [image, width, height, dpr]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 block w-full h-full pointer-events-none"
      style={{ width: `${width}px`, height: `${height}px`, zIndex }}
    />
  );
};
