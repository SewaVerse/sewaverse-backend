"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginForm) => {
    console.log(data);
    try {
      const callback = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (callback?.error) {
        toast.error("Invalid credentials!");
      } else if (callback?.ok) {
        router.push("/");
        toast.success("Logged in successfully!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex ">
      <div>
        <Image
          src="/images/login.svg"
          alt="login image"
          width={100}
          height={100}
        />
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
            <h1 className="mb-3 text-2xl">Please log in to continue.</h1>
            <div className="w-full">
              <div>
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                  htmlFor="email"
                >
                  Email
                </label>
                <div className="relative">
                  <input
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    {...register("email", { required: true })}
                    required
                  />
                </div>
              </div>
              <div className="mt-4">
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    required
                    minLength={6}
                    {...register("password", { required: true })}
                  />
                </div>
              </div>
              <Button className="mt-4 w-full">Log in</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
