"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  phone: z.string().regex(/^[0-9]{10}$/, {
    message: "Phone number must be 10 digits.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
});

export type FormValues = z.infer<typeof formSchema>;

interface ContactFormProps {
  openContactForm: boolean;
  setOpenContactForm: (open: boolean) => void;
  onSubmit: (values: FormValues) => void;
  initialValues: FormValues;
}

const ContactForm = ({
  openContactForm,
  setOpenContactForm,
  onSubmit,
  initialValues,
}: ContactFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  function handleSubmit(values: FormValues) {
    onSubmit(values);
    setOpenContactForm(false);
  }

  return (
    <Dialog open={openContactForm} onOpenChange={setOpenContactForm}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-3xl gradient-text">
            Contact Info
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg text-black">Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Rohan Shrestha"
                      className="text-black p-2"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg text-black">Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="9811111111" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg text-black">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="bishalshrestha@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg text-black">Service Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Chabahil, Kathmandu" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-3 items-center justify-end mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpenContactForm(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="brand">
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactForm;
