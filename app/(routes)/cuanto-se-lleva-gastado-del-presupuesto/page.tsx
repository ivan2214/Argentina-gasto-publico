// routes/[carpeta-nombre-pagina]/page.tsx
import { getPresupuesto } from "@/action/quien-gasta";
import { SelectYear } from "@/components/SelectYear";
import { processSpendingData } from "@/lib/processData";
import Layout from "../layout";
import { Chart } from "./components/chart";

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
		<Layout
			breadcrumbLinks={[
				{ href: "/", label: "Inicio" },
				{
					href: `/cuanto-se-lleva-gastado-del-presupuesto?year=${year}`,
					label: `Cuanto se lleva gastado del presupuesto en ${year}`,
				},
			]}
			title={`Cuanto se lleva gastado del presupuesto en ${year}`}
		>
			<SelectYear defaultValue={year} />
			<Chart data={totals} />
		</Layout>
	);
}
