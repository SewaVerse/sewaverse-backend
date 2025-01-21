"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Service {
  id: string;
  name: string;
  description: string | null;
  parentServiceId: string | null;
  services: Service[];
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: Service[];
}

interface SelectedService {
  categoryId: string;
  categoryName: string;
  subCategories: { id: string; name: string }[];
}

interface SelectServicesProps {
  openSelectServices: boolean;
  setOpenSelectServices: (open: boolean) => void;
  onServiceSelect: (selected: SelectedService[]) => void;
  selectedServices: SelectedService[];
}

export default function SelectServices({
  openSelectServices,
  setOpenSelectServices,
  onServiceSelect,
  selectedServices,
}: SelectServicesProps) {
  const [services, setServices] = useState<Service[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );
  const [selectedMainCategories, setSelectedMainCategories] = useState<
    Set<string>
  >(new Set());
  const [selectedSubCategories, setSelectedSubCategories] = useState<
    Set<string>
  >(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/service/hierarchy");
        const data: ApiResponse = await response.json();
        if (data.success) {
          setServices(data.data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching services:", error);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    // Initialize selected categories based on prop
    const mainCategories = new Set<string>();
    const subCategories = new Set<string>();
    selectedServices.forEach((service) => {
      mainCategories.add(service.categoryId);
      service.subCategories.forEach((sub) => subCategories.add(sub.id));
    });
    setSelectedMainCategories(mainCategories);
    setSelectedSubCategories(subCategories);
    setExpandedCategories(mainCategories);
  }, [selectedServices]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const toggleMainCategorySelection = (categoryId: string) => {
    setSelectedMainCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
        // Remove all subcategories of this main category
        setSelectedSubCategories((prevSub) => {
          const newSubSet = new Set(prevSub);
          services
            .find((s) => s.id === categoryId)
            ?.services.forEach((sub) => {
              newSubSet.delete(sub.id);
            });
          return newSubSet;
        });
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const toggleSubCategorySelection = (
    subCategoryId: string,
    mainCategoryId: string
  ) => {
    setSelectedSubCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(subCategoryId)) {
        newSet.delete(subCategoryId);
      } else {
        newSet.add(subCategoryId);
        // Ensure main category is selected when a sub-category is selected
        setSelectedMainCategories((prevMain) =>
          new Set(prevMain).add(mainCategoryId)
        );
      }
      return newSet;
    });
  };

  const renderCategory = (category: Service) => (
    <div key={category.id} className="space-y-2">
      <div className="flex items-center gap-2">
        <Checkbox
          id={category.id}
          checked={selectedMainCategories.has(category.id)}
          onCheckedChange={() => toggleMainCategorySelection(category.id)}
        />
        <label
          htmlFor={category.id}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {category.name}
        </label>
        {category.services.length > 0 && (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 p-0"
            onClick={() => toggleCategory(category.id)}
          >
            {expandedCategories.has(category.id) ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>

      {expandedCategories.has(category.id) &&
        selectedMainCategories.has(category.id) &&
        category.services.length > 0 && (
          <div className="ml-6 space-y-2">
            {category.services.map((subCategory) => (
              <div key={subCategory.id} className="flex items-center gap-2">
                <Checkbox
                  id={subCategory.id}
                  checked={selectedSubCategories.has(subCategory.id)}
                  onCheckedChange={() =>
                    toggleSubCategorySelection(subCategory.id, category.id)
                  }
                />
                <label
                  htmlFor={subCategory.id}
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {subCategory.name}
                </label>
              </div>
            ))}
          </div>
        )}
    </div>
  );

  const handleDone = () => {
    const selected: SelectedService[] = Array.from(selectedMainCategories)
      .map((categoryId) => {
        const category = services.find((s) => s.id === categoryId);
        return {
          categoryId,
          categoryName: category?.name || "",
          subCategories:
            category?.services
              .filter((sub) => selectedSubCategories.has(sub.id))
              .map((sub) => ({
                id: sub.id,
                name: sub.name,
              })) || [],
        };
      })
      .filter((service) => service.subCategories.length > 0);

    onServiceSelect(selected);
    setOpenSelectServices(false);
  };

  return (
    <Dialog open={openSelectServices} onOpenChange={setOpenSelectServices}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select Services</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          Select categories based on the sewa you will be providing
        </p>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        ) : (
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-4">{services.map(renderCategory)}</div>
          </ScrollArea>
        )}
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpenSelectServices(false)}
          >
            Cancel
          </Button>
          <Button onClick={handleDone}>Done</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
