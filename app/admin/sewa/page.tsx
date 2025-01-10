"use client";

import { Service } from "@prisma/client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";

import appendActionColumn, {
  SortColumnDef,
} from "@/app/utils/appendActionColumn";
import axiosClient from "@/axios";
import { PaginationTable } from "@/components/table/DataTable";
import TableLayout from "@/components/table/TableLayout";
import { Button } from "@/components/ui/button";

type ServiceWithParentService = Service & {
  parentServiceName: string | null;
};

const columns: SortColumnDef<ServiceWithParentService>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "parentService.name",
    header: "Parent Service",
  },
  {
    accessorKey: "isActive",
    header: "Active",
    cell: ({ row }) =>
      row.original.isActive ? (
        <Button size={"sm"} className="bg-green-600">
          Active
        </Button>
      ) : (
        <Button size={"sm"} className="bg-red-600">
          Inactive
        </Button>
      ),
  },
];

const SewaPage = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["services", pagination],
    queryFn: () =>
      axiosClient
        .get("/admin/service", {
          params: {
            page: pagination.pageIndex + 1,
            limit: pagination.pageSize,
          },
        })
        .then((res) => res.data),
    placeholderData: keepPreviousData,
  });

  const modifyColumns = appendActionColumn(
    columns,
    () => {},
    () => {}
  );

  return (
    <PaginationTable
      pagination={pagination}
      setPagination={setPagination}
      totalPages={data?.pagination.totalCount ?? 0}
    >
      <TableLayout
        heading="Services"
        addText="Add Service"
        data={data?.services ?? []}
        isLoading={isLoading}
        columns={modifyColumns}
      ></TableLayout>
    </PaginationTable>
  );
};

export default SewaPage;
