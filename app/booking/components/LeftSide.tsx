import { HomeIcon } from "lucide-react";
import Image from "next/image";
import { RiArrowDropDownLine } from "react-icons/ri";
export const serviceIcon = "/images/servicesImage/Mechanics.svg";

const LeftSide = () => {
  return (
    <div className=" mx-4  lg:mx-16   ">
      <div className=" w-[410px]  lg:w-[1000px] lg:h-[492px] lg:mt-2 bg-red">
        <div className="flex items-center ml-2 lg:ml-0 lg:mt-2 ">
          <HomeIcon size={18} />
          <RiArrowDropDownLine className="-rotate-90" />
          <p className="text-muted-foreground text-base">Home Maintainance </p>
          <RiArrowDropDownLine className="-rotate-90" />
          <p className="gradient-text text-base">Painting</p>
        </div>
        <div className="flex items-center justify-between mt-1 ">
          <h1 className="text-2xl font-[500] ">Mechanic Services</h1>
          <p className="text-2xl font-[500] text-muted-foreground">
            Sewa No.1
          </p>
        </div>

        <Image
          src={serviceIcon}
          alt="serviceIcon"
          width={1}
          height={1}
          className="object-cover w-[430px]  lg:w-[1000px] lg:h-[490px] rounded-md  relative"
        />
        <div className="bg-gray-300 w-9 h-9  absolute top-[18rem] left-5 lg:top-[23.25rem] md:top-[23.25rem] lg:left-[4.9rem] cursor-pointer rounded-full flex items-center ">
          <RiArrowDropDownLine size={40} className="rotate-90" />
        </div>
        <div className="bg-gray-200 w-9 h-9  absolute top-[18rem] left-[24rem] lg:top-[23.25rem] md:top-[23.25rem] lg:left-[63rem] cursor-pointer rounded-full flex items-center ">
          <RiArrowDropDownLine size={40} className="-rotate-90" />
        </div>
      </div>
      {/* for slider */}

      <div className="bg-brand  absolute lg:top-[33rem] top-[27.5rem] left-8 md:top-[33rem] text-white font-bold w-[90px] rounded-lg p-2 lg:left-20">
        <p className="line-through">Rs.25000</p>
        <p>Rs.15000</p>
      </div>
      {/* for offer */}
      <div className="absolute right-5 top-32 lg:top-[8.5rem]  lg:left-[60rem] w-[50px] h-[52px] bg-red-600 rounded-b-sm">
        <p className="text-white p-1 text-center uppercase">30% off</p>
      </div>

      <div className="lg:w-[1000px] lg:h-[492px] mt-2">
        <h1 className=" text-black text-[400] text-xl">Description</h1>
        <p className="text-muted-foreground leading-[24px] text-base">
        &quot;At our salon, we believe that a great haircut is more than just a
          routine – it&apos;s an experience. Our talented team of stylists is
          dedicated to crafting a look that perfectly suits your personality,
          lifestyle, and hair type. Whether you&apos;re after a classic style, a
          trendy cut, or something completely new, we take the time to consult
          with you, ensuring that your vision comes to life. Using only the
          finest tools and techniques, we focus on precision and creativity to
          deliver a cut that not only looks incredible but is easy to maintain.{" "}
        </p>{" "}
        <br />
        <p className="mt-3 text-muted-foreground text-base leading-6">
          {" "}
          From chic bobs and elegant layers to sharp fades and textured crops,
          we cater to men, women, and children of all ages. Our personalized
          approach guarantees that you&apos;ll leave our salon feeling refreshed,
          rejuvenated, and ready to take on the world with confidence. Combine
          your haircut with our range of styling and treatment options for the
          ultimate haircare experience. Step into a space where your hair goals
          become our mission. Book your appointment today and let us redefine
          your style!
        </p>
        <p className="mt-8 text-muted-foreground text-base">
          {" "}
          &quot; Would you like to tailor this for a specific clientele or service
          type?
        </p>
      </div>
    </div>
  );
};

export default LeftSide;
