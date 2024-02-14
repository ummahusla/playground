import React from 'react';

// import Stories from '@/components/Stories';
import PanoramicTour from '@/components/PanoramicTour';

function Home() {
  return (
    <div className="flex justify-center">
      {/* <Stories /> */}

      <div
        className="w-[390px] h-[844px]"
        style={{
          backgroundColor: '#f5f5f5',
        }}
      >
        <PanoramicTour imagePath="/assets/pano_1.jpg" />
      </div>
    </div>
  );
}

export default Home;
