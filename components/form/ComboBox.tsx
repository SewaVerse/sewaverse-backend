import clsx from "clsx";
import { Check, ChevronsUpDown } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

type ComboBoxProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  name: string;
  placeholder: string;
  label?: string;
  description?: string;
  options: {
    label: string;
    value: string;
  }[];
  notFoundMessage?: string;
  className?: string;
  disabled?: boolean;
};

const ComboBox: React.FC<ComboBoxProps> = ({
  form,
  name,
  placeholder,
  label,
  description,
  options,
  notFoundMessage,
  className,
  disabled,
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          {label && <FormLabel>{label}</FormLabel>}
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  disabled={disabled || form.formState.isSubmitting}
                  className={cn(
                    "w-full justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? options.find((curEle) => curEle.value === field.value)
                        ?.label
                    : placeholder}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className={clsx("p-0", className)}>
              <Command>
                <CommandInput placeholder={placeholder} />
                <CommandList>
                  <CommandEmpty>{notFoundMessage}</CommandEmpty>
                  <CommandGroup>
                    {options.map((curEle) => (
                      <CommandItem
                        value={curEle.label}
                        key={curEle.value}
                        onSelect={() => {
                          form.setValue(name, curEle.value);
                        }}
                      >
                        {curEle.label}
                        <Check
                          className={cn(
                            "ml-auto",
                            curEle.value === field.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ComboBox;
