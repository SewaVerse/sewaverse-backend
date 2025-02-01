"use client";
import Image from "next/image";
import { useState } from "react";


import CompanyForm from "./_components/CompanyForm";
import IndividualForm from "./_components/IndividualForm";
const image="/images/servicesImage/about-us.svg"

const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [activeBar, setActiveBar] = useState<string>("individual");


  return (
    <div className="md:px-16 py-4 px-2">
      <h1 className="text-center gradient-text md:text-4xl font-semibold md:py-3">
        Join the Sewaverse Revolution
      </h1>
      <p className="text-center md:text-3xl">Grow with us</p>
      <div className="md:flex md:gap-10 md:py-10 py-2">
        <div className="md:basis-3/5 h-auto relative">
          <Image
            src={image}
            alt="imageIcon"
            width={1}
            height={1}
            className="object-cover w-full md:h-full rounded-xl"
          />
         <h1 className="md:text-5xl  text-center  left-36 md:left-32 font-semibold absolute md:top-4 top-32 text-white">Why Partner with US ?</h1>
           <p className=" absolute text-lg text-white top-10 left-8 md:top-32 md:left-[6rem]">saaS</p>
        </div>
        <div className="md:flex-1 h-auto mt-3 md:mt-0">
          <div className="flex justify-between md:px-20 px-2 cursor-pointer">
            <h1
              className={`${activeBar === "individual" ? "gradient-text" : ""}`}
              onClick={() => setActiveBar("individual")}
            >
              Individual
            </h1>
            <h1
              className={`${activeBar === "company" ? "gradient-text" : ""}`}
              onClick={() => setActiveBar("company")}
            >
              Company
            </h1>
          </div>
          <div className="flex gap-4 md:px-3">
            <div
              className={`w-[50%] border h-1 ${
                activeBar === "individual" ? "bg-brand-gradient" : "bg-gray-300"
              }`}
            ></div>
            <div
              className={`w-[50%] border h-1 ${
                activeBar === "company" ? "bg-brand-gradient" : "bg-gray-300"
              }`}
            ></div>

            
          </div>
          {activeBar ==="individual" && <IndividualForm/>}
          {activeBar==="company" && <CompanyForm/>}
        </div>
      </div>
      {/* for complete page */}
      {/* <Final/> */}
      {/* for feedback form */}
      <div className="p-4">
      
    </div>

    </div>
  );
};

export default page;
