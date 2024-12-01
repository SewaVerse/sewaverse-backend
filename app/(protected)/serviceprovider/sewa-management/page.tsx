import { DataTableDemo } from "./_components/SewaManagementTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const SewaManagement: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4 pl-4">Sewa Management</h1>
      <div className="flex justify-between ">
        <p className="font-medium pl-4 text-lg">Sewa List</p>
        <Link href="/serviceprovider/add-service">
          <Button className="text-white rounded-xl mr-6">+ Add Service</Button>
        </Link>
      </div>
      {/* <SewaManagemantTable />
      <div className="flex justify-end mt-8">
        <PaginationComponent />
      </div> */}
      <DataTableDemo />
    </div>
  );
};

export default SewaManagement;
