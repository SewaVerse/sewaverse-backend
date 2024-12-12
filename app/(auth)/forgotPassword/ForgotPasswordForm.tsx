"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type ForgotPasswordForm = {
  email: string;
};

const ForgotPasswordForm = () => {
  const router = useRouter();

  const onSubmit = async (data: ForgotPasswordForm) => {
    try {
      const response = await fetch("/api/auth/forgotPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send password reset request");
      }

      const result = await response.json();
      console.log("Password reset request successful:", result);
      toast.success(result.message);
      router.push("/login");
    } catch (error) {
      console.error("Error during password reset request:", error);
    }
  };

  const {
    register,
    handleSubmit,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formState: { errors },
  } = useForm<ForgotPasswordForm>({
    defaultValues: {
      email: "",
    },
  });

  return (
    <div className="flex items-center justify-center bg-red-300 h-full">
      <div className="w-2/3 ">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <Image
              src="/images/mainLogo.svg"
              alt="logo"
              width={50}
              height={50}
            />
          </div>
          <h2 className="text-2xl font-semibold">Forgot Password</h2>
          <p className="text-gray-600 mt-2">
            Please provide your email to receive a link to recover your account.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <Input
              {...register("email", { required: true })}
              placeholder="Enter Your email address"
            />
          </div>
          <Button variant={"brand"} className="mt-2 w-full">
            Send Reset Link
          </Button>
        </form>
        <div className="text-center mt-4">
          <a
            href="/login"
            className="text-blue-500 font-medium hover:underline"
          >
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
