import clsx from "clsx";
import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input as ShadInput } from "../ui/input";

type PasswordInputProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  name?: string;
  className?: string;
  description?: string;
};

const PasswordInput: React.FC<PasswordInputProps> = ({
  form,
  name = "password",
  label,
  placeholder = "Password",
  disabled,
  className,
  description,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <div className="relative">
              <ShadInput
                placeholder={placeholder}
                type={showPassword ? "text" : "password"}
                disabled={disabled || form.formState.isSubmitting}
                {...field}
                className={clsx(className, "w-full")}
              />
              {field.value.length > 0 && (
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
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PasswordInput;
