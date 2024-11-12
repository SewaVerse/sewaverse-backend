"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/lib/CustomHook";
import { Service } from "@/lib/constants";
import React, { useEffect, useState } from "react";
import { MdDelete, MdNoteAlt, MdRemoveRedEye } from "react-icons/md";


const SewaManagemantTable = () => {
  const { user, loading: userLoading } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
   const [userData, setUserData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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
  if (userLoading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  return (
    <div className="shadow-xl rounded-xl mx-4">
      <Table>
        <TableHeader>
          <TableRow className="font-bold">
            <TableHead className="pl-8">Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Available Location</TableHead>
            {/* <TableHead>Description</TableHead> */}
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-slate-500 font-normal ">
          {services.length > 0 ? (
            services.map((service, index) => (
              <TableRow key={index}>
                <TableCell className="pl-8">{service.id}</TableCell>
                <TableCell>{service.serviceName}</TableCell>
                <TableCell>
                  <Button
                    className={`${
                      service.status === true
                        ? "bg-green-600 hover:bg-green-700 px-5"
                        : "bg-red-600 hover:bg-red-700"
                    } text-white`}
                  >
                    {service.status ? "Active" : "Inactive"}
                  </Button>
                </TableCell>
                <TableCell>
                  {" "}
                  {service.image && (
                    <img
                      src={service.image}
                      alt={service.serviceName}
                      style={{ width: 60, height: 60, objectFit: "contain" }}
                    />
                  )}
                </TableCell>
                <TableCell>{service.category}</TableCell>
                <TableCell>{service.price}</TableCell>
                <TableCell>{service.location}</TableCell>
                {/* <TableCell>{service.description}</TableCell> */}
                <TableCell className="flex gap-4 text-xl p-6">
                  <MdNoteAlt />
                  <MdDelete />
                  <MdRemoveRedEye />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <p>No services available</p>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default SewaManagemantTable;
