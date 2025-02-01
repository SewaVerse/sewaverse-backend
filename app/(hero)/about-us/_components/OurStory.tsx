import Image from "next/image";

import { Button } from "@/components/ui/button";

import { redLine } from "../page";

interface ourStoryData {
  title: string;
  description1: string[];
  description2: string[];
}

interface ourStoryProps {
  ourStoryData: ourStoryData;
}

const OurStory = ({ ourStoryData }: ourStoryProps) => {
  return (
    <div className="md:mt-12 ">
      <div className="flex flex-col items-center ">
        <h1 className="gradient-text  md:text-4xl font-semibold">
          {ourStoryData.title}
        </h1>
          <Image src={redLine} alt="redLine" width={100} height={20} className="md:w-[170px] md:h-[30px]" />
      </div>
      {/* for content */}
      <div className="md:flex gap-10 ">
        <div className="basis-2/4 ">
          {ourStoryData.description1.map((data, index) => {
            return (
              <p key={index} className=" text-wrap p-3  text-xl">
                {data}
              </p>
            );
          })}
        </div>
        <div className="flex-1 ">
          {ourStoryData.description2.map((data, index) => {
            return (
              <p key={index} className="text-wrap p-3  text-xl">
                {data}
              </p>
            );
          })}
        </div>
      </div>
      {/* signup button */}
      <div className="flex justify-center ">
        <Button variant={"brand"} size={"md"}>Sign In   </Button>
      </div>
    </div>
  );
};

export default OurStory;
