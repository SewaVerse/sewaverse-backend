import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface RewardTransaction {
  date: string;
  description: string;
  pointsEarned?: string | number;
  pointsRedeemed?: string | number;
  balance: number;
}

const rewardsData: RewardTransaction[] = [
  {
    date: "2024-01-05",
    description: "Booking: House Painting",
    pointsEarned: "+500",
    balance: 500,
  },
  {
    date: "2024-01-05",
    description: "Redeemed for 15% Discount",
    pointsRedeemed: "-100",
    balance: 400,
  },
  {
    date: "2024-01-05",
    description: "Referral Bonus",
    pointsEarned: "+100",
    balance: 500,
  },
  {
    date: "2024-01-05",
    description: "Pending from Beauty Service",
    pointsEarned: "Pending",
    balance: 500,
  },
];

export default function RewardsHistory() {
  return (
    <div className="w-full h-auto border mt-4 mb-4 shadow-md">
         <hr className="border-[2px] border-blue-600"/>
      <h1 className="text-2xl font-bold text-center p-3">Rewards History</h1>
      <div className="border rounded-lg overflow-hidden mx-4 mt-6 mb-6">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="border w-[120px]">Date</TableHead>
              <TableHead className="border">Description</TableHead>
              <TableHead className="border text-right">Points Earned</TableHead>
              <TableHead className="border text-right">
                Points Redeemed
              </TableHead>
              <TableHead className="border text-right">Balance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rewardsData.map((transaction, index) => (
              <TableRow
                key={`${transaction.date}-${index}`}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <TableCell className="border font-medium">
                  {new Date(transaction.date).toLocaleDateString()}
                </TableCell>
                <TableCell className="border">
                  {transaction.description}
                </TableCell>
                <TableCell className="border text-right">
                  {transaction.pointsEarned && (
                    <span
                      className={
                        transaction.pointsEarned === "Pending"
                          ? "text-black"
                          : "text-balance"
                      }
                    >
                      {transaction.pointsEarned}
                    </span>
                  )}
                </TableCell>
                <TableCell className="border text-right">
                  {transaction.pointsRedeemed && (
                    <span className="text-black">
                      {transaction.pointsRedeemed}
                    </span>
                  )}
                </TableCell>
                <TableCell className="border text-right font-medium">
                  {transaction.balance}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
