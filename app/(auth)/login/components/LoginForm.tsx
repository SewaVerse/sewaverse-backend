"use client";

import Input from "@/components/form/Input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import AuthSocialButton from "./AuthSocialButton";

import { userLoginSchema } from "@/app/schemas/authSchema";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type LoginForm = z.infer<typeof userLoginSchema>;
type SocialActions = "google" | "twitter" | "github";

const LoginForm = () => {
  const router = useRouter();

  const form = useForm<LoginForm>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      const callback = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (callback?.error) {
        toast.error("Invalid credentials!");
      } else if (callback?.ok) {
        toast.success("Logged in successfully!");
        // router.push("/");
        router.push("/verify");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const socialAction = async (action: SocialActions) => {
    const callback = await signIn(action, { redirect: false });

    if (callback?.error) {
      toast.error("Invalid credentials!");
    } else if (callback?.ok) {
      router.push("/");
      toast.success("Logged in successfully!");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex-1 rounded-lg bg-gray-50  pt-8">
          <div className="flex flex-col justify-center items-center">
            <Image
              className="w-auto h-auto"
              src="/images/logo.svg"
              alt="logo"
              width={50}
              height={50}
            />
            <h1 className=" text-2xl">Welcome back!</h1>
            <p className="text-gray-500">
              Get instant access to the services you need.
            </p>
          </div>

          <div className="w-full my-4">
            <Input
              type="email"
              placeholder="Email"
              label="Email"
              form={form}
              name="email"
            />
            <Input
              type="password"
              placeholder="Password"
              label="Password"
              form={form}
              name="password"
            />
            <div className="my-2 flex justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me
                </label>
              </div>
              <Link href="/forgot-password" className="text-sm">
                Forgot password?
              </Link>
            </div>
            <Button variant={"brand"} className="mt-2 w-full">
              Log in
            </Button>
          </div>
        </div>
      </form>
      <Separator />
      <div className="mt-4 flex gap-2">
        <AuthSocialButton
          name="Continue with Google"
          icon={FcGoogle}
          onClick={() => socialAction("google")}
        />
      </div>
    </Form>
  );
};

export default LoginForm;
