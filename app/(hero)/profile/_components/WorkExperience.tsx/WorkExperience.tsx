import { WorkExperience } from "@prisma/client";
import { Edit } from "lucide-react";

import ExperienceItem from "./ExperienceItem";

export default function WorkExperienceSection({
  experiences,
}: {
  experiences: WorkExperience[];
}) {
  return (
    <section className="w-full max-w-8xl">
      <div className="flex justify-between items-center py-2 ">
        <h1 className="font-bold text-2xl">Work Experience</h1>
        <Edit size={14} className="cursor-pointer" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {experiences.map((exp, index) => (
          <ExperienceItem key={index} {...exp} />
        ))}
      </div>
    </section>
  );
}
