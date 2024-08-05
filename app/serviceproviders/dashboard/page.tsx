"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState<any>(null); // Replace 'any' with appropriate type if known
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve the token from local storage or any secure place
        const response = await axios.get("/api/getserviceprovider", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserInfo(response.data);
      } catch (err) {
        console.error("Error fetching user info:", err);
        setError("Failed to fetch user information.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (!userInfo) return <div>No user information available.</div>;

  return (
    <div>
      <h1>Dashboard Info</h1>
      <p>ID: {userInfo.id}</p>
      <p>Email: {userInfo.email}</p>
      <p>Role: {userInfo.role}</p>
      {userInfo.role === "service_provider" && (
        <div>
          <h2>Service Provider Details</h2>
          <p>Full Name: {userInfo.additionalInfo.fullname}</p>
          <p>Profession: {userInfo.additionalInfo.profession}</p>
          <p>Date of Birth: {userInfo.additionalInfo.dob}</p>
          <p>Gender: {userInfo.additionalInfo.gender}</p>
          <p>Address: {userInfo.additionalInfo.address}</p>
        </div>
      )}
      {userInfo.role === "company" && (
        <div>
          <h2>Company Details</h2>
          <p>Company Name: {userInfo.additionalInfo.companyName}</p>
          <p>
            Registration Number: {userInfo.additionalInfo.registrationNumber}
          </p>
          <p>Contact Person: {userInfo.additionalInfo.contactPersonName}</p>
          <p>
            Contact Position: {userInfo.additionalInfo.contactPersonPosition}
          </p>
          <p>Company Address: {userInfo.additionalInfo.companyAddress}</p>
          <p>Secondary Contact: {userInfo.additionalInfo.secondaryContact}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
