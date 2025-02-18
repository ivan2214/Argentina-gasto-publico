// routes/[carpeta-nombre-pagina]/page.tsx
import { getPresupuesto } from "@/action/quien-gasta";
import { SelectYear } from "@/components/SelectYear";
import { processSpendingData } from "@/lib/processData";
import Layout from "../layout";
import { Chart } from "./components/chart";

type SearchParams = Promise<{ year?: string }>;

export default async function QuienGasta({
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

	const { topSpenders } = processSpendingData(data);

	return (
		<Layout
			breadcrumbLinks={[
				{ href: "/", label: "Inicio" },
				{ href: `/quien-gasta?year=${year}`, label: `Quien gasta en ${year}` },
			]}
			title={`Quien gasta en ${year}`}
		>
			<SelectYear defaultValue={year} />
			<Chart data={topSpenders} />
		</Layout>
	);
}
