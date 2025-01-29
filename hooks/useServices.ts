// hooks/useServices.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { ParentChildServiceSchema } from "@/app/schemas/serviceSchema";

interface Service {
  id: string;
  name: string;
  parentServiceId: string | null;
  services: Service[];
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: Service[];
}

// Query key
export const servicesKeys = {
  all: ["services"] as const,
  hierarchy: () => [...servicesKeys.all, "hierarchy"] as const,
};

// Fetch services
const fetchServices = async (): Promise<Service[]> => {
  const response = await fetch("/api/service/hierarchy");
  const data: ApiResponse = await response.json();
  if (!data.success) {
    throw new Error(data.message);
  }
  return data.data;
};

// Create service
const createService = async (data: ParentChildServiceSchema) => {
  const response = await fetch("/api/service/create-parent-child", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create category");
  }

  return response.json();
};

// Hook for fetching services
export function useServices() {
  return useQuery({
    queryKey: servicesKeys.hierarchy(),
    queryFn: fetchServices,
    refetchOnWindowFocus: true,
  });
}

// Hook for creating services
export function useCreateService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createService,
    onSuccess: () => {
      // Invalidate and refetch the services query
      queryClient.invalidateQueries({ queryKey: servicesKeys.hierarchy() });
      toast.success("Category created successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create category");
    },
  });
}
