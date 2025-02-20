"use server";

import type { AQueSeDestinaElGasto } from "@/types";

const URL = "https://www.presupuestoabierto.gob.ar/sici/rest-api/reporte";
const PATH = "a-que-se-destina-el-gasto";

const URL_WITH_PATH = `${URL}/${PATH}`;

export async function getAqueSeDestinaElGasto(year: string): Promise<{
	data: AQueSeDestinaElGasto[] | null;
}> {
	try {
		const response = await fetch(`${URL_WITH_PATH}/${year}`, {
			next: { revalidate: 3600 },
		});

		if (!response.ok) {
			throw new Error("Failed to fetch data");
		}

		const data = await response.json();

		return {
			data,
		};
	} catch (error) {
		console.error(error);
		return {
			data: null,
		};
	}
}
