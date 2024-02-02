import React, { ReactNode } from 'react';

export interface StoryProps {
  type: string;
  content: ReactNode;
  width?: string;
  height?: string;
  isTransitioning: boolean;
  duration?: number;
  restartLoop?: () => void;
}

const StoryComponent: React.FC<StoryProps> = ({
  type,
  content,
  width = '100%',
  height = '100%',
  isTransitioning,
}) => {
  if (!type || !content) {
    // Handle the case where type or content is undefined
    return null;
  }

  const style = {
    borderRadius: '8px',
    width,
    height,
    opacity: isTransitioning ? 0 : 1,
    transition: 'opacity 0.3s ease-in-out',
    objectFit: type === 'image' || type === 'video' ? 'cover' : 'initial',
    objectPosition:
      type === 'image' || type === 'video' ? '50% 50%' : 'initial',
  };

  return (
    <div style={style}>
      {type === 'image' && (
        <img
          src={content as string}
          alt="Story"
          style={{
            ...style,
            objectFit: 'cover',
            objectPosition: '50% 50%',
          }}
        />
      )}
      {type === 'video' && (
        <video autoPlay style={{ ...style, width: '100%', height: '100%' }}>
          <source src={content as string} type="video/mp4" />
        </video>
      )}
      {type === 'component' && <div style={style}>{content}</div>}
    </div>
  );
};

export default StoryComponent;