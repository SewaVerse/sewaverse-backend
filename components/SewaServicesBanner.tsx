import React from "react";
import serviceMarket from "../assets/images/service-market.svg";
const SewaServiceBanner = () => {
  return (
    <section
      className="relative bg-cover bg-center h-[500px]"
      style={{ backgroundImage: "url('/images/service-market.svg')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>{" "}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-4">
        <h1 className="text-4xl font-bold mb-4">
          A service market place <br /> for everyone
        </h1>
        <p className="max-w-2xl text-lg mb-10">
          Effortlessly begin offering or receiving services with simplicity,
          convenience, and peace of mind, making the whole process smooth and
          enjoyable for everyone involved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="/start-services"
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
          >
            Start Providing Services &rarr;
          </a>
          <a
            href="/browse-categories"
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
          >
            Browse All Sewa Categories &rarr;
          </a>
          <a
            href="/learn-more"
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
          >
            Learn more about sewaverse &rarr;
          </a>
        </div>
      </div>
    </section>
  );
};

export default SewaServiceBanner;
