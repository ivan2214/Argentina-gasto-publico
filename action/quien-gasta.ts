"use server";

import type { EntidadPresupuestaria } from "@/types";

const URL =
  "https://www.presupuestoabierto.gob.ar/sici/rest-api/reporte/quien-gasta";

export async function getPresupuesto(
  year: string
): Promise<EntidadPresupuestaria[] | null> {
  try {
    const response = await fetch(`${URL}/${year}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
