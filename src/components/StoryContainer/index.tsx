import { ReactNode } from 'react';

interface StoryContainerProps {
  children: ReactNode;
}

const StoryContainer = ({ children }: StoryContainerProps) => {
  return (
    <div className="py-[20px] px-[40px] h-[884px] w-[390px] bg-[#F0F0F0] w-full h-full text-[#282C33] text-base">
      {children}
    </div>
  );
};

export default StoryContainer;
