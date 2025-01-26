import { zodResolver } from "@hookform/resolvers/zod";
import { Service } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { ServiceSchema, serviceSchema } from "@/app/schemas/serviceSchema";
import { BaseResponse } from "@/app/utils/interfaces/ApiInterface";
import axiosClient from "@/axios";
import Button from "@/components/form/Button";
import ComboBox from "@/components/form/ComboBox";
import Input from "@/components/form/Input";
import Switch from "@/components/form/Switch";
import { useTableDialogContext } from "@/components/table/TableLayout";
import { DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";

const AddEditService = ({ services }: { services: Service[] }) => {
  const queryClient = useQueryClient();
  const { setOpen, state, setState } = useTableDialogContext<Service>();

  const form = useForm<ServiceSchema>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: "",
      description: "",
      parentServiceId: "",
      isActive: true,
    },
  });

  const close = () => {
    form.reset();
    setState(null);
    setOpen(false);
    form.clearErrors();
  };

  const { mutate, isPending } = useMutation<
    AxiosResponse,
    AxiosError<BaseResponse>,
    FormData
  >({
    mutationFn: (data: FormData) => axiosClient.post("/service/upsert", data),
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

  useEffect(() => {
    form.reset({
      name: state?.name ?? "",
      description: state?.description ?? "",
      parentServiceId: state?.parentServiceId ?? "",
      isActive: state?.isActive,
    });
  }, [form, state]);

  const filterServices = (services: Service[]) => {
    return services.map((service) => ({
      label: service.name,
      value: service.id,
    }));
  };

  const onSubmit = (data: ServiceSchema) => {
    const { name, description, parentServiceId, isActive } = data;

    const formData = new FormData();

    formData.append("name", name);
    if (state?.id) formData.append("id", state.id);
    if (description) formData.append("description", description);
    if (parentServiceId) formData.append("parentServiceId", parentServiceId);
    formData.append("isActive", isActive.toString());

    mutate(formData);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 pb-4">
          {/* Full Name */}
          <Input
            label="Service Name"
            form={form}
            name="name"
            type="text"
            placeholder="Service name"
            disabled={isPending}
          />
          <Input
            label="Service Description"
            form={form}
            name="description"
            type="text"
            placeholder="Service description"
            disabled={isPending}
          />
          <ComboBox
            label="Parent Service"
            placeholder="Select parent service"
            form={form}
            name="parentServiceId"
            className="w-full"
            options={filterServices(services ?? [])}
          />
          <Switch form={form} name="isActive" label="Active" />
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => close()}>
            Cancel
          </Button>
          <Button isLoading={isPending} type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default AddEditService;
