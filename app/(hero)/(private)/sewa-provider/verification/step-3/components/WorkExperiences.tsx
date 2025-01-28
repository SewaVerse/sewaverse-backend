import Image from "next/image";
import { useEffect, useState } from "react";
import { z } from "zod";

// import { workExperienceSchema } from "@/app/schemas/workExperienceSchema"; // Assuming schema is imported correctly
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { WorkExperience } from "@/lib/types";

const workExperienceSchema = z.object({
  id: z.number(),
  jobTitle: z.string(),
  company: z.string().optional(),
  duration: z.string(),
  description: z.string().optional(),
  verificationFile: z
    .object({
      file: z.string(), // URL to the file
    })
    .optional(),
});

type ValidatedWorkExperience = z.infer<typeof workExperienceSchema>;

export default function WorkExperiencesView({
  experiences,
}: {
  experiences: WorkExperience[];
}) {
  const [validatedExperiences, setValidatedExperiences] = useState<
    ValidatedWorkExperience[]
  >([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    // Validate and filter experiences
    const validExperiences = experiences
      .map((exp) => {
        try {
          return workExperienceSchema.parse(exp); // Validate each experience
        } catch (error) {
          console.error("Invalid experience data:", error);
          return null; // Filter out invalid data
        }
      })
      .filter(Boolean) as ValidatedWorkExperience[];
    console.warn("Work Experiences", validExperiences);
    setValidatedExperiences(validExperiences);
  }, [experiences]);

  const handleImageClick = (verificationFile: string | undefined) => {
    if (verificationFile) {
      setSelectedImage(verificationFile);
    }
  };

  return (
    <section className="w-full py-6">
      <div className="container">
        <h2 className="text-2xl font-bold mb-4">Work Experiences</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {validatedExperiences.map((experience) => (
            <Card key={experience.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="mb-1">
                  <h3 className="text-lg gradient-text font-semibold uppercase">
                    {experience.jobTitle}
                  </h3>
                </div>
                <div className="flex justify-between">
                  <div className="w-2/3 flex flex-col gap-1">
                    <div className="flex gap-1">
                      <h1 className="font-medium text-muted-foreground">
                        Company:
                      </h1>
                      <h1 className="gradient-text">
                        {experience.company || "N/A"}
                      </h1>
                    </div>
                    <div className="flex gap-1">
                      <h1 className="font-medium text-muted-foreground">
                        Experience Years:
                      </h1>
                      <h1 className="gradient-text">
                        {experience.duration}{" "}
                        {parseInt(experience.duration) > 1 ? "years" : "year"}
                      </h1>
                    </div>
                    {/* <div className="flex gap-1">
                      <h1 className="block font-medium text-muted-foreground">
                        Description:
                      </h1>
                      <p className="text-base gradient-text">
                        {experience.description || "N/A"}
                      </p>
                    </div> */}
                  </div>

                  <div className="flex items-center">
                    {experience.verificationFile?.file && (
                      <div
                        className="relative rounded-lg w-[100px] h-[80px] cursor-pointer"
                        onClick={() =>
                          handleImageClick(experience.verificationFile!.file)
                        }
                      >
                        <Image
                          src={experience.verificationFile.file}
                          alt="Experience Certificate"
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                    )}
                  </div>
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
                src={selectedImage}
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
