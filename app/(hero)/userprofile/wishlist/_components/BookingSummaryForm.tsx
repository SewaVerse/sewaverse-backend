"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CiLocationOn } from "react-icons/ci";
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
  promoCode: z.string().optional(),
});

const BookingSummaryForm = () => {
  const [totalAmount, setTotalAmount] = useState(10000);
  const [discountApplied, setDiscountApplied] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      promoCode: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.warn(values);

    if (values.promoCode && !discountApplied) {
      setTotalAmount((prevTotal) => Math.round(prevTotal * 0.9)); // 10% discount
      setDiscountApplied(true);
    }
  };

  return (
    <div className="md:w-[300px] md:h-[500px] w-full h-auto">
      <span className="flex gap-1">
        <CiLocationOn color="blue" className="mt-[5px]" size={14} />
        <h1 className="text-base">
          Balaju, Tarakeshwor-3, Kathmandu, Bagmati Province
        </h1>
      </span>
      <div className="border h-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <h1 className="text-xl text-center p-3">Booking Summary</h1>
            <hr className="mx-2" />
            <div className="flex items-center justify-between p-4">
              <p className="text-base text-muted-foreground">
                Total Bookings (1 Sewa)
              </p>
              <p className="text-base">Rs.10,000</p>
            </div>
            <div className="flex items-center justify-between gap-2 p-4">
              <FormField
                control={form.control}
                name="promoCode"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormControl>
                      <Input
                        className="outline-none"
                        placeholder="Enter Promocode"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button variant="brand" type="submit">
                Apply
              </Button>
            </div>
            <div className="flex items-center justify-between p-4">
              <p className="text-xl">Total Amount</p>
              <p className="text-xl font-semibold gradient-text">
                Rs.{totalAmount.toLocaleString()}
              </p>
            </div>
            <Button
              className="w-[280px] mx-2 mb-3"
              variant="brand"
              type="button"
            >
              PROCEED TO CHECKOUT(1)
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default BookingSummaryForm;
