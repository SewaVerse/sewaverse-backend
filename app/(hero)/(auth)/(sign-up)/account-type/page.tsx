"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import RegisterContext from "@/app/context/RegisterContext";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { useRouter } from "next/router";

type RegisterForm = {
  accountType: string;
};

export default function ServiceProvider() {
  const searchParams = useSearchParams();

  const registerContext = use(RegisterContext);

  if (!registerContext) {
    throw new Error("RegisterContext is not available");
  }

  const { setRegisterData } = registerContext;

  const radioOptions = [
    {
      name: "individual",
      label: "Individual",
      icon: "/images/individual.svg",
      description: "Show Your Skills, Earn with Sewaverse ",
      description2: "Find what you need for your life.",
    },
    {
      name: "company",
      label: "Company",
      icon: "/images/company.svg",
      description: "Expand Your Reach, Grow with Sewaverse.",
      description2: "Find what you need for your business.",
    },
  ];

  const router = useRouter();

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>();

  const onSubmit = (values: RegisterForm) => {
    setRegisterData((prev) => ({
      ...prev,
      role: searchParams.get("role")!,
      accountType: values.accountType,
    }));
    router.push("/register");
  };

  useEffect(() => {
    const allowedRoles = ["user", "serviceProvider"];
    const role = searchParams.get("role");
    setUserAccountType(role!);
    if (!role || !allowedRoles.includes(role)) {
      router.push("/");
    }
  }, [searchParams, router]);

  const [userAccountType, setUserAccountType] = useState<string>("");

  return (
    <div className="flex items-center justify-center flex-1 py-6 px-4 sm:px-6 lg:px-8 ">
      <div className="flex justify-center items-center w-full max-w-md ">
        <div className="text-center font-poppins">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Image src="/images/logo.svg" alt="logo" width={50} height={50} />
          </div>

          {/* Header */}
          <h2 className="text-3xl font-semibold mb-4 font-play-fair">
            Select an Account Type
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Account Selection */}
            <div className="w-full space-y-4 flex flex-col">
              <RadioGroup
                value={watch("accountType")} // Bind the value to the form's state
                onValueChange={(value) => {
                  setValue("accountType", value); // Update the form state
                }}
                className="flex flex-col gap-4"
              >
                {radioOptions.map((option) => (
                  <div
                    key={option.name}
                    className={`p-[.15rem] rounded shadow ${
                      watch("accountType") === option.name
                        ? "bg-brand-gradient"
                        : "bg-gray-500"
                    }`}
                  >
                    <div className="flex items-center justify-between space-x-2 p-3 w-full rounded-[.2rem] bg-white">
                      <Label htmlFor={option.name} className="h-auto w-auto">
                        <div className="flex items-center gap-2 h-full md:min-w-[25rem]">
                          <Image
                            src={option.icon}
                            alt={option.name}
                            width={20}
                            height={20}
                            className="w-[5rem] h-[5rem]"
                          />
                          <div className="text-left h-full flex flex-col">
                            <h4 className="text-xl">{option.label}</h4>
                            {userAccountType === "user" ? (
                              <p className="max-w-[15rem] mt-auto text-sm">
                                {option.description2}
                              </p>
                            ) : (
                              <p className="max-w-[15rem] mt-auto text-sm">
                                {option.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </Label>
                      <RadioGroupItem value={option.name} id={option.name} />
                    </div>
                  </div>
                ))}
              </RadioGroup>
              {errors.accountType?.type === "required" && (
                <p className="text-red-500 text-sm mt-2">
                  Account type is required
                </p>
              )}

              {/* Next Button */}
              <div className="flex justify-end mt-4">
                <Button
                  variant={"outline"}
                  type="submit"
                  className="md:min-w-[10rem]"
                >
                  Next
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
