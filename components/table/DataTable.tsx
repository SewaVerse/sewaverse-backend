import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { createContext, use, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Skeleton } from "../ui/skeleton";
import { PaginationControl } from "./PaginationControl";

type PaginationTableContextValue = {
  pagination: PaginationState;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
  totalPages: number;
};

const PaginationTableContext = createContext<PaginationTableContextValue>(
  {} as PaginationTableContextValue
);

export type PaginationTableProps = PaginationTableContextValue & {
  children: React.ReactNode;
};

export const PaginationTable: React.FC<PaginationTableProps> = ({
  pagination,
  setPagination,
  totalPages,
  children,
}) => {
  return (
    <PaginationTableContext
      value={{
        pagination,
        setPagination,
        totalPages,
      }}
    >
      {children}
    </PaginationTableContext>
  );
};

const LoadingState = ({ columns }: { columns: number }) => {
  return (
    <>
      {[...Array(5)].map((_, index) => (
        <TableRow key={index}>
          {[...Array(columns)].map((_, index) => (
            <TableCell key={index} className="p-2">
              <Skeleton className="w-full h-[2rem] rounded-xl" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean; // Add a prop to indicate loading state
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading = false, // Default to false if not provided
}: DataTableProps<TData, TValue>) {
  const paginationContext = use(PaginationTableContext);

  if (!paginationContext) {
    throw new Error(
      "usePagination must be used within a PaginationTableProvider."
    );
  }

  const { pagination, setPagination, totalPages } = paginationContext;

  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    rowCount: totalPages || 1,
    state: {
      pagination,
      sorting,
    },
    manualPagination: true,
    onPaginationChange: setPagination,
  });

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? ( // Conditionally render loading state
              <LoadingState columns={columns.length} />
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="p-1">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="mt-2">
        <PaginationControl table={table} isLoading={isLoading} />
      </div>
    </div>
  );
}
