import React, { useState, useEffect, useRef } from 'react';

import StoryComponent from '../StoryComponent';
import CustomStory from '../CustomStory';

export interface Story {
  type: string;
  content: string | React.ReactNode;
  duration?: number;
}

interface StoriesProps {
  transitionDuration?: number;
  animationDuration?: number;
}

const Stories = ({
  transitionDuration = 3000,
  animationDuration = 300,
}: StoriesProps) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const restartLoop = () => {
    clearInterval(intervalRef.current);
    setIsTransitioning(true);

    setTimeout(() => {
      setCurrentStoryIndex(0);
      setIsTransitioning(false);

      // Start a new interval after a short delay
      setTimeout(() => {
        intervalRef.current = setInterval(() => {
          setIsTransitioning(true);

          setTimeout(() => {
            setCurrentStoryIndex(
              (prevIndex) => (prevIndex + 1) % stories.length
            );
            setIsTransitioning(false);
          }, animationDuration);
        }, stories[currentStoryIndex]?.duration || transitionDuration);
      }, animationDuration);
    }, animationDuration);
  };

  const stories: Story[] = [
    {
      type: 'image',
      content: '/assets/1.png',
    },
    {
      type: 'image',
      content: '/assets/2.png',
    },
    {
      type: 'image',
      content: '/assets/3.png',
    },
    {
      type: 'image',
      content: '/assets/4.png',
    },
    {
      type: 'image',
      content: '/assets/5.png',
    },
    {
      type: 'video',
      content: '/assets/6.mov',
      duration: 3000,
    },
    {
      type: 'image',
      content: '/assets/7.png',
    },
    {
      type: 'image',
      content: '/assets/8.png',
    },
    {
      type: 'component',
      content: <CustomStory restartLoop={restartLoop} />,
    },
  ];

  const goToPrevStory = () => {
    clearInterval(intervalRef.current);
    setIsTransitioning(true);

    setTimeout(() => {
      setCurrentStoryIndex(
        (prevIndex) => (prevIndex - 1 + stories.length) % stories.length
      );
      setIsTransitioning(false);
    }, animationDuration);
  };

  const goToNextStory = () => {
    clearInterval(intervalRef.current);
    setIsTransitioning(true);

    setTimeout(() => {
      setCurrentStoryIndex((prevIndex) => (prevIndex + 1) % stories.length);
      setIsTransitioning(false);
    }, animationDuration);
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (currentStoryIndex < stories.length - 1) {
      const duration =
        stories[currentStoryIndex].duration || transitionDuration;

      interval = setInterval(() => {
        setIsTransitioning(true);

        setTimeout(() => {
          setCurrentStoryIndex((prevIndex) => (prevIndex + 1) % stories.length);
          setIsTransitioning(false);
        }, animationDuration);
      }, duration);
    }

    return () => clearInterval(interval);
  }, [currentStoryIndex, stories, animationDuration]);

  return (
    <div className="w-[390px] h-[844px] relative">
      <StoryComponent
        type={stories[currentStoryIndex]?.type}
        content={stories[currentStoryIndex]?.content}
        isTransitioning={isTransitioning}
        restartLoop={restartLoop}
      />
      <button
        onClick={goToPrevStory}
        style={{
          cursor: 'pointer',
          position: 'absolute',
          backgroundColor: '#bebebe',
          height: '100%',
          top: '0',
          left: '0',
          pointerEvents: currentStoryIndex === 0 ? 'none' : 'auto',
          opacity: currentStoryIndex === 0 ? 0.5 : 1,
          transition: 'opacity 0.5s ease-in-out',
        }}
        disabled={isTransitioning}
      >
        Prev
      </button>
      <button
        onClick={goToNextStory}
        style={{
          cursor: 'pointer',
          position: 'absolute',
          backgroundColor: '#bebebe',
          height: '100%',
          top: '0',
          right: '0',
          pointerEvents:
            currentStoryIndex === stories.length - 1 ? 'none' : 'auto',
          opacity: currentStoryIndex === stories.length - 1 ? 0.5 : 1,
          transition: 'opacity 0.5s ease-in-out',
        }}
        disabled={isTransitioning}
      >
        Next
      </button>
    </div>
  );
};

export default Stories;
