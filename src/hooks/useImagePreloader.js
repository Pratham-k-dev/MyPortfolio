import { useState, useEffect } from 'react';
import { getFramePath } from '../utils/framePathBuilder';

export function useImagePreloader({ totalFrames, directory, prefix, extension, pad }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [percentLoaded, setPercentLoaded] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    let loadedCount = 0;
    const loadedImages = new Array(totalFrames);
    let isCancelled = false;

    // Immediately return if 0 frames requested
    if (totalFrames === 0) {
      setIsLoaded(true);
      setPercentLoaded(100);
      return;
    }

    const onLoad = () => {
      if (isCancelled) return;
      loadedCount++;
      setPercentLoaded(Math.round((loadedCount / totalFrames) * 100));
      if (loadedCount === totalFrames) {
        setIsLoaded(true);
        setImages(loadedImages);
      }
    };

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      img.src = getFramePath(directory, i, prefix, extension, pad);
      img.onload = onLoad;
      img.onerror = onLoad; // Still count errors so we don't block
      loadedImages[i] = img;
    }

    return () => {
      isCancelled = true;
    };
  }, [totalFrames, directory, prefix, extension, pad]);

  return { isLoaded, percentLoaded, images };
}
