"use client";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface RegisterFormData {
  accountType: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  gender: string;
  dob: string;
  agree: boolean;
}

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onSubmit = (data: RegisterFormData) => {
    console.log(data); // Handle form submission
  };

  return (
    <div className="flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-6 rounded-lg">
        <div className="flex justify-center mb-6">
          <Image src="/images/mainLogo.svg" alt="logo" width={50} height={50} />
        </div>

        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Create your account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Account Type */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Account Type
            </label>
            <select
              {...register("accountType")}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          {/* Full Name */}
          <div>
            {/* <label className="block text-sm font-medium text-gray-600">Full Name</label> */}
            <input
              {...register("fullName", { required: "Full Name is required" })}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Full Name"
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs">{errors.fullName.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            {/* <label className="block text-sm font-medium text-gray-600">Email address</label> */}
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
          <div className="grid grid-cols-2 gap-4">
            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Phone Number
              </label>
              <input
                {...register("phone")}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Phone Number"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Address
              </label>
              <input
                {...register("address")}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Address"
              />
            </div>
          </div>

          {/* New Password */}
          <div>
            {/* <label className="block text-sm font-medium text-gray-600">New Password</label> */}
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="New Password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>

          {/* Gender and Date of Birth */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Gender
              </label>
              <select
                {...register("gender")}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Date of Birth
              </label>
              <input
                {...register("dob")}
                type="date"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center space-x-2">
            <input
              {...register("agree", {
                required: "You must agree to the terms",
              })}
              type="checkbox"
              className="h-4 w-4"
            />
            <span className="text-sm text-gray-600">
              Yes, I understand and agree to the{" "}
              <a href="#" className="text-blue-500">
                SewaVerse Terms of Service
              </a>
              , including the{" "}
              <a href="#" className="text-blue-500">
                User Agreement
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-500">
                Privacy Policy
              </a>
              .
            </span>
          </div>
          {errors.agree && (
            <p className="text-red-500 text-xs">{errors.agree.message}</p>
          )}

          {/* Register Button */}
          <Button variant={"brand"} className="mt-2 w-full">
            Register
          </Button>
        </form>

        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500">
              Login here
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
