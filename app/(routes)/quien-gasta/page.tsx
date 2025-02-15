import { getPresupuesto } from "@/action/quien-gasta";
import { BreadCrumbDynamic } from "@/components/breadcumb-dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { processSpendingData } from "@/lib/processData";
import { SelectYear } from "../../../components/SelectYear";
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
		<main className="container mx-auto px-4 py-8">
			<BreadCrumbDynamic
				links={[
					{
						href: "/",
						label: "Inicio",
					},
					{
						href: `/quien-gasta?year=${year}`,
						label: `Quien gasta en ${year}`,
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
					<Chart data={topSpenders} />
				</CardContent>
			</Card>
		</main>
	);
}
