import React, { useEffect, useRef, useState } from 'react';

interface ImagePreviewProps {
  content: string;
}

const ImagePreview = ({ content }: ImagePreviewProps) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  useEffect(() => {
    if (imageRef.current) {
      const scrollInterval = setInterval(() => {
        // Scroll the image horizontally by 1 pixel every 25 milliseconds
        setScrollPosition((prevPosition) => prevPosition + 1);
      }, 25);

      // Clear the interval when the component unmounts
      return () => clearInterval(scrollInterval);
    }
  }, []);

  useEffect(() => {
    if (imageRef.current) {
      // Reset the scroll position to the left when the content changes
      imageRef.current.scrollLeft = 0;
      setScrollPosition(0);
    }
  }, [content]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        style={{
          width: '200%',
          height: '100%',
          position: 'relative',
          transform: `translateX(-${scrollPosition}px)`,
        }}
      >
        <img
          ref={imageRef}
          src={content}
          alt="Image Story"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>
    </div>
  );
};

export default ImagePreview;
