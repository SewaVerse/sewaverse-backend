"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaStar } from "react-icons/fa";

import { Button } from "@/components/ui/button";

import RescheduleForm from "./_components/RescheduleForm";

const serviceIamge = "/images/servicesImage/Beautician.svg";

const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [openReschedule, setOpenReschedule] = useState<boolean>(false);
  return (
    <div className="">
      {/* top section */}
      <div className=" border h-auto ">
        <h1 className="text-xl p-4 font-medium">My Bookings</h1>
        <div className="flex items-center justify-between mx-4">
          <h1 className="text-2xl font-medium">Bishal Shrestha</h1>
          <Button variant={"brand"}>Chat with Service provider</Button>
        </div>
        <div className=" flex items-center gap-4  text-muted-foreground text-base mx-4 p-1 mb-2">
          <div>
            <p>Joined in Jan, 2024</p>
            <p>5 Yrs Experience</p>
          </div>
          <div>
            <div>
              <p>100 Services Delivered</p>
              <div className="flex items-center gap-1">
                <FaStar color="orange" />
                <FaStar color="orange" />
                <FaStar color="orange" />
                <FaStar color="orange" />
                <p>4.0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* details */}
      <div className=" border border-b-0 h-auto p-5">
        <div className="md:flex items-start gap-8 mb-2 ">
          <div className="md:w-[200px] md:h-[150px] border ">
            <Image
              src={serviceIamge}
              alt="SewaverseIcon"
              height={140}
              width={200}
              className="object-cover md:w-[200px] md:h-[150px] w-[400px]"
            />
          </div>

          <div className="md:flex justify-between gap-24  md:w-full ">
            <div className=" flex-1">
              <h1 className="text-2xl font-normal">Exterior House Painting</h1>
              <p className="text-muted-foreground text-base mt-2 text-justify">
                The painter service exceeded expectations with its exceptional
                workmanship and timely completion. The team was friendly,
                efficient, and ensured a smooth process. The team was friendly,
                efficient, and ensured a smooth process Overall,...
              </p>
            </div>
            <div className="flex flex-1 justify-between">
              <div>
                <p className="text-xl gradient-text font-medium">Rs. 20,000</p>
              </div>
              <div>
                <Link href="/userprofile/Booking/1/cancel">
                  <p className="text-xl font-medium text-red-500 underline cursor-pointer">
                    Cancel
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#F3F3F3] h-auto ">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between md:p-5 px-5">
          <div className="text-base font-normal flex flex-col gap-1">
            <p>Booking ID: 23231313123</p>
            <p>Placed on 02 Jan 2025 13:41:00</p>
            <p>Paid by Khalti Wallet</p>
          </div>
          <div className="flex flex-col items-start md:items-end text-base font-normal gap-1 mt-4 mb-2 md:mt-0">
            <p>Sewa Date: 2025-01-05</p>
            <p>Sewa Time: 03:00-05:00 pm</p>
            <Button variant={"brand"} onClick={() => setOpenReschedule(true)}>
              Re-Schedule
            </Button>
          </div>
        </div>
      </div>

      {/* provider details */}
      <div className="w-full h-auto border border-b-0">
        <div className="md:flex items-start p-5 justify-between mb-2">
          <div>
            <h1 className="text-2xl">Rohan Shrestha</h1>
            <p className="text-base">9848111110</p>
            <p className="text-base">rohan123@gmail.com</p>
            <p className="text-base">
              Balaju, Tarakeshwor-3, Kathmandu, Bagmati Province
            </p>
          </div>
          <div>
            <h1 className="text-xl md:mt-0 mt-5 ">Special Request</h1>
            <div className=" md:w-[425px] border mt-1">
              <p className="p-2 text-base text-muted-foreground">
                The painter service exceeded expectations with its exceptional
                workmanship and timely completion. The team was friendly,
                efficient, and ensured a smooth process. Overall, a reliable
                choice for quality painting!
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* booking summary */}
      <div className="w-full h-auto border bg-[#F3F3F3] mb-3">
        <div className="flex flex-col  items-center p-5 ">
          <h1 className="text-2xl">Booking Summary</h1>
          <div className="flex w-[300px] justify-between">
            <p>Total Bookings (1 Sewa)</p>
            <p>Rs. 2800</p>
          </div>
          <div className="flex w-[300px] justify-between mt-4">
            <p>Discount (2333456)</p>
            <p>-Rs. 300</p>
          </div>
          <hr className="w-[400px] border-[1px] mt-2" />
          <div className=" w-[300px] flex justify-between mt-4">
            <div>
              <p className="text-2xl font-semibold">Total</p>
              <p className="text-base">Paid by Khalti Wallet</p>
            </div>
            <p className="text-2xl font-semibold gradient-text">Rs.2,500</p>
          </div>
        </div>
      </div>
      {openReschedule && (
        <RescheduleForm
          openReschedule={openReschedule}
          setOpenReschedule={setOpenReschedule}
        />
      )}
    </div>
  );
};

export default page;
