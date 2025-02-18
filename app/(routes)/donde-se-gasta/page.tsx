// routes/[carpeta-nombre-pagina]/page.tsx
import { getDondeSeGasta } from "@/action/donde-se-gasta";
import { SelectYear } from "@/components/SelectYear";
import { ArgentinaMapChart } from "@/components/argentina-map-chart";
import type { Metadata } from "next";
import Layout from "../layout";

type SearchParams = Promise<{ year?: string }>;

export const metadata: Metadata = {
	title: "¿Dónde se gasta?",
	description:
		"Distribución geográfica del gasto público en las distintas provincias de Argentina.",
	openGraph: {
		title: "¿Dónde se gasta?",
		description:
			"Visualiza cómo se distribuye el gasto público en las diferentes regiones de Argentina.",
		url: "https://tusitio.com/donde-se-gasta",
	},
	twitter: {
		title: "¿Dónde se gasta?",
		description:
			"Mapa interactivo del gasto público por provincia en Argentina.",
	},
};

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
			<section className="mx-auto w-full max-w-4xl rounded-lg border p-4">
				<SelectYear defaultValue={year} />
				<ArgentinaMapChart data={data} geoData={geoData} />
			</section>
		</Layout>
	);
}
