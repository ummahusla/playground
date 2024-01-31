import React, { Suspense, lazy } from 'react';
import Image from 'next/legacy/image';

import dynamic from 'next/dynamic';
import Story from '@/components/Story';
import SeeMore from '@/components/SeeMore';
import SeeMoreCollapsed from '@/components/SeeMoreCollapsed';

const StoriesLazy = dynamic(() => import('react-insta-stories'), {
  ssr: false,
});
const WithSeeMore = lazy(() =>
  import('react-insta-stories').then((module) => ({
    default: module.WithSeeMore,
  }))
);

function Home() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <StoriesLazy
        preloadCount={3}
        keyboardNavigation
        defaultInterval={8000}
        width={390}
        height={844}
        stories={stories}
        onStoryEnd={(s: any, st: any) => console.log('story ended', s, st)}
        onAllStoriesEnd={(s: any, st: any) =>
          console.log('all stories ended', s, st)
        }
        onStoryStart={(s: any, st: any) => console.log('story started', s, st)}
        onNext={() => console.log('next button pressed')}
        onPrevious={() => console.log('previous button pressed')}
        storyContainerStyles={{
          borderRadius: 8,
          overflow: 'hidden',
          zIndex: 1000,
        }}
      />
    </div>
  );
}

const stories = [
  {
    url: '/assets/1.png',
  },
  {
    url: '/assets/2.png',
  },
  {
    url: '/assets/3.png',
  },
  {
    url: '/assets/4.png',
    preloadResource: false,
  },
  {
    url: '/assets/5.png',
    preloadResource: false,
  },
  {
    content: () => {
      return (
        <div
          style={{
            display: 'flex',
            flex: 1,
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <video
            style={{
              objectFit: 'cover',
              objectPosition: '50% 50%',
              width: '100%',
              height: '100%',
            }}
            src="/assets/6.mov"
            autoPlay
          />
        </div>
      );
    },
    duration: 25000,
  },
  {
    url: '/assets/7.png',
    preloadResource: false,
  },
  {
    url: '/assets/8.png',
    preloadResource: false,
  },
  {
    content: ({ action, story, toggleMore, isPaused }: any) => {
      return (
        <Suspense>
          <WithSeeMore story={story} action={action}>
            <Story>
              <div>
                <Image
                  src="/assets/final_header.png"
                  width={310}
                  height={316}
                />
              </div>
              <div className="flex justify-between mt-[20px]">
                <Image
                  src="/assets/final_sub_header_1.png"
                  width={145}
                  height={92.5}
                />
                <Image
                  src="/assets/final_sub_header_2.png"
                  width={145}
                  height={92.5}
                />
              </div>

              <div className="mt-[30px] bg-white rounded-[20px] p-[30px]">
                <div className="flex justify-between mb-[25px]">
                  <div>
                    <div>Total area</div>
                    <div className="font-bold text-[17px]">472.98 m2</div>
                  </div>
                  <div>
                    <div>Bedrooms</div>
                    <div className="font-bold text-[17px]">1</div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <div>
                    <div>Floor count</div>
                    <div className="font-bold text-[17px]">2</div>
                  </div>
                  <div>
                    <div>Bathrooms</div>
                    <div className="font-bold text-[17px]">4</div>
                  </div>
                </div>
              </div>

              <div className="mt-[20px]">
                <div className="flex">
                  <div className="mr-[22px]">
                    <div className="flex items-center justify-center bg-white rounded-[20px] h-[60px] w-[60px]">
                      <Image src="/assets/restart.svg" width={16} height={16} />
                    </div>
                    <div className="mt-[20px] flex items-center justify-center bg-white rounded-[20px] h-[60px] w-[60px]">
                      <Image src="/assets/menu.svg" width={16} height={16} />
                    </div>
                  </div>

                  <div className="bg-white rounded-[20px] p-[20px] w-full ">
                    <div className="flex justify-between items-center">
                      <div>
                        <Image
                          src="/assets/avatar.png"
                          width={40}
                          height={40}
                        />
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={() => toggleMore(true)}
                      >
                        <Image src="/assets/chat.svg" width={22} height={22} />
                      </div>
                    </div>

                    <div className="mt-[10px]">
                      <div className="font-bold">Alicia Williamson</div>
                      <div className="text-[#485363]">+44 923093881736</div>
                    </div>
                  </div>
                </div>
              </div>
            </Story>
          </WithSeeMore>
        </Suspense>
      );
    },
    seeMoreCollapsed: ({ toggleMore }: any) => (
      <SeeMoreCollapsed toggleMore={toggleMore} />
    ),
    seeMore: ({ close }: any) => <SeeMore close={close} />,
    duration: 1000,
  },
];

// const Story2 = ({ action, isPaused }: any) => {
//   return (
//     <div
//       style={{
//         width: '100%',
//         padding: 20,
//         height: '100%',
//         background: 'Aquamarine',
//         color: '#333',
//       }}
//     >
//       <h1>You get the control of the story.</h1>
//       <p>
//         Render your custom JSX by passing just a{' '}
//         <code style={{ fontStyle: 'italic' }}>content</code> property inside
//         your story object.
//       </p>
//       <p>
//         You get a <code style={{ fontStyle: 'italic' }}>action</code> prop as an
//         input to your content function, that can be used to play or pause the
//         story.
//       </p>
//       <h1>{isPaused ? 'Paused' : 'Playing'}</h1>
//       <h4>v2 is out 🎉</h4>
//       <p>React Native version coming soon.</p>
//     </div>
//   );
// };

// const example = [
//   {
//     content: ({ action, isPaused }: any) => {
//       return (
//         <div
//           style={{
//             background: '#333',
//             width: '100%',
//             padding: 20,
//             color: 'white',
//             height: '100%',
//           }}
//         >
//           <h1>The new version is here.</h1>
//           <p>This is the new story.</p>
//           <p>Now render React components right into your stories.</p>
//           <p>
//             Possibilities are endless, like here - here&apos;s a code block!
//           </p>
//           <pre>
//             <code
//               style={{
//                 background: '#eee',
//                 padding: '5px 10px',
//                 borderRadius: '4px',
//                 color: '#333',
//               }}
//             >
//               console.log(&apos;Hello, world!&apos;)
//             </code>
//           </pre>
//           <p>Or here, an image!</p>
//           <br />
//           <img
//             style={{
//               display: 'block',
//               maxWidth: '100%',
//               borderRadius: 4,
//             }}
//             src="https://images.unsplash.com/photo-1565506737357-af89222625ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
//           ></img>
//           <h3>{"Perfect. But there's more! →"}</h3>
//         </div>
//       );
//     },
//   },
//   {
//     content: ({ action, story }: any) => {
//       return (
//         <Suspense>
//           <WithSeeMore story={story} action={action}>
//             <div style={{ background: 'snow', padding: 20, height: '100%' }}>
//               <h1 style={{ marginTop: '100%', marginBottom: 0 }}>🌝</h1>
//               <h1 style={{ marginTop: 5 }}>
//                 We have our good old image and video stories, just the same.
//               </h1>
//             </div>
//           </WithSeeMore>
//         </Suspense>
//       );
//     },
//     seeMoreCollapsed: ({ toggleMore, action }: any) => (
//       <p
//         style={{
//           textAlign: 'center',
//           fontSize: 14,
//           bottom: 20,
//           position: 'relative',
//         }}
//         onClick={() => toggleMore(true)}
//       >
//         A custom See More message →
//       </p>
//     ),
//     seeMore: ({ close }: any) => (
//       <div
//         style={{
//           maxWidth: '100%',
//           height: '100%',
//           padding: 40,
//           background: 'white',
//         }}
//       >
//         <h2>Just checking the see more feature.</h2>
//         <p style={{ textDecoration: 'underline' }} onClick={close}>
//           Go on, close this popup.
//         </p>
//       </div>
//     ),
//     duration: 5000,
//   },
//   {
//     url: 'https://picsum.photos/1080/1920',
//     seeMore: ({ close }: any) => (
//       <div
//         style={{
//           maxWidth: '100%',
//           height: '100%',
//           padding: 40,
//           background: 'white',
//         }}
//       >
//         <h2>Just checking the see more feature.</h2>
//         <p style={{ textDecoration: 'underline' }} onClick={close}>
//           Go on, close this popup.
//         </p>
//       </div>
//     ),
//   },
//   {
//     url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
//     type: 'video',
//   },
//   {
//     content: Story2,
//   },
//   {
//     url: 'https://plus.unsplash.com/premium_photo-1676231417481-5eae894e7f68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80',
//   },
//   {
//     url: 'https://images.unsplash.com/photo-1676321626679-2513969695d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
//   },
//   {
//     url: 'https://images.unsplash.com/photo-1676359912443-1bf438548584?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
//   },
//   {
//     url: 'https://images.unsplash.com/photo-1676316698468-a907099ad5bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80',
//     preloadResource: false,
//   },
//   {
//     url: 'https://images.unsplash.com/photo-1676310483825-daa08914445e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2920&q=80',
//     preloadResource: false,
//   },
//   {
//     url: 'https://images.unsplash.com/photo-1676321685222-0b527e61d5c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
//     preloadResource: false,
//   },
// ];

export default Home;
