import { ChevronDown, Plus } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = [
  {
    id: "home-maintenance",
    label: "Home Maintenance",
    subcategories: [
      "Plumbing",
      "Electrician",
      "Cleaning",
      "Gardening",
      "Caretaker",
      "Masonry",
    ],
  },
  {
    id: "computer-repair",
    label: "Computer Repair and Maintenance",
    subcategories: [
      "Hardware Repair",
      "Software Installation",
      "Network Setup",
      "Data Recovery",
    ],
  },
  {
    id: "pet-care",
    label: "Pet Care Sewa",
    subcategories: ["Dog Walking", "Pet Sitting", "Grooming", "Training"],
  },
  {
    id: "construction",
    label: "Construction",
    subcategories: ["Renovation", "Painting", "Flooring", "Roofing"],
  },
  {
    id: "beauty",
    label: "Beauty and Personal Care",
    subcategories: ["Hair Styling", "Makeup", "Massage", "Nail Care"],
  },
];

interface SelectServicesProps {
  openSelectServices: boolean;
  setOpenSelectServices: (open: boolean) => void;
}

export default function SelectServices({
  openSelectServices,
  setOpenSelectServices,
}: SelectServicesProps) {
  const [selectedCategories, setSelectedCategories] = React.useState<
    Set<string>
  >(new Set());
  const [selectedSubcategories, setSelectedSubcategories] = React.useState<
    Set<string>
  >(new Set());
  const [newService, setNewService] = React.useState<string>("");

  const toggleCategorySelection = (categoryId: string) => {
    setSelectedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const handleAddNewService = () => {
    if (newService.trim()) {
      categories.push({ id: newService, label: newService, subcategories: [] });
      setNewService("");
    }
  };

  return (
    <Dialog open={openSelectServices} onOpenChange={setOpenSelectServices}>
      <DialogContent className="sm:max-w-[800px] p-6 rounded-3xl border-blue-100 border-2">
        <DialogHeader className="text-center space-y-2">
          <DialogTitle className="text-3xl font-semibold text-center">
            Select the services you are offering!
          </DialogTitle>
          <p className="text-base text-muted-foreground text-center">
            Connect with clients, showcase your skills, and grow your business.
          </p>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex items-center justify-center">
            <div className="space-y-2 justify-center">
              <label className="text-sm font-medium flex items-center justify-center ">
                Sewa Category
              </label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Search a Sewa category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                Select a category based on the sewa you will be providing
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-20 ">
            {categories.map((category) => (
              <div key={category.id} className="space-y-1">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={selectedCategories.has(category.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        toggleCategorySelection(category.id);
                      } else {
                        setSelectedCategories((prev) => {
                          const newSet = new Set(prev);
                          newSet.delete(category.id);
                          return newSet;
                        });
                      }
                    }}
                  />
                  <label htmlFor={category.id} className="text-sm  ">
                    {category.label}
                  </label>
                  <ChevronDown className="h-4 w-4" />
                </div>
                {selectedCategories.has(category.id) && (
                  <div className="pl-6 space-y-2">
                    {category.subcategories.map((subcategory) => (
                      <div
                        key={subcategory}
                        className="flex items-center gap-2"
                      >
                        <Checkbox
                          id={subcategory}
                          checked={selectedSubcategories.has(subcategory)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedSubcategories((prev) =>
                                new Set(prev).add(subcategory)
                              );
                            } else {
                              setSelectedSubcategories((prev) => {
                                const newSet = new Set(prev);
                                newSet.delete(subcategory);
                                return newSet;
                              });
                            }
                          }}
                        />
                        <label htmlFor={subcategory} className="text-sm">
                          {subcategory}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 text-sm">
            <span className="text-muted-foreground">
              If your desired service is not listed above,
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="link"
                className="h-auto p-0 text-indigo-600 hover:text-indigo-700"
                onClick={handleAddNewService}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add new service
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
