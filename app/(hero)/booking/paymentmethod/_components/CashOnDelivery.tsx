import Link from "next/link"

import { Button } from "@/components/ui/button"

const CashOnDelivery = () => {
  return (
    <div className="md:w-[655px] h-auto border rounded-t-md shadow-md -mt-20 bg-white">
        <p className="text-muted-foreground text-lg p-7 ">Pay Cash After Service Offering: Hand over the payment directly to your Sewa Provider after the service is completed to your satisfaction.</p>
        <div className="flex justify-center ">
        <Link href={"/booking/paymentsuccess"}>
        <Button variant={"brand"} className="w-[192px] h-10 text-base mb-2"> Confirm Order </Button>
        </Link>
        </div>

    </div>
  )
}

export default CashOnDelivery