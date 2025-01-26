"use client"
import Image from "next/image";
import { useState } from "react";
import { IoIosChatboxes } from "react-icons/io";
import { MdChevronRight } from "react-icons/md";
import { TfiEmail } from "react-icons/tfi";

import { Button } from "@/components/ui/button";

import BookingDetails from "./_components/BookingDetails";
import PaymentComplete from "./_components/PaymentComplete";
import PaymentSummary from "./_components/PaymentSummary";

const successIcon = "/images/servicesImage/successIcon.svg";

const Page = () => {
  // State to track if payment is complete
  const [isPaymentComplete, setIsPaymentComplete] = useState(true);

  const bookingNumber:number = 2313131239782; 
  const amount:string = "25,000";

  return (
    <div className="md:px-16 md:py-5 px-5">
      {
        isPaymentComplete ? (
          <PaymentComplete />

        ):(
          <div className=" w-full md:h-[530px] border p-6 mx-auto shadow-md ">
          <div className="flex flex-col items-center text-center">
            <Image src={successIcon} alt="Success Icon" width={70} height={70} />
            <h1 className="text-3xl font-semibold mt-4 gradient-text">
              Thank you for your booking!
            </h1>
            <p className="text-base mt-2">
              <span className="text-muted-foreground text-base mr-1">Rs.</span>
              {amount}
            </p>
            <p className="text-base mt-1">
              <span className="text-muted-foreground text-base">
                Your booking number is{" "}
              </span>
              {bookingNumber}
            </p>
            <div className="md:w-[800px] h-auto border mt-5">
              <div className="flex m:items-start md:gap-x-2 md:p-6">
                <TfiEmail size={20} color="blue" className="hidden md:block" />
                <p className="text-muted-foreground text-sm md:leading-relaxed">
                  We’ve sent you a confirmation email to{" "}
                  <span className="font-medium">aakash123@gmail.com</span>
                  with booking details. Enable push notifications of your
                  Sewaverse App to receive real-time updates of your booking.
                </p>
              </div>
            </div>
            <div className="md:w-[800px] h-[70px] border mt-5">
              <p className="md:pt-5 md:-ml-32 text-base text-muted-foreground">
                To view delivery details and track the service delivery, go to
                <span className="gradient-text whitespace-nowrap ml-2">
                  My Accounts <MdChevronRight className="inline text-blue-500" />{" "}
                  My Bookings
                </span>
              </p>
            </div>
  
            <hr className="md:w-[800px] border-[1px] mt-6" />
            <p className="mt-5 text-base text-muted-foreground">
              Please have the amount ready on service day.
            </p>
            <p className="text-2xl gradient-text">Rs. 25,000</p>
          </div>
        </div>

        )
      }
     
      {/* Booking Details */}
      <BookingDetails />
      {/* PaymentSummary */}
      <PaymentSummary />
      {/* Conditionally render PaymentComplete */}
    

      <div className="flex gap-10 items-center md:justify-between mb-4 mt-4">
        <Button variant={"brand"}> <IoIosChatboxes />Chat with Sewa provider</Button>
        <Button variant={"brand"}>Browse more Sewas</Button>
      </div>
    </div>
  );
};

export default Page;
