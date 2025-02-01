import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { HeartIcon, Share2Icon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast"; // Import react-hot-toast
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
  { label: "6 AM - 8 AM", value: "6 AM - 8 AM" },
  { label: "8 AM - 10 AM", value: "8 AM - 10 AM" },
  { label: "10 AM - 12 PM", value: "10 AM - 12 PM" },
  { label: "12 PM - 2 PM", value: "12 PM - 2 PM" },
  { label: "2 PM - 4 PM", value: "2 PM - 4 PM" },
  { label: "4 PM - 6 PM", value: "4 PM - 6 PM" },
  { label: "6 PM - 8 PM", value: "6 PM - 8 PM" },
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
    required_error: "Please select a time.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface BookingFormProps {
  serviceTitle: string;
  offeredServiceId: string;
  location: string | undefined;
  price: number;
  priceType: string;
}

export default function BookingForm({
  serviceTitle,
  offeredServiceId,
  location,
  price,
  priceType,
}: BookingFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      service: serviceTitle,
      location: location ?? "Nepal",
      date: "",
      time: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);

    const bookingData = {
      offeredServiceId,
      location: values.location,
      bookingDate: values.date,
      bookingTime: values.time,
    };

    try {
      // Make the API call
      const response = await axios.post("/api/user/booking", bookingData);

      // console.warn(
      //   "bookingData",
      //   bookingData.offeredServiceId,
      //   bookingData.location,
      //   bookingData.bookingDate
      // );

      console.warn("response", response.data);

      toast.success("Booking successful!");

      form.reset({
        service: serviceTitle,
        location: location ?? "Nepal",
        date: "",
        time: "",
      });
    } catch (err) {
      // Display error toast
      toast.error("Failed to book the service. Please try again.");
      console.error("Booking failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="min-w-lg max-w-md lg:max-w-lg shadow-lg">
      <CardHeader>
        <h1 className="text-center text-xl font-bold">Book an appointment</h1>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Price & Location Section */}
            <div className="flex flex-col gap-4 ">
              <div>
                <p className="text-base font-normal font-work-sans">
                  Price: Rs. {price}/{priceType}
                </p>
              </div>
              <div className="">
                <div className="flex gap-2">
                  <CiLocationOn className="h-6 w-6" />
                  <span className="flex flex-col text-sm sm:text-base font-work-sans">
                    Available Location
                    <p className="text-muted-foreground text-sm">
                      {location ?? "Nepal"}
                    </p>
                  </span>
                </div>
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
                        placeholder={serviceTitle}
                        className="w-full font-semibold"
                        {...field}
                        disabled
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
                    <FormLabel>Your Location</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={location}
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="">
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
                  onClick={() => toast("Added to wishlist!")}
                >
                  <HeartIcon className="h-4 w-4" />
                  <span className="sr-only sm:not-sr-only">Wishlist</span>
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  className="gap-2"
                  onClick={() => toast("Shared!")}
                >
                  <Share2Icon className="h-4 w-4" />
                  <span className="sr-only sm:not-sr-only">Share</span>
                </Button>
              </div>
              <Button
                variant="brand"
                type="submit"
                className="w-full sm:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Booking..." : "Book Now"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
