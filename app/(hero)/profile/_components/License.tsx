"use client"
import { Edit } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { getImageUrl } from "@/lib/utils";

import AddMoreLicense from "../../(private)/sewa-provider/verification/step-3/components/AddMoreLicense";
import { ProfileResponse } from "../page";

// interface License {
//   name: string;
//   from: string;
//   image: string;
// }

// const LicenseData = {
//   name: " Backend Developer",
//   from: "ABC Institute",
//   imageUrl: "/images/image3.webp",
// };

const license =
[
{
  id: "1",
  title: "Beautician",
  institute: "License from ABC Institute",
},
{
  id: "2",
  title: "Hair Dresser",
  institute: "License from ABC Institute",
},
]

type LicenseSectionProps = Pick<ProfileResponse, "licenses">;

const LicenseSection: React.FC<LicenseSectionProps> = ({ licenses }) => {
  const [open, setOpen] = useState(false)

  return (
    <section className="w-full max-w-8xl">
      <div className="flex justify-between items-center py-2 ">
        <h1 className="font-bold text-2xl">License</h1>
        <Edit size={14} className="cursor-pointer"  onClick={()=>setOpen(true)}/>
      </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {licenseData.name}
      </div> */}
      <div className="flex flex-wrap">
        {licenses.map((license) => (
          <div
            className="flex justify-between p-2 min-w-[20rem] border rounded"
            key={license.id}
          >
            <div>
              <h1 className="text-xl font-semibold">{license.licenseOf}</h1>
              <p className="text-muted-foreground font-medium text-sm">
                {license.licenseFrom}
              </p>
            </div>
            <div className="border relative h-[67px] w-[99px] ">
              <Image
                alt={license.licenseOf}
                src={getImageUrl(license.file)}
                fill
              />
            </div>
          </div>
        ))}
      </div>
      <AddMoreLicense open={open} onOpenChange={setOpen} license={license} />
      
    </section>
  );
};

export default LicenseSection;
