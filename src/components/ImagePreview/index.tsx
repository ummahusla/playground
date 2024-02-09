// imagepreview.tsx
import React, { useEffect, useRef, useState } from 'react';

interface ImagePreviewProps {
  content: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ content }) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [isTextVisible, setIsTextVisible] = useState<boolean>(false);

  useEffect(() => {
    if (imageRef.current) {
      const scrollInterval = setInterval(() => {
        // Scroll the image horizontally by 1 pixels every 25 milliseconds
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

      // Reset the text visibility state when the content changes
      setIsTextVisible(false);

      // Show the text after a delay
      const timeout = setTimeout(() => {
        setIsTextVisible(true);
      }, 200);

      return () => clearTimeout(timeout);
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
      {/* Overlay with animated text */}
      <div
        ref={overlayRef}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '100%',
          transition: 'opacity 0.3s ease-in-out',
          opacity: isTextVisible ? 1 : 0,
          background: 'rgba(0, 0, 0, 0.35)',
          zIndex: 2,
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'flex-end',
          padding: '20px',
        }}
      >
        <div
          style={{
            color: '#fff',
            textAlign: 'left',
            marginLeft: '20px',
          }}
        >
          <div
            style={{
              fontSize: '30px',
              marginBottom: '5px',
            }}
          >
            1 floor
          </div>
          <div
            style={{
              fontSize: '30px',
              marginBottom: '5px',
            }}
          >
            4 bedrooms
          </div>
          <div
            style={{
              fontSize: '30px',
              marginBottom: '5px',
            }}
          >
            2 bathrooms
          </div>
          <div
            style={{
              fontSize: '30px',
              marginBottom: '5px',
            }}
          >
            103 m²
          </div>
        </div>
      </div>

      {/* Image container */}
      <div
        style={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          position: 'relative',
          zIndex: 1,
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
    </div>
  );
};

export default ImagePreview;
