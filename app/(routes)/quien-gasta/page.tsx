// routes/[carpeta-nombre-pagina]/page.tsx
import { getPresupuesto } from "@/action/quien-gasta";
import { SelectYear } from "@/components/SelectYear";
import { processSpendingData } from "@/lib/processData";
import type { Metadata } from "next";
import Layout from "../layout";
import { Chart } from "./components/chart";

type SearchParams = Promise<{ year?: string }>;

export const metadata: Metadata = {
	title: "¿Quién gasta?",
	description:
		"Identificación de las entidades y organismos responsables del gasto público en Argentina.",
	openGraph: {
		title: "¿Quién gasta?",
		description:
			"Descubre qué organismos y entidades gestionan el gasto público en Argentina.",
		url: "https://tusitio.com/quien-gasta",
	},
	twitter: {
		title: "¿Quién gasta?",
		description:
			"Información sobre las instituciones responsables del gasto público en Argentina.",
	},
};

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
			<section className="mx-auto w-full rounded-lg border p-4">
				<SelectYear defaultValue={year} />
				<Chart data={topSpenders} />
			</section>
		</Layout>
	);
}
