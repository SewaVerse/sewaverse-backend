import { Card, CardContent } from "@/components/ui/card";

interface Award {
  id: number;
  title: string;
  year: string;
  from: string;
  certificateUrl?: string;
}

export default function AwardsAndCertifications({
  awards,
}: {
  awards: Award[];
}) {
  return (
    <section className="w-full py-6 md:px-2 lg:py-3">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl font-bold tracking-tight mb-2">
          Awards & Certifications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {awards.map((award) => (
            <div key={award.id} className="flex flex-col items-center">
              <Card className="w-full">
                <CardContent className="p-4 aspect-[4/3]">
                  {award.certificateUrl ? (
                    <img
                      src={award.certificateUrl || "/placeholder.svg"}
                      alt={award.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">No image</span>
                    </div>
                  )}
                </CardContent>
              </Card>
              <h1 className="mt-3 text-lg font-medium gradient-text">
                {award.title}
              </h1>
              <p className="text-sm font-medium text-gray-500">
                {award.year} - {award.from}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
