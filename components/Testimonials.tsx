import profile from "../assets/images/profile.svg";
import TestimonialCard from "./Cards";
import React, { useState } from "react";

const Testimonials = () => {
  const testimonials = [
    {
      imageUrl: profile,
      name: "Jackson Hopkins",
      text: "I've used Sewaverse for a variety of services, from home cleaning to graphic design, and overall, I've been very impressed. The range of services is extensive, and the quality is generally high. My only gripe is that the service reviews can sometimes be a bit inconsistent. Still, it's a fantastic resource for all kinds of needs.",
      rating: 5,
    },
    {
      imageUrl: profile,
      name: "Marinda Walkers",
      text: "Sewaverse has been a game-changer for me! From finding a reliable plumber to booking a last-minute hair appointment, this platform does it all.",
      rating: 4,
    },
    {
      imageUrl: profile,
      name: "Jensony Kennedy",
      text: "A fantastic resource that makes finding trusted professionals a breeze.",
      rating: 4,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <div className="relative flex flex-col items-center h-[500px] mt-10">
      <div className="absolute left-48 transform -translate-x-10 top-48 -translate-y-1/2">
        <TestimonialCard
          imageUrl={
            testimonials[
              (currentIndex - 1 + testimonials.length) % testimonials.length
            ].imageUrl
          }
          name={
            testimonials[
              (currentIndex - 1 + testimonials.length) % testimonials.length
            ].name
          }
          text={
            testimonials[
              (currentIndex - 1 + testimonials.length) % testimonials.length
            ].text
          }
          rating={
            testimonials[
              (currentIndex - 1 + testimonials.length) % testimonials.length
            ].rating
          }
          isActive={false}
        />
      </div>

      <div className="relative z-20">
        <TestimonialCard
          imageUrl={testimonials[currentIndex].imageUrl}
          name={testimonials[currentIndex].name}
          text={testimonials[currentIndex].text}
          rating={testimonials[currentIndex].rating}
          isActive={true}
        />
      </div>

      <div className="absolute right-48 transform translate-x-10 top-48 -translate-y-1/2">
        <TestimonialCard
          imageUrl={
            testimonials[(currentIndex + 1) % testimonials.length].imageUrl
          }
          name={testimonials[(currentIndex + 1) % testimonials.length].name}
          text={testimonials[(currentIndex + 1) % testimonials.length].text}
          rating={testimonials[(currentIndex + 1) % testimonials.length].rating}
          isActive={false}
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex mt-6 space-x-4">
        <button
          onClick={handlePrev}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Testimonials;
