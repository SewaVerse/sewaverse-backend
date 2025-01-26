import FilterSection from "./_components/FilterSection";
import HeroSection from "./_components/HeroSection";

const ServicePage = () => {
  return (
    <div className="flex mx-16 mt-4">
      <div className="w-1/4 hidden md:block">
        <FilterSection />
      </div>
      <div className="w-full">
        <HeroSection />
      </div>
    </div>
  );
};

export default ServicePage;
