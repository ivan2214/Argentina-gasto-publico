// routes/[carpeta-nombre-pagina]/page.tsx
import { getPresupuesto } from "@/action/quien-gasta";
import { SelectYear } from "@/components/SelectYear";
import { processSpendingData } from "@/lib/processData";
import type { Metadata } from "next";
import Layout from "../layout";
import { Chart } from "./components/chart";

type SearchParams = Promise<{ year?: string }>;
export const metadata: Metadata = {
	title: "¿Cuánto se lleva gastado del presupuesto?",
	description:
		"Seguimiento de la ejecución presupuestaria y gasto acumulado en Argentina.",
	openGraph: {
		title: "¿Cuánto se lleva gastado del presupuesto?",
		description:
			"Monitoriza el progreso del gasto respecto al presupuesto aprobado en Argentina.",
		url: "https://tusitio.com/cuanto-se-lleva-gastado-del-presupuesto",
	},
	twitter: {
		title: "¿Cuánto se lleva gastado del presupuesto?",
		description:
			"Datos actualizados sobre la ejecución del presupuesto en Argentina.",
	},
};

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
			<section className="mx-auto w-full max-w-4xl rounded-lg border p-4">
				<SelectYear defaultValue={year} />
				<Chart data={totals} />
			</section>
		</Layout>
	);
}
