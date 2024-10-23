"use client";

import React, { useState } from "react";

const UpdateUserForm = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [newdata, setNewData] = useState("This can be anything");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    //const session = await auth();

    const data = {
      name,
      address,
      newdata,
    };

    try {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
    <div>
      <h2>Update User Information</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border border-black"
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="border border-black"
          />
        </div>
        <div>
          <label htmlFor="newdata">New Data:</label>
          <input
            type="text"
            id="newdata"
            value={newdata}
            onChange={(e) => setNewData(e.target.value)}
            required
            className="border border-black"
          />
        </div>
        <button type="submit">Update</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default UpdateUserForm;
