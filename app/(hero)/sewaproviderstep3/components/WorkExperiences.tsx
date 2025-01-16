import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface WorkExperience {
  id: number;
  title: string;
  company: string;
  years: string;
  category: string;
  description: string;
  certificateUrl?: string;
}

export default function WorkExperiences({
  experiences,
}: {
  experiences: WorkExperience[];
}) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleViewDocument = (certificateUrl: string | undefined) => {
    if (certificateUrl) {
      setSelectedImage(certificateUrl);
    }
  };

  return (
    <section className="w-full py-6">
      <div className="container px-4 md:px-10">
        <h2 className="text-2xl font-bold tracking-tight mb-4">
          Work Experiences
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {experiences.map((experience) => (
            <Card key={experience.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="mb-2">
                  <h1 className="text-2xl gradient-text">{experience.title}</h1>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <h1 className="font-medium text-muted-foreground">
                      Company:
                    </h1>
                    <h1 className="gradient-text">{experience.company}</h1>
                  </div>
                  <div className="flex justify-between">
                    <h1 className="font-medium text-muted-foreground">
                      Experience Years:
                    </h1>
                    <h1 className="gradient-text">
                      {experience.years}{" "}
                      {parseInt(experience.years) > 1 ? "years" : "year"}
                    </h1>
                  </div>
                  <div className="flex justify-between">
                    <h1 className="font-medium text-muted-foreground">
                      Category:
                    </h1>
                    <h1 className="gradient-text mb-2">{experience.category}</h1>
                  </div>
                  {/* <div>
                    <h1 className="block font-medium text-muted-foreground">
                      Description:
                    </h1>
                    <p className="text-base gradient-text">
                      {experience.description}
                    </p>
                  </div> */}
                  {experience.certificateUrl && (
                    <div className="flex justify-end mt-2">
                      <Button
                        variant="link"
                        className="text-sm h-auto font-normal p-0 gradient-text"
                        onClick={() =>
                          handleViewDocument(experience.certificateUrl)
                        }
                      >
                        View Document
                      </Button>
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
              <DialogTitle>Certificate</DialogTitle>
            </DialogHeader>
            <div className="relative w-full h-[400px]">
              <Image
                src={selectedImage || "/placeholder.svg"}
                alt="Certificate"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
}
