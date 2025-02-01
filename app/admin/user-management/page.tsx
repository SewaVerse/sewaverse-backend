import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";



const users = [
  {
    id: 1,
    name: "Hari",
    contact: 9810068266,
    email: "hari@gmail.com",
    status: "Active",
  },
  {
    id: 2,
    name: "Sita",
    contact: 9801234567,
    email: "sita@gmail.com",
    status: "Inactive",
  },
  {
    id: 3,
    name: "Ram",
    contact: 9847654321,
    email: "ram@gmail.com",
    status: "Active",
  },
  {
    id: 4,
    name: "Gita",
    contact: 9812345678,
    email: "gita@gmail.com",
    status: "Inactive",
  },
  {
    id: 5,
    name: "Shyam",
    contact: 9823456789,
    email: "shyam@gmail.com",
    status: "Active",
  },
  {
    id: 6,
    name: "Krishna",
    contact: 9802345678,
    email: "krishna@gmail.com",
    status: "Inactive",
  },
  {
    id: 7,
    name: "Pooja",
    contact: 9811122233,
    email: "pooja@gmail.com",
    status: "Active",
  },
  {
    id: 8,
    name: "Mohan",
    contact: 9845566778,
    email: "mohan@gmail.com",
    status: "Inactive",
  },
];

export default function TableDemo() {
  return (
    <div className=" px-2 py-10">
      <Table className="border ">
        <TableHeader>
          <TableRow>
            <TableHead className="">Name</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>more</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user,index) => (
            <TableRow key={index}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.contact}</TableCell>
              <TableCell> {user.email}</TableCell>
              <TableCell>{user.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
