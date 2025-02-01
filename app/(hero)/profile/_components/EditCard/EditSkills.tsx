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
  newSkills: z.string().min(2, {
    message: "skills name must be at least 2 characters.",
  }),
});

export default function EditSkills() {
  const [skills, setSkills] = useState<string[]>([
    "Hair coloring",
    "Hair Dressing",
    "Hair Cutting",
  ]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newSkills: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setSkills([...skills, values.newSkills]);
    form.reset();
  }

  const handleDelete = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  return (
    <div className="">
      <div className="sm:max-w-[500px] py-2 border rounded-md px-2">
        <h1 className="text-xl font-normal text-center">Skills</h1>

        <div className="py-4 space-y-3">
          {/* Existing Professions */}
          {skills.map((skills, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-2 py-2 border rounded-md"
            >
              <span className="text-sm font-medium gradient-text">
                {skills}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(index)}
                className="text-gray-500 "
              >
                <Trash2 className="w-5 h-5" />
              </Button>
            </div>
          ))}

          {/* Add New Profession */}
          <div className="p-4 space-y-2 border rounded-md">
            <h3 className="text-base font-medium gradient-text">Add skills</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="newSkills"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="New skills"
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
         <div className="flex justify-center ">
         <Button variant={"brand"} className="w-20">
            Done
          </Button>
         </div>
        </div>
      </div>
    </div>
  );
}
