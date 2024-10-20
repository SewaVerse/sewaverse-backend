"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

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
  // Add more services here
];

export default function FeaturedServices() {
  const [activeService, setActiveService] = useState(1);

  return (
    <div className="container mx-auto">
      <h1 className="text-center font-bold text-3xl mb-8">Featured Sewas</h1>

      {/* Service Tabs */}
      <div className="flex justify-center space-x-4 mb-4">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => setActiveService(service.id)}
            className={`px-4 py-2 rounded-md ${
              activeService === service.id
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {service.name}
          </button>
        ))}
      </div>

      {/* Slider */}
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
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Image */}
              <img
                src={service.img}
                alt={service.title}
                className="w-full h-40 object-cover"
              />

              {/* Discount Tag */}
              {service.discount && (
                <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md">
                  {service.discount}
                </span>
              )}

              {/* Info */}
              <div className="p-4">
                <h2 className="font-bold text-lg">{service.title}</h2>
                <p className="text-gray-600">{service.description}</p>
                <div className="flex justify-between items-center mt-2">
                  <p className="font-bold text-blue-600">{service.price}</p>
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-500">⭐</span>
                    <span>{service.rating}</span>
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <img
                    src={`person-avatar-url`}
                    alt={service.person}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="ml-2 text-gray-600">{service.person}</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
