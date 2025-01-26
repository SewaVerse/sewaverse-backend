import BookingCard from "./BookingCard";

const bookings = [
  {
    date: {
      day: "MON",
      dayNum: 28,
      month: "Jan",
      year: 2025,
    },
    time: {
      start: "3PM",
      end: "10PM",
    },
    service: {
      title: "Exterior House Painting",
      bookingId: "2323131323",
      provider: "Sewaverse Nepal",
      location: "Chabahil, Kathmandu",
    },
    status: "Completed",
    price: 20000,
  },
  {
    date: {
      day: "MON",
      dayNum: 28,
      month: "Jan",
      year: 2025,
    },
    time: {
      start: "3PM",
      end: "10PM",
    },
    service: {
      title: "Exterior House Painting",
      bookingId: "2323131323",
      provider: "Sewaverse Nepal",
      location: "Chabahil, Kathmandu",
    },
    status: "Completed",
    price: 20000,
  },
  {
    date: {
      day: "MON",
      dayNum: 28,
      month: "Jan",
      year: 2025,
    },
    time: {
      start: "3PM",
      end: "10PM",
    },
    service: {
      title: "Exterior House Painting",
      bookingId: "2323131323",
      provider: "Sewaverse Nepal",
      location: "Chabahil, Kathmandu",
    },
    status: "Completed",
    price: 20000,
  },
  {
    date: {
      day: "TUE",
      dayNum: 5,
      month: "Feb",
      year: 2025,
    },
    time: {
      start: "10AM",
      end: "2PM",
    },
    service: {
      title: "Plumbing Service",
      bookingId: "2323131324",
      provider: "Sewaverse Nepal",
      location: "Baneshwor, Kathmandu",
    },
    status: "Ongoing",
    price: 5000,
  },
  {
    date: {
      day: "FRI",
      dayNum: 15,
      month: "Feb",
      year: 2025,
    },
    time: {
      start: "9AM",
      end: "1PM",
    },
    service: {
      title: "Electrical Repair",
      bookingId: "2323131325",
      provider: "Sewaverse Nepal",
      location: "Thamel, Kathmandu",
    },
    status: "Cancelled",
    price: 3500,
  },
  {
    date: {
      day: "FRI",
      dayNum: 15,
      month: "Feb",
      year: 2025,
    },
    time: {
      start: "9AM",
      end: "1PM",
    },
    service: {
      title: "Electrical Repair",
      bookingId: "2323131325",
      provider: "Sewaverse Nepal",
      location: "Thamel, Kathmandu",
    },
    status: "Cancelled",
    price: 3500,
  },
  {
    date: {
      day: "FRI",
      dayNum: 15,
      month: "Feb",
      year: 2025,
    },
    time: {
      start: "9AM",
      end: "1PM",
    },
    service: {
      title: "Electrical Repair",
      bookingId: "2323131325",
      provider: "Sewaverse Nepal",
      location: "Thamel, Kathmandu",
    },
    status: "Cancelled",
    price: 3500,
  },
];

interface BookingListProps {
  filterStatus?: "Completed" | "Ongoing" | "Cancelled";
}

export default function BookingList({ filterStatus }: BookingListProps) {
  const filteredBookings = filterStatus
    ? bookings.filter((booking) => booking.status === filterStatus)
    : bookings;

  return (
    <div>
      {filteredBookings.map((booking, index) => (
        <BookingCard key={index} {...booking} />
      ))}
    </div>
  );
}
