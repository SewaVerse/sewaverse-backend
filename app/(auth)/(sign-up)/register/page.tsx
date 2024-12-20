"use client";

import RegisterContext from "@/app/context/RegisterContext";
import { userRegisterSchema } from "@/app/schemas/authSchema";
import Input from "@/components/form/Input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { z } from "zod";

type TRole = "user" | "serviceProvider";
type RegisterForm = z.infer<typeof userRegisterSchema>;

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const registerContext = use(RegisterContext);

  if (!registerContext) {
    throw new Error("RegisterContext is not available");
  }

  const { registerData } = registerContext;

  const router = useRouter();

  useEffect(() => {
    if (registerData === null) {
      router.push("/");
    }
  }, [registerData, router]);

  const form = useForm<RegisterForm>({
    resolver: zodResolver(userRegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
      acceptTerms: false,
      userType: registerData?.accountType || "",
      role: (registerData?.role as TRole) || "",
    },
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      const payload = {
        ...data,
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
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error during registration:", error.message || error);
        toast.error(error.message || "An unexpected error occurred.");
      }
    }
  };

  return (
    <Form {...form}>
      <div className="flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md bg-white p-6 rounded-lg">
          <div className="flex justify-center mb-6">
            <Image src="/images/logo.svg" alt="logo" width={50} height={50} />
          </div>

          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center font-play-fair">
            Create your account
          </h2>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Account Type */}
            <div>
              <p className="capitalize text-brand-grey">
                {registerData?.accountType}
              </p>
              <Separator className="h-[.1rem] bg-brand-gradient" />
            </div>

            {/* Full Name */}
            <Input
              form={form}
              name="name"
              type="text"
              placeholder={
                registerData && registerData.accountType === "company"
                  ? "Company Name"
                  : "Full Name"
              }
            />

            {/* Phone Number */}
            <Input
              form={form}
              name="phoneNumber"
              type="text"
              placeholder="Mobile Number"
            />

            {/* Email */}
            <Input
              form={form}
              name="email"
              type="email"
              placeholder="Email Address"
            />

            {/* Password */}
            <div className="relative">
              <Input
                form={form}
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
              />
              {form.watch("password").length > 0 && (
                <div className="absolute top-1/2 right-3 transform -translate-y-1/2 cusror-pointer">
                  {showPassword ? (
                    <FaEye
                      onClick={() => setShowPassword(false)}
                      className="cursor-pointer"
                    />
                  ) : (
                    <FaEyeSlash
                      onClick={() => setShowPassword(true)}
                      className="cursor-pointer"
                    />
                  )}
                </div>
              )}
            </div>

            {/* Terms and Conditions */}

            <div className="flex flex-col items-center">
              <FormField
                control={form.control}
                name="acceptTerms"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-col items-center space-y-2">
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            id="terms"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={form.formState.isSubmitting}
                          />
                        </FormControl>
                        <span className="text-sm text-gray-600">
                          By signing in, you agree to the{" "}
                        </span>
                      </div>

                      <div className="text-sm text-gray-600 text-center">
                        <Link href="#" className="underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="#" className="underline">
                          Privacy Policy
                        </Link>{" "}
                        of Sewaverse.
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Register Button */}
            <Button type="submit" variant={"brand"} className="mt-2 w-full">
              {form.formState.isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <span>Sign up</span>
              )}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-brand">
                Login here
              </Link>
            </span>
          </div>
        </div>
      </div>
    </Form>
  );
}
