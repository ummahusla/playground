import { CSSProperties, ReactNode } from 'react';

import ImagePreview from '../ImagePreview';
import PanoPreview from '../PanoPreview';

export interface StoryProps {
  type: string;
  content: ReactNode;
  width?: string;
  height?: string;
  isTransitioning: boolean;
}

const StoryComponent = ({
  type,
  content,
  width = '100%',
  height = '100%',
  isTransitioning,
}: StoryProps) => {
  if (!type || !content) {
    return null;
  }

  const style: CSSProperties = {
    borderRadius: '8px',
    width,
    height,
    opacity: isTransitioning ? 0 : 1,
    transition: 'opacity 0.3s ease-in-out',
    // Ensure the overflow is hidden
    overflow: 'hidden',
    // Position relative to handle absolute positioning of the ImagePreview
    position: 'relative',
  };

  return (
    <div style={style}>
      {type === 'pano' && <PanoPreview content={content as string} />}
      {type === 'image' && <ImagePreview content={content as string} />}
      {type === 'video' && (
        <video
          autoPlay
          style={{
            ...style,
            width: '100%',
            height: '100%',
            objectPosition: '50% 50%',
          }}
        >
          <source src={content as string} type="video/mp4" />
        </video>
      )}
      {type === 'component' && <div style={style}>{content}</div>}
    </div>
  );
};

export default StoryComponent;
