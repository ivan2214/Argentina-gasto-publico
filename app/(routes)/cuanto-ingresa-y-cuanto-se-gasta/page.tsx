// routes/[carpeta-nombre-pagina]/page.tsx
import { getIngresoEgresoPIB } from "@/action/ingreso-egreso-sobre-el-pib";
import Layout from "../layout";
import { Chart } from "./components/chart";

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
			<Chart data={data} />
		</Layout>
	);
}
