import { PhoneCallIcon } from "lucide-react";
import { CiLocationOn } from "react-icons/ci";
import { TfiEmail } from "react-icons/tfi";

import { Textarea } from "@/components/ui/textarea";
import { servicesData } from "@/public/images/servicesImage";

interface LeftInvoiceData {
  name: string;
  phone: string;
  email: string;
  address: string;
}

interface servicesData {
  serviceName: string;
  serviceBy: string;
  joined: string;
  servicesDelivered: string;
  experience: string;
  price: number;
  discount: number;
  afterDiscount?: number;
  date: string;
  time: string;
}

interface LeftInvoiceProps {
  LeftInvoiceData: LeftInvoiceData;
  servicesData: servicesData;
}

const LeftInvoice = ({ LeftInvoiceData, servicesData }: LeftInvoiceProps) => {
  return (
    <div className="px-4   mb-2">
      {/* Top section */}
      <div className="px-5 py-5 md:w-[900px] border shadow-md rounded-lg bg-white">
        <div>
          <h1 className="gradient-text text-lg font-bold">You</h1>
          <h1 className="text-2xl md:text-3xl font-bold pt-2">
            {LeftInvoiceData.name}
          </h1>
          <p className="flex items-center gap-2 text-base md:text-xl pt-2">
            <PhoneCallIcon size={16} color="blue" />
            {LeftInvoiceData.phone}
          </p>
          <p className="flex items-center gap-2 text-base md:text-xl pt-2">
            <TfiEmail size={16} color="blue" />
            {LeftInvoiceData.email}
          </p>
          <div className="flex items-center gap-2 text-base md:text-xl border shadow-sm w-full md:w-[70%] h-10 mt-2 rounded-md px-2">
            <CiLocationOn size={16} color="blue" />
            <p>{LeftInvoiceData.address}</p>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="mt-6 border shadow-md rounded-lg bg-white">
        <div className="p-4">
          <p className="gradient-text font-bold text-lg md:text-xl">
            Service Details
          </p>
          <div className="flex flex-col md:flex-row items-start justify-between gap-4 mt-4">
            {/* Service details */}
            <div className="flex justify-between w-full md:flex-row md:gap-10 md:w-[50%] ">
              <div>
                <h1 className="text-xl md:text-2xl">
                  {servicesData.serviceName}
                </h1>
                <p className="text-base md:text-xl">{servicesData.serviceBy}</p>
                <p className="text-sm md:text-base text-muted-foreground">
                  {servicesData.joined}
                </p>
                <p className="text-sm md:text-base text-muted-foreground">
                  {servicesData.servicesDelivered}
                </p>
                <p className="text-sm md:text-base text-muted-foreground">
                  {servicesData.experience}
                </p>
              </div>
              <div>
                <p className="text-xl md:text-2xl gradient-text font-semibold">
                  {servicesData.afterDiscount}
                </p>
                <p className="line-through text-lg md:text-2xl text-muted-foreground font-semibold">
                  {servicesData.price}
                </p>
                <p className="text-lg md:text-2xl text-muted-foreground font-semibold">
                  {servicesData.discount}%
                </p>
              </div>
            </div>

            {/* Service date and time */}
            <div className="hidden md:block md:h-[150px] md:border"></div>
            <div className="w-full md:w-[30%]">
              <div>
                <p className="text-lg">Service Date</p>
                <p className=" ">{servicesData.date}</p>
              </div>
              <div>
                <p className="text-lg">Service Time</p>
                <p>{servicesData.time}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-[900px] w-full md:h-auto px-5 md:px-5 mb-2  ">
          <h1 className="gradient-text text-xl font-semibold">
            Special Request
          </h1>
          <div className="md:w-[860px] w-auto h-[100px] border ">
            <Textarea
              className="h-full"
              placeholder="Provide special request/instruction, if any"
            ></Textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftInvoice;
