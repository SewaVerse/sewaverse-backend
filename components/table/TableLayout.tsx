import { ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";

import { Button } from "../ui/button";
import { DataTable } from "./DataTable";

type TableLayoutProps<T> = {
  heading: string;
  addText: string;
  data: T[] | undefined;
  isLoading: boolean;
  columns: ColumnDef<T>[];
  children?: React.ReactNode;
};

const TableLayout = <T,>({
  heading,
  addText,
  data,
  isLoading,
  columns,
  children,
}: TableLayoutProps<T>) => {
  return (
    <div className="container mx-auto p-3">
      <h1 className="text-2xl font-bold mb-2">{heading}</h1>

      <div className="flex justify-end gap-2">
        <Button disabled={isLoading}>
          {" "}
          <Plus />
          {addText}
        </Button>
      </div>

      <div className="mt-3">
        <DataTable columns={columns} data={data ?? []} isLoading={isLoading} />
      </div>

      {children}
    </div>
  );
};

export default TableLayout;
