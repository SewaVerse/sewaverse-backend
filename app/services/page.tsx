import FilterSection from "./_components/FilterSection";
import HeroSection from "./_components/HeroSection";

const ServicePage = () => {
  return (
    <>
      <div className="flex">
        <div className="lg:w-1/3 ">
          
        <FilterSection />
        </div>
       <div className="lg:w-full   ">
        <HeroSection/>
        
     {/* <SewaSection/> */}
       </div>
      </div>
     
    </>
  );
};

export default ServicePage;
