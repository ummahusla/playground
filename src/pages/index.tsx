import React from 'react';

import CustomStory from '@/components/CustomStory';
import Stories from '@/components/Stories';

export interface Story {
  type: string;
  content: string | React.ReactNode;
  duration?: number;
  caption?: string;
}

function Home() {
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
      content: <CustomStory />,
    },
  ];

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Stories stories={stories} />
    </div>
  );
}

export default Home;
