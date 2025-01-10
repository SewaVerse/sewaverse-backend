import { RiDeleteBin6Line } from "react-icons/ri";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Profession = () => {
  return (
    <div className="flex flex-col justify-center p-4 gap-4 w-full">
      <h1 className="text-center font-semibold text-muted-foreground text-lg">
        Profession
      </h1>
      <div className="flex justify-between items-center border rounded-lg p-4">
        <div>
          {/* <p>{data.experience}</p> */}
          <h1 className="gradient-text text-lg">Barber</h1>
        </div>
        <div className="flex items-center">
          <Button variant="ghost" className="font-bold">
            <RiDeleteBin6Line className="w-4 h-4 " />
            Delete
          </Button>
        </div>
      </div>
      <div className="flex items-center border rounded-lg p-4">
        <div className="w-full ">
          <h1 className="gradient-text">Add a profession</h1>
          <Input
            type="text"
            placeholder="Name a profession"
            className="border-none p-0"
          />
          {/* <p>{data.experience}</p> */}
        </div>
      </div>
      <Button variant={"brand"} className="max-w-32">
        Done
      </Button>
    </div>
  );
};
