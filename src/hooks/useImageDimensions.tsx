import { useState, useEffect } from 'react';

const useImageDimensions = (src: string) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setDimensions({ width: img.naturalWidth, height: img.naturalHeight });
    };
  }, [src]);

  return dimensions;
};

export default useImageDimensions;
