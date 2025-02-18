// routes/[carpeta-nombre-pagina]/page.tsx
import { getIngresoEgresoPIB } from "@/action/ingreso-egreso-sobre-el-pib";
import Layout from "../layout";
import { Chart } from "./components/chart";

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "¿Cuánto ingresa y cuánto se gasta?",
	description:
		"Comparativa entre los ingresos y gastos del sector público argentino.",
	openGraph: {
		title: "¿Cuánto ingresa y cuánto se gasta?",
		description:
			"Analiza la relación entre los ingresos y gastos en el presupuesto argentino.",
		url: "https://tusitio.com/cuanto-ingresa-y-cuanto-se-gasta",
	},
	twitter: {
		title: "¿Cuánto ingresa y cuánto se gasta?",
		description:
			"Información sobre los ingresos y gastos del sector público en Argentina.",
	},
};

export default async function CuantoIngresaYCuantoSeGasta() {
	const { data } = await getIngresoEgresoPIB();

	if (!data) return <div>Loading...</div>;

	return (
		<Layout
			breadcrumbLinks={[
				{ href: "/", label: "Inicio" },
				{
					href: "/cuanto-ingresa-y-cuanto-se-gasta",
					label: "Cuanto ingresa y cuanto se gasta?",
				},
			]}
			title="Cuanto ingresa y cuanto se gasta?"
		>
			<section className="mx-auto w-full max-w-4xl rounded-lg border p-4">
				<Chart data={data} />
			</section>
		</Layout>
	);
}
