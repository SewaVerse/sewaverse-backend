import Image from "next/image";
import React from "react";

type TestimonialCardProps = {
  imageUrl: string;
  name: string;
  text: string;
  rating: number;
  isActive?: boolean;
};

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  imageUrl,
  name,
  text,
  rating,
  isActive = false,
}) => {
  return (
    <div
      className={`relative p-6 rounded-lg shadow-md max-w-md mx-auto transition-opacity
        flex flex-col items-center text-center
        ${isActive ? " bg-white opacity-100 z-20" : "opacity-40 z-10"}`}
      style={{
        transform: isActive ? "scale(1)" : "scale(0.9)",
      }}
    >
      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white -mt-12">
        <Image src={imageUrl} alt={name} width={96} height={96} />
      </div>

      <p className="text-gray-700 mt-4">{text}</p>

      <div className="mt-4 font-semibold text-lg text-gray-800">{name}</div>

      <div className="flex justify-center mt-2">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            fill={i < rating ? "#FFA500" : "#E5E7EB"}
            viewBox="0 0 24 24"
            stroke="none"
            className="w-6 h-6"
          >
            <path d="M12 17.27L18.18 21 15.64 13.53 21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l5.36 4.29L5.82 21z" />
          </svg>
        ))}
      </div>
    </div>
  );
};

export default TestimonialCard;
