"use client";
import Image from "next/image";
import { useState } from "react";

import CashOnDelivery from "./_components/CashOnDelivery";
import DebitCard from "./_components/DebitCard";
import Khalti from "./_components/Khalti";

interface paymentMethod {
  id: number;
  src: string;
  title: string;
  description: string;
}

interface BookingSummary{
  title:string,
  serviceName: string,
  serviceBy:string,
  price:string,
  discount:string,
  total:string
}

const paymentMethods: paymentMethod[] = [
  {
    id: 1,
    src: "/images/servicesImage/debitCard.svg",
    title: "Credit/Debit Card",
    description: "Credit/Debit Card",
  },
  {
    id: 2,
    src: "/images/servicesImage/khalti.svg",
    title: "Khalti Payment",
    description: "Khalti Payment",
  },
  {
    id: 3,
    src: "/images/servicesImage/Cash.svg",
    title: "Cash on Service Delivery",
    description: "Cash on Service Delivery",
  },
];

const visaImage = {
  visa: "/images/servicesImage/visa.svg",
  master: "/images/servicesImage/master.svg",
};

const BookingData:BookingSummary ={
  title:'Booking Summary',
  serviceName:'House Painting Service',
  serviceBy:' By Bishal Shrestha',
  price:'30000',
  discount:'300',
  total:'29700'

}

const Page = () => {
  const [activeMethod, setActiveMethod] = useState<number | null>(null);

  const handlePaymentMethodClick = (id: number) => {
    setActiveMethod((prev) => (prev === id ? null : id));
  };

  return (
    <div>
      <div className="md:px-12 md:py-5 px-5  bg-[#F7F7F7] h-auto ">
        <div className="md:flex justify-between">
          {/* Payment Methods */}
          <div className="md:flex md:gap-6 ">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                onClick={() => handlePaymentMethodClick(method.id)}
                className={`md:w-[200px] h-[190px] border rounded-lg flex items-center flex-col p-4 shadow-lg bg-white cursor-pointer ${
                  activeMethod === method.id ? "border-blue-500" : ""
                }`}
              >
                <Image
                  src={method.src}
                  alt={method.title}
                  height={130}
                  width={100}
                  className="object-contain"
                />
                <div className="text-center mt-3">
                  <p className="text-sm font-semibold">{method.title}</p>
                  <p className="text-sm text-muted-foreground pt-2">
                    {method.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Booking Summary */}
          <div className="md:w-[600px] w-full md:h-auto border mr-2 rounded-t-md shadow-md bg-white">
            <h1 className="gradient-text text-2xl font-semibold text-center mt-5">
              {BookingData.title}
            </h1>
            <p className="text-lg text-muted-foreground text-center mt-2">
              {" "}
            </p>
            <p className="text-lg text-muted-foreground text-center mt-2">
             
            </p>
            <hr className="m-5 border-[1px]" />

            <div className="flex items-center justify-between px-4">
              <p className="text-base text-muted-foreground">
                Total Bookings (1sewa)
              </p>
              <p className="text-lg">Rs.{BookingData.price}</p>
            </div>
            <div className="flex items-center justify-between px-4 mt-4">
              <p className="text-base text-muted-foreground">
                Discount (2333456)
              </p>
              <p className="text-lg">-Rs.{BookingData.discount}</p>
            </div>
            <div className="flex items-center justify-between px-4 pt-6 mb-3">
              <p className="text-3xl font-semibold">Total Amount</p>
              <p className="text-3xl font-semibold gradient-text">Rs.{BookingData.total}</p>
            </div>
          </div>
        </div>

        {/* Conditional Rendering for Payment Method Details */}
        <div className="md:mt-10 mt-20">
          {activeMethod === 1 && (
            <div>
              <DebitCard visaImage={visaImage} />
            </div>
          )}
          {activeMethod === 2 && <Khalti />}
          {activeMethod === 3 && (
            <div>
              <CashOnDelivery />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
