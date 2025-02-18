// routes/[carpeta-nombre-pagina]/page.tsx
import { getDeDondeVienenLosRecursos } from "@/action/de-donde-vienen-los-recursos";
import { SelectYear } from "@/components/SelectYear";
import Layout from "../layout";
import { Chart } from "./components/chart";

type SearchParams = Promise<{ year?: string }>;

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
			<SelectYear defaultValue={year} />
			{!data ? <div>Loading...</div> : <Chart data={data} />}
		</Layout>
	);
}
