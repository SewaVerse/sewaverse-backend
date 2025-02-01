"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  newLocation: z.string().min(2, {
    message: "location name must be at least 2 characters.",
  }),
});

export default function EditLocation() {
  const [locations, setLocations] = useState<string[]>([
    "Kathmandu",
    "Bhaktapur",
    "Lalitpur",
  ]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newLocation: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLocations([...locations, values.newLocation]);
    form.reset();
  }

  const handleDelete = (index: number) => {
    setLocations(locations.filter((_, i) => i !== index));
  };

  return (
    <div className="">
      <div className="sm:max-w-[500px] md:py-2 border px-2">
        <h1 className="text-2xl font-normal text-center">Location</h1>

        <div className="py-4 space-y-3">
          {/* Existing locations */}
          {locations.map((location, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-2 py-2 border rounded-md"
            >
              <span className="text-base font-medium gradient-text">
                {location}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(index)}
                className="text-gray-500 hover:text-gray-700"
              >
                <Trash2 className="w-5 h-5" />
              </Button>
            </div>
          ))}

          {/* Add New location */}
          <div className="p-4 space-y-2 border rounded-md ">
            <h3 className="text-base font-medium gradient-text">
              Add location
            </h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="newLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Name of location"
                          className="h-auto p-0 text-lg border-0 placeholder:text-gray-400 focus-visible:ring-0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>

          {/* Done Button */}
          <div className="flex justify-center py-2">
            <Button variant={"brand"} className="w-20">
              Done
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
