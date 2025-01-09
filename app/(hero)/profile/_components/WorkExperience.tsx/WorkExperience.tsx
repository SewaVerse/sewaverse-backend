import { Edit } from "lucide-react";

import ExperienceItem from "./ExperienceItem";

export interface Experience {
  title: string;
  subtitle: string;
  duration: string;
  documentLink: string;
}

interface WorkExperienceProps {
  experiences: Experience[];
}

export default function WorkExperience({ experiences }: WorkExperienceProps) {
  return (
    <div className="w-full max-w-8xl py-2">
      <div className="flex justify-between items-center py-2 ">
        <h1 className="font-bold text-2xl">Work Experience</h1>
        <Edit size={14} className="cursor-pointer" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {experiences.map((exp, index) => (
          <ExperienceItem key={index} {...exp} />
        ))}
      </div>
    </div>
  );
}
