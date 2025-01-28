import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

interface PricingDetail {
  label: string;
  sublabel?: string;
  amount: string;
  isNegative?: boolean;
  isTotal?: boolean;
}

const pricingDetails: PricingDetail[] = [
  {
    label: "Total Bookings",
    sublabel: "(1 Sewa)",
    amount: "Rs. 2,500",
  },
  {
    label: "Discount",
    sublabel: "(3344445)",
    amount: "Rs. 300",
    isNegative: true,
  },
  {
    label: "Total Amount",
    amount: "Rs. 2,500",
    isTotal: true,
  },
];

export default function PaymentSummary() {
  return (
    <div className="w-full h-auto  border p-6  mt-2 mb-3 shadow-md">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-semibold gradient-text">
          Payment Summary
        </h1>
        <div className=" md:w-[800px] border rounded-sm mt-2">
          <Table>
            <TableBody>
              {pricingDetails.map((detail, index) => (
                <TableRow
                  key={detail.label}
                  className={`
                  border-b
                  ${index === pricingDetails.length - 1 ? "border-b-0" : ""}
                `}
                >
                  <TableCell className="font-medium p-4">
                    {detail.label}
                    {detail.sublabel && (
                      <span className="text-muted-foreground ml-2 font-normal">
                        {detail.sublabel}
                      </span>
                    )}
                  </TableCell>
                  <TableCell
                    className={`text-right md:px-32 px-20 ${
                      detail.isTotal
                        ? "gradient-text font-semibold"
                        : detail.isNegative
                        ? "text-muted-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {detail.isNegative ? "-" : ""}
                    {detail.amount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
