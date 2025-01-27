"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { HeartIcon, Share2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { CiLocationOn } from "react-icons/ci";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
    <Card className="w-full max-w-md mx-auto lg:max-w-xl shadow-lg">
      <CardHeader>
        <h1 className="text-center text-2xl font-bold">Book an appointment</h1>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Price & Location Section */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-base">
                  Price: <span className="font-bold">Rs. 200 / sq</span>{" "}
                  <span className="text-muted-foreground text-sm">-30%</span>
                </p>
              </div>
              <div className="text-center sm:text-right">
                <p className="flex items-center gap-2 justify-center sm:justify-end">
                  <CiLocationOn className="h-5 w-5" />
                  <span className="text-sm sm:text-base">
                    Service Available
                  </span>
                </p>
                <p className="text-muted-foreground text-sm">
                  in your location
                </p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="service"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Mechanic Services"
                        className="w-full"
                        {...field}
                      />
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
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Balaju, Kathmandu"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input type="date" className="w-full" {...field} />
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
                      <FormLabel>Time</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            {timeSlots.map((slot) => (
                              <SelectItem
                                key={slot.value}
                                value={slot.value}
                                className="text-sm"
                              >
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

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
              <div className="flex gap-4 justify-center sm:justify-start">
                <Button
                  variant="outline"
                  type="button"
                  className="gap-2"
                  onClick={() => console.warn("Added to wishlist")}
                >
                  <HeartIcon className="h-4 w-4" />
                  <span className="sr-only sm:not-sr-only">Wishlist</span>
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  className="gap-2"
                  onClick={() => console.warn("Shared")}
                >
                  <Share2Icon className="h-4 w-4" />
                  <span className="sr-only sm:not-sr-only">Share</span>
                </Button>
              </div>
              <Button
                variant="brand"
                type="submit"
                className="w-full sm:w-auto"
              >
                Book Now
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
