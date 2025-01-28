import Link from "next/link";

import { Button } from "@/components/ui/button";

const Khalti = () => {
  return (
    <div className="md:w-[655px] h-auto border rounded-t-md shadow-md -mt-20 bg-white">
      <p className="text-muted-foreground text-lg p-7 ">
        Fast and Convenient: Make instant payment using Khalti wallet,
        e-banking, mobile banking or Connect IPS.
      </p>
      <div className="flex justify-center ">
        <Link href={"/booking/paymentsuccess"}>
          <Button variant={"brand"} className="w-[192px] h-10 text-base mb-3">
            {" "}
            Pay Now{" "}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Khalti;
