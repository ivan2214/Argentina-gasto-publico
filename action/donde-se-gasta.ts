"use server";

import { removeAccents } from "@/lib/utils";
import type { DondeSeGasta } from "@/types";

const URL =
	"https://www.presupuestoabierto.gob.ar/sici/rest-api/reporte/donde-se-gasta";

export async function getDondeSeGasta(year: string): Promise<{
	data: DondeSeGasta[] | null;
}> {
	try {
		const response = await fetch(`${URL}/${year}`, {
			next: { revalidate: 3600 },
		});

		if (!response.ok) {
			throw new Error("Failed to fetch data");
		}

		const json = await response.json();

		// Filtrar y obtener solo las provincias válidas
		const filterProvinces: DondeSeGasta[] = json
			.map((item: DondeSeGasta) => {
				const nameProvincia = item.provincia;
				const separedProvincia = separedNameProvincia(nameProvincia);

				// Si es CABA, la excluimos
				if (separedProvincia === null) {
					return null;
				}

				return {
					...item,
					provincia: separedProvincia,
				};
			})
			.filter(Boolean) as DondeSeGasta[]; // Filtramos los valores null

		// Ordenar alfabéticamente
		filterProvinces.sort((a, b) => a.provincia.localeCompare(b.provincia));

		return {
			data: filterProvinces,
		};
	} catch (error) {
		console.error(error);
		return {
			data: null,
		};
	}
}

function separedNameProvincia(nameProvincia: string): string | null {
	const provinciaLimpia = removeAccents(nameProvincia.toUpperCase());

	if (provinciaLimpia.includes("CIUDAD AUTONOMA DE BUENOS AIRES")) {
		return null; // Indica que debe eliminarse
	}

	if (
		provinciaLimpia.includes(
			"TIERRA DEL FUEGO, ANTARTIDA E ISLAS DEL ATLANTICO SUR",
		)
	) {
		return "TIERRA DEL FUEGO";
	}

	return provinciaLimpia
		.replace(/^PROVINCIA DE /, "")
		.replace(/^PROVINCIA DEL /, "");
}
