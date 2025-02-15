"use server";

import type { EntidadPresupuestaria } from "@/types";

const URL =
	"https://www.presupuestoabierto.gob.ar/sici/rest-api/reporte/quien-gasta";

export async function getPresupuesto(
	year: string,
): Promise<{ data: EntidadPresupuestaria[] | null }> {
	try {
		const response = await fetch(`${URL}/${year}`, {
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
