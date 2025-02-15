"use server";

import type { AQueSeDestinaElGasto } from "@/types";

const URL =
  "https://www.presupuestoabierto.gob.ar/sici/rest-api/reporte/a-que-se-destina-el-gasto";

export async function getDestinoGasto(year: string): Promise<{
  data: AQueSeDestinaElGasto[] | null;
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
