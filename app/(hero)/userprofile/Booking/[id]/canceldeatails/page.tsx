import Image from "next/image";

import { Button } from "@/components/ui/button";
const serviceIamge = "/images/servicesImage/Beautician.svg";

const page = () => {
  return (
    <div className="w-full h-auto border mt-5 ">
      <div className="p-4 border-b shadow-sm">
        <h1 className="text-2xl font-medium">Booking Cancellation </h1>
        <p className=" text-2xl font-medium mt-2 ">Cancelation Details</p>
      </div>
      <div className="w-full h-[100px] bg-[#F3F3F3] mt-2 flex flex-col items-center p-3">
        <p className="text-base font-medium">
          Your Booking has been cancelled !
        </p>
        <p className="text-base font-medium">2025-01-03 15:33</p>
        <p>
          Booking Id: <span className="gradient-text">23231313123</span>
        </p>
      </div>

      <div className="md:flex items-center md:justify-between  h-auto">
        <div className="p-5 md:flex gap-6">
          <div className="md:w-[200px] md:h-[150px] ">
            <Image
              src={serviceIamge}
              alt="SewaverseIcon"
              height={140}
              width={200}
              className="object-cover md:w-[200px] md:h-[150px] w-full"
            />
          </div>
          <div className="md:w-[400px]">
            <h1 className="text-2xl">Exterior House Painting</h1>
            <p className="text-muted-foreground">
              The painter service exceeded expectations with its exceptional
              workmanship and timely completion. The team was friendly,
              efficient, and ensured a smooth process. Overall,...
            </p>
          </div>
        </div>

        <div className="mx-4">
          <p className="gradient-text text-xl font-medium">Rs. 20,000</p>
        </div>
      </div>

      {/* last part */}
      <div className="md:w-full md:h-[120px] border bg-[#F3F3F3] p-5 mt-5 md:mt-0 ">
        <div className="md:flex items-center justify-between">
          <div>
            <p className="text-base font-semibold">Scheduled on</p>
            <p className="text-base ">Date: 2025-01-05</p>
            <p className="text-base">Time: 03:00-05:00 pm</p>
          </div>
          <div className="mt-2 md:mt-0">
            <p className="text-base font-semibold">Canceled on </p>
            <p className="text-base">Date: 2025-01-03</p>
            <p className="text-base">Time: 15:04:45</p>
          </div>
          <div className="mt-2 md:mt-0">
            <p className="text-base font-semibold">Cancelation Reason</p>
            <p className="text-base">Found an Alternative Service</p>
            <div className="outline-dashed outline-1 outline-gray-800 p-2 ">
              <p className="text-base border-dotted">
                I found another affordable service
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* for button */}
      <div className="flex items-center gap-4 md:justify-between md:p-5 px-4 ">
        <Button variant={"brand"} size="sm">
          Browse Services
        </Button>
        <Button variant={"brand"} size={"sm"}>
          View My Bookings
        </Button>
        <Button variant={"brand"} size={"sm"}>
          Contact Support
        </Button>
      </div>
    </div>
  );
};

export default page;
