import Image from 'next/legacy/image';

import Story from '../Story';

interface SeeMoreProps {
  close: () => void;
}

const SeeMore = ({ close }: SeeMoreProps) => {
  //
  return (
    <Story>
      <div className="flex flex-col h-full justify-between z-[1000]">
        <div>
          <div
            className="cursor-pointer flex items-center justify-center bg-white rounded-[20px] h-[60px] w-[60px]"
            onClick={close}
          >
            <Image src="/assets/back.svg" width={24} height={24} />
          </div>
          <div className="mt-[35px]">
            <div className="text-[30px] leading-10 font-bold">Interested?</div>
            <div className="text-[30px] leading-10 font-bold">Reach out.</div>
          </div>
        </div>
        <div>
          <Image src="/assets/avatar.png" width={178} height={178} />
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
    </Story>
  );
};

export default SeeMore;
