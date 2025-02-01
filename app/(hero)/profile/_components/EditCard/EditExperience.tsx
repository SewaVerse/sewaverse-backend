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
  newExperience: z.string().min(2, {
    message: "Experience name must be at least 2 characters.",
  }),
});

export default function EditExperience() {
  const [experience, setExperience] = useState<string[]>(["3 Years"]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newExperience: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setExperience([...experience, values.newExperience]);
    form.reset();
  }

  const handleDelete = (index: number) => {
    setExperience(experience.filter((_, i) => i !== index));
  };

  return (
    <div className="my-10">
      <div className="sm:max-w-[500px] py-5 border">
        <h1 className="text-xl font-normal text-center">Experience</h1>

        <div className="py-4 space-y-3">
          {/* Existing Professions */}
          {experience.map((experience, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-2 py-2 border rounded-md"
            >
              <span className="text-base font-medium gradient-text">
                {experience}
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

          {/* Add New Profession */}
          <div className="p-3 space-y-2 border rounded-md">
            <h3 className="text-base font-medium gradient-text">
              Add Experience
            </h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="newExperience"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="New Experience"
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
