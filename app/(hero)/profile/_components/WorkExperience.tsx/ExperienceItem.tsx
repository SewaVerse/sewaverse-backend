import { Experience } from "./WorkExperience";

export default function ExperienceItem({
  title,
  subtitle,
  duration,
  documentLink,
}: Experience) {
  return (
    <div className="flex justify-between shadow-neutral-500 rounded-xl border p-2">
      <div>
        <h2 className="font-semibold">{title}</h2>
        <p className="text-muted-foreground font-medium text-sm">{subtitle}</p>
      </div>
      <div className="text-right">
        <h3 className="gradient-text">{duration}</h3>
        <a
          href={documentLink}
          className="text-muted-foreground font-medium underline text-sm"
        >
          View Document
        </a>
      </div>
    </div>
  );
}
