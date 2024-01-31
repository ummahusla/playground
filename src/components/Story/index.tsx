import { ReactNode } from 'react';

interface StoryProps {
  children: ReactNode;
}

const Story = ({ children }: StoryProps) => {
  return (
    <div className="py-[20px] px-[40px] h-[884px] w-[390px] bg-[#F0F0F0] w-full h-full text-[#282C33] text-base">
      {children}
    </div>
  );
};

export default Story;
