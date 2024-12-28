"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";

import { userLoginSchema } from "@/app/schemas/authSchema";
import Button from "@/components/form/Button";
import Input from "@/components/form/Input";
import PasswordInput from "@/components/form/PasswordInput";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";

import AuthSocialButton from "./AuthSocialButton";

type LoginForm = z.infer<typeof userLoginSchema>;
type SocialActions = "google" | "twitter" | "github";

const LoginForm = () => {
  const session = useSession();
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
        return;
      }

      toast.success("Logged in successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  const socialAction = async (action: SocialActions) => {
    try {
      await signIn(action, {
        redirect: false,
      });
      toast.success("Logged in successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (session?.status === "authenticated") {
      const user = session?.data?.user;
      if (
        user &&
        user.roles.includes("SERVICE_PROVIDER") &&
        !user.serviceProviderVerification?.isVerified
      ) {
        router.push("/sewa-provider/welcome");
        return;
      }
      return router.push("/");
    }
  }, [session, router]);

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex-1 rounded-lg  pt-8">
            <div className="flex flex-col justify-center items-center">
              <Image
                className="w-auto h-auto"
                src="/images/logo.svg"
                alt="logo"
                width={50}
                height={50}
              />
              <h1 className=" text-2xl mt-2">Welcome back!</h1>
              <p className="text-gray-500 text-center ">
                Get instant access to the services you need.
              </p>
            </div>

            <div className="w-full my-4 space-y-5">
              {/* Email */}
              <Input
                type="email"
                placeholder="Email address or phone number"
                form={form}
                name="email"
                disabled={form.formState.isSubmitting}
              />
              {/* Password */}
              <PasswordInput form={form} />

              <div className="my-2 flex justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" disabled={form.formState.isSubmitting} />
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
              <Button
                type="submit"
                isLoading={form.formState.isSubmitting}
                className="mt-2 w-full"
              >
                Log in
              </Button>
            </div>
          </div>
        </form>
        <div className="flex items-center gap-4">
          <Separator className="flex-1" />
          <span className="text-muted-foreground">Or</span>
          <Separator className="flex-1" />
        </div>

        <div className="mt-4 flex gap-2">
          <AuthSocialButton
            name="Continue with Google"
            icon={FcGoogle}
            onClick={() => socialAction("google")}
          />
        </div>
      </Form>
      <div className="flex justify-center my-2">
        <p className="text-sm">
          {"Don't have an account?"}
          <Link
            href={{ pathname: "/account-type", query: { role: "user" } }}
            className="text-primary"
          >
            {" "}
            Register here
          </Link>
        </p>
      </div>
    </>
  );
};

export default LoginForm;
