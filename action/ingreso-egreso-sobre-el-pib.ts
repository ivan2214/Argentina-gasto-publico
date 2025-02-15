"use server";

import type { IngresoEgresoPIB } from "@/types";

const URL =
  "https://www.presupuestoabierto.gob.ar/sici/rest-api/reporte/ingreso-egreso-sobre-el-PIB";

export async function getIngresoEgresoPIB(): Promise<
  IngresoEgresoPIB[] | null
> {
  try {
    const response = await fetch(`${URL}`);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
