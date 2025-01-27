import Image from "next/image";
import { MdChevronRight } from "react-icons/md";
import { TfiEmail } from "react-icons/tfi";

const successIcon = "/images/servicesImage/successIcon.svg";
const PaymentComplete = () => {
  const bookingNumber = "2313131239782"; // Example dynamic data
  const amount = "25,000";

  return (
    <div className="w-full h-auto  border p-6 mx-auto shadow-md">
      <div className="flex flex-col items-center text-center">
        <Image src={successIcon} alt="Success Icon" width={70} height={70} />
        <h1 className="text-3xl font-semibold mt-4 gradient-text">
          Payment Successful, Thank you for your booking !
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
          <div className="flex items-start md:gap-x-2 p-6">
            <TfiEmail size={20} color="blue" className="hidden md:block" />
            <p className="text-muted-foreground text-sm leading-relaxed">
              We’ve sent you a confirmation email to{" "}
              <span className="font-medium">aakash123@gmail.com</span>
              with booking details. Enable push notifications of your Sewaverse
              App to receive real-time updates of your booking.
            </p>
          </div>
        </div>
        <div className="md:w-[800px] h-[70px] border mt-5">
          <p className="pt-5 md:-ml-32 text-base text-muted-foreground">
            To view delivery details and track the service delivery, go to
            <span className="gradient-text whitespace-nowrap ml-2">
              My Accounts <MdChevronRight className="inline text-blue-500" /> My
              Bookings
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentComplete;
