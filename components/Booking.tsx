"use client";

import { Button } from "@/components/ui/button";
import { DatePickerWithPresets } from "@/components/ui/date-picker";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Heart } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaHeart } from "react-icons/fa";
import { z } from "zod";

const formSchema = z.object({
  location: z.string(),
});

export default function BookingComponent() {
  const [formData, setFormData] = useState({
    serviceName: "Laptop Repair",
    location: "Gongabu",
    price: "RS.1000/sq",
    date: undefined as Date | undefined,
    time: "",
  });

  const handleDateTimeChange = (date: Date, timeSlot: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      date,
      time: timeSlot,
    }));
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const completeFormData = {
      ...values,
      serviceName: formData.serviceName,
      price: formData.price,
      date: formData.date,
      time: formData.time,
    };

    console.log("Form submitted:", completeFormData);
  };

  return (
    <div className="flex justify-center p-4 sm:p-6">
      <div className="w-full max-w-lg p-4 sm:p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-lg sm:text-xl font-bold mb-4 text-center">
          Book an appointment
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="price"
                    className="flex justify-center items-center"
                  >
                    Price
                    <FormControl className="flex items-center border-none p-2">
                      <Input
                        id="price"
                        className="rounded-lg p-2 w-full"
                        {...field}
                        value={formData.price}
                        readOnly
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            serviceName: e.target.value,
                          })
                        }
                      />
                    </FormControl>
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="serviceName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service</FormLabel>
                  <FormControl>
                    <Input
                      id="serviceName"
                      className="rounded-lg p-2 w-full"
                      {...field}
                      value={formData.serviceName}
                      readOnly
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          serviceName: e.target.value,
                        })
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="location">Select Location</FormLabel>
                  <FormControl>
                    <Input
                      id="location"
                      readOnly
                      className="rounded-lg p-2 w-full"
                      {...field}
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* DatePickerWithPresets Component */}
            <div className="my-4 flex flex-col">
              <FormLabel className="my-4">Select Date</FormLabel>

              <DatePickerWithPresets
                selectedDate={formData.date}
                selectedTime={formData.time}
                onDateTimeChange={handleDateTimeChange}
              />

              <FormLabel className="my-4">
                Selected Time
                <FormControl>
                  <Input
                    className="mt-4 w-full"
                    value={formData.time}
                    readOnly
                  />
                </FormControl>
              </FormLabel>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <Button type="submit" className="w-full rounded-lg">
                Book Now
              </Button>
              <Button className="w-full border-2 rounded-lg gap-1 items-center border-primary bg-white text-primary hover:bg-white">
                Add to Wishlist
                <Heart />
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
