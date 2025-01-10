"use client";

import { Pencil, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Service {
  title: string;
  subtitle: string;
}

export default function OfferedServicesEdit() {
  const services: Service[] = [
    {
      title: "Home Maintainance",
      subtitle: "Electrician, Plumber",
    },
    {
      title: "Computer Repairs & Maintainance",
      subtitle: "Laptop Services, Laptop Cleaning",
    },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-medium text-center text-gray-700 mb-6">
        Offered Services
      </h2>

      <div className="space-y-4">
        {services.map((service, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-medium gradient-text">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-500">{service.subtitle}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Pencil className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Button variant="outline" className="w-full py-6 border-dashed">
        <Plus className="h-5 w-5 mr-2 text-green-500" />
        <span className="text-gray-500">Add Service</span>
      </Button>

      <div className="flex justify-center">
        <Button className="px-8 bg-brand-gradient">Done</Button>
      </div>
    </div>
  );
}
