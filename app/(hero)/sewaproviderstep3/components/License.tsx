import { Card, CardContent } from "@/components/ui/card";

export default function License() {
  return (
    <section className="w-full py-6 ">
      <div className="container px-4 md:px-10">
        <h2 className="text-2xl font-bold tracking-tight mb-2">License</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold">License of</h3>
                  <p className="text-sm text-muted-foreground">License from</p>
                </div>
                <div className="border w-[100px] h-[80px]"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
