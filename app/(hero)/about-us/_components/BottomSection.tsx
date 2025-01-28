import Image from "next/image";

import { Button } from "@/components/ui/button";

import { redLine } from "../page";

const BottomSection = () => {
  return (
    <div>
      <div className="flex flex-col items-center py-20">
        <h1 className="gradient-text text-4xl font-semibold text-center ">
          Why Sewaverse? <br />
          Our Value Proposition
        </h1>
        <Image src={redLine} alt="redLine" width={170} height={30} />
      </div>
      {/* for content */}
      <div className="flex md:mx-52 mx-2">
        <div className="basis-1/2 ">
        <h1 className="text-xl font-semibold">Sewa Provider</h1>
        <p className="text-base">Empower Your Business Journey</p>
        </div>
        <div className="flex-1 text-center ">
            <h1 className=" text-xl font-semibold">Users</h1>
            <p className="text-base">Elevate Your Everyday Experience</p>
        </div>
      </div>

      <div className="flex md:gap-10 gap-2 px-2">
        <div className="basis-1/2 bg-[#F7F7F7] p-1">
          <p className=" py-3 text-lg"><span className="font-semibold">Boost Your Reach:</span> Get discovered and attract more clients. Grow your business.</p>
          <p className=" py-3 text-lg"><span className="font-semibold">Earn Extra Income:</span> Have skills? Become a freelancer on Sewaverse and earn additional income, giving you the financial freedom to pursue your passions.</p>
          <p className=" py-3 text-lg"><span className="font-semibold"> Connect with Your Audience:</span>Engage with people actively seeking your services.</p>
          <p className=" py-3 text-lg"><span className="font-semibold"> Build Trust:</span>Showcase your expertise through positive reviews and leverage it to establish your reputation.</p>
          <p className=" py-3 text-lg"><span className="font-semibold"> Target Your Marketing:</span>Reach your ideal clients with precision.</p>
          <p className=" py-3 text-lg"><span className="font-semibold" > Grow Your Business:</span>ncrease your revenue and expand your operations with our intuitive platform.</p>
          <p className=" py-3 text-lg"><span className="font-semibold">
          Streamline Operations:</span> Manage bookings and customer flow efficiently. </p>
          <p className=" py-3 text-lg"><span className="font-semibold">Make Data-Driven Decisions:</span> Track your performance and improve your services.</p>
        </div>

        <div className="flex-1 border-white bg-[#F7F7F7] p-1 ">
          <p className="py-4 text-lg"><span className="font-semibold">Your One-Stop Service Hub:</span> Find your needs in one hassle-free place.</p>
          <p className="py-4 text-lg"><span className="font-semibold">Save Time and Money:</span> Get the best deals and avoid the hassle.</p>
          <p className="py-4 text-lg"><span className="font-semibold">Discover Local Gems:</span> Explore the best sewa providers in your area.</p>
          <p className="py-4 text-lg"><span className="font-semibold">
          Visualize Your Choice:</span> View pictures and videos of services be for booking.</p>
          <p className="py-4 text-lg"><span className="font-semibold">Read Real Reviews:</span> Make informed decisions based on user feedbacks.</p>
          <p><span>Compare and Choose:</span> Find the best service at the right price.
          </p>
          <p className="py-4 text-lg"><span className="font-semibold">Experience Excellence:</span> Enjoy top-quality services that elevate your lifestyle.</p>
          <p><span>Comfort:</span> Oh! Life is so much easier, so much better, so much comfortable with Sewaverse.</p>
          <p className="py-4 text-lg"><span className="font-semibold">
          Enriched life:</span> We serve to enhance your quality of life</p>
        </div>
      </div>
      <div className=" md:px-52 py-3 px-2">
       <div className="flex justify-between">
       <Button variant={"brand"}>Be a sewa provider</Button>
       <Button variant={"brand"}>Access the services</Button>
       </div>
        
      </div>
    </div>
  );
};

export default BottomSection;
