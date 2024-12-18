import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Home = async () => {
  const session = await auth();

  return (
    <div className="font-poppins font-medium text-xl min-h-screen">
      {/* Hero Section with Background Image */}
      <div className="relative w-full h-screen">
        <Image
          src="/images/homepageimage.webp"
          alt="Homepage background"
          layout="fill" // This will make the image cover the entire div
          objectFit="cover" // Ensures the image covers the entire area
          objectPosition="center" // Centers the image
        />
        {/* Overlay for Text */}
        <div className="absolute inset-0 bg-black opacity-40"></div>

        {/* User Information Section (Right Side) */}
        <div className="absolute top-0 right-0 pt-16 pr-16 text-white z-10">
          <div className="text-right">
            <h1 className="text-3xl font-bold mb-4">Id: {session?.user?.id}</h1>
            <h2 className="text-2xl mb-4">Name: {session?.user?.name}</h2>
            <h3 className="text-xl mb-4">Email: {session?.user?.email}</h3>
            <h4 className="text-lg mb-8">Role: {session?.user?.roles}</h4>
          </div>
        </div>

        {/* Welcome Section (Left Side) */}
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 pl-16 text-white text-left z-10 font-poppins">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to the <br />
            Universe of Sewaverse
          </h1>
          <p className="mb-8">
            Seamlessly offer or receive services simply, conveniently <br /> and
            with.
          </p>
          <button className="bg-red-500 text-white py-2 px-6 rounded-lg">
            Get Started
          </button>
        </div>
      </div>

      {/* Services Section */}
      <div>
        <div className="py-16 bg-white text-center">
          <h2 className="text-3xl font-bold mb-8">Featured Sewas</h2>
          <div className="flex justify-center gap-12">
            {" "}
            {/* Increased gap to 12 here */}
            <Button variant={"brand"} className="mt-2 px-8 py-4">
              All Services
            </Button>
            <Button
              variant={"brand"}
              className="mt-2 bg-white text-black shadow-md hover:shadow-lg px-8 py-4"
            >
              Plumbing
            </Button>
            <Button
              variant={"brand"}
              className="mt-2 bg-white text-black shadow-md hover:shadow-lg px-8 py-4"
            >
              Counselling
            </Button>
            <Button
              variant={"brand"}
              className="mt-2 bg-white text-black shadow-md hover:shadow-lg px-8 py-4"
            >
              Cleaning
            </Button>
            <Button
              variant={"brand"}
              className="mt-2 bg-white text-black shadow-md hover:shadow-lg px-8 py-4"
            >
              Mechanic
            </Button>
            <Button
              variant={"brand"}
              className="mt-2 bg-white text-black shadow-md hover:shadow-lg px-8 py-4"
            >
              Hair Stylist
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6">
          {[
            {
              title: "Painting | Exterior | Interior",
              description: "All kind of painting work",
              image: "/images/image1.webp",
              price: "10,000",
              originalPrice: "20,000",
              discount: "30%",
              name: "Emma Clark",
              rating: 4.5,
            },
            {
              title: "Beautician | Bridal | Event",
              description: "Book professional for the event",
              image: "/images/image2.webp",
              price: "5,000",
              originalPrice: "7,000",
              discount: null,
              name: "Emily Wilson",
              rating: 4.0,
            },
            {
              title: "Child care | Night | Day",
              description: "Guider for your child development",
              image: "/images/image3.webp",
              price: "10,000",
              originalPrice: "12,000",
              discount: null,
              name: "Isabella Adams",
              rating: 4.8,
            },
            {
              title: "Mechanics | Repair | Replace",
              description: "Inspect your home for problem solving",
              image: "/images/image4.webp",
              price: "15,000",
              originalPrice: "18,000",
              discount: "20%",
              name: "John Ward",
              rating: 4.5,
            },
          ].map((service, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              style={{ width: "310px", height: "439px" }}
            >
              <div className="relative">
                <Image
                  src={service.image}
                  width={310}
                  height={439}
                  alt={`Featured Service ${index + 1}`}
                  className="w-full h-[316px] object-cover rounded-t-lg"
                />
                {service.discount && (
                  <div className="absolute top-0 left-0 bg-red-500 text-white px-3 py-1 text-xs font-bold rounded-br-lg">
                    {service.discount} OFF
                  </div>
                )}
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-lg mb-1">{service.title}</h4>
                <p className="text-gray-500 text-sm mb-3">
                  {service.description}
                </p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xl font-semibold text-gray-800">
                    Rs. {service.price}
                  </span>
                  {service.discount && (
                    <span className="text-sm text-gray-400 line-through">
                      Rs. {service.originalPrice}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{service.name} @ Kathmandu</span>
                  <span className="flex items-center">
                    <span className="text-gray-700">{service.rating}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-star-fill text-yellow-400 ml-1"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3.612 15.443c-.387.198-.85-.182-.716-.623l.857-2.81-2.18-1.621c-.366-.268-.213-.766.288-.8l2.948-.211L7.74.38c.178-.57.83-.57 1.01 0l1.463 4.22 2.948.211c.502.034.654.532.288.8l-2.18 1.62.857 2.81c.134.441-.329.821-.716.623l-2.444-1.705-2.443 1.705z" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="py-16 bg-white text-center">
          <h2 className="text-3xl font-bold mb-8">Popular Sewas</h2>
          <div className="flex justify-center gap-12">
            {" "}
            {/* Increased gap to 12 here */}
            <Button variant={"brand"} className="mt-2 px-8 py-4">
              All Services
            </Button>
            <Button
              variant={"brand"}
              className="mt-2 bg-white text-black shadow-md hover:shadow-lg px-8 py-4"
            >
              Plumbing
            </Button>
            <Button
              variant={"brand"}
              className="mt-2 bg-white text-black shadow-md hover:shadow-lg px-8 py-4"
            >
              Counselling
            </Button>
            <Button
              variant={"brand"}
              className="mt-2 bg-white text-black shadow-md hover:shadow-lg px-8 py-4"
            >
              Cleaning
            </Button>
            <Button
              variant={"brand"}
              className="mt-2 bg-white text-black shadow-md hover:shadow-lg px-8 py-4"
            >
              Mechanic
            </Button>
            <Button
              variant={"brand"}
              className="mt-2 bg-white text-black shadow-md hover:shadow-lg px-8 py-4"
            >
              Hair Stylist
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6">
          {[
            {
              title: "Painting | Exterior | Interior",
              description: "All kind of painting work",
              image: "/images/image1.webp",
              price: "10,000",
              originalPrice: "20,000",
              discount: "30%",
              name: "Emma Clark",
              rating: 4.5,
            },
            {
              title: "Beautician | Bridal | Event",
              description: "Book professional for the event",
              image: "/images/image2.webp",
              price: "5,000",
              originalPrice: "7,000",
              discount: null,
              name: "Emily Wilson",
              rating: 4.0,
            },
            {
              title: "Child care | Night | Day",
              description: "Guider for your child development",
              image: "/images/image3.webp",
              price: "10,000",
              originalPrice: "12,000",
              discount: null,
              name: "Isabella Adams",
              rating: 4.8,
            },
            {
              title: "Mechanics | Repair | Replace",
              description: "Inspect your home for problem solving",
              image: "/images/image4.webp",
              price: "15,000",
              originalPrice: "18,000",
              discount: "20%",
              name: "John Ward",
              rating: 4.5,
            },
          ].map((service, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              style={{ width: "310px", height: "439px" }}
            >
              <div className="relative">
                <Image
                  src={service.image}
                  width={310}
                  height={439}
                  alt={`Featured Service ${index + 1}`}
                  className="w-full h-[316px] object-cover rounded-t-lg"
                />
                {service.discount && (
                  <div className="absolute top-0 left-0 bg-red-500 text-white px-3 py-1 text-xs font-bold rounded-br-lg">
                    {service.discount} OFF
                  </div>
                )}
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-lg mb-1">{service.title}</h4>
                <p className="text-gray-500 text-sm mb-3">
                  {service.description}
                </p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xl font-semibold text-gray-800">
                    Rs. {service.price}
                  </span>
                  {service.discount && (
                    <span className="text-sm text-gray-400 line-through">
                      Rs. {service.originalPrice}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{service.name} @ Kathmandu</span>
                  <span className="flex items-center">
                    <span className="text-gray-700">{service.rating}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-star-fill text-yellow-400 ml-1"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3.612 15.443c-.387.198-.85-.182-.716-.623l.857-2.81-2.18-1.621c-.366-.268-.213-.766.288-.8l2.948-.211L7.74.38c.178-.57.83-.57 1.01 0l1.463 4.22 2.948.211c.502.034.654.532.288.8l-2.18 1.62.857 2.81c.134.441-.329.821-.716.623l-2.444-1.705-2.443 1.705z" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
