// components/ServiceCard.tsx
import { Star } from "lucide-react";

interface ServiceCardProps {
  imageSrc: string;
  title: string;
  description: string;
  price: string;
  discount?: string;
  user: string;
  location: string;
  rating: number;
}

export default function ServiceCard({
  imageSrc,
  title,
  description,
  price,
  discount,
  user,
  location,
  rating,
}: ServiceCardProps) {
  return (
    <div className="border rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img src={imageSrc} alt={title} className="w-full h-40 object-cover" />
        {discount && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            {discount}
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <span className="text-blue-600 text-sm">{price}</span>
        </div>
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
        <div className="flex items-center mt-4">
          <img
            src={`https://ui-avatars.com/api/?name=${user}`}
            alt={user}
            className="w-8 h-8 rounded-full mr-2"
          />
          <div className="text-sm">
            <p className="font-semibold">{user}</p>
            <p className="text-gray-500">{location}</p>
          </div>
        </div>
        <div className="flex items-center mt-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < rating ? "text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
