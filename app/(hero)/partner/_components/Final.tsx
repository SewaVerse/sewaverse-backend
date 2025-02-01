import Image from "next/image"

import { Button } from "@/components/ui/button"

const congICon = "/images/servicesImage/cong.svg"
const Final = () => {
  return (
    <div>
      <div className=" flex flex-col items-center justify-center ">
      <Image src={congICon} alt="congICon" height={1} width={1} className="w-[350px] h-[274px]"/>
       <p className=" text-lg">Thank you for your interest in partnering  with Sewaverse !
       Your application is currently under review we will be in touch soon with an update.</p>
       <div className="flex gap-20 md:gap-[750px]  md:py-5">
        <Button variant={"brand"} >Back To Home </Button>
        <Button variant={"brand"} >Become a SewaProvider </Button>

      </div>
      </div>

      

    </div>
  )
}

export default Final