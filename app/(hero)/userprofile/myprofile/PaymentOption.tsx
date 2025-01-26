import Image from "next/image";

const paymentOptionIcon = "/images/servicesImage/paymentOption.svg";

const PaymentOption = () => {
  return (
    <div className="w-full h-[400px] border  mb-4 shadow-md">
      <div className="flex items-center flex-col">
        <p className="text-muted-foreground text-xl font-medium p-4">
          Select payment methods
        </p>
        <Image
          src={paymentOptionIcon}
          alt="paymentOptionIcon"
          width={150}
          height={150}
        />
        <p className="text-muted-foreground text-xl font-medium p-4">
          No payment options
        </p>
      </div>
    </div>
  );
};

export default PaymentOption;
