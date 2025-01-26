import { ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { createContext, use, useState } from "react";

import TableDialog from "@/app/admin/components/TableDialog";
import appendActionColumn from "@/app/utils/appendActionColumn";

import DeleteAlert from "../common/DeleteAlert";
import { Button } from "../ui/button";
import { DataTable } from "./DataTable";

type TableLayoutProps<T> = {
  heading: string;
  addEditDialogText: string;
  addText: string;
  data: T[] | undefined;
  isLoading: boolean;
  columns: ColumnDef<T>[];
  children?: React.ReactNode;
  onDelete?: (row: T) => void;
};

type TableDialogContextType<T> = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  state: T | null;
  setState: React.Dispatch<React.SetStateAction<T | null>>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TableDialogContext = createContext<TableDialogContextType<any> | null>(
  null
);

export const useTableDialogContext = <T,>() => {
  const context = use(TableDialogContext) as TableDialogContextType<T> | null;
  if (!context) {
    throw new Error(
      "useTableDialogContext must be used within a TableDialogProvider"
    );
  }
  return context;
};

const TableLayout = <T extends { id: string }>({
  heading,
  addText,
  addEditDialogText,
  data,
  isLoading,
  columns,
  children,
  onDelete,
}: TableLayoutProps<T>) => {
  const [title, setTitle] = useState(addEditDialogText);
  const [state, setState] = useState<T | null>(null);
  const [open, setOpen] = useState(false);
  const [openDeleteAlert, setDeleteAlert] = useState(false);

  const handleDelete = (row: T) => {
    setState(row);
    setDeleteAlert(true);
  };

  const handleAdd = () => {
    const format = `Add ${addEditDialogText}`;
    setTitle(format);
    setOpen(true);
  };

  const handleEdit = (row: T) => {
    const format = `Edit ${addEditDialogText}`;
    setTitle(format);
    setState(row);
    setOpen(true);
  };

  const deleteConfirm = () => {
    if (state && onDelete) {
      onDelete(state);
    }
  };

  const newColumns = appendActionColumn(columns, handleEdit, handleDelete);
  return (
    <div className="container mx-auto p-3">
      <h1 className="text-2xl font-bold mb-2">{heading}</h1>

      <div className="flex justify-end gap-2">
        <Button disabled={isLoading} variant="brand" onClick={handleAdd}>
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

      <TableDialog open={open} setOpen={setOpen} title={title}>
        <TableDialogContext value={{ open, setOpen, state, setState }}>
          {children}
        </TableDialogContext>
      </TableDialog>
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
