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
