import babySitting from "../../assets/images/services/baby-sitting.svg";
import cleaning from "../../assets/images/services/cleaning.svg";
import electrician from "../../assets/images/services/electrician.svg";
import hairStyle from "../../assets/images/services/hair-salon.svg";
import healthService from "../../assets/images/services/health.svg";
import homeService from "../../assets/images/services/home-service.svg";
import itSupport from "../../assets/images/services/it-support.svg";
import makeUp from "../../assets/images/services/makeup.svg";
import mechanic from "../../assets/images/services/mechanic.svg";
import musician from "../../assets/images/services/musician.svg";
import painting from "../../assets/images/services/painting.svg";
import plumber from "../../assets/images/services/plumbing.svg";
import Image from "next/image";

const services = [
  { icon: painting, label: "Painting" },
  { icon: cleaning, label: "Cleaning" },
  { icon: babySitting, label: "Baby Sitting" },
  { icon: makeUp, label: "Beautician" },
  { icon: hairStyle, label: "Hair Stylist" },
  { icon: itSupport, label: "IT Support" },
  { icon: mechanic, label: "Mechanic" },
  { icon: healthService, label: "Health Services" },
  { icon: electrician, label: "Electrician" },
  { icon: plumber, label: "Plumber" },
  { icon: musician, label: "Musician" },
  { icon: homeService, label: "All Sewas" },
];

const ServicesSection = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto text-center">
        <h1 className=" text-3xl mt-2 mb-16 font-bold text-gray-800 text-center">
          Sewa Categories
        </h1>
        <div className="grid grid-cols-6 gap-24 md:grid-cols-6 mb-12">
          {services.map((service, index) => (
            <div key={index} className="flex flex-col items-center">
              <Image
                height={56}
                width={56}
                src={service.icon}
                alt={service.label}
                className="object-cover "
              />
              <p className="mt-2 text-sm text-gray-800">{service.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default ServicesSection;
