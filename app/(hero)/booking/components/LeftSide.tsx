import { HomeIcon } from "lucide-react";
import Image from "next/image";
import { RiArrowDropDownLine } from "react-icons/ri";

interface OfferService {
  serviceTitle: string;
  slogan: string;
  serviceIcon: string;
  discountPrice: string;
  originalPrice: string;
  discountPercentage: string;
  description: string;
  extraInfo: string;
}

interface LeftSideProps {
  offerService: OfferService[];
}

const LeftSide = ({ offerService }: LeftSideProps) => {
  return (
    <div className="mx-4 lg:mx-14 lg:mb-10">
      {offerService.map((data, index) => (
        <div
          key={index}
          className="w-[410px] lg:w-[950px] lg:h-[492px] lg:mt-2 bg-red"
        >
          <div className="flex items-center ml-2 lg:ml-0 lg:mt-2">
            <HomeIcon size={18} />
            <RiArrowDropDownLine className="-rotate-90" />
            <p className="text-muted-foreground text-sm lg:text-base">
              Home Maintainance
            </p>
            <RiArrowDropDownLine className="-rotate-90" />
            <p className="text-base gradient-text lg:text-base">
              {data.slogan}
            </p>
          </div>

          <div className="flex items-center gap-48 lg:justify-between mt-1 text-base mx-2">
            <h1 className="lg:text-2xl font-[500]">{data.serviceTitle}</h1>
            <p className="lg:text-2xl md:text-2xl font-[500] text-muted-foreground">
              Sewa No.1
            </p>
          </div>
          <div>
            <Image
              src={data.serviceIcon}
              alt={data.serviceTitle}
              width={1}
              height={1}
              className="object-cover w-[395px] lg:w-[1250px] lg:h-[490px] rounded-md relative"
            />

            <div className="bg-gray-300 w-8 h-8 absolute top-[18rem] left-5 lg:top-[23.25rem] md:top-[23.25rem] lg:left-[3.7rem] cursor-pointer rounded-full flex items-center">
              <RiArrowDropDownLine size={40} className="rotate-90" />
            </div>
            <div className="bg-gray-200 w-8 h-8 absolute top-[18rem] left-[23rem] lg:top-[23.25rem] md:top-[23.25rem] lg:left-[60.5rem] cursor-pointer rounded-full flex items-center">
              <RiArrowDropDownLine size={40} className="-rotate-90" />
            </div>

            {/* Slider */}
            <div className="bg-brand absolute lg:top-[33rem] top-[27.5rem] left-8 md:top-[33rem] text-white font-bold w-[90px] rounded-lg p-2 lg:left-20">
              <p className="line-through">Rs.{data.originalPrice}</p>
              <p>Rs.{data.discountPrice}</p>
            </div>

            {/* Offer */}
            <div className="absolute right-6 top-32 lg:top-[8.5rem] lg:left-[59rem] w-[50px] h-[52px] bg-red-600 rounded-b-sm">
              <p className="text-white p-1 text-center uppercase">
                {data.discountPercentage} off
              </p>
            </div>
          </div>
          {/* Description */}
          <div className="w-[395px] lg:w-[950px] h-auto mt-2">
            <p className="text-muted-foreground leading-[24px] text-base">
              {data.description}
            </p>
            <p className="mt-2 text-muted-foreground text-base ">
              {data.extraInfo}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeftSide;
