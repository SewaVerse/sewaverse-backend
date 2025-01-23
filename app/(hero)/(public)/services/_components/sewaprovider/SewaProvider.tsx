import { ServiceProviderCard } from "./SewaProviderCard";

const SewaProvider = () => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-2 mx-5 lg:flex flex-wrap  lg:gap-6 justify-center max-h-[700px] overflow-y-auto  scrollable-container">
        <ServiceProviderCard />
      </div>
    </div>
  );
};

export default SewaProvider;
