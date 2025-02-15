import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SelectYear } from "@/components/SelectYear";
import { BreadCrumbDynamic } from "@/components/breadcumb-dynamic";
import { Chart } from "./components/chart";
import { getPresupuesto } from "@/action/quien-gasta";
import { processSpendingData } from "@/lib/processData";

type SearchParams = Promise<{ year?: string }>;

export default async function CuantoSeLlevaGastadoDelPresupuesto({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  let { year } = await searchParams;

  if (!year) {
    year = new Date().getFullYear().toString();
  }

  const { data } = await getPresupuesto(year);

  if (!data) return <div>Loading...</div>;

  const { totals } = processSpendingData(data);

  return (
    <main className="container mx-auto px-4 py-8">
      <BreadCrumbDynamic
        links={[
          {
            href: "/",
            label: "Inicio",
          },
          {
            href: `/cuanto-se-lleva-gastado-del-presupuesto?year=${year}`,
            label: `Cuanto se lleva gastado del presupuesto en ${year}`,
          },
        ]}
      />
      <h1 className="font-bold text-3xl">
        Cuanto se lleva gastado del presupuesto?
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>Comparación de ejecución vs presupuesto</CardTitle>
        </CardHeader>
        <CardContent>
          <SelectYear defaultValue={year} />
          <Chart data={totals} />
        </CardContent>
      </Card>
    </main>
  );
}
