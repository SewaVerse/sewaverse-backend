import { providerData, sewaData } from "./Promocodes";
import SewaProvider from "./SewaProvider";
import SewaVerse from "./SewaVerse";

const AllPromos = () => {
  return (
    <div>
      <SewaVerse sewaData={sewaData} />
      <SewaProvider providerData={providerData} />
    </div>
  );
};

export default AllPromos;
