// routes/[carpeta-nombre-pagina]/page.tsx
import { getDeDondeVienenLosRecursos } from "@/action/de-donde-vienen-los-recursos";
import { SelectYear } from "@/components/SelectYear";
import type { Metadata } from "next";
import Layout from "../layout";
import { Chart } from "./components/chart";

type SearchParams = Promise<{ year?: string }>;

export const metadata: Metadata = {
	title: "¿De dónde vienen los recursos?",
	description:
		"Origen de los ingresos y fuentes de financiamiento del presupuesto argentino.",
	openGraph: {
		title: "¿De dónde vienen los recursos?",
		description:
			"Conoce las fuentes de ingresos que financian el gasto público en Argentina.",
		url: "https://tusitio.com/de-donde-vienen-los-recursos",
	},
	twitter: {
		title: "¿De dónde vienen los recursos?",
		description:
			"Información sobre las fuentes de financiamiento del presupuesto argentino.",
	},
};
export default async function DeDondeVienenLosRecursos({
	searchParams,
}: {
	searchParams: SearchParams;
}) {
	let { year } = await searchParams;

	if (!year) {
		year = new Date().getFullYear().toString();
	}

	const { data } = await getDeDondeVienenLosRecursos(year);

	if (!data) return <div>Loading...</div>;

	return (
		<Layout
			breadcrumbLinks={[
				{ href: "/", label: "Inicio" },
				{
					href: `/de-donde-vienen-los-recursos?year=${year}`,
					label: `De donde vienen los recursos en ${year}`,
				},
			]}
			title={`De donde vienen los recursos en ${year}`}
		>
			<section className="mx-auto w-full max-w-4xl rounded-lg border p-4">
				<SelectYear defaultValue={year} />
				<Chart data={data} />
			</section>
		</Layout>
	);
}
