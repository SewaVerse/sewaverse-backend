"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type ResetPasswordForm = {
  password: string;
  confirmPassword: string;
};

export default function ResetPassword() {
  const router = useRouter();
  const params = useParams();

  const { slug } = params;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordForm>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");
  const passwordsMismatch =
    watch("confirmPassword") && watch("confirmPassword") !== password;

  const onSubmit = async (data: ResetPasswordForm) => {
    console.log(data);
    if (passwordsMismatch) {
      console.error("Passwords do not match!");
      return;
    }
    // Perform API call
    try {
      const response = await fetch(`/api/auth/resetPassword/${slug}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to change password!!");
      }

      const result = await response.json();
      console.log("Password Changed successfully:", result);
      toast.success(result.message);
      router.push("/reset-password/success");
      // router.push('/login');
    } catch (error) {
      console.error("Error during password reset request:", error);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-6 rounded-lg ">
        <div className="text-center mb-6">
          <Image src="/images/mainLogo.svg" alt="logo" width={50} height={50} />
          <h2 className="text-2xl font-playfair text-gray-800">
            Reset Password
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Strong passwords include numbers, letters, and special characters.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Password Field */}
          <div className="mb-4">
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              type="password"
              placeholder="Enter your new password"
              className={`w-full px-4 py-2 rounded-lg border focus:outline-none ${
                errors.password || passwordsMismatch
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300 bg-white"
              }`}
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="mb-4">
            <input
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                minLength: {
                  value: 6,
                  message: "Confirm Password must be at least 6 characters",
                },
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              type="password"
              placeholder="Confirm your new password"
              className={`w-full px-4 py-2 rounded-lg border focus:outline-none ${
                errors.confirmPassword || passwordsMismatch
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300 bg-white"
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
            {passwordsMismatch && !errors.confirmPassword && (
              <p className="text-sm text-red-500 mt-1">
                Passwords do not match
              </p>
            )}
          </div>

          <Button variant={"brand"} className="mt-2 w-full">
            Set new password
          </Button>
        </form>
      </div>
    </div>
  );
}
