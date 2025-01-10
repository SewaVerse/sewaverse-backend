import { Column, ColumnDef } from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowUp,
  ChevronsUpDown,
  Pencil,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export type SortColumnDef<T> = ColumnDef<T> & {
  sortable?: boolean;
};

const appendActionColumn = <T,>(
  columns: SortColumnDef<T>[],
  handleEdit: (data: T) => void,
  handleDelete: (data: T) => void
): ColumnDef<T>[] => {
  //add sorting to specified columns
  const sortingColumns = columns.map((curColumn) => {
    const { sortable, ...rest } = curColumn;
    const isSortable = sortable ?? true;

    if (!isSortable) {
      return rest;
    }
    return {
      ...rest,
      header: ({ column }: { column: Column<T, unknown> }) => {
        const { getIsSorted } = column;
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(getIsSorted() === "asc")}
          >
            {curColumn.header as string}
            {column.getIsSorted() === "desc" ? (
              <ArrowDown />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUp />
            ) : (
              <ChevronsUpDown />
            )}
          </Button>
        );
      },
    };
  }) as ColumnDef<T>[]; // Ensure proper typing

  return [
    ...sortingColumns,
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const currentRow = row.original as T; // Ensure proper typing
        return (
          <div className="flex gap-2">
            {" "}
            {/* JSX div element */}
            <Button
              size="icon"
              variant="ghost"
              title="Edit"
              onClick={() => handleEdit(currentRow)}
            >
              <Pencil className="text-green-500" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              title="Delete"
              onClick={() => handleDelete(currentRow)}
            >
              <Trash2 className="text-red-500" />
            </Button>
          </div>
        );
      },
    },
  ];
};

export default appendActionColumn;
