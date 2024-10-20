import React from "react";
import plumbing from "../assets/images/plumbing.svg";
import counselling from "../assets/images/counseling.svg";
import cleaning from "../assets/images/cleaning.svg";
import mechanic from "../assets/images/mechanic.svg";
import Image from "next/image";

const categories = [
  {
    title: "Plumbing",
    imageUrl: "/images/plumbing.jpg",
  },
  {
    title: "Counselling",
    imageUrl: "/images/counselling.jpg",
  },
  {
    title: "Cleaning",
    imageUrl: "/images/cleaning.jpg",
  },
  {
    title: "Mechanic",
    imageUrl: "/images/mechanic.jpg",
  },
];

const PopularSewaCategories = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex mb-8 ">
          <div>
            <h2 className="text-3xl  mt-2 font-bold text-gray-800">
              Popular Sewa Categories
            </h2>
          </div>
          <div className="ml-[264px]">
            <p className=" max-w-2xl mx-auto">
              One-stop solution for all service needs. We offer a wide range of
              services across various categories, ensuring convenience, quality,
              and satisfaction.
            </p>
          </div>
        </div>
        <div className="flex gap-5">
          <div className="relative group rounded-lg  shadow-md">
            <Image
              width={100}
              src={plumbing}
              alt="plumbing"
              className="w-full  object-cover "
              height={518}
              style={{ height: "518px" }}
            />
            <div className="absolute inset-0 bg-black opacity-0"></div>
            <div className="absolute bottom-4 left-4 text-white bg-black bg-opacity-60 py-1 px-3 rounded-md">
              Plumbing
            </div>
          </div>
          <div>
            <div className="relative group rounded-lg  shadow-md mb-5">
              <Image
                height={100}
                width={100}
                src={counselling}
                alt="plumbing"
                className="w-full  object-cover "
                style={{ height: "249px" }}
              />
              <div className="absolute inset-0 bg-black opacity-0"></div>
              <div className="absolute bottom-4 left-4 text-white bg-black bg-opacity-60 py-1 px-3 rounded-md">
                Counselling
              </div>
            </div>
            <div className="flex gap-5">
              <div className="relative group rounded-lg  shadow-md">
                <Image
                  height={100}
                  width={100}
                  src={cleaning}
                  alt="plumbing"
                  className="w-full  object-cover "
                  style={{ height: "249px" }}
                />
                <div className="absolute inset-0 bg-black opacity-0"></div>
                <div className="absolute bottom-4 left-4 text-white bg-black bg-opacity-60 py-1 px-3 rounded-md">
                  Cleaning
                </div>
              </div>
              <div className="relative group rounded-lg  shadow-md">
                <Image
                  height={100}
                  width={100}
                  src={mechanic}
                  alt="plumbing"
                  className="w-full  object-cover "
                  style={{ height: "249px" }}
                />
                <div className="absolute inset-0 bg-black opacity-0"></div>
                <div className="absolute bottom-4 left-4 text-white bg-black bg-opacity-60 py-1 px-3 rounded-md">
                  Mechanic
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularSewaCategories;
