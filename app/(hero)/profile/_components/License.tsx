import { Edit } from "lucide-react";

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

export const License = () => {
  return (
    <div className="w-full max-w-8xl py-2">
      <div className="flex justify-between items-center py-2 ">
        <h1 className="font-bold text-2xl">License</h1>
        <Edit size={14} className="cursor-pointer" />
      </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {licenseData.name}
      </div> */}
      <div>
        <div>
          <h1 className="text-xl font-semibold">
            {/* {licenseData.name} */}
            License Name
            </h1>
          <p className="text-muted-foreground font-medium text-sm">
            {/* {licenseData.from} */}
            Abc Institute
          </p>
        </div>
        <div className="border h-[67px] w-[99px] "></div>
      </div>
    </div>
  );
};
