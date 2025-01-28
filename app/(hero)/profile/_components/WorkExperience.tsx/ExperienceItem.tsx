import { WorkExperience } from "@prisma/client";

export default function ExperienceItem({
  jobTitle,
  description,
  duration,
}: WorkExperience) {
  return (
    <div className="flex justify-between shadow-neutral-500 rounded-xl border p-2">
      <div>
        <h2 className="font-semibold">{jobTitle}</h2>
        <p className="text-muted-foreground font-medium text-sm">
          {description}
        </p>
      </div>
      <div className="text-right">
        <h3 className="gradient-text">{duration}</h3>
        <a className="text-muted-foreground font-medium underline text-sm">
          View Document
        </a>
      </div>
    </div>
  );
}
