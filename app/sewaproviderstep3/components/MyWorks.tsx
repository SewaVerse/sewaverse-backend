import { Card, CardContent } from "@/components/ui/card";

interface Work {
  id: number;
  title: string;
  description: string;
}

const works: Work[] = [
  {
    id: 1,
    title: "Title",
    description: "Description",
  },
  {
    id: 2,
    title: "Title",
    description: "Description",
  },
  {
    id: 3,
    title: "Title",
    description: "Description",
  },
];

export default function MyWorks() {
  return (
    <section className="w-full py-12 md:py-10 lg:py-10">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl font-bold tracking-tight mb-2">My Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {works.map((work) => (
            <Card key={work.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="aspect-[3/2] w-full border rounded-md mb-4" />
                <h3 className="text-lg font-semibold">{work.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
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
