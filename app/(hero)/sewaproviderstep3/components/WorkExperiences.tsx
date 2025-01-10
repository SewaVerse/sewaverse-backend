import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface WorkExperience {
  id: number;
  title: string;
  info: string;
  years: string;
  descriptionUrl: string;
}

const experiences: WorkExperience[] = [
  {
    id: 1,
    title: "Title",
    info: "Info",
    years: "Experience Years",
    descriptionUrl: "#",
  },
  {
    id: 2,
    title: "Title",
    info: "Info",
    years: "Experience Years",
    descriptionUrl: "#",
  },
];

export default function WorkExperiences() {
  return (
    <section className="w-full py-6 ">
      <div className="container px-4 md:px-10">
        <h2 className="text-2xl font-bold tracking-tight mb-2">
          Work Experiences
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {experiences.map((experience) => (
            <Card key={experience.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">{experience.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {experience.info}
                    </p>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {experience.years}
                  </span>
                </div>
                <div className="flex justify-end">
                  <Button
                    variant="link"
                    className="text-sm p-0 h-auto font-normal"
                    asChild
                  >
                    <Link href={experience.descriptionUrl}>
                      View Description
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
