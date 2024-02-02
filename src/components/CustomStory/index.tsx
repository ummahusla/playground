import { useState } from 'react';
import Image from 'next/image';

const CustomStory = ({ restartLoop }: { restartLoop: () => void }) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const openDialog = () => {
    console.log('open dialog');
    setDialogOpen(true);
  };

  const closeDialog = () => {
    console.log('close dialog');
    setDialogOpen(false);
  };

  const restartStory = () => {
    console.log('restart');
    restartLoop();
  };

  const backtoMenu = () => {
    console.log('back to menu');
    alert('holy shit it works.');
  };

  return (
    <div className="rounded-lg py-[20px] px-[40px] bg-[#F0F0F0] w-full h-full text-[#282C33] text-base">
      {dialogOpen ? (
        <div className="flex flex-col h-full justify-between">
          <div>
            <div className="cursor-pointer flex items-center justify-center bg-white rounded-[20px] h-[60px] w-[60px]">
              <Image
                src="/assets/back.svg"
                width={24}
                height={24}
                onClick={closeDialog}
                alt="Back"
              />
            </div>
            <div className="mt-[35px]">
              <div className="text-[30px] leading-10 font-bold">
                Interested?
              </div>
              <div className="text-[30px] leading-10 font-bold">Reach out.</div>
            </div>
          </div>
          <div>
            <Image
              src="/assets/avatar.png"
              width={178}
              height={178}
              alt="Avatar"
            />
            <div className="mt-[20px] text-2xl leading-10 font-bold">
              Alicia Williamson
            </div>
            <div className="text-2xl leading-10 text-[#797979]">
              +44 9284 6100 381
            </div>
            <div className="text-2xl leading-10 text-[#797979]">
              alicia@realestate.com
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="rounded-[20px] overflow-hidden">
            <Image
              className="hover:scale-110 transition-transform"
              src="/assets/final_header.png"
              width={310}
              height={316}
              alt="Header"
            />
          </div>
          <div className="flex justify-between mt-[20px]">
            <div className="rounded-[20px] overflow-hidden">
              <Image
                className="hover:scale-110 transition-transform"
                src="/assets/final_sub_header_1.png"
                width={145}
                height={92.5}
                alt="Sub Header"
              />
            </div>
            <div className="rounded-[20px] overflow-hidden">
              <Image
                className="hover:scale-110 transition-transform"
                src="/assets/final_sub_header_2.png"
                width={145}
                height={92.5}
                alt="Sub Header"
              />
            </div>
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
                <div
                  className="cursor-pointer flex items-center justify-center bg-white rounded-[20px] h-[60px] w-[60px]"
                  onClick={restartStory}
                >
                  <Image
                    src="/assets/restart.svg"
                    width={16}
                    height={16}
                    alt="Restart story"
                  />
                </div>
                <div
                  className="cursor-pointer mt-[20px] flex items-center justify-center bg-white rounded-[20px] h-[60px] w-[60px]"
                  onClick={backtoMenu}
                >
                  <Image
                    src="/assets/menu.svg"
                    width={16}
                    height={16}
                    alt="Menu"
                  />
                </div>
              </div>

              <div className="bg-white rounded-[20px] p-[20px] w-full ">
                <div className="flex justify-between items-center">
                  <div>
                    <Image
                      src="/assets/avatar.png"
                      width={40}
                      height={40}
                      alt="Avatar"
                    />
                  </div>
                  <div className="cursor-pointer" onClick={openDialog}>
                    <Image
                      src="/assets/chat.svg"
                      width={22}
                      height={22}
                      alt="Chat"
                    />
                  </div>
                </div>

                <div className="mt-[10px]">
                  <div className="font-bold">Alicia Williamson</div>
                  <div className="text-[#485363]">+44 923093881736</div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CustomStory;
