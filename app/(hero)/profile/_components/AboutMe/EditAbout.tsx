"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  description: z.string().min(50, {
    message: "Description must be at least 50 characters long.",
  }),
});

interface EditAboutProps {
  openAbout: boolean;
  setOpenAbout: (open: boolean) => void;
  initialDescription?: string;
}

export default function EditAbout({
  openAbout,
  setOpenAbout,
  initialDescription = "",
}: EditAboutProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description:
        initialDescription ||
        `A seasoned professional barber with over a decade of dedicated experience in the grooming and hairstyling industry. His expertise lies in delivering both modern and classic haircuts, intricate beard styling, and tailored grooming services that cater to the unique preferences of each client. Bishal's unwavering passion for his craft drives him to help his clients not only look their best but also feel confident and revitalized. He continuously hones his skills by keeping abreast of the latest industry trends and techniques, ensuring every service is executed with precision and excellence.`,
    },
  });

  return (
    <Dialog open={openAbout} onOpenChange={setOpenAbout}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="w-full border-b pb-3">
            <DialogTitle className="text-xl font-semibold">About me</DialogTitle>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Write your professional description here..."
                      className="min-h-[200px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpenAbout(false)}
              >
                Cancel
              </Button>
              <Button variant={"brand"}>Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
