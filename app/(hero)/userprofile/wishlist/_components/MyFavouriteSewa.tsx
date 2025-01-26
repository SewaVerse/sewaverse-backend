import Image from "next/image";
import { CiLocationOn } from "react-icons/ci";
import { FaShareAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { LuNotebookPen } from "react-icons/lu";
import { MdDeleteForever } from "react-icons/md";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
const serviceIcon = "/images/servicesImage/Childcare.svg";

const MyFavouriteSewa = () => {
  return (
    <div>
      <div className=" w-full h-[140px] mt-3 mx-[1px] rounded-md mb-2 ">
        <div className=" flex items-center border mx-[1px] rounded-md ">
          <div className="flex items-center gap-4 mx-4">
            <form action="#">
              <Input type="checkbox" className="w-[20px]" />
            </form>
            <div className="w-[120px] h-auto  m-3">
              <Image
                src={serviceIcon}
                alt="serviceIcon"
                width={120} 
                height={0} 
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
          <div className=" flex  items-center justify-between w-[100%]  mx-2 ">
            <div>
              <h1 className="text-xl font-semibold">Emily Wilson</h1>
              <p className="text-base">Home Sewa Painting</p>
              <div className="flex items-center gap-1">
                <FaStar color="orange" />
                <FaStar color="orange" />
                <FaStar color="orange" />
                <FaStar color="orange" />
                <p className="text-base text-muted-foreground">4.5</p>
              </div>
              <span className="flex items-center gap-1 text-muted-foreground">
                <CiLocationOn />
                Kathmandu
              </span>
            </div>
            <div className=" text-lg ">
              <p>joined in Jan, 2024</p>
              <p>100 Services Delivered</p>
              <p> 4 Yrs Experience</p>
            </div>

            <div className="gradient-text cursor-pointer">
              <p className="flex items-center gap-2 text-lg">
                {" "}
                <FaShareAlt size={20} color="black" />
                Share
              </p>
              <p className="text-base font-medium flex gap-2 items-center">
                {" "}
                <MdDeleteForever size={20} color="black" />
                Delete
              </p>

              <p className="flex items-center gap-2">
                {" "}
                <LuNotebookPen color="black" />
                Book now
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className=" h-[140px] mt-3 mx-[1px] rounded-md mb-2 ">
        <div className=" flex items-center border mx-[1px] rounded-md ">
          <div className="flex items-center gap-4 mx-4">
            <form action="#">
              <Input type="checkbox" className="w-[20px]" />
            </form>
            <div className="w-[120px] h-auto  m-3">
              <Image
                src={serviceIcon}
                alt="serviceIcon"
                width={120} 
                height={0} 
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
          <div className=" flex  items-center justify-between w-[100%]  mx-2 ">
            <div>
              <h1 className="text-xl font-semibold">Emily Wilson</h1>
              <p className="text-base">Home Sewa Painting</p>
              <div className="flex items-center gap-1">
                <FaStar color="orange" />
                <FaStar color="orange" />
                <FaStar color="orange" />
                <FaStar color="orange" />
                <p className="text-base text-muted-foreground">4.5</p>
              </div>
              <span className="flex items-center gap-1 text-muted-foreground">
                <CiLocationOn />
                Kathmandu
              </span>
            </div>
            <div className=" text-lg ">
              <p>joined in Jan, 2024</p>
              <p>100 Services Delivered</p>
              <p> 4 Yrs Experience</p>
            </div>

            <div className="gradient-text cursor-pointer flex flex-col gap-1  ">
              <Button variant={"brand"}>
                {" "}
                <FaShareAlt size={20} color="white" />
                Share
              </Button>
              <Button variant={"brand"}>
                {" "}
                <MdDeleteForever size={20} color="white" />
                Delete
              </Button>

              <Button variant={"brand"}>
                {" "}
                <LuNotebookPen color="white" />
                Book now
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className=" h-[140px] mt-3 mx-[1px] rounded-md mb-2 ">
        <div className=" flex items-center border mx-[1px] rounded-md ">
          <div className="flex items-center gap-4 mx-4">
            <form action="#">
              <Input type="checkbox" className="w-[20px]" />
            </form>
           <div className="w-[120px] h-auto  m-3">
              <Image
                src={serviceIcon}
                alt="serviceIcon"
                width={120} 
                height={0} 
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
          <div className=" flex  items-center justify-between w-[100%]  mx-2 ">
            <div>
              <h1 className="text-xl font-semibold">Emily Wilson</h1>
              <p className="text-base">Home Sewa Painting</p>
              <div className="flex items-center gap-1">
                <FaStar color="orange" />
                <FaStar color="orange" />
                <FaStar color="orange" />
                <FaStar color="orange" />
                <p className="text-base text-muted-foreground">4.5</p>
              </div>
              <span className="flex items-center gap-1 text-muted-foreground">
                <CiLocationOn />
                Kathmandu
              </span>
            </div>
            <div className=" text-lg ">
              <p>joined in Jan, 2024</p>
              <p>100 Services Delivered</p>
              <p> 4 Yrs Experience</p>
            </div>

            <div className="gradient-text cursor-pointer flex flex-col gap-1 ">
              <Button variant={"brand"}>
                {" "}
                <FaShareAlt size={20} color="white" />
                Share
              </Button>
              <Button variant={"brand"}>
                {" "}
                <MdDeleteForever size={20} color="white" />
                Delete
              </Button>

              <Button variant={"brand"}>
                {" "}
                <LuNotebookPen color="white" />
                Book now
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className=" h-[140px] mt-3 mx-[1px] rounded-md mb-2 ">
        <div className=" flex items-center border mx-[1px] rounded-md ">
          <div className="flex items-center gap-4 mx-4">
            <form action="#">
              <Input type="checkbox" className="w-[20px]" />
            </form>
            <div className="w-[120px] h-auto  m-3">
              <Image
                src={serviceIcon}
                alt="serviceIcon"
                width={120} 
                height={0} 
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
          <div className=" flex  items-center justify-between w-[100%]  mx-2 ">
            <div>
              <h1 className="text-xl font-semibold">Emily Wilson</h1>
              <p className="text-base">Home Sewa Painting</p>
              <div className="flex items-center gap-1">
                <FaStar color="orange" />
                <FaStar color="orange" />
                <FaStar color="orange" />
                <FaStar color="orange" />
                <p className="text-base text-muted-foreground">4.5</p>
              </div>
              <span className="flex items-center gap-1 text-muted-foreground">
                <CiLocationOn />
                Kathmandu
              </span>
            </div>
            <div className=" text-lg ">
              <p>joined in Jan, 2024</p>
              <p>100 Services Delivered</p>
              <p> 4 Yrs Experience</p>
            </div>

            <div className="gradient-text cursor-pointer flex flex-col gap-1  ">
              <Button variant={"brand"}>
                {" "}
                <FaShareAlt size={20} color="white" />
                Share
              </Button>
              <Button variant={"brand"}>
                {" "}
                <MdDeleteForever size={20} color="white" />
                Delete
              </Button>

              <Button variant={"brand"}>
                {" "}
                <LuNotebookPen color="white" />
                Book now
              </Button>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default MyFavouriteSewa;
