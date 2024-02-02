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
      duration: 5000,
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

  // Handling the transition between stories based on the interval.
  // It starts a new interval when the component mounts and clears it
  // when the component unmounts or the currentStoryIndex changes.
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    const startTransition = () => {
      setIsTransitioning(true);

      setTimeout(() => {
        setCurrentStoryIndex((prevIndex) => (prevIndex + 1) % stories.length);
        setIsTransitioning(false);
      }, animationDuration);
    };

    if (currentStoryIndex < stories.length - 1) {
      const duration =
        stories[currentStoryIndex].duration || transitionDuration;

      interval = setInterval(startTransition, duration);
    }

    return () => clearInterval(interval);
  }, [
    currentStoryIndex,
    stories,
    animationDuration,
    transitionDuration,
    setIsTransitioning,
  ]);

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
        className="w-[42px] cursor-pointer absolute bg-transparent h-full top-0 left-0 transition-opacity duration-500 ease-in-out"
        style={{
          pointerEvents: currentStoryIndex === 0 ? 'none' : 'auto',
          opacity: currentStoryIndex === 0 ? 0.5 : 1,
        }}
        disabled={isTransitioning}
      />
      <button
        onClick={goToNextStory}
        className="w-[42px] cursor-pointer absolute bg-transparent h-full top-0 right-0 transition-opacity duration-500 ease-in-out"
        style={{
          pointerEvents:
            currentStoryIndex === stories.length - 1 ? 'none' : 'auto',
          opacity: currentStoryIndex === stories.length - 1 ? 0.5 : 1,
        }}
        disabled={isTransitioning}
      />
    </div>
  );
};

export default Stories;