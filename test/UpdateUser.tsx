"use client";

import React, { useState } from "react";

const UpdateUserForm = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [newdata, setNewData] = useState("This can be anything");
  //const [image, setImage] = useState<File | null>(null); // State for the uploaded image
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const data = {
      name,
      address,
      newdata,
    };

    try {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set Content-Type to JSON
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setResponseMessage("User updated successfully!");
      } else {
        setResponseMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error updating user:", error);
      setResponseMessage("Error updating user");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className=" bg-gray-200 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Update User Information
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 ">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block p-2 w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address:
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="mt-1 block p-2 w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label
              htmlFor="newdata"
              className="block text-sm font-medium text-gray-700"
            >
              New Data:
            </label>
            <input
              type="text"
              id="newdata"
              value={newdata}
              onChange={(e) => setNewData(e.target.value)}
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          {/* <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Upload Image:
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="mt-1 block p-2 w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div> */}
          <button
            type="submit"
            className="w-full bg-black text-white font-semibold py-2 rounded-md"
          >
            Update
          </button>
        </form>
        {responseMessage && (
          <p className="mt-4 text-center text-red-500">{responseMessage}</p>
        )}
      </div>
    </div>
  );
};

export default UpdateUserForm;
