"use server";

import type { DeDondeVienenLosRecursos } from "@/types";

const URL = "https://www.presupuestoabierto.gob.ar/sici/rest-api/reporte";
const PATH = "de-donde-vienen-los-recursos";

const URL_WITH_PATH = `${URL}/${PATH}`;

export async function getDeDondeVienenLosRecursos(year: string): Promise<{
	data: DeDondeVienenLosRecursos[] | null;
}> {
	try {
		const response = await fetch(`${URL_WITH_PATH}/${year}`, {
			next: { revalidate: 3600 },
		});

		console.log(response);

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
