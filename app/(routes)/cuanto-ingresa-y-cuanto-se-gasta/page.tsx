import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {} from "@/components/ui/select";
import { BreadCrumbDynamic } from "@/components/breadcumb-dynamic";
import { Chart } from "./components/chart";
import { getIngresoEgresoPIB } from "@/action/ingreso-egreso-sobre-el-pib";

export default async function CuantoIngresaYCuantoSeGasta() {
  const data = await getIngresoEgresoPIB();

  if (!data) return <div>Loading...</div>;

  return (
    <main className="container mx-auto px-4 py-8">
      <BreadCrumbDynamic
        links={[
          {
            href: "/",
            label: "Inicio",
          },
          {
            href: "/cuanto-ingresa-y-cuanto-se-gasta",
            label: "Cuanto ingresa y cuanto se gasta?",
          },
        ]}
      />
      <h1 className="mb-8 font-bold text-3xl">¿A qué se destina el gasto?</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Gastos por finalidad y función</CardTitle>
        </CardHeader>
        <CardContent>
          <Chart data={data} />
        </CardContent>
      </Card>
    </main>
  );
}
