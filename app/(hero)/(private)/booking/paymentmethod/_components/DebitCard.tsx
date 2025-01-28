"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface DebitCardProps {
  visaImage: {
    visa: string;
    master: string;
  };
}

const formSchema = z.object({
  cardNumber: z.string().regex(/^\d{16}$/, {
    message: "Card number must be 16 digits",
  }),
  nameOnCard: z.string().min(2, {
    message: "Name must be at least 2 characters",
  }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, {
    message: "Expiry date must be in MM/YY format",
  }),
  cvv: z.string().regex(/^\d{3,4}$/, {
    message: "CVV must be 3 or 4 digits",
  }),
  saveCard: z.boolean().default(false),
});

const DebitCard = ({ visaImage }: DebitCardProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardNumber: "",
      nameOnCard: "",
      expiryDate: "",
      cvv: "",
      saveCard: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.warn(values);
  }

  return (
    <div>
      <div className="md:w-[655px] h-auto border -mt-20 mb-10 shadow-md rounded-sm bg-white">
        <div className="flex items-center justify-center gap-1">
          <Image src={visaImage.visa} alt="visa" height={70} width={70} />
          <Image src={visaImage.master} alt="master" height={40} width={40} />
        </div>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="p-4 space-y-4"
            >
              <FormField
                control={form.control}
                name="cardNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">
                      <span className="text-red-600">*</span> Card number
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Card number"
                        className="p-3 w-full md:p-5 md:w-[625px] border rounded"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nameOnCard"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-800">
                      <span className="text-red-600">*</span> Name on card
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Name on card"
                        className="p-3 w-full md:w-[625px] border rounded"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-wrap gap-4">
                <FormField
                  control={form.control}
                  name="expiryDate"
                  render={({ field }) => (
                    <FormItem className="flex-1 min-w-[200px]">
                      <FormLabel className="text-black">
                        <span className="text-red-600">*</span> Expiry Date
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="MM/YY"
                          className="p-3 w-full md:p-5 border rounded"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cvv"
                  render={({ field }) => (
                    <FormItem className="flex-1 min-w-[200px]">
                      <FormLabel className="text-black">
                        <span className="text-red-600">*</span> CVV
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="CVV"
                          className="p-3 w-full md:p-5 border rounded"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="saveCard"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Save Card</FormLabel>
                      <FormDescription>
                        {
                          "We will save this card for your convenience. If required, you can remove the card in the 'Payment Options' section in the 'Account' menu."
                        }
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <div className="md:flex md:justify-center mt-5">
                <Button
                  variant="brand"
                  className="w-full md:w-[192px] text-base"
                  type="submit"
                >
                  Pay Now
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default DebitCard;
