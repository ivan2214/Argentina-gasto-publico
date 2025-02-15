import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SelectYear } from "@/components/SelectYear";
import { BreadCrumbDynamic } from "@/components/breadcumb-dynamic";
import { Chart } from "./components/chart";

const data = [
  { name: "Servicios Sociales", value: 45 },
  { name: "Servicios Económicos", value: 25 },
  { name: "Administración Gubernamental", value: 15 },
  { name: "Servicios de Defensa y Seguridad", value: 10 },
  { name: "Deuda Pública", value: 5 },
];

type SearchParams = Promise<{ year?: string }>;

export default async function AQueSeDestinaElGasto({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  let { year } = await searchParams;

  if (!year) {
    year = new Date().getFullYear().toString();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <BreadCrumbDynamic
        links={[
          {
            href: "/",
            label: "Inicio",
          },
          {
            href: `/a-que-se-destina-el-gasto?year=${year}`,
            label: `A que se destina el gasto en ${year}`,
          },
        ]}
      />
      <h1 className="mb-8 font-bold text-3xl">¿A qué se destina el gasto?</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Gastos por finalidad y función</CardTitle>
        </CardHeader>
        <CardContent>
          <SelectYear defaultValue={year} />
          <Chart data={data} />
        </CardContent>
      </Card>
    </main>
  );
}
