import { Card, CardContent } from "@/components/ui/card";

export default function AwardsAndCertifications() {
  return (
    <section className="w-full py-6 md:px-2 lg:py-3">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl font-bold tracking-tight mb-2">
          Awards & Certifications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((index) => (
            <div key={index} className="flex flex-col items-center">
              <Card className="w-full">
                <CardContent className="p-4 aspect-[4/3]">
                  {/* Placeholder for certification image or content */}
                </CardContent>
              </Card>
              <span className="mt-3 text-sm font-medium">Certification</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
