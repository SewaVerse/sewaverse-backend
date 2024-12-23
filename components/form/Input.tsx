import clsx from "clsx";
import { UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input as ShadInput } from "../ui/input";

type InputProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  name: string;
  placeholder: string;
  label?: string;
  description?: string;
  type: "text" | "email" | "password";
  className?: string;
  disabled?: boolean;
};

const Input: React.FC<InputProps> = ({
  form,
  name,
  label,
  placeholder,
  type,
  description,
  className,
  disabled,
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <ShadInput
              placeholder={placeholder}
              type={type}
              disabled={disabled || form.formState.isSubmitting}
              {...field}
              className={clsx(className, "w-full")}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default Input;
