import Image from "next/image";

import { Button } from "@/components/ui/button";

const gift = "/images/servicesImage/gift.svg";
const copyIcon = "/images/servicesImage/copy.svg";

// Define the type for a promocode
interface promoData {
  code: string;
  discount: string;
  validFor: string[];
  dateRange: string;
  status: string;
}

interface PromocodesProps {
  promoData: promoData[];
}

const PromoCard = ({ promoData }: PromocodesProps) => {
  return (
    <div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
        {promoData.map((promo, index) => (
          <div
            key={index}
            className="md:w-[500px] h-auto border bg-[#F3F3F3] mt-3 rounded-lg"
          >
            <div className="flex items-center gap-10 p-3">
              {/* Gift Image */}
              <div className="basis-1/4">
                <Image
                  src={gift}
                  alt="Gift Icon"
                  height={80}
                  width={80}
                  className="w-full object-contain"
                />
                <span className="text-sm  py-2 text-center text-muted-foreground md:hidden block">
                      *T&C Apply
                    </span>
              </div>

              <div className="flex items-start">
                {/* Promo Details */}
                <div className="flex flex-col justify-between flex-1">
                  <h1 className="text-2xl font-semibold flex items-center md:gap-5">
                    {promo.code}{" "}
                    <span className="text-sm text-muted-foreground hidden md:block">
                      *T&C Apply
                    </span>
                  </h1>
                  <h1 className="text-xl ">{promo.discount}</h1>
                  {promo.validFor.map((validText, idx) => (
                    <p key={idx} className="gradient-text">
                      {validText}
                    </p>
                  ))}
                  <p className="text-gray-600">{promo.dateRange}</p>

                  {/* Conditional Rendering Based on Status */}
                  {promo.status === "Collect" && (
                    <div className="flex gap-3 justify-between pt-2 ">
                      <p className="text-green-500">Collected</p>
                      <Button
                        variant="brand"
                        className="h-8 px-4"
                        aria-label={`Use promocode ${promo.code}`}
                      >
                        Use Now
                      </Button>
                    </div>
                  )}
                  {promo.status === "new" && (
                    <div className="flex gap-4 justify-end pt-2 ">
                      <Button variant={"brand"}>Collect</Button>
                      <Button
                        variant="brand"
                        className="h-8 px-4"
                        aria-label={`Use promocode ${promo.code}`}
                      >
                        Use Now
                      </Button>
                    </div>
                  )}

                  {/* {promo.status === "Expired" && (
                    <div className="flex gap-3 justify-between pt-2  ">
                      <p className="text-green-500">Collected</p>
                      <Button
                        variant="brand"
                        className="h-8 px-4"
                        aria-label={`Use promocode ${promo.code}`}
                      >
                        Use Now
                      </Button>
                    </div>
                  )} */}

                  {promo.status === "recently" && (
                    <div className="flex gap-3 justify-between pt-2">
                      <p className="text-green-500">Collected</p>
                      <p className="text-green-500">Used</p>
                    </div>
                  )}
                </div>

                {/* Copy Icon */}
                <div className="flex">
                  <Image
                    src={copyIcon}
                    alt="Copy Icon"
                    width={34}
                    height={34}
                    className="cursor-pointer"
                    aria-label={`Copy promocode ${promo.code}`}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromoCard;
