"use server";

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
    const provincias = json
      .filter((item: DondeSeGasta) => {
        const provincia = item.provincia;
        return (
          provincia.includes("Provincia de") ||
          provincia === "Ciudad Autónoma de Buenos Aires"
        );
      })
      .map((item: DondeSeGasta) => {
        const separedProvincia = item.provincia.split("Provincia de ")[1];
        return separedProvincia || item.provincia;
      });

    const newData = json.map((item: DondeSeGasta) => ({
      ...item,
      provincia: provincias[item.provincia],
    }));

    return {
      data: newData,
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
    };
  }
}
