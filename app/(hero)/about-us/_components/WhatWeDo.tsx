import Image from "next/image";

const image1 = "/images/servicesImage/about-us1.svg";
const image2 = "/images/servicesImage/about-us2.svg";

const WhatWeDo = () => {
  return (
    <div className=" md:mt-12">
      <div className="flex flex-col items-center  md:mx-52 mx-2">
        <h1 className="gradient-text md:text-4xl font-semibold">What We Do</h1>
        <Image src={"/images"} alt="redLine" width={170} height={30} />
        <p className="text-xl py-2">
          Sewaverse brings together a diverse range of services, all accessible
          from a single digital platform. <br /> Here’s how we serve our community:
        </p>
      </div>

      <div className="md:flex md:gap-4 mx-2">
        <div className="border md:w-[50%] h-auto rounded-2xl bg-brand-gradient">
          <Image
            src={image1}
            alt="image1"
            width={1}
            height={1}
            className="w-full h-auto"
          />
          <div className=" text-white md:px-20 px-2">
            <p className="md:p-2 md:text-lg">
              <span className="font-semibold"> For Users:</span> We make finding
              and booking services fast, reliable, and tailored to your needs.
              With a comprehensive range of services, Sewaverse connects you
              with qualified professionals in just a few clicks.
            </p>
          </div>
        </div>
        <div className="border md:w-[50%] w-full h-auto rounded-2xl bg-brand-gradient">
          <Image
            src={image2}
            alt="image1"
            width={1}
            height={1}
            className="w-full h-auto"
          />
          <div className=" text-white md:px-20 px-2">
            <p className="md:p-2 text-lg">
              <span className="font-semibold"> For Sewa Providers:</span> We
              provide a platform to showcase your expertise, reach new clients,
              and grow your business. With Sewaverse, offering your services has
              never been easier.
            </p>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default WhatWeDo;
