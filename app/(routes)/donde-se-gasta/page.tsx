// routes/[carpeta-nombre-pagina]/page.tsx
import { getDondeSeGasta } from "@/action/donde-se-gasta";
import { SelectYear } from "@/components/SelectYear";
import { ArgentinaMapChart } from "@/components/argentina-map-chart";
import Layout from "../layout";

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
		<Layout
			breadcrumbLinks={[
				{ href: "/", label: "Inicio" },
				{
					href: `/donde-se-gasta?year=${year}`,
					label: `Donde se gasta en ${year}`,
				},
			]}
			title={`Donde se gasta en ${year}`}
		>
			<SelectYear defaultValue={year} />
			<ArgentinaMapChart data={data} geoData={geoData} />
		</Layout>
	);
}
