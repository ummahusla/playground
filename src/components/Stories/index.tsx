import React, { useState, useEffect, useRef } from 'react';

import StoryComponent from '../StoryComponent';
import { Story } from '@/pages';

interface StoriesProps {
  stories: Story[];
  transitionDuration?: number;
  animationDuration?: number;
}

// const Stories = ({
//   stories,
//   transitionDuration = 3000,
//   animationDuration = 300,
// }: StoriesProps) => {
//   const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
//   const [isTransitioning, setIsTransitioning] = useState(false);

//   useEffect(() => {
//     let interval: string | number | NodeJS.Timeout | undefined;

//     if (currentStoryIndex < stories.length - 1) {
//       const duration =
//         stories[currentStoryIndex].duration || transitionDuration;

//       interval = setInterval(() => {
//         setIsTransitioning(true);

//         setTimeout(() => {
//           setCurrentStoryIndex((prevIndex) => (prevIndex + 1) % stories.length);
//           setIsTransitioning(false);
//         }, animationDuration);
//       }, duration);
//     }

//     return () => clearInterval(interval);
//   }, [currentStoryIndex, stories.length]);

//   const goToPrevStory = () => {
//     console.log('goToPrevStory', `currentStoryIndex: ${currentStoryIndex}`);

//     if (currentStoryIndex === 0) {
//       // If it's the first story, do not update the index
//     } else {
//       setIsTransitioning(true);

//       setTimeout(() => {
//         setCurrentStoryIndex(
//           (prevIndex) => (prevIndex - 1 + stories.length) % stories.length
//         );
//         setIsTransitioning(false);
//       }, transitionDuration);
//     }
//   };

//   const goToNextStory = () => {
//     console.log('goToNextStory', `currentStoryIndex: ${currentStoryIndex}`);

//     if (currentStoryIndex === stories.length - 1) {
//       // If it's the last story, do not update the index to stop the loop
//     } else {
//       setIsTransitioning(true);

//       setTimeout(() => {
//         setCurrentStoryIndex((prevIndex) => prevIndex + 1);
//         setIsTransitioning(false);
//       }, transitionDuration);
//     }
//   };

//   const restartLoop = () => {
//     setCurrentStoryIndex(0);
//   };

//   console.log(currentStoryIndex);

//   return (
//     <div className="w-[390px] h-[844px] relative">
//       {stories[currentStoryIndex] && (
//         <StoryComponent
//           type={stories[currentStoryIndex].type}
//           content={stories[currentStoryIndex].content}
//           width="100%"
//           height="100%"
//           isTransitioning={isTransitioning}
//           // setCurrentStoryIndex={setCurrentStoryIndex}
//         />
//       )}
//       <button
//         onClick={goToPrevStory}
//         style={{
//           position: 'absolute',
//           top: '50%',
//           left: '5px',
//           pointerEvents: currentStoryIndex === 0 ? 'none' : 'auto',
//           opacity: currentStoryIndex === 0 ? 0.7 : 1,
//         }}
//         disabled={currentStoryIndex === 0}
//       >
//         Prev
//       </button>
//       <button
//         onClick={goToNextStory}
//         style={{
//           position: 'absolute',
//           top: '50%',
//           right: '5px',
//           pointerEvents:
//             currentStoryIndex === stories.length - 1 ? 'none' : 'auto',
//           opacity: currentStoryIndex === stories.length - 1 ? 0.7 : 1,
//         }}
//         disabled={currentStoryIndex === stories.length - 1}
//       >
//         Next
//       </button>
//       {currentStoryIndex === stories.length - 1 && (
//         <button
//           onClick={restartLoop}
//           style={{
//             position: 'absolute',
//             bottom: '10px',
//             left: '50%',
//             transform: 'translateX(-50%)',
//           }}
//         >
//           Restart Loop
//         </button>
//       )}
//     </div>
//   );
// };

const Stories: React.FC<StoriesProps> = ({ stories }) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionDuration = 300;

  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    let interval: any;

    if (currentStoryIndex < stories.length - 1) {
      const duration = stories[currentStoryIndex].duration || 3000;

      interval = setInterval(() => {
        setIsTransitioning(true);

        setTimeout(() => {
          setCurrentStoryIndex((prevIndex) => (prevIndex + 1) % stories.length);
          setIsTransitioning(false);
        }, transitionDuration);
      }, duration);
    }

    return () => clearInterval(interval);
  }, [currentStoryIndex, stories, transitionDuration]);

  const goToPrevStory = () => {
    clearInterval(intervalRef.current);
    setIsTransitioning(true);

    setTimeout(() => {
      setCurrentStoryIndex(
        (prevIndex) => (prevIndex - 1 + stories.length) % stories.length
      );
      setIsTransitioning(false);
    }, transitionDuration);
  };

  const goToNextStory = () => {
    clearInterval(intervalRef.current);
    setIsTransitioning(true);

    setTimeout(() => {
      setCurrentStoryIndex((prevIndex) => (prevIndex + 1) % stories.length);
      setIsTransitioning(false);
    }, transitionDuration);
  };

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
          }, transitionDuration);
        }, stories[currentStoryIndex]?.duration || 5000);
      }, transitionDuration);
    }, transitionDuration);
  };

  return (
    <div style={{ width: '390px', height: '844px', position: 'relative' }}>
      <StoryComponent
        type={stories[currentStoryIndex]?.type}
        content={stories[currentStoryIndex]?.content}
        width="100%"
        height="100%"
        isTransitioning={isTransitioning}
      />
      <p>{stories[currentStoryIndex]?.caption}</p>
      <button
        onClick={goToPrevStory}
        style={{
          position: 'absolute',
          top: '50%',
          left: '5px',
          pointerEvents: currentStoryIndex === 0 ? 'none' : 'auto',
          opacity: currentStoryIndex === 0 ? 0.7 : 1,
          transition: 'opacity 0.5s ease-in-out',
        }}
        disabled={isTransitioning}
      >
        Prev
      </button>
      <button
        onClick={goToNextStory}
        style={{
          position: 'absolute',
          top: '50%',
          right: '5px',
          pointerEvents:
            currentStoryIndex === stories.length - 1 ? 'none' : 'auto',
          opacity: currentStoryIndex === stories.length - 1 ? 0.7 : 1,
          transition: 'opacity 0.5s ease-in-out',
        }}
        disabled={isTransitioning}
      >
        Next
      </button>
      {currentStoryIndex === stories.length - 1 && (
        <button
          onClick={restartLoop}
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            transition: 'opacity 0.5s ease-in-out',
          }}
          disabled={isTransitioning}
        >
          Restart Loop
        </button>
      )}
    </div>
  );
};

export default Stories;
