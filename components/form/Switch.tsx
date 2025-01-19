import { UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import { Switch as ShadSwitch } from "../ui/switch";

type SwitchProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  name: string;
  label: string;
  description?: string;
  disabled?: boolean;
};

const Switch: React.FC<SwitchProps> = ({
  form,
  name,
  label,
  description,
  disabled,
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <FormLabel className="text-base">{label}</FormLabel>
            {description && <FormDescription>{description}</FormDescription>}
          </div>
          <FormControl>
            <ShadSwitch
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={disabled || form.formState.isSubmitting}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default Switch;
