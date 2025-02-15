import { getAqueSeDestinaElGasto } from "@/action/a-que-se-destina-el-gasto";
import { SelectYear } from "@/components/SelectYear";
import { BreadCrumbDynamic } from "@/components/breadcumb-dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Chart } from "./components/chart";

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

	const { data } = await getAqueSeDestinaElGasto(year);

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
