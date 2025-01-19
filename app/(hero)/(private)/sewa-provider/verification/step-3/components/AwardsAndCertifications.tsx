import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { AwardType } from "@/lib/types";

export default function AwardsAndCertifications({
  awards,
}: {
  awards: AwardType[];
}) {
  return (
    <section className="w-full py-6 lg:py-6">
      <div className="container">
        <h2 className="text-2xl font-bold tracking-tight mb-2">
          Awards & Certifications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {awards.map((award) => (
            <div key={award.id} className="flex flex-col items-center">
              <Card className="w-full">
                <CardContent className="p-4 aspect-[4/3] relative  rounded-lg">
                  {award.awardFile ? (
                    <Image
                      src={award.awardFile.file?.name || '/placeholder-image.jpg'}
                      alt={award.title}
                      fill
                      className="object-cover rounded-lg"
                      sizes="100vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">No image</span>
                    </div>
                  )}
                </CardContent>
              </Card>
              <h1 className="mt-3 text-xl font-semibold gradient-text uppercase">
                {award.title}
              </h1>
              <p className="text-sm font-medium text-gray-500 uppercase">
                {award.year} - {award.awardFrom}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
