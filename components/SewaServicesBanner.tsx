import serviceMarket from "../assets/images/service-market.svg";
import Image from "next/image";
import React from "react";

const SewaServiceBanner = () => {
  return (
    <section className="relative h-[500px] px-20 overflow-hidden">
      <Image
        src={serviceMarket}
        alt="Service Market Background"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        className="-z-10 px-20"
      />
      <div className="relative z-10 h-full flex flex-col justify-center text-center text-white px-4">
        <div className="text-start">
          <h1 className="text-4xl font-bold mb-4">
            A service marketplace <br /> for everyone
          </h1>
          <p className="max-w-2xl text-lg mb-10">
            Effortlessly begin offering or receiving services with simplicity,
            convenience, and peace of mind, making the whole process smooth and
            enjoyable for everyone involved.
          </p>
        </div>

        <div className="flex text-start justify-center sm:flex-row gap-4">
          <div className="bg-primary hover:bg-blue-800 text-white font-semibold py-5 px-4 rounded-lg transition duration-300 w-[400px] h-[170px]">
            <a className="flex flex-col" href="/start-services">
              <span className="text-3xl font-normal mb-3">
                Become a Sewa Provider
              </span>
              <span className="text-lg"> Start Providing Services &rarr;</span>
            </a>
          </div>
          <div className="bg-primary hover:bg-blue-800 text-white font-semibold py-5 px-4 rounded-lg transition duration-300 w-[400px] h-[170px]">
            <a className="flex flex-col" href="/browse-categories">
              <span className="text-3xl font-normal mb-3">
                Browse All Sewa Categories
              </span>
              <span className="text-lg">Sewa Categories &rarr;</span>
            </a>
          </div>
          <div className="bg-primary hover:bg-blue-800 text-white font-semibold py-5 px-4 rounded-lg transition duration-300 w-[400px] h-[170px]">
            <a className="flex flex-col" href="/learn-more">
              <span className="text-3xl font-normal mb-3">
                Learn more about sewaverse
              </span>
              <span className="text-lg"> More About us &rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SewaServiceBanner;
