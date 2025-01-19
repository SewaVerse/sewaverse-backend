"use client";

import { Service } from "@prisma/client";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { PaginationState } from "@tanstack/react-table";
import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

import { SortColumnDef } from "@/app/utils/appendActionColumn";
import { BaseResponse } from "@/app/utils/interfaces/ApiInterface";
import axiosClient from "@/axios";
import { PaginationTable } from "@/components/table/DataTable";
import TableLayout from "@/components/table/TableLayout";
import { Button } from "@/components/ui/button";

import AddEditService from "./AddEditService";

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
  const queryClient = useQueryClient();
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

  const { mutate } = useMutation<
    AxiosResponse,
    AxiosError<BaseResponse>,
    string
  >({
    mutationFn: (id: string) => axiosClient.delete(`/service/${id}`),
    onSuccess: (res) => {
      close();
      toast.success(res.data.message || "Operation completed successfully!");
    },
    onError: (res) => {
      toast.error(res.response?.data?.message || "Operation failed!");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["services"],
      });
    },
  });

  const onDelete = (row: Service) => {
    mutate(row.id);
  };

  return (
    <PaginationTable
      pagination={pagination}
      setPagination={setPagination}
      totalPages={data?.pagination.totalCount ?? 0}
    >
      <TableLayout
        heading="Services"
        addEditDialogText="Service"
        addText="Add Service"
        data={data?.services ?? []}
        isLoading={isLoading}
        columns={columns}
        onDelete={onDelete}
      >
        <AddEditService services={data?.services ?? []} />
      </TableLayout>
    </PaginationTable>
  );
};

export default SewaPage;
