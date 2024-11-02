"use client";

// components/AddServiceForm.tsx
// Adjust this import as needed
import { MINIOURL } from "@/lib/constants";
import { uploadToMinIO } from "@/lib/helper";
import React, { useState } from "react";

interface ServiceData {
  serviceName: string;
  category: string;
  price: string;
  location: string;
  time: string;
  image: File | null;
}

const AddServiceForm: React.FC = () => {
  const [serviceData, setServiceData] = useState<ServiceData>({
    serviceName: "",
    category: "",
    price: "",
    location: "",
    time: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setServiceData({
      ...serviceData,
      [name]: value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setServiceData({
        ...serviceData,
        image: e.target.files[0],
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let imageUrl = null;
      if (serviceData.image) {
        imageUrl = await uploadToMinIO(serviceData.image, "services");
        if (!imageUrl) {
          setError("Image upload failed. Please try again.");
          return;
        }
      }

      const response = await fetch("/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...serviceData,
          image: imageUrl ? `${MINIOURL}${imageUrl}` : null,
        }),
      });

      if (response.status === 201) {
        alert("New Service Added");
      } else if (response.status === 403) {
        const result = await response.json();
        if (result.message === "Profile is not verified") {
          setError(
            "Profile is not verified. Please verify your profile to add services."
          );
        } else {
          setError(
            "Access forbidden. You do not have permission to add services."
          );
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <input
        type="text"
        name="serviceName"
        placeholder="Service Name"
        value={serviceData.serviceName}
        onChange={handleChange}
        required
        className="border p-2 rounded"
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={serviceData.category}
        onChange={handleChange}
        required
        className="border p-2 rounded"
      />
      <input
        type="text"
        name="price"
        placeholder="Price"
        value={serviceData.price}
        onChange={handleChange}
        required
        className="border p-2 rounded"
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={serviceData.location}
        onChange={handleChange}
        required
        className="border p-2 rounded"
      />
      <input
        type="time"
        name="time"
        value={serviceData.time}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleImageChange}
        className="border p-2 rounded"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        {loading ? "Adding..." : "Add Service"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default AddServiceForm;
