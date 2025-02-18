import { getAqueSeDestinaElGasto } from "@/action/a-que-se-destina-el-gasto";
import { SelectYear } from "@/components/SelectYear";
import Layout from "../layout";
import { Chart } from "./components/chart";

type SearchParams = Promise<{ year?: string }>;

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "¿A qué se destina el gasto?",
	description:
		"Análisis detallado de la asignación del gasto público en Argentina.",
	openGraph: {
		title: "¿A qué se destina el gasto?",
		description:
			"Explora cómo se distribuye el gasto público en diferentes sectores en Argentina.",
		url: "https://tusitio.com/a-que-se-destina-el-gasto",
	},
	twitter: {
		title: "¿A qué se destina el gasto?",
		description:
			"Descubre la distribución del gasto público en Argentina por sectores.",
	},
};

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
		<Layout
			breadcrumbLinks={[
				{ href: "/", label: "Inicio" },
				{
					href: `/a-que-se-destina-el-gasto?year=${year}`,
					label: `A que se destina el gasto en ${year}`,
				},
			]}
			title={`A que se destina el gasto en ${year}`}
		>
			<section className="mx-auto w-full max-w-4xl rounded-lg border p-4">
				<SelectYear defaultValue={year} />
				<Chart data={data} />
			</section>
		</Layout>
	);
}
