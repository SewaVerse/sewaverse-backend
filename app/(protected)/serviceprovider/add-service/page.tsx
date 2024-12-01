import AddServiceComponent from "./_components/AddService";
import React from "react";

const AddService = () => {
  return (
    <>
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-4 pl-4">Sewa Management</h1>
        <p className="font-medium pl-4 text-lg">Add Sewa</p>
      </div>
      <AddServiceComponent />
    </>
  );
};

export default AddService;
