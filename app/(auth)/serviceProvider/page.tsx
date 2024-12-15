"use client";

import Image from "next/image";
import { useState } from "react";

export default function ServiceProvider() {
  const [selectedAccountType, setSelectedAccountType] = useState("");

  const handleAccountTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAccountType(e.target.value);
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-center items-center w-full max-w-md bg-white">
        <div className="text-center font-poppins">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Image src="/images/logo.svg" alt="logo" width={50} height={50} />
          </div>

          {/* Header */}
          <h2
            className="text-2xl font-semibold mb-4"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            Select an Account Type
          </h2>

          {/* Account Selection */}
          <div className="w-full space-y-4">
            {/* Individual */}
            <div
              className={`flex items-center border rounded-lg p-4 shadow hover:shadow-md cursor-pointer ${
                selectedAccountType === "individual" ? "border-[#2E3192]" : ""
              }`}
              onClick={() => setSelectedAccountType("individual")}
            >
              <div className="flex-1 flex items-center flex-col sm:flex-row">
                {/* Image next to Individual */}
                <div className="mr-4 mb-2 sm:mb-0">
                  <Image
                    src="/images/individual.svg"
                    alt="Individual"
                    width={40}
                    height={40}
                    className={`${
                      selectedAccountType === "individual"
                        ? "text-[#2E3192]"
                        : ""
                    } object-contain w-12 h-12 sm:w-20 sm:h-20`}
                  />
                </div>
                <div>
                  <h3
                    className={`font-semibold ${
                      selectedAccountType === "individual"
                        ? "text-[#2E3192]"
                        : ""
                    }`}
                  >
                    Individual
                  </h3>
                  <p
                    className={`text-sm ${
                      selectedAccountType === "individual"
                        ? "text-[#2E3192]"
                        : "text-gray-500"
                    }`}
                  >
                    Offer expertise and services to clients in need.
                  </p>
                </div>
              </div>
              <input
                type="radio"
                name="accountType"
                value="individual"
                checked={selectedAccountType === "individual"}
                onChange={handleAccountTypeChange}
                className="h-5 w-5 accent-[#2E3192]"
              />
            </div>

            {/* Company */}
            <div
              className={`flex items-center border rounded-lg p-4 shadow hover:shadow-md cursor-pointer ${
                selectedAccountType === "company" ? "border-[#2E3192]" : ""
              }`}
              onClick={() => setSelectedAccountType("company")}
            >
              <div className="flex-1 flex items-center flex-col sm:flex-row">
                {/* Image next to Company */}
                <div className="mr-4 mb-2 sm:mb-0">
                  <Image
                    src="/images/company.svg"
                    alt="Company"
                    width={40}
                    height={40}
                    className={`${
                      selectedAccountType === "company" ? "text-[#2E3192]" : ""
                    } object-contain w-12 h-12 sm:w-20 sm:h-20`}
                  />
                </div>
                <div>
                  <h3
                    className={`font-semibold ${
                      selectedAccountType === "company" ? "text-[#2E3192]" : ""
                    }`}
                  >
                    Company
                  </h3>
                  <p
                    className={`text-sm ${
                      selectedAccountType === "company"
                        ? "text-[#2E3192]"
                        : "text-gray-500"
                    }`}
                  >
                    Manage multiple engagements on the platform as a company.
                  </p>
                </div>
              </div>
              <input
                type="radio"
                name="accountType"
                value="company"
                checked={selectedAccountType === "company"}
                onChange={handleAccountTypeChange}
                className="h-5 w-5 accent-[#2E3192]"
              />
            </div>

            {/* Next Button */}
            <button className="w-full py-2 mt-4 bg-white text-[#878787] border-[#878787] border font-poppins font-semibold rounded-lg">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
