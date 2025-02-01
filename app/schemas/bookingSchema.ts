import { z } from "zod";

import { bookingStatus } from "../utils/enumMap"; // Assume this is an array of valid statuses

export const bookingSchema = z.object({
  offeredServiceId: z.string().nonempty("offeredServiceId is required"),
  location: z.string().nonempty("location is required"),
  bookingDate: z.date(),
  bookingTime: z.string().nonempty("bookingTime is required"),
  status: z
    .string()
    .refine(
      (value) =>
        bookingStatus.includes(value as (typeof bookingStatus)[number]),
      {
        message: "Invalid status",
      }
    )
    .optional()
    .default("pending"),
});

export type BookingSchema = z.infer<typeof bookingSchema>;
