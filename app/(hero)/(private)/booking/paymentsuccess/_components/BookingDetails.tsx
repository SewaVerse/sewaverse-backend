import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

interface BookingDetail {
  label: string;
  value: string;
}

const bookingDetails: BookingDetail[] = [
  {
    label: "Sewa Name",
    value: "Exterior House Painting",
  },
  {
    label: "Sewa Provider",
    value: "Bishal Shrestha",
  },
  {
    label: "Date",
    value: "2025-01-05",
  },
  {
    label: "Time",
    value: "03:00-05:00 pm",
  },
  {
    label: "Location",
    value: "Balaju, Tarakeshwor-3, Kathmandu, Bagmati Province",
  },
];

export default function BookingDetails() {
  return (
    <div className="w-full md:h-auto h-full  border p-6  mt-2 mb-3 shadow-md">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-semibold gradient-text">Booking Summary</h1>
      <div className="border md:w-[800px] mt-2 rounded-sm">
        <Table className="">
          <TableBody>
            {bookingDetails.map((detail, index) => (
              <TableRow
                key={detail.label}
                className={`
                    border-b
                    
                    ${index === bookingDetails.length - 1 ? "border-b-0" : ""}
                  `}
              >
                <TableCell className="font-medium border-r p-4">
                  {detail.label}
                </TableCell>
                <TableCell className="p-4">{detail.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      </div>
    </div>
  );
}
