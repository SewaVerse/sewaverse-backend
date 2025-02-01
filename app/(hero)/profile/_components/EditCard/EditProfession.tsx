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
  newProfession: z.string().min(2, {
    message: "Profession name must be at least 2 characters.",
  }),
});

export default function EditProfession() {
  const [professions, setProfessions] = useState<string[]>(["Barber"]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newProfession: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setProfessions([...professions, values.newProfession]);
    form.reset();
  }

  const handleDelete = (index: number) => {
    setProfessions(professions.filter((_, i) => i !== index));
  };

  return (
    <div className="my-10">
      <div className="sm:max-w-[500px] md:py-2 border px-2 rounded-md">
        <h1 className="text-xl font-normal text-center">Profession </h1>

        <div className="py-4 space-y-3">
          {/* Existing Professions */}
          {professions.map((profession, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-2 py-2 border rounded-md"
            >
              <span className="text-base font-medium gradient-text">
                {profession}
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
          <div className="p-4 space-y-2 border rounded-md">
            <h3 className="text-base font-medium gradient-text">
              Add Profession
            </h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="newProfession"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Name of Profession"
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
