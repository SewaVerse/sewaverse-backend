import { CardWithForm } from "./SewaCard";

const SewaSection = () => {
  return (
    <div className=" ">
      {/* <HeroSection/> */}
      <div className="">
       
        <div className="grid grid-cols-2 gap-2 mx-5 lg:flex flex-wrap  lg:gap-6 justify-center max-h-[700px] overflow-y-auto  scrollable-container">
          <CardWithForm/>
          <CardWithForm />
          <CardWithForm />
          <CardWithForm />
        </div>
      </div>
    </div>
  );
};

export default SewaSection;
