import { ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { useState } from "react";

import appendActionColumn from "@/app/utils/appendActionColumn";

import DeleteAlert from "../common/DeleteAlert";
import { Button } from "../ui/button";
import { DataTable } from "./DataTable";

type TableLayoutProps<T> = {
  heading: string;
  addText: string;
  data: T[] | undefined;
  isLoading: boolean;
  columns: ColumnDef<T>[];
  children?: React.ReactNode;
  onDelete?: (row: T) => void;
};

const TableLayout = <T extends { id: string }>({
  heading,
  addText,
  data,
  isLoading,
  columns,
  children,
  onDelete,
}: TableLayoutProps<T>) => {
  const [state, setState] = useState<T | null>(null);
  const [openDeleteAlert, setDeleteAlert] = useState(false);

  const handleDelete = (row: T) => {
    setState(row);
    setDeleteAlert(true);
  };

  const deleteConfirm = () => {
    if (state && onDelete) {
      onDelete(state);
    }
  };

  const newColumns = appendActionColumn(columns, () => {}, handleDelete);
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
        <DataTable
          columns={newColumns}
          data={data ?? []}
          isLoading={isLoading}
        />
      </div>

      {children}
      <DeleteAlert
        open={openDeleteAlert}
        onOpenChange={setDeleteAlert}
        onDelete={deleteConfirm}
        setState={setState}
      />
    </div>
  );
};

export default TableLayout;
