import { Card, CardContent } from "@/components/ui/card";

interface Work {
  id: number;
  title: string;
  description: string;
}

interface MyWorksProps {
  works: Work[];
}

export default function MyWorks({ works }: MyWorksProps) {
  return (
    <section className="w-full py-12 md:py-10 lg:py-10">
      <div className="container">
        <h2 className="text-2xl font-bold tracking-tight mb-2">My Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {works.map((work) => (
            <Card key={work.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="aspect-[3/2] w-full border rounded-md mb-4" />
                <h3 className="text-xl font-semibold gradient-text text-center uppercase">
                  {work.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1 text-center font-medium">
                  {work.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
