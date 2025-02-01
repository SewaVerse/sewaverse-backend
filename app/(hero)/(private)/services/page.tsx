import FilterSection from "./_components/FilterSection";
import HeroSection from "./_components/HeroSection";

const ServicePage = () => {
  return (
    <div className="container flex justify-between px-[3rem] mt-4">
      <div className=" hidden md:block">
        <FilterSection />
      </div>
      <div className="w-full">
        <HeroSection />
      </div>
    </div>
  );
};

export default ServicePage;
