import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import Input from "./Input";

type PasswordInputProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  disabled?: boolean;
  placeholder?: string;
  name?: string;
};

const PasswordInput: React.FC<PasswordInputProps> = ({
  form,
  name,
  placeholder,
  disabled,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative">
      <Input
        form={form}
        name={name ?? "password"}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder ?? "Password"}
        disabled={form.formState.isSubmitting || disabled}
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
  );
};

export default PasswordInput;
