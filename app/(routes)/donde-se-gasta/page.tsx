import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { getDondeSeGasta } from "@/action/donde-se-gasta";
import { SelectYear } from "@/components/SelectYear";
import { ArgentinaMapChart } from "@/components/argentina-map-chart";

const geoUrl =
	"https://raw.githubusercontent.com/deldersveld/topojson/master/countries/argentina/argentina-provinces.json";

const data = [
	{ id: "AR-B", value: 1000000 },
	{ id: "AR-C", value: 5000000 },
	{ id: "AR-K", value: 500000 },
	// Add more data for other provinces
];

type SearchParams = Promise<{ year?: string }>;

export default async function DondeSeGasta({
	searchParams,
}: {
	searchParams: SearchParams;
}) {
	let { year } = await searchParams;

	if (!year) {
		year = new Date().getFullYear().toString();
	}

	const { data } = await getDondeSeGasta(year);

	if (!data) return <div>Loading...</div>;

	const response = await fetch(
		"https://www.presupuestoabierto.gob.ar/sici/json/argentina.json",
	);
	const geoData = await response.json();

	return (
		<main className="container mx-auto px-4 py-8">
			{/* <BreadCrumbDynamic
        links={[
          {
            href: "/",
            label: "Inicio",
          },
          {
            href: `/donde-se-gasta?year=${year}`,
            label: `Donde se gasta en ${year}`,
          },
        ]}
      /> */}
			<h1 className="mb-8 font-bold text-3xl">¿Dónde se gasta?</h1>
			<Card className="mb-8">
				<CardHeader>
					<CardTitle>Gastos por ubicación geográfica</CardTitle>
				</CardHeader>
				<CardContent>
					<SelectYear defaultValue={year} />
					<ArgentinaMapChart data={data} geoData={geoData} />
				</CardContent>
			</Card>
		</main>
	);
}
