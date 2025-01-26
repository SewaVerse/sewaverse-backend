import Image from "next/image";
import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LicenseType } from "@/lib/types";

export default function License({ licenses }: { licenses: LicenseType[] }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (certificateUrl: string) => {
    setSelectedImage(certificateUrl);
  };

  return (
    <section className="w-full py-6">
      <div className="container">
        <h2 className="text-2xl font-bold tracking-tight mb-4">Licenses</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {licenses.map((license) => (
            <Card key={license.id} className="overflow-hidden">
              <CardContent className="p-4 flex justify-between">
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <h1 className="block font-medium text-muted-foreground">
                      License Of:
                    </h1>
                    <p className="gradient-text font-medium">
                      {license.licenseOf}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <h1 className="block font-medium text-muted-foreground">
                      License Number:
                    </h1>
                    <p className="gradient-text font-medium">
                      {license.licenseNumber}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <h1 className="block font-medium text-muted-foreground">
                      Issued By:
                    </h1>
                    <p className="gradient-text font-medium">
                      {license.issuedBy}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  {license.certificateUrl && (
                    <div
                      className="relative border w-[100px] h-[80px] cursor-pointer"
                      onClick={() => handleImageClick(license.certificateUrl!)}
                    >
                      <Image
                        src={license.certificateUrl}
                        alt="License Certificate"
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      {selectedImage && (
        <Dialog
          open={!!selectedImage}
          onOpenChange={() => setSelectedImage(null)}
        >
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>License Certificate</DialogTitle>
            </DialogHeader>
            <div className="relative w-full h-[400px]">
              <Image
                src={selectedImage}
                alt="License Certificate"
                fill
                className="object-contain rounded"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
}
