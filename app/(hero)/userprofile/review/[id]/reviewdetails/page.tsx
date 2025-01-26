import { CameraIcon } from "lucide-react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Define the service interface
interface Service {
  serviceName: string;
  description: string;
  rating: number;
  status: string;
  imageUrl: string;
  booked:string
}

// Define the provider interface
interface Provider {
  providerName: string;
  joined: string;
  experience: string;
  delivered: string;
  status: string;
  rating: number;
  provided:string
  
}

const provider: Provider = {
  providerName: "Bishal Shrestha",
  joined: "Jan, 2024",
  experience: "5 years Experience",
  delivered: "100 services Delivered",
  status: "Satisfied",
  rating: 4.5,
  provided:'Sewa Delivered on 02 Jan 2025 03:00pm - 05:00pm'
};

const service: Service = {
  serviceName: "Exterior House Painting",
  description:
    "The painter service exceeded expectations  with its exceptional workmanship and timely completion.with its exceptional workmanship and timely completion.",
  rating: 4.0,
  status: "Satisfied",
  imageUrl: "/images/servicesImage/Beautician.svg",
  booked:'Sewa Booked on 02 Jan 2025 17:41:00pm'
};

const page = () => {
  return (
    <div className="md:px-3">
      <div className=" w-full md:flex justify-between ">
        {/* left side */}
        <div className="basis-2/4  ">
          <p className="text-muted-foreground">
            {service.booked}
          </p>
          <p className="text-xl md:py-3">Rate & Review the Sewa</p>

          <div className="w-full h-auto  mb-3 md:py-2">
            <div className="md:flex items-start gap-5">
              <div className="md:w-[160px] md:h-[150px] ">
                <Image
                  src={service.imageUrl}
                  alt="SewaverseIcon"
                  height={140}
                  width={200}
                  className="object-cover w-full h-full rounded-md"
                />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl">{service.serviceName}</h1>
                <p className="text-sm text-muted-foreground py-2 overflow-hidden">
                  {service.description}
                </p>
                <div className="flex items-center justify-between ">
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      <FaStar color="orange" />
                      <FaStar color="orange" />
                      <FaStar color="orange" />
                      <FaStar color="orange" />
                    </div>
                    <p>{service.rating}</p>
                  </div>
                  <p className="gradient-text font-semibold text-base">
                    {service.status}
                  </p>
                </div>
                <div>
                  <h1 className="text-2xl">Write a review</h1>
                  <div className="w-full h-[193px]  outline-dashed outline-gray-400 mt-2">
                    <Textarea
                      className="text-muted-foreground p-2 h-full"
                      placeholder="What do you think about the service ?"
                    ></Textarea>
                  </div>
                  <div className="w-[60px] h-[50px] outline-dashed outline-gray-400 mt-5 flex items-center justify-center">
                    <CameraIcon size={40} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bas-2/4 md:ml-40">
          {/* for right side */}
          <p className="text-muted-foreground">{provider.provided} </p>
          <p className="text-xl md:py-3">Rate & Review your Sewa Provider</p>

          <div className="w-full h-auto mb-3 py-2">
            <h1 className="gradient-text text-2xl">{provider.providerName}</h1>
            <div className="text-muted-foreground text-sm py-2">
              <p>{provider.joined}</p>
              <p className="mt-1">{provider.experience}</p>
              <p className="mt-1">{provider.delivered}</p>
            </div>

            <div className="flex items-center justify-between py-1 ">
              <div className="flex items-center gap-1">
                <div className="flex">
                  <FaStar color="orange" />
                  <FaStar color="orange" />
                  <FaStar color="orange" />
                  <FaStar color="orange" />
                </div>
                <p>{provider.rating}</p>
              </div>
              <p className="gradient-text font-semibold text-base">
                {provider.status}
              </p>
            </div>
            <div>
              <h1 className="text-2xl">Write a review</h1>
              <div className="w-full h-[193px]  outline-dashed outline-gray-400 mt-2">
                <Textarea
                  className="text-muted-foreground p-2 h-full"
                  placeholder=" How was your overall experience with the Sewa Provider ? "
                ></Textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* bottom section */}
      <div className="md:flex md:justify-end md:py-3">
        <form action="#">
          <div className="flex items-center gap-1">
            <p>Review as Rohan S.</p>
            <Input type="checkbox" className="w-[20px]" />
          </div>
          <div className="flex items-center gap-1">
            <p>Review as Rohan S.</p>
            <Input type="checkbox" className="w-[20px]" />
          </div>
          <Button variant={"brand"} className="w-[155px]">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default page;
