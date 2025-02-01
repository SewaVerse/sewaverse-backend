import Image from "next/image";

import { redLine } from "../page";
import OurMission from "./OurMission";

const ourMissionData ={
  name:'Our Mission',
  title:'To revolutionize access to services through a community-driven platform that empowers both users and sewa providers.',
  description:'For users, we offer a universe of services to meet their daily needs with ease. For sewa providers, we deliver a platform where their skills and expertise can be showcased, helping them grow their businesses and achieve success.'
}

interface ourVisionData {
  name: string;
  title: string;
  description: string;
}

interface OurVisionProps {
  ourVisionData: ourVisionData;
}
const OurVision = ({ ourVisionData }: OurVisionProps) => {
  return (
    <div className="md:mt-12 bg-[#F7F7F7] ">
    <div className="">
      <div className="flex flex-col items-center   ">
      
        <h1 className="md:text-4xl font-semibold gradient-text ">
          {ourVisionData.name}
        </h1>
         <Image src={redLine} alt="redLine" width={100} height={20} className="md:w-[170px] md:h-[30px]" />
      </div>

      <div className=" md:mx-4">
        <div className="md:mx-20 ">
          <h1 className="md:text-4xl text-wrap font-semibold  text-center mt-3 ">
            {ourVisionData.title}
          </h1>
          <p className="md:text-2xl text-center md:py-6 ">
            {ourVisionData.description}
          </p>
        </div>
      </div>
    </div>
    <OurMission ourMissionData={ourMissionData}/>
    </div>
  );
};

export default OurVision;
