import Image from "next/image";

import { getImageUrl } from "@/lib/utils";

import { ProfileResponse } from "../page";

type WorkSectionProps = Pick<ProfileResponse, "myWorks">;

const WorksSection: React.FC<WorkSectionProps> = ({ myWorks }) => {
  return (
    <section>
      <div className="py-2">
        <h2 className="text-2xl font-bold  text-center sm:text-left">
          My Works
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {myWorks.map((work) => (
          <div
            key={work.id}
            className="border shadow border-gray-200 rounded-lg p-4 flex flex-col"
          >
            <div className="relative w-full h-44 aspect-square">
              <Image
                src={getImageUrl(work.workImages[0])}
                alt={work.title}
                fill
                className="rounded-md"
              />
            </div>
            <h3 className="mt-4 text-lg font-semibold">{work.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground flex-grow">
              {work.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorksSection;
