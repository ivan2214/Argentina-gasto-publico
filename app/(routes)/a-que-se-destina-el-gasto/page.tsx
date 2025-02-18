import { getAqueSeDestinaElGasto } from "@/action/a-que-se-destina-el-gasto";
import { SelectYear } from "@/components/SelectYear";
import Layout from "../layout";
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
			<SelectYear defaultValue={year} />
			<Chart data={data} />
		</Layout>
	);
}
