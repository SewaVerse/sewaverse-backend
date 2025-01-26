import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const serviceIamge = "/images/servicesImage/Beautician.svg";

const page = () => {
  return (
    <div className=" h-auto border mt-5">
      <div className="p-4">
        <h1 className="text-2xl font-medium">Booking Cancellation </h1>
        <p className=" text-2xl font-medium mt-2 ">Sewa to cancel </p>
      </div>
      <div className="w-full h-auto border mb-3">
        <div className="md:flex md:items-start p-5 md:justify-between">
          <div className="  md:flex gap-6 items-start">
            <div className="md:w-[200px] md:h-[150px] border ">
              <Image
                src={serviceIamge}
                alt="SewaverseIcon"
                height={140}
                width={200}
                className="object-cover Md:w-[200px] md:h-[150px] w-full"
              />
            </div>
            <div>
              <div className="md:w-[400px] md:h-[114px] ">
                <h1 className="text-2xl font-normal">
                  Exterior House Painting
                </h1>
                <p className=" text-lg "> By Bishal Shrestha</p>
                <p className="text-muted-foreground text-base">
                  Joined in Jan, 2024
                </p>
                <p className="text-base text-muted-foreground">
                  100 Services Delivered
                </p>
                <p className="text-base text-muted-foreground">
                  5 Yrs Experience
                </p>
              </div>
            </div>
          </div>
          <div>
            <form action="#">
              <p className="md:text-lg mt-4 md:mt-0">Reason for Cancellation</p>
              <Select>
                <SelectTrigger className="md:w-[324px] shadow-md">
                  <SelectValue placeholder="Select Reason" />
                </SelectTrigger>
                <SelectContent className="md:w-[324px]">
                  <SelectGroup>
                    <SelectLabel>Reason</SelectLabel>
                    <SelectItem value="Change in Schedule">
                      Change in Schedule
                    </SelectItem>
                    <SelectItem value="Service No Longer Needed">
                      Service No Longer Needed
                    </SelectItem>
                    <SelectItem value="Found an Alternative Service">
                      Found an Alternative Service
                    </SelectItem>
                    <SelectItem value="Want to Place a New Booking">
                      Want to Place a New Booking
                    </SelectItem>
                    <SelectItem value="Financial Reasons">
                      Financial Reasons
                    </SelectItem>
                    <SelectItem value="Personal Reasons">
                      Personal Reasons
                    </SelectItem>
                    <SelectItem value="Emergency Situation">
                      Emergency Situation
                    </SelectItem>
                    <SelectItem value="Natural Disaster">
                      Natural Disaster
                    </SelectItem>
                    <SelectItem value="Unsatisfactory Pre-Service">
                      Unsatisfactory Pre-Service
                    </SelectItem>
                    <SelectItem value="Communication Incorrect Booking Details (e.g., wrong date, time, or service)">
                      Communication Incorrect Booking Details (e.g., wrong date,
                      time, or service)
                    </SelectItem>
                    <SelectItem value="Delay in Service Provider's Response">
                      Delay in Service Provider's Response
                    </SelectItem>
                    <SelectItem value="Service Provider Requested Cancellation">
                      Service Provider Requested Cancellation
                    </SelectItem>
                    <SelectItem value="Technical Issues During Booking">
                      Technical Issues During Booking
                    </SelectItem>
                    <SelectItem value="Health Reasons">
                      Health Reasons
                    </SelectItem>
                    <SelectItem value="other(Please Specify in Additional Information">
                      Other(Please Specify in Additional Information)
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </form>
          </div>
        </div>
        <div className="p-5">
          <h1 className="text-xl">Additional Information</h1>
          <div className="w-full h-[180px] border ">
            <p className="p-3 text-[#464646]">
              {" "}
              The painter service exceeded expectations with its exceptional
              workmanship and timely completion. The team was friendly,
              efficient, and ensured a smooth process. Overall, a reliable
              choice for quality painting!
            </p>
          </div>
        </div>
        {/* Cancellation Policy */}

        <h1 className="text-2xl font-medium ml-5">Cancellation Policy</h1>
        <p className="text-base ml-3">
          Before canceling your booking, kindly read the following terms:
        </p>

        <div className="w-full h-auto  bg-[#F3F3F3] border mb-2">
          <div className=" p-3">
            <p className="text-base">
              Submitting the cancellation form confirms your agreement to cancel
              the selected Sewa in your booking. Once canceled, the booking
              cannot be retrieved.
            </p>
            <div className="mt-3">
              <p className="text-base  font-semibold">Cancellation Terms</p>
              <p className="font-semibold ml-1">
                1. 24 Hours or More Before Service:
              </p>
              <p className="text-base">
                {" "}
                Cancellations made 24 hours or more before the scheduled service
                time will be processed without any charges.
              </p>
              <p className="font-semibold ml-1">
                2. 12–24 Hours Before Service:
              </p>
              <p className="text-base">
                Cancellations made between 12 and 24 hours before the scheduled
                time may incur a 25% cancellation fee. So, we encourage
                rescheduling the Sewa instead of cancealling.
              </p>
              <p className="font-semibold ml-1">
                3. Less Than 12 Hours Before Service:
              </p>
              <p className="text-base">
                Cancellations within 12 hours of the service time may incur a
                50% cancellation fee. So, we recommend rescheduling the Sewa
              </p>
              <p className="font-semibold ml-1">
                Less Than 6 Hours Before Service:
              </p>
              <p className="text-base">
                Cancellations within 6 hours of the service time may incur a
                100% cancellation fee, with no refund provided. So, we request
                rescheduling of Sewa.
              </p>
              <p className="font-semibold ml-1">5. Rescheduling Option:</p>
              <p className="text-base">
                Customers who wish to reschedule their service can do so within
                the specified cancellation periods above to avoid fees. If the
                service is rescheduled, the cancellation fee will not apply
              </p>
              <p className="text-base mt-3">
                In the case of unforeseen circumstances such as weather
                disruptions, health emergencies, or other extreme events,
                Sewaverse will offer a full refund of the paid sewa or the
                option to reschedule without any charges
              </p>
            </div>
          </div>
        </div>
        <div className="ml-3">
          <form action="#" className="flex items-center gap-1">
            <Input type="checkbox" className="w-[15px]" />
            <p>I’ve read and accepted the Cancelation Policy of Sewaverse</p>
          </form>
          <div className="flex justify-end mx-2 mb-2">
            <Link href={"/userprofile/Booking/1/canceldeatails"}>
              <Button variant={"brand"}>Submit</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
