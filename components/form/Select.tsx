import clsx from "clsx";
import { UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select as ShadSelect,
} from "../ui/select";

export type Option = {
  value: string;
  label: string;
};

type SelectProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  name: string;
  label?: string;
  placeholder?: string;
  options: Option[];
  className?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
};

const Select: React.FC<SelectProps> = ({
  form,
  name,
  label,
  placeholder,
  options,
  className,
  disabled,
  onChange,
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <ShadSelect
            onValueChange={(value) => {
              field.onChange(value);
              if (onChange) {
                onChange(value);
              }
            }}
            defaultValue={field.value}
            value={field.value}
            disabled={disabled || form.formState.isSubmitting}
          >
            <FormControl>
              <SelectTrigger className={clsx(className, "w-full")}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </ShadSelect>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default Select;