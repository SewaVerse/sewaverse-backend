"use client";

import { useAuth } from "@/lib/CustomHook";
import React, { useEffect, useState } from "react";

interface Service {
  id: string;
  serviceName: string;
  category: string;
  price: string;
  location: string;
  time: string;
  image: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  contact: string;
}

const FetchData: React.FC = () => {
  const { user, loading: userLoading } = useAuth(); // Using the useAuth hook
  const [services, setServices] = useState<Service[]>([]);
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServicesAndUser = async () => {
      setLoading(true);
      setError(null);

      if (user) {
        try {
          // Fetch services
          const servicesResponse = await fetch("/api/services", {
            method: "GET",
          });
          if (!servicesResponse.ok) throw new Error("Failed to fetch services");
          const servicesData = await servicesResponse.json();
          setServices(servicesData);

          // Fetch user by ID
          const userResponse = await fetch(`/api/users/byid?id=${user.id}`, {
            method: "GET",
          });
          if (!userResponse.ok) throw new Error("Failed to fetch user");
          const userData = await userResponse.json();
          setUserData(userData);
        } catch (err) {
          console.log(err);
          setError(
            err instanceof Error ? err.message : "An unexpected error occurred"
          );
        } finally {
          setLoading(false);
        }
      } else {
        setError("User is not authenticated.");
        setLoading(false);
      }
    };

    fetchServicesAndUser();
  }, [user]);

  if (userLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">User Information</h2>
      {userData ? (
        <div className="border p-4 rounded">
          <p>
            <strong>Name:</strong> {userData.name}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          <p>
            <strong>Contact:</strong> {userData.contact}
          </p>
        </div>
      ) : (
        <p>No user data available.</p>
      )}

      <h2 className="text-xl font-bold">Services</h2>
      {services.length > 0 ? (
        <ul className="space-y-4">
          {services.map((service) => (
            <li key={service.id} className="border p-4 rounded">
              <p>
                <strong>Service Name:</strong> {service.serviceName}
              </p>
              <p>
                <strong>Category:</strong> {service.category}
              </p>
              <p>
                <strong>Price:</strong> {service.price}
              </p>
              <p>
                <strong>Location:</strong> {service.location}
              </p>
              <p>
                <strong>Time:</strong> {service.time}
              </p>
              <p>
                <h1>Image:</h1>
                {service.image && (
                  <img
                    src={service.image}
                    alt={service.serviceName}
                    className="service-image"
                    style={{ maxWidth: "100%", height: "auto" }} // Responsive styling
                  />
                )}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No services available.</p>
      )}
    </div>
  );
};

export default FetchData;
