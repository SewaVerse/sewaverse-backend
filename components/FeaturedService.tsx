"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import popularSewas from "../assets/images/popularSewas.svg";
import profile from "../assets/images/profile.svg";
import Image from "next/image";
import { CiLocationOn } from "react-icons/ci";

const services = [
  { id: 1, name: "All Services" },
  { id: 2, name: "Plumbing" },
  { id: 3, name: "Counselling" },
  { id: 4, name: "Cleaning" },
  { id: 5, name: "Mechanic" },
  { id: 6, name: "Hair Stylist" },
];

const featuredServices = [
  {
    title: "Painting | Exterior | Interior",
    description: "All kind of painting work",
    price: "Rs. 20,000",
    discountedPrice: "Rs. 20,000",
    discount: "30% OFF",
    img: "painting-image-url",
    person: "Emma Clark",
    rating: 4.5,
    location: "Kathmandu",
  },
  {
    title: "Beautician | Bridal | Event",
    description: "Book professional for the event",
    price: "Rs. 5,000",
    img: "beautician-image-url",
    person: "Emily Wilson",
    rating: 4.0,
    location: "Kathmandu",
  },
  {
    title: "Painting | Exterior | Interior",
    description: "All kind of painting work",
    price: "Rs. 20,000",
    discountedPrice: "Rs. 20,000",
    discount: "30% OFF",
    img: "painting-image-url",
    person: "Emma Clark",
    rating: 4.5,
    location: "Kathmandu",
  },
  {
    title: "Beautician | Bridal | Event",
    description: "Book professional for the event",
    price: "Rs. 5,000",
    img: "beautician-image-url",
    person: "Emily Wilson",
    rating: 4.0,
    location: "Kathmandu",
  },
];

export default function FeaturedServices() {
  const [activeService, setActiveService] = useState(1);

  return (
    <div className="container mx-auto">
      <h1 className="text-center font-bold text-3xl mb-8">Featured Sewas</h1>

      <div className="flex gap-5 space-x-4 mb-4">
        {services.map((service) => (
          <button
            key={service.id}
            style={{ height: "50px", width: "200px" }}
            onClick={() => setActiveService(service.id)}
            className={`px-4 py-2 rounded-md light-box-shadow  ${
              activeService === service.id ? "bg-primary text-white" : ""
            }`}
          >
            {service.name}
          </button>
        ))}
      </div>

      <Swiper
        spaceBetween={20}
        slidesPerView={4}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
      >
        {featuredServices.map((service, index) => (
          <SwiperSlide key={index}>
            <div
              style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
              className="w-[310px] bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <Image
                src={popularSewas}
                alt={service.title}
                className="h-[315px] object-cover"
              />

              {service.discount && (
                <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md">
                  {service.discount}
                </span>
              )}
              <div className="text-start p-1 absolute top-[261px] left-2 bg-primary w-[97px] h-[44px] text-white rounded-md">
                <p style={{ fontSize: "10px" }}>Package from:</p>
                <p className="font-bold ">{service.price}</p>
              </div>
              <div className="p-2 text-start">
                <h2 className="font-bold text-lg">{service.title}</h2>
                <p className="text-gray-600">{service.description}</p>
                <div className="flex justify-between items-center mt-2 mb-3">
                  <div className="flex items-center mt-2 h-[40px]">
                    <Image
                      src={profile}
                      alt={service.person}
                      className="rounded-full"
                    />
                    <div className="flex flex-col">
                      <span className="ml-2 text-gray-600">
                        {service.person}
                      </span>
                      <span className="flex justify-center items-center gap-1 ml-2 text-gray-600">
                        <CiLocationOn />
                        {service.location}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-500">⭐</span>
                    <span>{service.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
