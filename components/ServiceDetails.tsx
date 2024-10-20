// pages/service/[id].tsx

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Star } from "lucide-react";

const reviews = [
  {
    user: "Jhon Ward",
    rating: 5,
    review: "Love the service! Definitely try",
    description:
      "The painter service was prompt and professional, delivering high-quality work with great attention to detail. The staff was courteous and maintained a clean workspace throughout.",
    date: "September 24",
    location: "Kathmandu",
  },
  {
    user: "Emily Rossitter",
    rating: 5,
    review: "Great worker!",
    description:
      "The painter service exceeded expectations with its exceptional workmanship and timely completion. The team was friendly, efficient, and ensured a smooth process.",
    date: "September 24",
    location: "Kathmandu",
  },
];

export default function ServiceDetails() {
  return (
    <div className="flex justify-center p-8">
      {/* Main Content */}
      <div className="w-3/5 pr-8">
        <img
          src="/images/service1.jpg"
          alt="Painting Service"
          className="rounded-lg mb-6 w-full h-64 object-cover"
        />
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">Painting | Exterior</h1>
            <p className="text-sm text-gray-600">
              Nabinita Karmaacharya, Jayabageshwari, Kathmandu
            </p>
          </div>
          <span className="text-blue-500 font-bold">Verified</span>
        </div>

        {/* Ratings */}
        <div className="flex items-center space-x-2 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < 4 ? "text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-sm font-bold">4.5</span>
        </div>

        <p className="text-sm text-gray-700 mb-6">
          Sewasaver offers professional painting services with skilled painters,
          ensuring a flawless finish for your interiors and exteriors. They
          provide high-quality paint products, tailored color consultations, and
          timely service. Enhance your space with a fresh, vibrant look from
          Sewa Saver's expert team.
        </p>

        {/* Review Section */}
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2">Review this product</h2>
          <Input placeholder="Write a customer review" className="mb-4" />
          <Button>Submit</Button>
        </div>

        {/* Reviews */}
        <div className="space-y-6">
          {reviews.map((review, index) => (
            <div key={index} className="border rounded-lg p-4 shadow-sm">
              <div className="flex justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <img
                    src={`https://ui-avatars.com/api/?name=${review.user}`}
                    alt={review.user}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="font-bold">{review.user}</p>
                    <p className="text-xs text-gray-500">
                      Reviewed in the {review.location} on {review.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <h3 className="font-semibold">{review.review}</h3>
              <p className="text-sm text-gray-700">{review.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Section */}
      <div className="w-2/5 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Book a Service</h2>
        <p className="text-sm font-semibold mb-4">
          Price <span className="text-xl font-bold">Rs. 30.00</span>
        </p>
        <p className="text-gray-600 mb-4">
          Exterior painting services start at NPR 30 per sq. ft., covering
          weather-resistant paint and labor. For premium, long-lasting finishes,
          the cost ranges from NPR 40 per sq. ft.
        </p>

        <Select>
          <SelectTrigger className="w-full">Select Date</SelectTrigger>
          <SelectContent>
            <SelectItem value="date1">October 20</SelectItem>
            <SelectItem value="date2">October 21</SelectItem>
            <SelectItem value="date3">October 22</SelectItem>
          </SelectContent>
        </Select>

        <p className="text-gray-600 mt-4 mb-2">Choose a time period</p>
        <div className="flex space-x-2">
          <Button variant="outline">6AM-12PM</Button>
          <Button variant="outline">12PM-6PM</Button>
        </div>

        <Button className="mt-6 w-full">Book now</Button>
      </div>
    </div>
  );
}
