"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { HeartIcon, Share2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { CiLocationOn } from "react-icons/ci";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const timeSlots = [
  { label: "Morning (6 AM - 12 PM)", value: "morning" },
  { label: "Afternoon (12 PM - 4 PM)", value: "afternoon" },
  { label: "Evening (4 PM - 8 PM)", value: "evening" },
  { label: "Night (8 PM - 11 PM)", value: "night" },
] as const;

const formSchema = z.object({
  service: z.string().min(2, {
    message: "Service must be at least 2 characters.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  date: z.string().min(1, {
    message: "Please select a date.",
  }),
  time: z.string({
    required_error: "Please select a time slot.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function BookingForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      service: "",
      location: "",
      date: "",
      time: "",
    },
  });

  function onSubmit(values: FormValues) {
    console.warn(values);
  }

  return (
    <div className="hidden lg:block lg:border w-[400px] h-auto mt-5 shadow-lg rounded-md p-4 mb-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <h1 className="text-center text-2xl font-bold mb-4">
            Book an appointment
          </h1>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-base">
                Price: <span className="font-bold">Rs. 200 / sq</span>{" "}
                <span className="text-muted-foreground text-sm">-30%</span>
              </p>
            </div>
            <div>
              <p className="flex items-center gap-2 text-lg">
                <CiLocationOn />
                Service Available
              </p>
              <p className="flex justify-end">in your location</p>
            </div>
          </div>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="service"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Service</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Mechanic Services"
                      className="shadow-md"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
            </div>

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Location</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Balaju, Kathmandu"
                      className="shadow-md"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">Date</FormLabel>
                    <FormControl>
                      <Input type="date" className="shadow-md" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">Time</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="shadow-md">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          {timeSlots.map((slot) => (
                            <SelectItem key={slot.value} value={slot.value}>
                              {slot.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              type="button"
              className="gradient-text"
              onClick={() => console.warn("Added to wishlist")}
            >
              <HeartIcon className="mr-2 h-4 w-4" />
              Add to wishlist
            </Button>
            <Button
              variant="outline"
              type="button"
              className="gradient-text"
              onClick={() => console.warn("Shared")}
            >
              <Share2Icon className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button variant="brand" type="submit">
              Book Now
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
