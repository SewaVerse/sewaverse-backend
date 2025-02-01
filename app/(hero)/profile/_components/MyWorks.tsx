"use client"
import { Edit } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { getImageUrl } from "@/lib/utils";

import { ProfileResponse } from "../page";
import AddMoreWorks from "./MyWorks/AddMoreWorks";

const works =
[
{
  id: "1",
  title: "Beautician",
  description:"description"
},
{
  id: "2",
  title: "Hair Dresser",
 description:"description"
},
]

type WorkSectionProps = Pick<ProfileResponse, "myWorks">;

const WorksSection: React.FC<WorkSectionProps> = ({ myWorks }) => {
  const [open, setOpen] = useState(false)
  
  return (
    <section>
      <div className="flex justify-between items-center py-2 ">
        <h1 className="font-bold text-2xl">My Works</h1>
        <Edit size={14} className="cursor-pointer" onClick={()=>setOpen(true)}  />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {myWorks.map((work) => (
          <div
            key={work.id}
            className="border shadow border-gray-200 rounded-lg p-4 flex flex-col"
          >
            <div className="relative w-full h-44 aspect-square">
              <Image
                src={getImageUrl(work.workImages[0])}
                alt={work.title}
                fill
                className="rounded-md"
              />
            </div>
            <h3 className="mt-4 text-lg font-semibold">{work.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground flex-grow">
              {work.description}
            </p>
          </div>
        ))}
      </div>
      <AddMoreWorks open={open} onOpenChange={setOpen} works={works} />
     
    </section>
  );
};

export default WorksSection;
