"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Location {
  district: string;
  place: string;
}

export function LocationDialog() {
  const [open, setOpen] = useState(true);
  const [locationType, setLocationType] = useState("specific");
  const [kmRadius, setKmRadius] = useState("");
  const [locations, setLocations] = useState<Location[]>([
    { district: "Kathmandu", place: "Balaju, Budanikantha" },
  ]);

  const handleAddLocation = () => {
    setLocations([...locations, { district: "", place: "" }]);
  };

  const handleRemoveLocation = (index: number) => {
    setLocations(locations.filter((_, i) => i !== index));
  };

  const handleLocationChange = (
    index: number,
    field: keyof Location,
    value: string
  ) => {
    const newLocations = [...locations];
    newLocations[index][field] = value;
    setLocations(newLocations);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-2xl font-semibold">
              Location of Service
            </DialogTitle>
          </div>
          <p className="text-muted-foreground">
            Please specify the area where you will provide your services.
          </p>
        </DialogHeader>

        <div className="space-y-6">
          <RadioGroup
            value={locationType}
            onValueChange={setLocationType}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all">All over Nepal</Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="radius" id="radius" />
              <Label htmlFor="radius">Within</Label>
              <Input
                className="w-24"
                placeholder="0"
                value={kmRadius}
                onChange={(e) => setKmRadius(e.target.value)}
                disabled={locationType !== "radius"}
              />
              <span>km from my location</span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="specific" id="specific" />
                <Label htmlFor="specific">Specific locations</Label>
              </div>

              {locations.map((location, index) => (
                <div key={index} className="ml-6 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {index + 1}.
                    </span>
                    <div className="grid gap-2 flex-1">
                      <div className="flex items-center gap-2">
                        <Input
                          placeholder="District"
                          value={location.district}
                          onChange={(e) =>
                            handleLocationChange(
                              index,
                              "district",
                              e.target.value
                            )
                          }
                          disabled={locationType !== "specific"}
                        />
                        <span>{">"}</span>
                        <Input
                          placeholder="Place"
                          value={location.place}
                          onChange={(e) =>
                            handleLocationChange(index, "place", e.target.value)
                          }
                          disabled={locationType !== "specific"}
                        />
                        {index > 0 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveLocation(index)}
                            disabled={locationType !== "specific"}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {locationType === "specific" && (
                <>
                  <p className="text-sm text-muted-foreground ml-6">
                    Use commas (,) to add multiple locations.
                  </p>
                  <Button
                    variant="outline"
                    className="ml-6 border-dashed"
                    onClick={handleAddLocation}
                    disabled={locationType !== "specific"}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add More Location
                  </Button>
                </>
              )}
            </div>
          </RadioGroup>

          <Button className="w-full" variant={"brand"} size="md">
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
