"use client";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
interface RegisterFormData {
  roles: string;
  userType: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  password: string;
  gender: string;
  dob: string;
  acceptTerms: boolean;
}

export default function Register() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const accountType = searchParams.get("accountType");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const payload = {
        ...data,
        userType: accountType || "default",
        acceptTerms: true,
      };

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(errorDetails.message || "Failed to register.");
      }

      const result = await response.json();
      toast.success("Registered Successfully!");
      toast.success(result.message);
      router.push("/email");
      console.log("Registration successful:", result);
    } catch (error) {
      console.error("Error during registration:");
      toast.error("Failed to register. Please try again.");
  
  };
}

  return (
    <div className="flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-6 rounded-lg">
        <div className="flex justify-center mb-6">
          <Image src="/images/logo.svg" alt="logo" width={50} height={50} />
        </div>

        <h2
          className="text-3xl font-semibold text-gray-800 mb-6 text-center"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          Create your account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Account Type */}
          <div>
            <p>{accountType}</p>
            <div
              className="w-full h-[2px]"
              style={{ backgroundColor: "#2E3192", marginTop: "8px" }}
            ></div>
          </div>

          {/* Full Name */}
          <div>
            <input
              {...register("name", { required: "Full Name is required" })}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Full Name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <input
              {...register("phoneNumber", {
                required: "Mobile Number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Phone number must be 10 digits",
                },
              })}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Mobile Number"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-xs">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Email Address"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>

          {/* New Password */}
          {/* <div>
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="New Password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div> */}

<div className="relative">
      <input
        {...register("password", { required: "Password is required" })}
        type={showPassword ? "text" : "password"}
        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg pr-10"
        placeholder="New Password"
      />
      {errors.password && (
        <p className="text-red-500 text-xs">{errors.password.message}</p>
      )}
      {/* Eye toggle button */}
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute inset-y-0 right-3 flex items-center text-gray-500"
        aria-label="Toggle password visibility"
      >
        {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
      </button>
    </div>

          {/* Terms and Conditions */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              By signing in, you agree to <br />
              <a href="#" style={{ textDecoration: "underline" }}>
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" style={{ textDecoration: "underline" }}>
                Privacy Policy
              </a>{" "}
              of Sewaverse.
            </span>
          </div>

          {/* Register Button */}
          <Button variant={"brand"} className="mt-2 w-full">
            Sign Up
          </Button>
        </form>

        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-500"
              style={{ color: "#2E3192" }}
            >
              Login here
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
