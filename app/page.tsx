import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Home = async () => {
  const session = await auth();

  const imagesData = [
    { src: "/images/HomeMaintenance.svg", name: "Home maintenance" },
    { src: "/images/Construction.svg", name: "Construction" },
    {
      src: "/images/ComputerRepair&Maintenance.svg",
      name: "Computer repair & maintenance",
    },
    {
      src: "/images/Beauty&Personal(Male).svg",
      name: "Beauty & Personal care(Female)",
    },
    {
      src: "/images/Beauty&PersonalCare(Female).svg",
      name: "Beauty & Personal care(Male)",
    },
    {
      src: "/images/AutoRepair&Maintainance.svg",
      name: "Auto Repair & Maintenance",
    },
    { src: "/images/Mover.svg", name: "Mover" },
    {
      src: "/images/CompanyRegistration.svg",
      name: "Company Registration & Renew",
    },
    { src: "/images/PetCare.svg", name: "Pet Care" },
    { src: "/images/PestControl.svg", name: "Pest Control" },
    { src: "/images/Pandit&Jyotish.svg", name: "Pandit & Jyotish" },
    { src: "/images/AllSewas.svg", name: "All Sewas" },
  ];
  return (
    <div className="font-poppins font-medium text-xl min-h-screen">
      <div className="relative w-full h-screen">
        <Image
          src="/images/homepageimage.webp"
          alt="Homepage background"
          fill
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>

        <div className="absolute top-0 right-0 pt-16 pr-16 text-white z-10">
          <div className="text-right">
            <h1 className="text-3xl font-bold mb-4">Id: {session?.user?.id}</h1>
            <h2 className="text-2xl mb-4">Name: {session?.user?.name}</h2>
            <h3 className="text-xl mb-4">Email: {session?.user?.email}</h3>
            <h4 className="text-lg mb-8">
              Role: {session?.user?.roles.join(", ")}
            </h4>
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
                  alt={`Featured Service ${index + 1}`}
                  className="w-full h-[316px] object-cover rounded-t-lg"
                  width={310}
                  height={316}
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
                  alt={`Featured Service ${index + 1}`}
                  className="w-full h-[316px] object-cover rounded-t-lg"
                  width={310}
                  height={316}
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

      {/* hello */}
      <div className="py-16 bg-white text-center rounded-lg overflow-hidden">
        <div className="relative h-screen w-full flex items-center justify-start">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/images/service_market_place.webp"
              alt="Homepage background"
              className="object-cover w-full h-full"
              fill
              priority
            />
          </div>

          <div className="absolute inset-0 bg-black bg-opacity-50"></div>

          <div className="relative z-10 text-white text-left max-w-3xl ml-10 px-4">
            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              A service marketplace <br /> for everyone
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl leading-relaxed mb-8">
              Effortlessly begin offering or receiving services with simplicity,
              convenience, and peace of mind, making the whole process smooth
              and enjoyable for everyone involved.
            </p>

            {/* Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-6 w-full px-4">
              {/* Card 1 */}
              <div className="bg-[#023994CC] p-6 rounded-lg shadow-lg cursor-pointer text-white hover:bg-[#021f77] transition duration-300">
                <h3 className="text-2xl font-semibold mb-2">
                  Book the service
                </h3>
                <p className="text-base mb-4">
                  Find the right expert{" "}
                  <span className="text-2xl ml-4 font-bold">→</span>
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-[#023994CC] p-6 rounded-lg shadow-lg cursor-pointer text-white hover:bg-[#021f77] transition duration-300">
                <h3 className="text-2xl font-semibold mb-2">
                  Become a Sewa Provider
                </h3>
                <p className="text-base mb-4">
                  Start providing services{" "}
                  <span className="text-2xl ml-4 font-bold">→</span>
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-[#023994CC] p-6 rounded-lg shadow-lg cursor-pointer text-white hover:bg-[#021f77] transition duration-300">
                <h3 className="text-2xl font-semibold mb-2">
                  Learn more about Sewaverse
                </h3>
                <p className="text-base mb-4">
                  More about us{" "}
                  <span className="text-2xl ml-4 font-bold">→</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sewa Categories */}

      <div className="py-16 bg-white text-center">
        <h2 className="text-3xl font-bold mb-8 font-poppins">Popular Sewas</h2>

        {/* Grid container to arrange images */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 place-items-center">
          {imagesData.map((image, index) => (
            <div key={index} className="flex flex-col items-center">
              <Image
                src={image.src}
                alt={image.name}
                width={20}
                height={20}
                className="w-[4rem] h-[4rem]"
              />
              <span className="mt-2 text-sm text-gray-600">{image.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* other section  */}
      <div className="py-16 bg-white text-center">
        <h3 className="text-3xl font-bold mb-8 font-poppins">
          Don’t take our word, trust the real stories <br />
          <span className="text-[16px] font-normal leading-[24px] text-center decoration-skip-ink-none">
            Their experiences offer honest insights and a true picture of what
            to expect.
            <br /> Discover the difference through their voices.
          </span>
        </h3>

        <div className="relative flex flex-col items-center">
          <div className="relative z-20 bg-white rounded-lg shadow-2xl border border-white/50 w-[638px] h-[497px] p-6">
            <Image
              src="/images/profileimage1.svg"
              alt="Marinda Walkers"
              className="w-16 h-16 rounded-full mx-auto -mt-8 border-4 border-white"
              width={638}
              height={497}
            />
            <p
              className="mt-12 text-gray-600 text-[16px] font-poppins font-normal leading-[24px] text-justify decoration-skip-ink-none"
              style={{ textUnderlinePosition: "from-font" }}
            >
              {`I’ve used Serwaverse for a variety of services, from home
                cleaning to graphic design, and overall, I've been very
                impressed. The range of services is extensive, and the quality
                is generally high. My only gripe is that the service reviews can
                sometimes be a bit inconsistent. Still, it’s a fantastic
                resource for all kinds of needs.`}
            </p>
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-gray-900 font-bold">
              Jackson Hopkins <br />
              <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
            </div>
          </div>

          <div className="relative flex justify-between w-full -mt-[130px] px-4">
            <div className="relative z-10 bg-gray-50 rounded-lg shadow-lg border border-gray-200/50 w-[600px] h-[460px] opacity-50 p-6 -translate-y-[50px]">
              <Image
                src="/images/profileimage3.svg"
                alt="Jackson Hopkins"
                className="w-16 h-16 rounded-full mx-auto -mt-8 border-4 border-white"
                width={638}
                height={497}
              />
              <p className="mt-12 text-gray-600 text-sm">
                I’ve used Servaverse for a variety of services, from home
                cleaning to graphic design, and overall, I’ve been very
                impressed...
              </p>
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-gray-700 font-semibold">
                Marinda Walkers <br />
                <span className="text-yellow-400">⭐⭐⭐⭐</span>
              </div>
            </div>

            <div className="relative z-10 bg-gray-50 rounded-lg shadow-lg border border-gray-200/50 w-[600px] h-[460px] opacity-50 p-6 -translate-y-[80px]">
              <Image
                src="/images/profileimage2.svg"
                alt="Jensony Kennedy"
                className="w-16 h-16 rounded-full mx-auto -mt-8 border-4 border-white"
                width={638}
                height={497}
              />
              <p className="mt-12 text-gray-600 text-sm">
                This service has been a game-changer for me! From booking a
                plumber to finding last-minute help...
              </p>
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-gray-700 font-semibold">
                Jensony Kennedy <br />
                <span className="text-yellow-400">⭐⭐⭐⭐</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
