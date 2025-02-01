import { useQuery } from "@tanstack/react-query";

import BookingCard from "./BookingCard";

// Define types based on the API response
interface APIBookingService {
  id: string;
  name: string;
  description: null | string;
  parentServiceId: string;
  imageId: null | string;
  createdBy: string;
}

interface APIOfferedService {
  id: string;
  serviceProviderId: string;
  serviceId: string;
  title: string;
  description: string;
  price: number;
  priceType: string;
  discount: number;
  location: null | string;
  workExperience: null | string;
  overallRating: number;
  published: boolean;
  service: APIBookingService;
}

interface APIBooking {
  id: string;
  userId: string;
  offeredServiceId: string;
  status: string;
  bookingDate: string;
  bookingTime: string;
  location: string;
  createdAt: string;
  offeredService: APIOfferedService;
}

interface APIResponse {
  success: boolean;
  message: string;
  data: APIBooking[];
}

// Transform API data to match our BookingCard props
const transformBookingData = (booking: APIBooking) => {
  const bookingDate = new Date(booking.bookingDate);

  return {
    date: {
      day: bookingDate
        .toLocaleString("en-US", { weekday: "short" })
        .toUpperCase(),
      dayNum: bookingDate.getDate(),
      month: bookingDate.toLocaleString("en-US", { month: "short" }),
      year: bookingDate.getFullYear(),
    },
    // time: {
    //   start: "9AM", // Note: Add actual time when available in API
    //   end: "5PM", // Note: Add actual time when available in API
    // },
    time: booking.bookingTime,
    service: {
      title: booking.offeredService.title,
      bookingId: booking.id,
      provider: "Sewaverse Nepal", // Note: Add provider name when available in API
      location: booking.location,
    },
    status: booking.status,
    price: booking.offeredService.price,
  };
};

interface BookingListProps {
  filterStatus?: "PENDING" | "COMPLETED" | "ONGOING" | "CANCELED" | "TOPAY";
}

export default function BookingList({ filterStatus }: BookingListProps) {
  const { data, isLoading, error } = useQuery<APIResponse>({
    queryKey: ["bookings"],
    queryFn: async () => {
      const response = await fetch("/api/user/booking");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.warn("Booking API Response:", data);
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading bookings</div>;
  }

  if (!data?.data) {
    return <div>No bookings found</div>;
  }

  const filteredBookings = filterStatus
    ? data.data.filter((booking) => booking.status === filterStatus)
    : data.data;

  return (
    <div>
      {filteredBookings.map((booking) => {
        const transformedBooking = transformBookingData(booking);
        return (
          <BookingCard
            key={booking.id}
            date={transformedBooking.date}
            time={transformedBooking.time}
            service={transformedBooking.service}
            status={transformedBooking.status}
            price={transformedBooking.price}
          />
        );
      })}
    </div>
  );
}
