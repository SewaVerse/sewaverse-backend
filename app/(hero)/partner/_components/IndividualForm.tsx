"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  registeredNo: z.string().min(10, {
    message: "Registered number must be at least 10 digits.",
  }),
  contactNo: z.string().min(10, {
    message: "Contact number must be at least 10 digits.",
  }),
  registeredEmail: z.string().email({
    message: "Please enter a valid email address.",
  }),
  contactEmail: z.string().email({
    message: "Please enter a valid email address.",
  }),
  details: z.string().min(10, {
    message: "Please provide more details about the partnership.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function IndividualForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      registeredNo: "",
      contactNo: "",
      registeredEmail: "",
      contactEmail: "",
      details: "",
    },
  });

  function onSubmit(data: FormValues) {
    console.warn(data);
  }

  return (
    <div className="w-full  mx-auto  p-3 ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">Name</FormLabel>
                <FormControl>
                  <Input placeholder="Bishal Magar" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="registeredNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Registered No.</FormLabel>
                  <FormControl>
                    <Input placeholder="9812234545" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Contact No.</FormLabel>
                  <FormControl>
                    <Input placeholder="9812234545" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="registeredEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Registered Email</FormLabel>
                  <FormControl>
                    <Input placeholder="bishalmg2@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Contact Email</FormLabel>
                  <FormControl>
                    <Input placeholder="bishalmg2@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">Details</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Please describe how can we partner and grow together."
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button variant={"brand"} size={"md"} className="w-full">
            Be a Partner
          </Button>
        </form>
      </Form>
    </div>
  );
}
