"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import type React from "react";
import { useForm } from "react-hook-form";

import {
  parentChildServiceSchema,
  type ParentChildServiceSchema,
} from "@/app/schemas/serviceSchema";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { useCreateService } from "@/hooks/useServices";

interface AddCategoryProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddCategory: React.FC<AddCategoryProps> = ({ open, onOpenChange }) => {
  const createService = useCreateService();

  const form = useForm<ParentChildServiceSchema>({
    resolver: zodResolver(parentChildServiceSchema),
    defaultValues: {
      parentServiceName: "",
      childServiceName: "",
    },
  });

  const onSubmit = async (data: ParentChildServiceSchema) => {
    try {
      await createService.mutateAsync(data);
      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a New Category</DialogTitle>
          <DialogDescription>
            Enter the category and sub-category details below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="parentServiceName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter category name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="childServiceName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sub Category</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter sub-category name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              variant="brand"
              className="w-full"
              type="submit"
              disabled={createService.isPending || form.formState.isSubmitting}
            >
              {createService.isPending ? "Adding..." : "Add"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategory;
