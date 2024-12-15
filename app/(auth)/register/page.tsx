"use client";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface RegisterFormData {
  roles: string;
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to register.");
      }

      const result = await response.json();
      toast.success("Regsitered Sucessfully!");
      toast.success(result.message);
      router.push("/email");
      console.log("Registration successful:", result);
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-6 rounded-lg">
        <div className="flex justify-center mb-6">
          <Image src="/images/logo.svg" alt="logo" width={50} height={50} />
        </div>

        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center" style={{ fontFamily: '"Playfair Display", serif' }}>
          Create your account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Account Type */}
          <div>
            <label className="block text-sm font-medium text-gray-600 poppins" 
            style={{ fontFamily: '"Playfair Display", serif' , color: "#878787" }} >
              Account Type
            </label>
            <select
              {...register("roles", { required: "Full Name is required" })}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="user">User</option>
              <option value="serviceProvider">Sewa-Provider</option>
            </select>
          </div>

          {/* Full Name */}
          <div>
            <input
              {...register("name", { required: "Full Name is required" })}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg poppins"
              placeholder="Full Name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name.message}</p>
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

          <div className="grid grid-cols-2 gap-4">
            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Phone Number
              </label>
              <input
                {...register("phoneNumber", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Phone number must be 10 digits",
                  },
                })}
                className={`w-full mt-1 px-3 py-2 border rounded-lg ${
                  errors.phoneNumber ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Phone Number"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-xs">
                  {errors.phoneNumber.message}
                </p>
              )}
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
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Date of Birth
              </label>
              <input
                {...register("dob", {
                  required: "Date of Birth is required",
                  validate: (value) => {
                    const dob = new Date(value);
                    const today = new Date();
                    let age = today.getFullYear() - dob.getFullYear();
                    const month = today.getMonth() - dob.getMonth();
                    if (
                      month < 0 ||
                      (month === 0 && today.getDate() < dob.getDate())
                    ) {
                      age--;
                    }
                    return age >= 18 || "You must be at least 18 years old";
                  },
                })}
                type="date"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
              />
              {errors.dob && (
                <p className="text-red-500 text-xs">{errors.dob.message}</p>
              )}
            </div>
          </div>

          {/* Terms and Conditions */}
          <div
            className="flex items-center space-x-2"
            style={{ fontFamily: 'Poppins, sans-serif', color: '#878787' }}
            
          > 
          <input
              type="checkbox"
              {...register("acceptTerms", { required: "You must accept the terms" })}
              className="w-4 h-4 mt-1"
            />
          
            <span className="text-sm text-gray-600">
              Yes, I understand and agree to the{" "}
              <a href="#" style={{ textDecoration: 'underline' }} >
                SewaVerse Terms of Service
              </a>
              , including the and{" "}
              <a href="#" style={{ textDecoration: 'underline' }}>
                Privacy Policy
              </a>
              .
            </span>
          </div>

          {/* Register Button */}
          <Button variant={"brand"} className="mt-2 w-full">
            Register
          </Button>
        </form>

        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500" style={{ color: '#2E3192' }}>
              Login here
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
