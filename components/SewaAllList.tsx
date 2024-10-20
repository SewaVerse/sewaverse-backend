// pages/sewa-list.tsx
import FilterSidebar from "@/components/FilterSidebar";
import ServiceCard from "@/components/ServiceCard";

const services = [
  {
    imageSrc: "/images/service1.jpg",
    title: "Painting | Exterior | Interior",
    description: "All kind of painting work",
    price: "Package from: Rs. 20,000",
    discount: "30% OFF",
    user: "Emma Clark",
    location: "Kathmandu",
    rating: 4.5,
  },
  {
    imageSrc: "/images/service2.jpg",
    title: "Beautician | Bridal | Event",
    description: "Book professional for the event",
    price: "Package from: Rs. 5,000",
    user: "Emily Wilson",
    location: "Kathmandu",
    rating: 4.0,
  },
  // Add more services here
];

export default function SewaList() {
  return (
    <div className="flex">
      <FilterSidebar />
      <div className="w-3/4 p-6">
        <h2 className="text-2xl font-bold mb-4">All Sewa List</h2>
        <div className="grid grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </div>
  );
}
