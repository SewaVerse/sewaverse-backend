import Image from "next/image";

const worksData = [
  {
    image: "/images/image3.webp",
    title: "Hair Cutting Competition",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    image: "/images/image3.webp",
    title: "Best Stylist Award",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    image: "/images/image3.webp",
    title: "Innovation in Hairdressing",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];

const WorksSection = () => {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-6 text-center sm:text-left">
        My Works
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {worksData.map((work, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 flex flex-col"
          >
            <div className="relative w-full h-48 sm:h-56 md:h-64">
              <Image
                src={work.image}
                alt={work.title}
                fill
                className="object-cover rounded-md"
              />
            </div>
            <h3 className="mt-4 text-lg font-semibold">{work.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground flex-grow">
              {work.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorksSection;
